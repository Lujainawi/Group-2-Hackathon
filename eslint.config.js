import eslintPluginImport from 'eslint-plugin-import';

export default [
  {
    files: ['server/**/*.js'],
    ignores: ['node_modules'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    environment: {
      node: true, // Enable Node.js global variables and scoping
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      'no-unused-vars': 'warn',
      'import/no-unresolved': 'error',
    },
  },
];
