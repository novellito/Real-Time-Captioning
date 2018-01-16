module.exports = {
  extends: "airbnb",
  //"installedESLint": true,
  plugins: ["import", "jsx-a11y"],
  globals: {
    document: true,
    crypto: true,
    window: true
  },
  rules: {
    "no-bitwise": "off",
    "no-mixed-operators": "off"
  },
  parserOptions: {
    ecmaVersion: 6
  }
};
