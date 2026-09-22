#!/usr/bin/env node
// Usage: npm run new -- "My post title"
import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
  console.error('Usage: npm run new -- "My post title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const date = new Date().toISOString().slice(0, 10);
const file = path.join(process.cwd(), "content", "posts", `${date}-${slug}.mdx`);

if (fs.existsSync(file)) {
  console.error(`Already exists: ${file}`);
  process.exit(1);
}

fs.writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
slug: ${JSON.stringify(slug)}
date: ${JSON.stringify(date)}
summary: ""
tags: []
draft: true
---

Write here.
`,
);

console.log(`Created content/posts/${path.basename(file)}`);
