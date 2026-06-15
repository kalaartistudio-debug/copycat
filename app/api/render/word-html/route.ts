import { NextRequest, NextResponse } from "next/server";
import { visit } from "unist-util-visit";
import { toHtml } from "hast-util-to-html";
import type { Element, Root } from "hast";
import { preprocessAIOutput } from "@/lib/markdown/parse";

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const EX_TO_PX = 8.5;

function exToPx(val: string | undefined): number | null {
  if (!val) return null;
  const m = val.match(/^([\d.]+)ex$/);
  return m ? Math.round(parseFloat(m[1]) * EX_TO_PX) : null;
}

function rehypeSvgToImg() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "svg" || !parent || index == null) return;

      const wEx = node.properties?.width  as string | undefined;
      const hEx = node.properties?.height as string | undefined;
      const wPx = exToPx(wEx);
      const hPx = exToPx(hEx);

      if (wPx) node.properties = { ...node.properties, width: `${wPx}`, height: `${hPx ?? wPx}` };

      const serialised = toHtml(node, { space: "svg", allowDangerousHtml: true });
      const b64 = Buffer.from(serialised).toString("base64");
      const src = `data:image/svg+xml;base64,${b64}`;

      const mjStyle = (node.properties?.style as string | undefined) ?? "";
      const vaMatch = mjStyle.match(/vertical-align:\s*([-\d.]+)ex/);
      const vaPx = vaMatch ? Math.round(parseFloat(vaMatch[1]) * EX_TO_PX) : 0;

      const styleStr = [
        wPx  ? `width:${wPx}px`           : "",
        hPx  ? `height:${hPx}px`          : "",
        vaPx ? `vertical-align:${vaPx}px` : "vertical-align:middle",
      ].filter(Boolean).join(";");

      const img: Element = {
        type: "element",
        tagName: "img",
        properties: {
          src,
          alt: "equation",
          width:  wPx ? String(wPx) : undefined,
          height: hPx ? String(hPx) : undefined,
          style: styleStr,
        },
        children: [],
      };

      parent.children[index] = img;
    });
  };
}

// Runtime-only importer. The specifier is a variable inside a string-built
// function, so NO bundler (Turbopack or webpack) can statically analyse it.
// This prevents rehype-mathjax/MathJax from being executed during the build's
// "collect page data" phase, where MathJax's loader crashes outside a request.
const importRuntime = new Function("m", "return import(m)") as <T = unknown>(m: string) => Promise<T>;

export async function POST(req: NextRequest) {
  try {
    const { markdown } = await req.json();
    if (!markdown) {
      return NextResponse.json({ error: "Markdown is required" }, { status: 400 });
    }

    const [
      { unified },
      { default: remarkParse },
      { default: remarkGfm },
      { default: remarkMath },
      { default: remarkRehype },
      { default: rehypeMathjaxSvg },
      { default: rehypeStringify },
    ] = await Promise.all([
      import("unified"),
      import("remark-parse"),
      import("remark-gfm"),
      import("remark-math"),
      import("remark-rehype"),
      importRuntime<{ default: () => (tree: Root) => void }>("rehype-mathjax/svg"),
      import("rehype-stringify"),
    ]);

    const preprocessed = preprocessAIOutput(markdown);

    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype)
      .use(rehypeMathjaxSvg)
      .use(rehypeSvgToImg)
      .use(rehypeStringify)
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
  img { vertical-align: middle; }
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
