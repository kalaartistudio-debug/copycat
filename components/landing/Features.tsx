import { Calculator, Code2, Table, FileDown, Wand2, Zap } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Math & Equations",
    description:
      "Handles ChatGPT-style bare LaTeX, \\[...\\] blocks, and inline \\(...\\). Renders as native Word equations.",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    border: "border-violet-100 dark:border-violet-900/40",
  },
  {
    icon: Code2,
    title: "Code Blocks",
    description:
      "Syntax-highlighted code with coloured backgrounds exported to Word — just like in your IDE.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
    border: "border-indigo-100 dark:border-indigo-900/40",
  },
  {
    icon: Table,
    title: "Tables & Lists",
    description:
      "Clean borders, alternating row colours, and proper bullet nesting that survives export.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-100 dark:border-blue-900/40",
  },
  {
    icon: Wand2,
    title: "AI Output Repair",
    description:
      "Fixes smart quotes, broken code fences, invisible characters, and double-spaced tables automatically.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    border: "border-purple-100 dark:border-purple-900/40",
  },
  {
    icon: FileDown,
    title: "One-click Export",
    description:
      "Download a polished .docx file in seconds — no sign-up, no waiting, fully client-side.",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    border: "border-sky-100 dark:border-sky-900/40",
  },
  {
    icon: Zap,
    title: "Live Preview",
    description:
      "See exactly how your document looks as you type, with a 300 ms debounced render.",
    color: "text-fuchsia-500",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
    border: "border-fuchsia-100 dark:border-fuchsia-900/40",
  },
];

export function Features() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Everything AI output breaks, we fix
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          No more copying equations manually or wrestling with Word styles.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {features.map(({ icon: Icon, title, description, color, bg, border }) => (
          <div
            key={title}
            className={`rounded-xl border ${border} ${bg} p-6 transition-shadow hover:shadow-md hover:shadow-primary/6`}
          >
            <div className={`w-10 h-10 rounded-lg bg-white dark:bg-card flex items-center justify-center mb-4 shadow-sm border ${border}`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <h3 className="font-semibold text-base mb-1.5">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
