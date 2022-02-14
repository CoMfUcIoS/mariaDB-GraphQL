const path = require("path");

module.exports = {
  env: {
    node: true,
    es6: true,
  },
  globals: {
    log: false,
    document: true,
    window: true,
    FormData: true,
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    sourceType: "module",
    allowImportExportEverywhere: true,
  },
  extends: ["eslint:recommended", "prettier"],
  plugins: [
    "babel",
    "prettier",
    "json",
    "eslint-plugin-import",
    "eslint-plugin-import-helpers",
  ],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    "arrow-parens": ["error", "as-needed"],
    "import/no-cycle": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/prefer-default-export": 0,
    "import-helpers/order-imports": [
      "error",
      {
        newlinesBetween: "always",
        groups: ["module", "/^~//", "/^@//"],
        alphabetize: {
          order: "asc",
          ignoreCase: false,
        },
      },
    ],
    complexity: ["warn", 8],
    "max-params": ["warn", 5],
    "max-statements": ["warn", 15],
    "max-statements-per-line": [
      "error",
      {
        max: 1,
      },
    ],
    "max-nested-callbacks": ["warn", 4],
    "max-depth": [
      "warn",
      {
        max: 3,
      },
    ],
    "max-lines": ["warn", 400],
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        trailingComma: "all",
        arrowParens: "avoid",
      },
    ],
    // "import/no-extraneous-dependencies": [
    //   "error",
    //   {
    //     devDependencies: ["**/*.test.js", "test/**"],
    //   },
    // ],
    "no-unused-expressions": 0,
  },
  settings: {
    "import/resolver": {
      node: {
        paths: [path.resolve(__dirname, "src/")],
      },
    },
  },
};
