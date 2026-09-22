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
      <p>Write a few paragraphs here about who you are and what you work on.</p>
    </div>
  );
}
