import withSolid from 'rollup-preset-solid';

export default withSolid({
  input: 'src/axqdesign-icons-solidjs.ts',
  targets: ['esm', 'cjs'],
  printInstructions: false,
});
