import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.author.name}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="prose-article prose dark:prose-invert">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>
      <p>
        Replace this with a few paragraphs about yourself — what you work on,
        what you write about here, and how people can reach you.
      </p>
      <p>
        This page is a normal React component rather than a post, so it will not
        show up in the archive or the feed. Edit it at{" "}
        <code>src/app/about/page.tsx</code>.
      </p>
    </div>
  );
}
