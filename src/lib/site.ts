export const site = {
  name: "Dhruv's Blog",
  title: "Dhruv's Blog",
  description: "Notes on building things, and whatever else is on my mind.",
  // Change this to your real domain before deploying — RSS, sitemap and
  // Open Graph tags all build absolute URLs from it.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  author: {
    name: "Dhruv",
    email: "",
  },
  nav: [
    { href: "/blog", label: "Writing" },
    { href: "/about", label: "About" },
  ],
  social: {
    github: "",
    x: "",
  },
  postsPerPage: 10,
} as const;
