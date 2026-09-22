"use client";

import { useRef, useState, type ComponentPropsWithoutRef } from "react";

export function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied (insecure origin, permissions policy).
      // Silently leaving the button idle is better than throwing at the reader.
    }
  }

  return (
    <div className="code-block group relative">
      <pre {...props} ref={ref} />
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute top-2.5 right-2.5 rounded-md border border-[var(--line)] bg-[var(--paper)] px-2 py-1 font-sans text-xs text-[var(--muted)] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[var(--ink)] focus-visible:opacity-100"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
