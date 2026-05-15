import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/landing/Footer";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Subtle background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/8 blur-[140px] pointer-events-none" />
      <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      {/* Nav */}
      <header className="relative z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-black text-xs">C</span>
            </div>
            <span className="font-bold text-lg tracking-tight">CopyCit</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/editor"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Editor
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative z-10">
        <Hero />
        <Features />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
