module.exports = {
  env: {
    browser: true,
    es6: true, // or es6: true
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'semi': ['error', 'always'],
    'import/extensions': ['off', 'never'],
    'react/jsx-indent': 'off',
    'react/forbid-prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-curly-brace-presence': ['off', 'ignore'],
    'function-paren-newline': ['off', 'ignore'],
    'react/no-array-index-key': ['off', 'ignore'],
    'react/destructuring-assignment': ['off', 'ignore'],
    'react/jsx-filename-extension': ['off', 'ignore'],
    'react/jsx-props-no-spreading': ['off']
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
