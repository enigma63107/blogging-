import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: "Writing",
  description: "Everything published, newest first.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">Writing</h1>
      <p className="mt-2 text-[var(--muted)]">
        {posts.length} {posts.length === 1 ? "post" : "posts"}, newest first.
      </p>

      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              {tag} <span className="opacity-60">{count}</span>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
