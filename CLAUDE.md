# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

A static personal blog. Next.js 16 (App Router), Tailwind v4, MDX posts stored
as files in the repo. There is no database, no CMS and no server-rendered
route — every page is generated at build time.

## Commands

```bash
npm run dev          # local dev server, drafts visible
npm run check        # typecheck + lint + build — run this before committing
npm run format       # Prettier
npm run new -- "Title"  # scaffold a post file
```

`npm run check` plus `npm run format:check` is exactly what CI runs. There is no
test suite: correctness here is types, lint and a successful build, and the
build validates every post's frontmatter.

## Architecture

- `content/posts/*.mdx` — one file per post. Frontmatter is parsed and
  **validated** in `src/lib/posts.ts`; a missing title or an unparseable date
  throws and fails the build on purpose.
- `src/lib/posts.ts` — the only module that touches the filesystem. Everything
  reading posts goes through it.
- `src/lib/site.ts` — site name, description, author, nav, social. Anything
  configurable belongs here, not hardcoded in a component.
- `src/app/` — routes. Post and tag pages use `generateStaticParams`.
- `src/components/mdx.tsx` — the MDX pipeline and the component map available
  inside posts.

## Conventions

- **Slugs come from frontmatter, not filenames.** Renaming a file must never
  change a live URL. Preserve this.
- **`draft: true` posts are excluded from production** but render in dev. Any
  new listing, feed or sitemap must respect this, and the filter lives in
  `getAllPosts()` — do not re-implement it per call site.
- **Colors come from CSS variables** (`--ink`, `--muted`, `--paper`, `--line`,
  `--accent`, `--code-bg`) defined in `src/app/globals.css` and redefined under
  `.dark`. Never hardcode a hex value in a component; it will break dark mode.
- **Article typography lives in `.prose-article`**, not in per-component
  classes. The ~68ch measure and 19px body size are deliberate — changing them
  changes readability, so do it knowingly.
- `@tailwindcss/typography` sets some defaults (notably `--tw-prose-pre-bg`)
  that fight the theme tokens. Override them in `.prose-article` rather than
  patching individual elements.
- Server components by default. `"use client"` only where genuinely needed
  (currently the theme toggle and the code copy button).

## Adding a component for use inside posts

Write it in `src/components/`, then register it in the `components` map in
`src/components/mdx.tsx`. It is then available in any `.mdx` file with no
import.

## Verifying visual changes

The build passing does not mean the page looks right — two real CSS bugs
shipped that way. For any change to styling, render the page and look at it in
both light and dark mode before claiming it works.

## Deployment

Static output, deployed on push. `NEXT_PUBLIC_SITE_URL` must be set in the host
environment — RSS, the sitemap, canonical tags and Open Graph images all build
absolute URLs from it, falling back to `https://example.com`.
