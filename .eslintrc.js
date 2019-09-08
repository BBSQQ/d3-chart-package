const eslintrc = {
  'extends': [
    'eslint:recommended',
    'plugin:import/errors',
    'prettier'
  ],
  'rules': {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'quotes': ['warn', 'single'],
    'semi': 'warn'
  },
  'parser': 'babel-eslint',
  'plugins': ['import'],
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'env': {
    'es6': true,
    'browser': true,
    'node': true
  }
}

module.exports = eslintrc;
