import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended" // 🔹 Prettier와 ESLint를 함께 사용하도록 설정
  ),
  {
    rules: {
      "prettier/prettier": ["error"], // 🔹 ESLint가 Prettier 스타일을 강제하도록 설정
      "react/react-in-jsx-scope": "off", // ✅ Next.js에서는 React import 불필요
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx", ".jsx"] }] // ✅ TSX, JSX 파일 허용
    }
  }
];

export default eslintConfig;
