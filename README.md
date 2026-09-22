# Blog

A static blog built with Next.js. Posts are MDX files in this repo — writing a
post is adding a file and pushing it.

## Writing a post

```bash
npm run new -- "My post title"
```

That creates `content/posts/YYYY-MM-DD-my-post-title.mdx` with frontmatter
filled in and `draft: true`. Write, set `draft: false`, commit, push.

### Frontmatter

| Field     | Required | Notes                                                   |
| --------- | -------- | ------------------------------------------------------- |
| `title`   | yes      | Build fails without it                                  |
| `date`    | yes      | `YYYY-MM-DD`                                            |
| `slug`    | no       | Defaults from the filename. Set it to keep a URL stable |
| `summary` | no       | Used in the archive, the feed and social previews       |
| `tags`    | no       | Array of strings; tag pages are generated from these    |
| `updated` | no       | Shown on the post and used in the sitemap               |
| `draft`   | no       | `true` hides the post from production builds            |

Drafts render locally (`npm run dev`) and are excluded from the production
build, archive, sitemap and RSS feed — so half-finished posts are safe to push.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000, drafts visible
npm run build   # production build, drafts excluded
npm run check   # typecheck + lint + build, same as CI
npm run format  # Prettier
```

Node 22 (see `.nvmrc`). CI runs typecheck, lint, format check and build on every
push, so a post with a bad date or a duplicate slug fails there rather than on
the deploy.

## Deploying

The site is fully static, so any host works. Vercel is the least friction:

1. Import this repo at [vercel.com/new](https://vercel.com/new). The framework,
   build command and output directory are all detected — accept the defaults.
2. Add an environment variable `NEXT_PUBLIC_SITE_URL` set to the final domain
   (for example `https://dhruv.dev`), for Production and Preview.
3. Deploy. Every push to the default branch redeploys; every pull request gets
   its own preview URL.

Custom domain: add it under Project → Settings → Domains and point the DNS
record Vercel shows you at it.

**`NEXT_PUBLIC_SITE_URL` is the one setting that matters.** RSS, the sitemap,
canonical tags and social previews all build absolute URLs from it. Without it
the site falls back to `https://example.com` and those links point nowhere.

Also edit `src/lib/site.ts` for the site name, description, nav and social
links.

## What is where

```
content/posts/          posts, one .mdx file each
src/lib/site.ts         site name, URL, nav, author
src/lib/posts.ts        reads and validates posts
src/app/                routes
src/components/         header, footer, theme toggle, MDX components
scripts/new-post.mjs    npm run new
```

## What it does already

Static generation for every route, dark mode that follows the system, RSS at
`/rss.xml`, `sitemap.xml`, `robots.txt`, JSON-LD on posts, a generated social
preview image per post, syntax highlighting with copy buttons, tag pages and
heading anchor links.

## MDX extras

Posts are MDX, so everything in GitHub-flavored Markdown works — headings,
lists, tables, block quotes, footnotes — plus:

**Callouts**

```mdx
<Callout>
  A note, for an aside that would break the flow as a paragraph.
</Callout>
<Callout type="warn">
  A warning. Use sparingly or people stop reading them.
</Callout>
```

**Code blocks** take an optional title and highlighted lines:

````mdx
```ts title="src/lib/posts.ts" {3}
export function getPost(slug: string) {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug); // this line is highlighted
}
```
````

Headings automatically get anchor links, so readers can link to a section.

Anything beyond this: write a React component in `src/components/` and add it to
the `components` map in `src/components/mdx.tsx`, then use it directly in a post.
