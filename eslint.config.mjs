import react from '@ygqygq2/eslint-config/react.mjs';
import tseslint from 'typescript-eslint';

export default tseslint.config(...react, {
  ignores: ['*.cjs'],
  rules: {},
});
