export function isPublicDeclarationOutput(path: string): boolean {
  return ['dist/entries/index.d.ts', 'dist/entries/api.d.ts'].includes(normalizeBuildPath(path));
}

function normalizeBuildPath(path: string): string {
  return path.replaceAll('\\', '/');
}
