import { NextRequest, NextResponse } from "next/server";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeMathjaxSvg from "rehype-mathjax/svg";
import rehypeStringify from "rehype-stringify";
import { preprocessAIOutput } from "@/lib/markdown/parse";

export const maxDuration = 30;

/**
 * Renders markdown to HTML where every equation is an inline SVG image.
 * Inline SVGs paste correctly into Word, ONLYOFFICE, LibreOffice, and Google Docs
 * because they are treated as self-contained vector images — no CSS or fonts needed.
 */
export async function POST(req: NextRequest) {
  try {
    const { markdown } = await req.json();
    if (!markdown) {
      return NextResponse.json({ error: "Markdown is required" }, { status: 400 });
    }

    const preprocessed = preprocessAIOutput(markdown);

    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeMathjaxSvg)   // equations → inline SVG (no external fonts/CSS)
      .use(rehypeStringify)
      .process(preprocessed);

    const body = String(file);

    // Wrap in a minimal HTML document — office apps use this as the paste root
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 13pt; }
  h1 { font-size: 20pt; font-weight: bold; margin: 16pt 0 8pt; }
  h2 { font-size: 16pt; font-weight: bold; margin: 14pt 0 6pt; }
  h3 { font-size: 14pt; font-weight: bold; margin: 12pt 0 6pt; }
  p  { margin: 6pt 0; line-height: 1.5; }
  ul, ol { margin: 4pt 0 4pt 24pt; }
  li { margin: 2pt 0; }
  mjx-container { display: inline-block; vertical-align: middle; }
  mjx-container[display="true"] { display: block; margin: 8pt auto; text-align: center; }
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
