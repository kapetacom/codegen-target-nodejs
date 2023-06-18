module.exports = {
  extends: ["@kapeta/eslint-config"],
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "no-param-reassign": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
    tsconfigRootDir: __dirname,
  },
};
