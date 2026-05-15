"use client";

import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-full overflow-hidden bg-card">
      <CodeMirror
        value={value}
        height="100%"
        theme={mounted && resolvedTheme === "light" ? "light" : oneDark}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages })
        ]}
        onChange={(val) => onChange(val)}
        className="h-full text-base [&>.cm-editor]:h-full"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
        }}
      />
    </div>
  );
}
