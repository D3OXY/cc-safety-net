/**
 * Pieces shared by the xargs and GNU Parallel dynamic-input rules. Each tool keeps its own
 * candidate envelope and budget behavior; only the arithmetic below is identical between them.
 */

/** Inner text a dynamic-input slot at `token[start, start + length)` must take for the token to become `target`, or null. */
export function solveDynamicInput(
  token: string,
  start: number,
  length: number,
  target: string,
): string | null {
  const prefix = token.slice(0, start);
  const suffix = token.slice(start + length);
  return target.startsWith(prefix) && target.endsWith(suffix)
    ? target.slice(prefix.length, target.length - suffix.length)
    : null;
}

/** True when substituting any candidate yields an executable source the original parse did not have. */
export function substitutionAddsExecutableSource<
  T extends { kind: string; tokenIndex: number; value: string },
>(
  existing: readonly T[],
  candidates: Iterable<string>,
  substituted: (candidate: string) => readonly T[],
): boolean {
  const key = (source: T) => `${source.tokenIndex}\0${source.kind}\0${source.value}`;
  const known = new Set(existing.map(key));
  return Array.from(candidates).some((candidate) =>
    substituted(candidate).some((source) => !known.has(key(source))),
  );
}
