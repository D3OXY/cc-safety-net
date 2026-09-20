import { dirname, join, resolve } from 'node:path';
import type { PathResolver } from '@/core/environment';
import {
  isPathOrSubpath,
  isTrustedTempPath,
  isTrustedTempRootPath,
  tryResolveExistingPathComponents,
} from '@/core/paths/tmpdir';
import { substituteKnownShellVariables } from '../shell-git-env';
import { extractGitSubcommandAndRest, splitAtDoubleDash } from './parse';
import type { GitRuleMatch } from './rules';
import { getGitExecutionContext, hasGitContextEnvOverride } from './worktree';
import type { GitAnalyzeOptions, GitRelaxation } from './worktree-relaxation';

export function getGitTempRootRelaxationForMatch(
  tokens: readonly string[],
  match: GitRuleMatch,
  options: GitAnalyzeOptions,
): GitRelaxation | null {
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
      ? worktreeRemoveOperand(tokens, context.gitCwd, options.shellAssignments, paths)
      : findGitRepositoryRoot(context.gitCwd, paths);
  if (
    subject === null ||
    (match.id !== 'git.worktree-remove-force' &&
      (paths.entryKind(join(subject, '.git')) !== 'present' ||
        !paths.isDirectory(join(subject, '.git')))) ||
    !isTrustedTempPath(subject, options.environment) ||
    isTrustedTempRootPath(subject, options.environment) ||
    isPathOrSubpath(workspace, subject) ||
    isPathOrSubpath(subject, workspace)
  ) {
    return null;
  }

  return { kind: 'temp-root', originalReason: match.reason, gitCwd: context.gitCwd };
}

/** The single literal path `git worktree remove` targets, expanded from the carried assignments. */
function worktreeRemoveOperand(
  tokens: readonly string[],
  gitCwd: string,
  shellAssignments: ReadonlyMap<string, string> | undefined,
  paths: PathResolver,
): string | null {
  const rest = extractGitSubcommandAndRest(tokens).rest;
  const { before, after } = splitAtDoubleDash(rest.slice(rest.indexOf('remove') + 1));
  const operands = [...before.filter((token) => !token.startsWith('-')), ...after];
  const operand = operands.length === 1 ? (operands[0] ?? '') : '';
  const expanded = substituteKnownShellVariables(operand, shellAssignments ?? new Map());
  if (
    expanded === '' ||
    expanded.startsWith('~') ||
    /[\s$`*?[]/.test(expanded) ||
    expanded.split(/[\\/]+/).includes('..')
  ) {
    return null;
  }
  return tryResolveExistingPathComponents(resolve(gitCwd, expanded), paths);
}

/** The nearest directory at or above `directory` that holds a `.git` entry of any kind. */
function findGitRepositoryRoot(directory: string, paths: PathResolver): string | null {
  if (paths.entryKind(join(directory, '.git')) !== 'missing') return directory;
  const parent = dirname(directory);
  return parent === directory ? null : findGitRepositoryRoot(parent, paths);
}
