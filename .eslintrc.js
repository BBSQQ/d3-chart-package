const eslintrc = {
  "extends": [
    "eslint:recommended",
    'airbnb',
    "plugin:import/errors",
    "prettier"
  ],
  "rules": {
    "no-console": "warn"
  },
  "parser": "babel-eslint",
  "plugins": ["import"],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  }
}

module.exports = eslintrc;
