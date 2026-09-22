import Link from "next/link";
import type { Post } from "@/lib/posts";

function NavLink({
  post,
  direction,
}: {
  post: Post;
  direction: "older" | "newer";
}) {
  const alignment = direction === "older" ? "text-left" : "sm:text-right";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex-1 rounded-lg border border-[var(--line)] px-4 py-3 transition-colors hover:border-[var(--accent)] ${alignment}`}
    >
      <span className="block text-xs tracking-wide text-[var(--muted)] uppercase">
        {direction === "older" ? "← Older" : "Newer →"}
      </span>
      <span className="mt-1 block text-sm font-medium transition-colors group-hover:text-[var(--accent)]">
        {post.title}
      </span>
    </Link>
  );
}

export function PostNav({ older, newer }: { older?: Post; newer?: Post }) {
  if (!older && !newer) return null;

  return (
    <nav
      aria-label="Other posts"
      className="mt-10 flex flex-col gap-3 sm:flex-row"
    >
      {older ? (
        <NavLink post={older} direction="older" />
      ) : (
        <div className="flex-1" />
      )}
      {newer ? (
        <NavLink post={newer} direction="newer" />
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
