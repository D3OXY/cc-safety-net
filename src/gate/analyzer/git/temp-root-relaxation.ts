import { dirname, join, resolve } from 'node:path';
import type { PathResolver } from '@/core/environment';
import { isPathOrSubpath, isTrustedTempPath, isTrustedTempRootPath } from '@/core/paths/tmpdir';
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
  const root = context.gitCwd === null ? null : findGitRepositoryRoot(context.gitCwd, paths);
  const workspace = options.originalCwd ? paths.realpath(resolve(options.originalCwd)) : null;

  if (
    match.id.startsWith('git.push-') ||
    workspace === null ||
    context.gitCwd === null ||
    context.hasExplicitGitContext ||
    root === null ||
    paths.entryKind(join(root, '.git')) !== 'present' ||
    !paths.isDirectory(join(root, '.git')) ||
    hasGitContextEnvOverride(options.environment.env, options.envAssignments) ||
    !isTrustedTempPath(root, options.environment) ||
    isTrustedTempRootPath(root, options.environment) ||
    isPathOrSubpath(workspace, root) ||
    isPathOrSubpath(root, workspace)
  ) {
    return null;
  }

  return { kind: 'temp-root', originalReason: match.reason, gitCwd: context.gitCwd };
}

/** The nearest directory at or above `directory` that holds a `.git` entry of any kind. */
function findGitRepositoryRoot(directory: string, paths: PathResolver): string | null {
  if (paths.entryKind(join(directory, '.git')) !== 'missing') return directory;
  const parent = dirname(directory);
  return parent === directory ? null : findGitRepositoryRoot(parent, paths);
}
