import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

interface ToolbarProps {
  onExportDocx?: () => void;
  isExportingDocx?: boolean;
}

export function Toolbar({ onExportDocx, isExportingDocx = false }: ToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-card/80 backdrop-blur-sm">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="w-6 h-6 rounded bg-primary flex items-center justify-center shadow-sm group-hover:shadow-primary/30 transition-shadow">
          <span className="text-primary-foreground font-black text-[10px]">C</span>
        </div>
        <span className="font-bold text-base tracking-tight">CopyCit</span>
      </Link>

      {/* Panel labels — hidden on small screens */}
      <div className="hidden md:flex items-center gap-0 text-xs text-muted-foreground font-medium select-none">
        <span className="px-4 py-1 rounded-l-full border border-border bg-muted/50">
          Markdown
        </span>
        <span className="px-4 py-1 rounded-r-full border border-border border-l-0 bg-muted/50">
          Preview
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Button
          size="sm"
          onClick={onExportDocx}
          disabled={!onExportDocx || isExportingDocx}
          className="h-8 px-4 rounded-full shadow-sm shadow-primary/20 hover:shadow-primary/30 transition-shadow"
        >
          {isExportingDocx ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <FileDown className="w-3.5 h-3.5 mr-1.5" />
          )}
          Export DOCX
        </Button>
      </div>
    </div>
  );
}
