import "katex/dist/katex.min.css";
import "highlight.js/styles/atom-one-dark.css";

interface PreviewProps {
  html: string;
}

export function Preview({ html }: PreviewProps) {
  return (
    <div className="h-full overflow-y-auto px-8 py-6 bg-background text-foreground">
      <style dangerouslySetInnerHTML={{__html: `
        .markdown-preview {
          max-width: 720px;
          margin: 0 auto;
          font-size: 0.9375rem;
          line-height: 1.75;
        }

        .markdown-preview h1 {
          font-size: 1.6rem; font-weight: 700;
          margin-top: 2rem; margin-bottom: 0.75rem;
          color: var(--tw-prose-headings, #111827);
          letter-spacing: -0.02em;
        }
        .markdown-preview h2 {
          font-size: 1.25rem; font-weight: 700;
          margin-top: 1.75rem; margin-bottom: 0.6rem;
          color: var(--tw-prose-headings, #1f2937);
          letter-spacing: -0.01em;
        }
        .markdown-preview h3 {
          font-size: 1.05rem; font-weight: 600;
          margin-top: 1.5rem; margin-bottom: 0.5rem;
          color: #374151;
        }
        .markdown-preview h4 {
          font-size: 0.9375rem; font-weight: 600;
          margin-top: 1.25rem; margin-bottom: 0.4rem;
          color: #4b5563;
        }

        .markdown-preview p { margin-bottom: 1rem; }

        .markdown-preview strong {
          font-weight: 700;
          color: oklch(0.52 0.22 264);
        }

        /* Tables */
        .markdown-preview table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
          font-size: 0.875rem;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 0 0 1px hsl(var(--border));
        }
        .markdown-preview th, .markdown-preview td {
          border: 1px solid hsl(var(--border));
          padding: 0.6em 0.9em;
          text-align: left;
        }
        .markdown-preview th {
          background-color: oklch(0.52 0.22 264 / 0.08);
          font-weight: 600;
          color: oklch(0.38 0.15 264);
        }
        .markdown-preview tr:nth-child(even) td {
          background-color: oklch(0.52 0.22 264 / 0.03);
        }

        /* Code */
        .markdown-preview pre {
          padding: 1.1em 1.25em;
          border-radius: 0.625rem;
          background-color: #21252b !important;
          overflow-x: auto;
          margin: 1.25em 0;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        .markdown-preview code {
          font-family: var(--font-mono, 'Fira Code', monospace);
          font-size: 0.85em;
        }
        .markdown-preview :not(pre) > code {
          background-color: oklch(0.52 0.22 264 / 0.08);
          color: oklch(0.45 0.20 264);
          padding: 0.15em 0.4em;
          border-radius: 0.3em;
          font-size: 0.85em;
          border: 1px solid oklch(0.52 0.22 264 / 0.15);
        }

        /* Math */
        .markdown-preview .katex-display {
          margin: 1.25em 0;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 0.75em 1em;
          background-color: oklch(0.52 0.22 264 / 0.04);
          border-left: 3px solid oklch(0.52 0.22 264 / 0.35);
          border-radius: 0 0.375rem 0.375rem 0;
        }

        /* Lists */
        .markdown-preview ul, .markdown-preview ol {
          margin: 0.5em 0 1em 0;
          padding-left: 1.75em;
        }
        .markdown-preview ul { list-style-type: disc; }
        .markdown-preview ol { list-style-type: decimal; }
        .markdown-preview li { margin-bottom: 0.35em; line-height: 1.7; }
        .markdown-preview li > ul, .markdown-preview li > ol { margin: 0.2em 0; }

        /* Misc */
        .markdown-preview hr {
          border: none;
          border-top: 1.5px solid hsl(var(--border));
          margin: 2em 0;
        }

        .markdown-preview blockquote {
          border-left: 3px solid oklch(0.52 0.22 264 / 0.4);
          padding: 0.5em 1em;
          margin: 1em 0;
          background-color: oklch(0.52 0.22 264 / 0.04);
          border-radius: 0 0.375rem 0.375rem 0;
          color: hsl(var(--muted-foreground));
        }

        .markdown-preview a {
          color: oklch(0.52 0.22 264);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .markdown-preview a:hover { color: oklch(0.45 0.24 264); }
      `}} />
      <div
        className="markdown-preview"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
