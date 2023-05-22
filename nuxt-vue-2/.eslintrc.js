module.exports = {
  root: true,

  env: {
    browser: true,
    node: true
  },

  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    'plugin:unicorn/recommended',
    'plugin:vuejs-accessibility/recommended'
  ],

  plugins: ['prettier', 'vuejs-accessibility', 'simple-import-sort', 'import'],

  rules: {
    camelcase: 'off',
    curly: 'error',
    'import/order': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error',

    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',

    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*']
      }
    ],

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ImportDeclaration[source.value="lodash"]',
        message: 'Do not import huge vanilla lodash. Use lodash-es'
      }
    ],

    'vue/v-for-delimiter-style': ['error', 'in'],
    'vue/no-boolean-default': ['error', 'default-false'],
    'vue/v-on-function-call': ['error', 'never'],
    'vue/no-useless-mustaches': ['error', { ignoreStringEscape: true }],
    'vue/no-v-html': 'off',
    'vue/padding-line-between-blocks': 'error',
    'vue/custom-event-name-casing': ['error', 'kebab-case', { ignores: [] }],
    'vue/next-tick-style': ['error', 'promise'],

    'vue/new-line-between-multi-line-property': [
      'error',
      { minLineOfMultilineProperty: 2 }
    ],

    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { registeredComponentsOnly: false }
    ],

    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}
