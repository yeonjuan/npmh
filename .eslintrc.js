module.exports = {
  env: {
    es2020: true,
    node: true,
    jest: true
  },
  extends: [
    "eslint"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    indent: ["error", 2],
    "node/no-extraneous-require": "off",
    strict: "off",
    "no-console": "off",
    "node/shebang": "off"
  }
};
