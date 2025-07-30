import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';
import svg from 'rollup-plugin-svg';
import sourcemaps from 'rollup-plugin-sourcemaps';
import del from 'rollup-plugin-delete';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const packageJson = require('./package.json');

const rollupConfig = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: false,
      },
    ],
    plugins: [
      svg(),
      resolve(),
      commonjs(),
      postcss({
        config: {
          path: './postcss.config.js',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
      copy({
        targets: [
          {
            src: './tailwind.config.js',
            dest: './dist',
          },
          {
            src: './src/styles/globals.css',
            dest: './dist',
          },
        ],
      }),
      typescript({
        sourceMap: false,
        inlineSources: false,
        tsconfig: './tsconfig.json',
      }),
      sourcemaps(),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts(), del({ targets: 'dist/types', hook: 'buildEnd' })],
  },
];

export default rollupConfig;
