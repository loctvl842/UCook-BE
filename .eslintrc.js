module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'plugin', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    indent: [
      'error',
      2,
      {
        ignoredNodes: [
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
        ],
        SwitchCase: 1,
      },
    ],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowClassStart: true,
        allowClassEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
      },
    ],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'arrow-parens': ['error', 'as-needed'],
    'class-methods-use-this': [
      'warn',
      {
        enforceForClassFields: false,
      },
    ],
    curly: ['error', 'all'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'func-names': ['warn', 'as-needed'],
    'global-require': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'no-confusing-arrow': [
      'error',
      {
        allowParens: false,
      },
    ],
    'no-mixed-operators': 'error',
    'no-await-in-loop': 'off',
    'no-console': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxBOF: 0,
        maxEOF: 0,
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
      },
    ],
    'no-unused-vars': 'off',
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          minProperties: 6,
          multiline: true,
          consistent: true,
        },
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'operator-linebreak': [
      'error',
      'before',
      {
        overrides: {
          '=': 'none',
          '?': 'before',
          ':': 'before',
          '&&': 'before',
        },
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // import
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': 'off',

    // @typescript-eslint
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
