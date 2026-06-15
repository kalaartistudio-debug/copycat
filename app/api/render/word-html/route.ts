import { NextRequest, NextResponse } from "next/server";
import { preprocessAIOutput } from "@/lib/markdown/parse";

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const { markdown } = await req.json();
    if (!markdown) {
      return NextResponse.json({ error: "Markdown is required" }, { status: 400 });
    }

    // rehype-katex is used instead of rehype-mathjax — KaTeX has no global
    // initialiser so it never crashes during Turbopack's build-time analysis.
    const [
      { unified },
      { default: remarkParse },
      { default: remarkGfm },
      { default: remarkMath },
      { default: remarkRehype },
      { default: rehypeKatex },
      { default: rehypeStringify },
    ] = await Promise.all([
      import("unified"),
      import("remark-parse"),
      import("remark-gfm"),
      import("remark-math"),
      import("remark-rehype"),
      import("rehype-katex"),
      import("rehype-stringify"),
    ]);

    const preprocessed = preprocessAIOutput(markdown);

    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype)
      // output:'mathml' emits <math> elements — Word and ONLYOFFICE
      // both parse MathML from clipboard HTML natively.
      .use(rehypeKatex, { output: "mathml" })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(preprocessed);

    const body = String(file);

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 13pt; line-height: 1.5; }
  h1 { font-size: 20pt; font-weight: bold; margin: 16pt 0 8pt; }
  h2 { font-size: 16pt; font-weight: bold; margin: 14pt 0 6pt; }
  h3 { font-size: 14pt; font-weight: bold; margin: 12pt 0 6pt; }
  p  { margin: 6pt 0; }
  ul, ol { margin: 4pt 0 4pt 24pt; }
  li { margin: 2pt 0; }
  code { font-family: "Courier New", monospace; background: #f5f5f5; padding: 1pt 3pt; }
  pre  { font-family: "Courier New", monospace; background: #f5f5f5; padding: 8pt; }
  strong { font-weight: bold; }
  em { font-style: italic; }
  table { border-collapse: collapse; }
  th, td { border: 1px solid #ccc; padding: 4pt 8pt; }
  th { background: #f0f0f0; font-weight: bold; }
</style>
</head>
<body>${body}</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Word HTML render error:", message);
    return NextResponse.json({ error: "Render failed", detail: message }, { status: 500 });
  }
}
