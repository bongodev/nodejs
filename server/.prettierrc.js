/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
module.exports = {
  singleQuote: true,
  overrides: [
    {
      files: '*.js',
      options: {
        singleQuote: true,
      },
    },
  ],
};
