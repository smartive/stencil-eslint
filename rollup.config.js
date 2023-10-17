import nodeResolve from 'rollup-plugin-node-resolve';
export default {
  input: 'dist/build/index.js',
  plugins: [
    nodeResolve({
      preferBuiltins: true
    })
  ],
  treeshake: {
    moduleSideEffects: 'no-external'
  },
  external: [
    'eslint',
    'typescript',
    'tsutils',
    'eslint-utils',
    '@typescript-eslint/utils'
  ],
  output: {
    file: 'dist/index.js',
    format: 'commonjs'
  }
};
