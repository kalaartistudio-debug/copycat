import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-black text-[10px]">C</span>
          </div>
          <span className="font-medium text-foreground">CopyCit</span>
          <span>&mdash;</span>
          <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/editor" className="hover:text-foreground transition-colors">
            Editor
          </Link>
        </div>
      </div>
    </footer>
  );
}
