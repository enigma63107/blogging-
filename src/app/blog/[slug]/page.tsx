import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { Mdx } from "@/components/mdx";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Every post becomes static HTML at build time — nothing is computed per request.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: [...post.tags],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // JSON-LD gives search engines the author, dates and headline explicitly
  // rather than making them infer it from the markup.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: site.author.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-10">
        <h1 className="text-[2.1rem] leading-tight font-semibold tracking-tight text-balance">
          {post.title}
        </h1>
        <p className="mt-3 flex flex-wrap items-center gap-x-2 text-sm text-[var(--muted)]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
          {post.updated && (
            <>
              <span aria-hidden>·</span>
              <span>Updated {formatDate(post.updated)}</span>
            </>
          )}
        </p>
      </header>

      <div className="prose-article prose dark:prose-invert">
        <Mdx source={post.content} />
      </div>

      {post.tags.length > 0 && (
        <div className="mt-12 flex flex-wrap gap-2 border-t border-[var(--line)] pt-6">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
              className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)] hover:text-[var(--ink)]"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <nav className="mt-10">
        <Link
          href="/blog"
          className="text-sm text-[var(--muted)] hover:text-[var(--ink)]"
        >
          ← All writing
        </Link>
      </nav>
    </article>
  );
}
