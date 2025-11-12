import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    '@storybook/react',
    'webpack',
    '@babel/parser',
    '@babel/traverse',
    '@babel/generator',
    '@babel/types'
  ],
  treeshake: true,
  minify: false,
  target: 'es2020',
  platform: 'node',
  banner: {
    js: '/** @engi/test-intelligence - Unified testing infrastructure for Engi */'
  }
});