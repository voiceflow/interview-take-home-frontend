module.exports = {
  extends: ['@voiceflow/eslint-config/frontend', '@voiceflow/eslint-config/typescript'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts'],
      extends: ['@voiceflow/eslint-config/typescript'],
    },
  ],
};