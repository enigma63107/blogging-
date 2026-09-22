import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostList } from "@/components/post-list";

type Props = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: tag.toLowerCase() }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `Posts tagged ${decoded}.`,
    alternates: { canonical: `/tags/${tag}` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  if (posts.length === 0) notFound();

  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight">#{decoded}</h1>
      <p className="mt-2 text-[var(--muted)]">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
      <div className="mt-10">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
