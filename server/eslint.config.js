module.exports = [
  {
    ignores: ['node_modules', 'docs'],
  },
  {
    files: ['./src/*.{js,ts}'],
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      semi: 'error',
    },
  },
];
