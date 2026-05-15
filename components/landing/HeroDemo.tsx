"use client";

import { useEffect, useState } from "react";
import { parseMarkdownToHtml } from "@/lib/markdown/parse";
import "katex/dist/katex.min.css";

/* Markdown shown in the left pane — deliberately short to fit the card */
const SAMPLE_MD = `# Dividing the Carrier Equations

\\frac{n_n}{n_p}=\\exp\\left(\\frac{E_{Fn}-E_{Fp}}{kT}\\right)

Substituting (E_{Fn}-E_{Fp}=eV_0):

\\frac{n_n}{n_p}=\\exp\\left(\\frac{eV_0}{kT}\\right)

# Taking Natural Logarithm

\\ln\\left(\\frac{n_n}{n_p}\\right)=\\frac{eV_0}{kT}

V_0=\\frac{kT}{e}\\ln\\left(\\frac{n_n}{n_p}\\right)`;

/* Lines to display with syntax colouring in the left pane */
const MD_LINES = SAMPLE_MD.split("\n");

function colourLine(line: string) {
  if (line.startsWith("# "))
    return (
      <span>
        <span className="text-violet-400 font-bold">#</span>
        <span className="text-slate-200 font-semibold">{line.slice(1)}</span>
      </span>
    );
  if (/^\\/.test(line.trim()))
    return <span className="text-sky-300">{line}</span>;
  if (/^\(/.test(line.trim()) || line.includes("Substitut") || line.includes("Taking"))
    return <span className="text-slate-400 italic">{line}</span>;
  return <span className="text-slate-300">{line}</span>;
}

export function HeroDemo() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    parseMarkdownToHtml(SAMPLE_MD).then(setHtml).catch(console.error);
  }, []);

  return (
    <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-border/60 bg-card shadow-2xl shadow-primary/10 overflow-hidden">
      {/* Fake title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e] border-b border-white/8">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="ml-2 flex items-center gap-1.5">
          {/* Brand mark */}
          <div className="w-4 h-4 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-black text-[8px]">C</span>
          </div>
          <span className="text-white/60 text-xs font-medium">CopyCit — Editor</span>
        </div>
        <div className="ml-auto">
          <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium">
            Export DOCX
          </span>
        </div>
      </div>

      {/* Panel labels */}
      <div className="grid grid-cols-2 border-b border-border/40">
        <div className="px-4 py-1.5 bg-slate-900/60 border-r border-border/40">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Markdown</span>
        </div>
        <div className="px-4 py-1.5 bg-white/50 dark:bg-white/5">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Preview</span>
        </div>
      </div>

      {/* Content split */}
      <div className="grid grid-cols-2 min-h-[340px]">
        {/* Left — code editor simulation */}
        <div className="bg-[#1a1b26] border-r border-white/8 p-4 overflow-hidden font-mono text-[11.5px] leading-6">
          <table className="w-full border-separate border-spacing-0">
            <tbody>
              {MD_LINES.map((line, i) => (
                <tr key={i}>
                  <td className="w-7 text-right pr-3 text-slate-600 select-none shrink-0">{i + 1}</td>
                  <td className="whitespace-pre-wrap break-all">{colourLine(line)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right — live rendered preview */}
        <div className="bg-white dark:bg-background overflow-hidden p-5">
          {html ? (
            <>
              <style>{`
                .hero-preview h1 { font-size: 1rem; font-weight: 700; margin: 0 0 0.5rem; color: #111827; letter-spacing: -0.01em; }
                .hero-preview h2 { font-size: 0.875rem; font-weight: 700; margin: 0.75rem 0 0.35rem; color: #1f2937; }
                .hero-preview p  { font-size: 0.8125rem; margin: 0.35rem 0; color: #4b5563; line-height: 1.6; }
                .hero-preview .katex-display {
                  margin: 0.5em 0;
                  overflow-x: auto;
                  padding: 0.5em 0.75em;
                  background: oklch(0.52 0.22 264 / 0.05);
                  border-left: 2.5px solid oklch(0.52 0.22 264 / 0.4);
                  border-radius: 0 0.3rem 0.3rem 0;
                }
                .hero-preview .katex { font-size: 1em; }
              `}</style>
              <div
                className="hero-preview"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
