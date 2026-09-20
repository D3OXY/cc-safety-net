import { dirname, resolve } from 'node:path';
import { findDotGitInAncestors } from '@/core/git/worktree';
import { isPathOrSubpath, isTrustedTempPath, isTrustedTempRootPath } from '@/core/paths/tmpdir';
import type { GitRuleMatch } from './rules';
import { getGitExecutionContext, hasGitContextEnvOverride } from './worktree';
import type { GitAnalyzeOptions, GitRelaxation } from './worktree-relaxation';

export function getGitTempRootRelaxationForMatch(
  tokens: readonly string[],
  match: GitRuleMatch,
  options: GitAnalyzeOptions,
): GitRelaxation | null {
  const context = getGitExecutionContext(tokens, options.cwd, options.environment.paths);
  const dotGit = context.gitCwd === null ? null : findDotGitInAncestors(context.gitCwd);
  const workspace = options.originalCwd
    ? options.environment.paths.realpath(resolve(options.originalCwd))
    : null;

  if (
    match.id.startsWith('git.push-') ||
    workspace === null ||
    context.gitCwd === null ||
    context.hasExplicitGitContext ||
    dotGit === null ||
    !options.environment.paths.isDirectory(dotGit) ||
    hasGitContextEnvOverride(options.environment.env, options.envAssignments) ||
    !isTrustedTempPath(context.gitCwd, options.environment) ||
    isTrustedTempRootPath(context.gitCwd, options.environment) ||
    isPathOrSubpath(workspace, dirname(dotGit)) ||
    isPathOrSubpath(dirname(dotGit), workspace)
  ) {
    return null;
  }

  return { kind: 'temp-root', originalReason: match.reason, gitCwd: context.gitCwd };
}
