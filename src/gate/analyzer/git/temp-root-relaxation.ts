import { dirname, isAbsolute, join, resolve } from 'node:path';
import type { PathResolver } from '@/core/environment';
import { isPathOrSubpath, isTrustedTempPath, isTrustedTempRootPath } from '@/core/paths/tmpdir';
import type { CommandWord } from '@/core/shell/model';
import { analysisWordText } from '../command-words';
import { substituteKnownShellVariables } from '../shell-git-env';
import { extractGitSubcommandAndRest, splitAtDoubleDash } from './parse';
import type { GitRuleMatch } from './rules';
import { getGitExecutionContext, hasGitContextEnvOverride } from './worktree';
import {
  type GitAnalyzeOptions,
  type GitRelaxation,
  isNonRelaxableLocalDiscard,
} from './worktree-relaxation';

export function getGitTempRootRelaxationForMatch(
  words: readonly CommandWord[],
  match: GitRuleMatch,
  options: GitAnalyzeOptions,
): GitRelaxation | null {
  const tokens = words.map(analysisWordText);
  const paths = options.environment.paths;
  const context = getGitExecutionContext(tokens, options.cwd, paths);
  const workspace = options.originalCwd ? paths.realpath(resolve(options.originalCwd)) : null;

  if (
    match.id.startsWith('git.push-') ||
    workspace === null ||
    context.gitCwd === null ||
    context.hasExplicitGitContext ||
    hasGitContextEnvOverride(options.environment.env, options.envAssignments)
  ) {
    return null;
  }

  // `git worktree remove --force <path>` runs in the workspace repository, so the disposable
  // subject is the operand rather than the repository root.
  const subject =
    match.id === 'git.worktree-remove-force'
      ? worktreeRemoveOperand(words, options.shellAssignments, paths)
      : findGitRepositoryRoot(context.gitCwd, paths);
  if (
    subject === null ||
    (match.id !== 'git.worktree-remove-force' &&
      !isDisposableRepository(subject, tokens, match, options)) ||
    !isTrustedTempPath(subject, options.environment) ||
    isTrustedTempRootPath(subject, options.environment) ||
    isPathOrSubpath(workspace, subject) ||
    isPathOrSubpath(subject, workspace)
  ) {
    return null;
  }

  return { kind: 'temp-root', originalReason: match.reason, gitCwd: context.gitCwd };
}

/**
 * A repository whose `.git` is a present directory entry, or a linked worktree for a rule that
 * only discards local state: branch, stash and tag operations in a linked worktree mutate the
 * repository it belongs to, which may be the workspace. The worktree facts reader admits only a
 * `.git` file whose gitdir points back at it, so a planted `gitdir: <workspace>/.git` is refused,
 * and the linked-worktree filter keeps the discards that move a branch or recurse into submodules.
 */
function isDisposableRepository(
  root: string,
  tokens: readonly string[],
  match: GitRuleMatch,
  options: GitAnalyzeOptions,
): boolean {
  const paths = options.environment.paths;
  const gitEntry = join(root, '.git');
  if (paths.entryKind(gitEntry) !== 'present') return false;
  if (paths.isDirectory(gitEntry)) return true;
  const facts = match.localDiscard ? options.environment.worktreeFacts(root) : null;
  return facts !== null && !isNonRelaxableLocalDiscard(tokens, options, facts);
}

/**
 * The single absolute literal path `git worktree remove` targets, expanded from the carried
 * assignments, which must already be a directory rather than a symlink. A relative operand is
 * refused: git also accepts a unique trailing path component of any registered worktree, so
 * `remove --force victim` can name a worktree far from the cwd. A missing or symlinked operand is
 * refused because git deletes the registered worktree the operand resolves to when it runs. Only a
 * word the parser marked as a variable expansion is substituted; a quoted or escaped `$` reaches
 * git literally and keeps the rule.
 */
function worktreeRemoveOperand(
  words: readonly CommandWord[],
  shellAssignments: ReadonlyMap<string, string> | undefined,
  paths: PathResolver,
): string | null {
  const rest = extractGitSubcommandAndRest(words.map(analysisWordText)).rest;
  const { before, after } = splitAtDoubleDash(rest.slice(rest.indexOf('remove') + 1));
  const operands = [...before.filter((token) => !token.startsWith('-')), ...after];
  const operand = operands.length === 1 ? (operands[0] ?? '') : '';
  const operandWord = words.find((word) => word.text === operand);
  // Substitute only when every `$` in the word belongs to an expansion the parser saw; a literal
  // fragment such as `'$B'` in `"$A"'$B'` reaches git unexpanded, so the text is left as is and
  // the dynamic-text check below keeps the rule.
  const expanded =
    operandWord?.provenance === 'variable' &&
    operandWord.parts.every((part) => part.provenance !== 'literal' || !/[$`]/.test(part.raw))
      ? substituteKnownShellVariables(operand, shellAssignments ?? new Map())
      : operand;
  if (
    !isAbsolute(expanded) ||
    /[\s$`*?[]/.test(expanded) ||
    paths.entryKind(expanded) !== 'present' ||
    !paths.isDirectory(expanded)
  ) {
    return null;
  }
  return paths.realpath(expanded);
}

/** The nearest directory at or above `directory` that holds a `.git` entry of any kind. */
function findGitRepositoryRoot(directory: string, paths: PathResolver): string | null {
  if (paths.entryKind(join(directory, '.git')) !== 'missing') return directory;
  const parent = dirname(directory);
  return parent === directory ? null : findGitRepositoryRoot(parent, paths);
}
