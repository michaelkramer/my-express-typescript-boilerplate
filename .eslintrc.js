module.exports = {
    env: {
      browser: true,
      es6: true,
      node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "prettier"],
    rules: {
      "no-console": "error",
      "arrow-parens": "error",
      "eqeqeq": ["error", "always"],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [1],
      "prettier/prettier": "error",
      "quotes": [
        "error",
        "double",
        { "avoidEscape": true , "allowTemplateLiterals": true }
    ],
    },
  };
