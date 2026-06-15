import { preprocessAIOutput } from "./parse";
import type { DocxOptions } from "remark-docx";

// No page-break, compact sizes. All sizes in half-points (24 = 12pt, 28 = 14pt, etc.)
const noBreak = { pageBreakBefore: false, keepNext: false };

const docxOptions: DocxOptions = {
  thematicBreak: "line",
  styles: {
    default: {
      document: {
        run: { size: 26, font: "Calibri" },
        paragraph: { spacing: { after: 120 } },
      },
      title: {
        run: { size: 36, bold: true, color: "1F2937" },
        paragraph: { ...noBreak, spacing: { before: 240, after: 160 } },
      },
      heading1: {
        run: { size: 30, bold: true, color: "1F2937" },
        paragraph: { ...noBreak, spacing: { before: 280, after: 120 } },
      },
      heading2: {
        run: { size: 28, bold: true, color: "374151" },
        paragraph: { ...noBreak, spacing: { before: 240, after: 100 } },
      },
      heading3: {
        run: { size: 26, bold: true, color: "4B5563" },
        paragraph: { ...noBreak, spacing: { before: 200, after: 80 } },
      },
      heading4: {
        run: { size: 26, bold: true, italics: true, color: "4B5563" },
        paragraph: { ...noBreak, spacing: { before: 160, after: 80 } },
      },
      heading5: {
        run: { size: 26, bold: false, italics: true, color: "6B7280" },
        paragraph: { ...noBreak, spacing: { before: 120, after: 60 } },
      },
    },
  } as DocxOptions["styles"],
  // latexPlugin loaded lazily inside generateDocxBuffer
  plugins: [],
};

export async function generateDocxBuffer(markdown: string): Promise<ArrayBuffer> {
  try {
    // Lazy imports — keep remark-docx and @mathjax/src out of module-level scope
    // so Next.js build analysis never executes them (MathJax fails outside request context).
    const [
      { unified },
      { default: remarkParse },
      { default: remarkGfm },
      { default: remarkMath },
      { default: remarkDocx },
      { latexPlugin },
    ] = await Promise.all([
      import(/* webpackIgnore: true */ /* turbopackIgnore: true */ "unified"),
      import(/* webpackIgnore: true */ /* turbopackIgnore: true */ "remark-parse"),
      import(/* webpackIgnore: true */ /* turbopackIgnore: true */ "remark-gfm"),
      import(/* webpackIgnore: true */ /* turbopackIgnore: true */ "remark-math"),
      import(/* webpackIgnore: true */ /* turbopackIgnore: true */ "remark-docx"),
      import(/* webpackIgnore: true */ /* turbopackIgnore: true */ "remark-docx/plugins/latex"),
    ]);

    const preprocessed = preprocessAIOutput(markdown);

    const file = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkDocx, { ...docxOptions, plugins: [latexPlugin()] })
      .process(preprocessed);

    return (await file.result) as ArrayBuffer;
  } catch (err) {
    const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    console.error("[generateDocxBuffer] error:", err);
    throw new Error(msg);
  }
}

export function saveBufferAsDocx(buffer: ArrayBuffer, filename: string) {
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
