#!/usr/bin/env node
// Runs automatically after `npm run build` (wired as the "postbuild" npm
// script). Repackages Astro's @astrojs/node standalone SSR output into the
// directory layout AWS Amplify Hosting's deployment specification expects:
// https://docs.aws.amazon.com/amplify/latest/userguide/ssr-deployment-specification.html
import { cpSync, rmSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(root, '.amplify-hosting');
const COMPUTE_DIR = join(OUT, 'compute', 'default');
const STATIC_DIR = join(OUT, 'static');

console.log('[prepare-amplify] Cleaning previous output...');
rmSync(OUT, { recursive: true, force: true });
mkdirSync(COMPUTE_DIR, { recursive: true });
mkdirSync(STATIC_DIR, { recursive: true });

console.log('[prepare-amplify] Copying client assets -> static/');
cpSync(join(root, 'dist', 'client'), STATIC_DIR, { recursive: true });

console.log('[prepare-amplify] Copying server bundle -> compute/default/');
cpSync(join(root, 'dist', 'server'), COMPUTE_DIR, { recursive: true });

// Astro's node-standalone entry defaults to PORT=8080; Amplify's compute
// primitive requires the entry point to listen on port 3000.
console.log('[prepare-amplify] Writing port-forcing wrapper entrypoint...');
writeFileSync(
  join(COMPUTE_DIR, 'server.mjs'),
  [
    "process.env.HOST = process.env.HOST || '0.0.0.0';",
    "process.env.PORT = process.env.PORT || '3000';",
    "await import('./entry.mjs');",
    '',
  ].join('\n')
);

// astro's SSR build externalizes node_modules deps rather than bundling them
// (standard Vite SSR behavior), so the compute/default folder must ship its
// own node_modules to stay self-contained. devDependencies (playwright, in
// particular — it can pull in large browser binaries) must NOT ship, both
// because they're unnecessary and because the compute bundle is capped at
// 220MB uncompressed.
console.log('[prepare-amplify] Pruning devDependencies before bundling node_modules...');
// shell: true is required so this resolves on Windows (npm is a .cmd shim
// there, which execFileSync can't invoke directly) as well as Amplify's
// Linux build container. Args are a fixed, hardcoded array (no interpolated
// input), so the shell-escaping caveat behind Node's deprecation warning
// does not apply here.
execFileSync('npm', ['prune', '--omit=dev'], { cwd: root, stdio: 'inherit', shell: true });

console.log('[prepare-amplify] Copying node_modules -> compute/default/node_modules');
cpSync(join(root, 'node_modules'), join(COMPUTE_DIR, 'node_modules'), { recursive: true });

const astroVersion = JSON.parse(
  readFileSync(join(root, 'node_modules', 'astro', 'package.json'), 'utf8')
).version;

const manifest = {
  version: 1,
  framework: { name: 'astro', version: astroVersion },
  routes: [
    // Content-hashed build assets — safe to cache aggressively.
    { path: '/_astro/*', target: { kind: 'Static', cacheControl: 'public, max-age=31536000, immutable' } },
    // Anything else that looks like a file (favicon.ico, robots.txt, public/
    // images, etc.) — try static first, fall back to compute for dynamic
    // "file-shaped" routes like /sitemap.xml (src/pages/sitemap.xml.ts).
    { path: '/*.*', target: { kind: 'Static' }, fallback: { kind: 'Compute', src: 'default' } },
    // Every real page is SSR'd (no export const prerender = true anywhere) —
    // catch-all must go to compute.
    { path: '/*', target: { kind: 'Compute', src: 'default' } },
  ],
  computeResources: [
    { name: 'default', runtime: 'nodejs22.x', entrypoint: 'server.mjs' },
  ],
};

writeFileSync(join(OUT, 'deploy-manifest.json'), JSON.stringify(manifest, null, 2));
console.log('[prepare-amplify] Done. Output at .amplify-hosting/');
