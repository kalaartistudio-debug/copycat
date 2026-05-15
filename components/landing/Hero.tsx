import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { HeroDemo } from "./HeroDemo";

export function Hero() {
  return (
    <section className="container mx-auto px-6 pt-20 pb-20 text-center">
      {/* Eyebrow */}
      <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-5">
        ChatGPT · Claude · Gemini
      </p>

      {/* Headline */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.06] mb-5">
        Paste AI markdown.
        <br />
        <span className="bg-gradient-to-r from-primary via-violet-500 to-indigo-400 bg-clip-text text-transparent">
          Download a clean doc.
        </span>
      </h1>

      {/* Sub-headline */}
      <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
        Equations, code blocks, and tables — all formatted correctly for Word.
        No cleanup. No reformatting. Just paste and export.
      </p>

      {/* CTA */}
      <Link href="/editor">
        <Button
          size="lg"
          className="text-base px-8 h-12 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
        >
          Try it free
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>

      {/* Live demo */}
      <HeroDemo />
    </section>
  );
}
