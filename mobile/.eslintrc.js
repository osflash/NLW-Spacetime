/** @type {import('eslint').Linter.BaseConfig} */
const eslintConfig = {
  extends: ['@rocketseat/eslint-config/react'],
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    camelcase: 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^react/',
          '/^next/',
          'module',
          '/^~/types/',
          '/^~/utils/',
          '/^~/libs/',
          '/^~/services/',
          '/^~/hooks/',
          '/^~/providers/',
          '/^~/components/',
          '/^~/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
}

module.exports = eslintConfig
