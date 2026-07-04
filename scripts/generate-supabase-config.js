/**
 * Vercel 빌드 시 환경 변수로 supabase-config.js 를 생성합니다.
 * GitHub에는 키가 없고, 배포 결과물에만 들어갑니다.
 *
 * 필요 환경 변수:
 *   SUPABASE_URL
 *   SUPABASE_ANON_KEY
 */
const fs = require("fs");
const path = require("path");

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error(
    "[generate-supabase-config] SUPABASE_URL 또는 SUPABASE_ANON_KEY 가 없습니다.\n" +
      "Vercel → Project Settings → Environment Variables 에 추가하세요."
  );
  process.exit(1);
}

if (key === "YOUR_ANON_PUBLIC_KEY" || url.includes("YOUR_PROJECT_REF")) {
  console.error(
    "[generate-supabase-config] 플레이스홀더 값이 들어 있습니다. 실제 Supabase 키를 넣으세요."
  );
  process.exit(1);
}

const outPath = path.join(__dirname, "..", "supabase-config.js");
const content = `// Auto-generated at build time. Do not edit or commit.
window.SUPABASE_URL = ${JSON.stringify(url)};
window.SUPABASE_ANON_KEY = ${JSON.stringify(key)};
`;

fs.writeFileSync(outPath, content, "utf8");
console.log("[generate-supabase-config] wrote", outPath);
