// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    'no-shadow': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'no-plusplus': 'off',
    'no-cond-assign': 'off',
    'no-continue': 'off',
    'no-unused-vars': 'off',
    'comma-dangle': ['warn', 'never'],
    'semi': ['warn', 'never'],
    'no-param-reassign': 0,
    'no-use-before-define': 'off',
    'no-unused-expressions': ['error', {
      'allowShortCircuit': true,
      'allowTernary': true
    }],
    'no-bitwise': 'off',
    'no-mixed-operators': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'prefer-template': 'off',
    'space-before-function-paren': 'off',
    'class-methods-use-this': 'off',
    'import/no-mutable-exports': 'off',
    'import/prefer-default-export': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
