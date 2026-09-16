import type { BunPlugin } from 'bun';

/**
 * Freezes `src/gui/assets.ts` into the bundle: the module reads the frontend
 * files and builds frontend/main.ts with Bun, neither of which the published
 * Node CLI can do, so the built bundle gets the produced strings as literals.
 * The assets module is imported inside the function, so importing this module
 * from a test file does not build the frontend at load time.
 */
export async function guiAssetsPlugin(): Promise<BunPlugin> {
  const contents = Object.entries(await import('../src/gui/assets'))
    .map(([name, value]) => `export const ${name} = ${JSON.stringify(value)};`)
    .join('\n');
  return {
    name: 'gui-assets',
    setup(build) {
      // `args.path` is native, so the separator is a backslash on Windows.
      build.onLoad({ filter: /src[\\/]gui[\\/]assets\.ts$/ }, () => ({ contents, loader: 'js' }));
    },
  };
}

/**
 * Freezes `src/hosts/templates/cc-safety-net.ts` into the bundle: the module
 * reads the skill document beside the repository, which the published package
 * does not ship, so the built bundle gets the body as a literal.
 */
export async function skillTemplatePlugin(): Promise<BunPlugin> {
  const contents = Object.entries(await import('../src/hosts/templates/cc-safety-net'))
    .map(([name, value]) => `export const ${name} = ${JSON.stringify(value)};`)
    .join('\n');
  return {
    name: 'skill-template',
    setup(build) {
      // `args.path` is native, so the separator is a backslash on Windows.
      build.onLoad({ filter: /src[\\/]hosts[\\/]templates[\\/]cc-safety-net\.ts$/ }, () => ({
        contents,
        loader: 'js',
      }));
    },
  };
}
