/* eslint-env node */
// eslint-disable-next-line import/no-extraneous-dependencies
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    JSX: 'readonly'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'airbnb-base',
    '@vue/eslint-config-prettier',
    'prettier'
  ],
  plugins: ['vue', '@typescript-eslint/eslint-plugin', 'prettier'],
  rules: {
    'prettier/prettier': 'error',

    'no-var': 'error',

    'no-trailing-spaces': 'error',

    'no-eval': 'error',

    'no-loop-func': 'error',

    'no-new-object': 'error',

    'no-param-reassign': 'error',

    'no-dupe-class-members': 'error',

    'no-duplicate-imports': 'error',

    'object-shorthand': 'error',

    'prefer-const': 'error',

    'prefer-template': 'error',

    'prefer-arrow-callback': 'error',

    'template-curly-spacing': 'error',

    'space-before-blocks': 'error',

    'func-style': 'error',

    'arrow-spacing': 'error',

    eqeqeq: 'error',

    quotes: ['error', 'single'],

    semi: 'off',

    'linebreak-style': ['error', 'unix'],

    'arrow-parens': ['error', 'as-needed'],

    'eol-last': ['error', 'always'],

    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 5,
        multiline: {
          max: 1
        }
      }
    ],

    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'import/prefer-default-export': 'off',

    'import/no-unresolved': 'off',

    'import/extensions': 'off',

    'vue/multi-word-component-names': 'off',

    '@typescript-eslint/no-explicit-any': 'off',

    '@typescript-eslint/member-delimiter-style': 'off',

    '@typescript-eslint/no-var-requires': 'off',

    '@typescript-eslint/ban-ts-ignore': 'off',

    '@typescript-eslint/class-name-casing': 'off',

    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: [
        '**/tests/*.{j,t}s?(x)',
        '**/tests/**/*.spec.{j,t}s?(x)',
        '**/tests/*.spec.{j,t}s?(x)'
      ]
    }
  ]
}
