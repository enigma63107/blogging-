import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const recent = posts.slice(0, 5);

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight">
          {site.author.name ? `Hi, I'm ${site.author.name}.` : "Hello."}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-[var(--muted)]">
          {site.description}
        </p>
      </section>

      {posts.length > 0 ? (
        <section>
          <h2 className="mb-5 text-sm font-medium tracking-wide text-[var(--muted)] uppercase">
            Recent writing
          </h2>
          <PostList posts={recent} />
          {posts.length > recent.length && (
            <Link
              href="/blog"
              className="mt-8 inline-block text-sm text-[var(--muted)] hover:text-[var(--ink)]"
            >
              All {posts.length} posts →
            </Link>
          )}
        </section>
      ) : (
        // A site with no posts yet should read as deliberate, not broken.
        <section className="rounded-lg border border-dashed border-[var(--line)] px-5 py-8 text-[var(--muted)]">
          <p className="font-medium text-[var(--ink)]">No posts yet.</p>
          <p className="mt-1.5 text-sm">
            Run{" "}
            <code className="rounded bg-[color-mix(in_oklch,var(--line)_45%,transparent)] px-1.5 py-0.5 text-[0.85em]">
              npm run new -- &quot;My first post&quot;
            </code>{" "}
            to start one.
          </p>
        </section>
      )}
    </div>
  );
}
