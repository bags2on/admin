module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true
    }
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier',
    'prettier/react'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    // '@typescript-eslint/explicit-function-return-type': 'off'
    '@typescript-eslint/explicit-module-boundary-types': 'off'
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
  }
}
