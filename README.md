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

| Field     | Required | Notes                                                       |
| --------- | -------- | ----------------------------------------------------------- |
| `title`   | yes      | Build fails without it                                       |
| `date`    | yes      | `YYYY-MM-DD`                                                 |
| `slug`    | no       | Defaults from the filename. Set it to keep a URL stable      |
| `summary` | no       | Used in the archive, the feed and social previews            |
| `tags`    | no       | Array of strings; tag pages are generated from these         |
| `updated` | no       | Shown on the post and used in the sitemap                    |
| `draft`   | no       | `true` hides the post from production builds                 |

Drafts render locally (`npm run dev`) and are excluded from the production
build, archive, sitemap and RSS feed — so half-finished posts are safe to push.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000, drafts visible
npm run build   # production build, drafts excluded
```

## Before deploying

Edit `src/lib/site.ts` — the name, description, author and especially `url`,
which every absolute link (RSS, sitemap, Open Graph) is built from. Or set
`NEXT_PUBLIC_SITE_URL` in the host's environment.

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

Beyond normal Markdown and GFM tables:

- `<Callout>` and `<Callout type="warn">`
- Code fences take `title="path"` and line highlights: ` ```ts title="a.ts" {3} `

See `content/posts/2026-09-20-markdown-reference.mdx` for a live reference.
