module.exports = {
  plugins: ['prettier-plugin-sort-imports'],
  tabWidth: 2, // 2칸 들여쓰기
  useTabs: false, // 스페이스 사용
  semi: false, // 세미콜론 사용
  singleQuote: true, // 작은따옴표 사용
  trailingComma: 'all', // 마지막 요소에도 쉼표 추가
  bracketSpacing: true,
  printWidth: 100, // 한 줄 최대 길이
  importOrder: [
    '^react$', // React 관련 import를 최상단으로
    '<THIRD_PARTY_MODULES>', // 외부 라이브러리 import 정렬
    '^@/core/(.*)$', // 특정 경로 import 정렬
    '^@/lib/(.*)$',
    '^[./]', // 상대 경로 import 정렬
  ],
  importOrderSeparation: true, // 그룹 간 줄 바꿈 추가
}
