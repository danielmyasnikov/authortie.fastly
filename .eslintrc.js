module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },

  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'arrow-body-style': 'off',
  },
};
