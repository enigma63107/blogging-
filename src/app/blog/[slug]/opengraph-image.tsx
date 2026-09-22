import { ImageResponse } from "next/og";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Post preview";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// One social preview card per post, rendered at build time. Without this every
// link you share anywhere falls back to a bare URL.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fbfbfd",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#6b7280" }}>
        {site.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 68,
          lineHeight: 1.15,
          fontWeight: 700,
          color: "#18181b",
          letterSpacing: "-0.02em",
        }}
      >
        {post?.title ?? site.title}
      </div>
      <div style={{ display: "flex", fontSize: 26, color: "#6b7280" }}>
        {post
          ? `${formatDate(post.date)} · ${post.readingMinutes} min read`
          : ""}
      </div>
    </div>,
    size,
  );
}
