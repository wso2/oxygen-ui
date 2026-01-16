import { build } from 'esbuild'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

// Build ESM version
await build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist',
  bundle: true,
  splitting: false,
  sourcemap: true,
  format: 'esm',
  target: ['esnext'],
  platform: 'browser',
  jsx: 'automatic',
  logLevel: 'info',
  external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})],
})

// Build CommonJS version
await build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.cjs',
  bundle: true,
  sourcemap: true,
  format: 'cjs',
  target: ['esnext'],
  platform: 'browser',
  jsx: 'automatic',
  logLevel: 'info',
  external: [...Object.keys(pkg.peerDependencies || {}), ...Object.keys(pkg.dependencies || {})],
})
