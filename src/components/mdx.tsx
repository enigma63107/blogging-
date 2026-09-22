import Link from "next/link";
import type { ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { CodeBlock } from "@/components/code-block";

function Callout({
  type = "note",
  children,
}: {
  type?: "note" | "warn";
  children: ReactNode;
}) {
  const tone =
    type === "warn"
      ? "border-amber-500/40 bg-amber-500/8"
      : "border-[var(--accent)]/35 bg-[color-mix(in_oklch,var(--accent)_8%,transparent)]";
  return (
    <div className={`my-6 rounded-lg border px-4 py-3 font-sans text-[0.95rem] ${tone}`}>
      {children}
    </div>
  );
}

const components = {
  pre: CodeBlock,
  Callout,
  a: ({ href = "", ...rest }: { href?: string } & Record<string, unknown>) =>
    href.startsWith("/") ? (
      <Link href={href} {...rest} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest} />
    ),
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "append",
                properties: { className: ["heading-anchor"], ariaHidden: true, tabIndex: -1 },
                content: { type: "text", value: "#" },
              },
            ],
            [
              rehypePrettyCode,
              {
                // Both palettes are emitted as CSS variables on each token, so
                // switching themes never re-renders or duplicates the markup.
                theme: { light: "github-light", dark: "github-dark-dimmed" },
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  );
}
