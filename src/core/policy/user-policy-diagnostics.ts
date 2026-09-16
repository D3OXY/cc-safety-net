import { formatIssues, sortIssues } from './rules-config';
import { USER_POLICY_FIELDS, validateUserPolicy } from './store';

export function getUserPolicyDiagnostics(config: unknown, home: string): string[] {
  return formatIssues(
    sortIssues(
      validateUserPolicy(config, home).issues,
      USER_POLICY_FIELDS,
      (issue) => issue.kind === 'custom',
    ),
    ' ',
    ' ',
  );
}
