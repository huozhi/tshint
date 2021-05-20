exports.createLintConfig = (custom, options) => {
  custom = Object.assign({extends: [], plugins: []}, custom)

  return {
    parser: '@typescript-eslint/parser',
    parserOptions: Object.assign({
      ecmaVersion: 8,
      sourceType: 'module',
      ecmaFeatures: {
        jx: true,
        impliedStrict: true,
        experimentalObjectRestSpread: true,
      },
      allowImportExportEverywhere: true,
    }, options.useTypescript && {
      // Error: Error while loading rule '@typescript-eslint/await-thenable': You have used a rule which requires parserServices to be generated. 
      // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
      // https://github.com/typescript-eslint/typescript-eslint/issues/967
      project: ['./**/tsconfig.json'],
    }),
    plugins: [
      '@typescript-eslint'
    ].concat(custom.plugins),
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ].concat(custom.extends),
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
    rules: Object.assign(
      {
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/no-var-requires': 0
      },
      // If it's pure javascript project, disabled rules required `parserOptions.project`.
      // Ref: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
      !options.useTypescript && 
        rulesRequiredTypeInfo.reduce((rules, name) => {
          rules[name] = 0
          return rules
        }, {}),
      custom.rules,
    ),
  }
}

const rulesRequiredTypeInfo = 
[
  '@typescript-eslint/await-thenable',
  '@typescript-eslint/naming-convention',
  '@typescript-eslint/no-base-to-string',
  '@typescript-eslint/no-confusing-void-expression',
  '@typescript-eslint/no-floating-promises',
  '@typescript-eslint/no-for-in-array',
  '@typescript-eslint/no-misused-promises',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare',
  '@typescript-eslint/no-unnecessary-condition',
  '@typescript-eslint/no-unnecessary-qualifier',
  '@typescript-eslint/no-unnecessary-type-arguments',
  '@typescript-eslint/no-unnecessary-type-assertion',
  '@typescript-eslint/no-unsafe-argument',
  '@typescript-eslint/no-unsafe-assignment',
  '@typescript-eslint/no-unsafe-call',
  '@typescript-eslint/no-unsafe-member-access',
  '@typescript-eslint/no-unsafe-return',
  '@typescript-eslint/non-nullable-type-assertion-style',
  '@typescript-eslint/prefer-includes',
  '@typescript-eslint/prefer-nullish-coalescing',
  '@typescript-eslint/prefer-readonly',
  '@typescript-eslint/prefer-readonly-parameter-types',
  '@typescript-eslint/prefer-reduce-type-parameter',
  '@typescript-eslint/prefer-regexp-exec',
  '@typescript-eslint/prefer-string-starts-ends-with',
  '@typescript-eslint/promise-function-async',
  '@typescript-eslint/require-array-sort-compare',
  '@typescript-eslint/restrict-plus-operands',
  '@typescript-eslint/restrict-template-expressions',
  '@typescript-eslint/strict-boolean-expressions',
  '@typescript-eslint/switch-exhaustiveness-check',
  '@typescript-eslint/unbound-method',
  
  '@typescript-eslint/no-implied-eval',
  '@typescript-eslint/no-throw-literal',
  '@typescript-eslint/require-await',
  '@typescript-eslint/return-await'
]
