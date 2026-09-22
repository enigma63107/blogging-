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
    </div>
  );
}
