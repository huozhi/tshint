module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true,
    },
    allowImportExportEverywhere: true,
    
    // Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. 
    // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
    // https://github.com/typescript-eslint/typescript-eslint/issues/967
    project: ['./**/tsconfig.json'],
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'node_modules',
  ],
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/ban-ts-ignore": 0,
    '@typescript-eslint/no-var-requires': 0
  },
};
