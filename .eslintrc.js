module.exports = {
  env: {
    browser: true,
        "es2021": true,
    },
    "extends": {
        "airbnb" : true,
        "stylelint-config-prettier": true,
    },
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    rules: {
        "semi": ["error", "never"],
        "object-curly-newline": ["error", "always"],
    }
}
