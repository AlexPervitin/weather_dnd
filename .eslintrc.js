module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react/prop-types': 0,
    'prettier/prettier': 2,
    'react/jsx-props-no-spreading': 0,
    'no-unneeded-ternary': 0,
    'react/jsx-boolean-value': 0,
    'no-nested-ternary': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'react/button-has-type': 0,
    'no-console': process.env.REACT_APP_ENV === 'develop' ? 0 : 1,
    'no-underscore-dangle': 0,
    'no-debugger': process.env.REACT_APP_ENV === 'develop' ? 1 : 2,
    'no-case-declarations': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
  },
};
