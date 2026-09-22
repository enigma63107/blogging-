import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  summary: string;
  tags: string[];
  cover?: string;
  draft: boolean;
  readingMinutes: number;
  content: string;
};

/**
 * Frontmatter is validated here rather than trusted. A post with a bad date or
 * a missing title fails the build instead of shipping broken — which is the
 * whole reason posts live in the repo.
 */
function parse(fileName: string): Post {
  const filePath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const fail = (msg: string): never => {
    throw new Error(`content/posts/${fileName}: ${msg}`);
  };

  if (typeof data.title !== "string" || !data.title.trim()) {
    fail("`title` is required");
  }
  if (typeof data.date !== "string" && !(data.date instanceof Date)) {
    fail("`date` is required (use YYYY-MM-DD)");
  }

  const date = new Date(data.date);
  if (Number.isNaN(date.getTime())) fail(`\`date\` is not a valid date`);

  // The slug is frontmatter-first on purpose: retitling or renaming a file
  // should never change a live URL and cost you the search ranking.
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? data.slug.trim()
      : fileName.replace(/\.mdx?$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");

  return {
    slug,
    title: data.title,
    date: date.toISOString(),
    updated: data.updated ? new Date(data.updated).toISOString() : undefined,
    summary: typeof data.summary === "string" ? data.summary : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: typeof data.cover === "string" ? data.cover : undefined,
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    content,
  };
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  if (!fs.existsSync(POSTS_DIR)) return [];

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parse)
    // Drafts are visible while you write locally, never in production.
    .filter((p) => !p.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));

  const seen = new Set<string>();
  for (const p of posts) {
    if (seen.has(p.slug)) {
      throw new Error(`Duplicate post slug: "${p.slug}"`);
    }
    seen.add(p.slug);
  }

  cache = posts;
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/**
 * Posts are sorted newest-first, so the *next* entry in the list is the older
 * post. Named from the reader's point of view rather than the array's.
 */
export function getAdjacentPosts(slug: string): {
  older?: Post;
  newer?: Post;
} {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
