module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/strongly-recommended',
    // 'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],

  parserOptions: {
    ecmaVersion: 2020
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    semi: [1, 'never'],
    quotes: [1, 'single']
  },

  overrides: [{
    files: [
      '**/__tests__/*.{j,t}s?(x)',
      '**/tests/unit/**/*.spec.{j,t}s?(x)'
    ],
    env: {
      jest: true
    }
  }]

}
