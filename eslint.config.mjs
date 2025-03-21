import { FlatCompat } from '@eslint/eslintrc'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  ...compat.extends('plugin:prettier/recommended'),
  ...compat.extends('plugin:tailwindcss/recommended'),

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['tailwindcss'], // ✅ TailwindCSS 플러그인 명시적으로 선언
    rules: {
      'tailwindcss/classnames-order': ['warn'], // 단순 경고만 표시
      'prettier/prettier': ['warn'], // ✅ Prettier 적용 but 자동 정렬 X

      // ✅ Next.js 환경 최적화
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],

      // ✅ TypeScript 관련 규칙
      '@typescript-eslint/no-unused-vars': ['error'],

      // ✅ 콘솔 로그 제한 (warn, error는 허용)
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
]
