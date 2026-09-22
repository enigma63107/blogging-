import Link from "next/link";
import { formatDate, type Post } from "@/lib/posts";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-[var(--muted)]">Nothing published here yet.</p>;
  }

  return (
    <ul className="divide-y divide-[var(--line)]">
      {posts.map((post) => (
        <li key={post.slug} className="py-6 first:pt-0">
          <article>
            <h2 className="text-lg font-medium tracking-tight">
              <Link
                href={`/blog/${post.slug}`}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {post.title}
                {post.draft && (
                  <span className="ml-2 rounded border border-[var(--line)] px-1.5 py-0.5 align-middle text-[0.65rem] tracking-wide text-[var(--muted)] uppercase">
                    Draft
                  </span>
                )}
              </Link>
            </h2>
            {post.summary && (
              <p className="mt-1.5 text-[var(--muted)]">{post.summary}</p>
            )}
            <p className="mt-2 flex flex-wrap items-center gap-x-2 text-sm text-[var(--muted)]">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
              {post.tags.length > 0 && (
                <>
                  <span aria-hidden>·</span>
                  <span className="flex gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                        className="hover:text-[var(--ink)]"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </span>
                </>
              )}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}
