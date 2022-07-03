module.exports = {
  env: {
    browser: false,
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
  },
};
