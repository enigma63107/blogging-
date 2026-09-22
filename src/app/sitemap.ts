import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: site.url, lastModified: new Date(), priority: 1 },
    { url: `${site.url}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${site.url}/about`, priority: 0.5 },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      priority: 0.7,
    })),
    ...getAllTags().map(({ tag }) => ({
      url: `${site.url}/tags/${encodeURIComponent(tag.toLowerCase())}`,
      priority: 0.3,
    })),
  ];
}
