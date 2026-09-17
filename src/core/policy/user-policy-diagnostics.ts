import { formatIssues, sortIssues } from './rules-config';
import { USER_POLICY_FIELDS, validateUserPolicy } from './store';

/**
 * One salvage pass answering both surfaces: the normalized policy and the diagnostics its
 * degraded fields produced. Callers that need both must not validate the same document twice.
 */
export function salvageUserPolicy(config: unknown, home: string) {
  const validated = validateUserPolicy(config, home);
  return {
    policy: validated.policy,
    errors: formatIssues(
      sortIssues(validated.issues, USER_POLICY_FIELDS, (issue) => issue.kind === 'custom'),
      ' ',
      ' ',
    ),
  };
}

export function getUserPolicyDiagnostics(config: unknown, home: string): string[] {
  return salvageUserPolicy(config, home).errors;
}
