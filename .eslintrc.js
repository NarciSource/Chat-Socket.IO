module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'prettier/prettier': [
      'error',
      {
        printWidth: 100, // 한 줄 최대 길이
        singleQuote: true, // 작은 따옴표 사용
        useTabs: false, // 탭 사용 여부
        endOfLine: 'auto', // 줄 끝 처리 방식 CRLF/LF
        bracketSpacing: true, // 중괄호 안의 공백 허용
        trailingComma: 'all', // 후행 쉼표 허용
      },
    ],
  },
};
