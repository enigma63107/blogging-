import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-3xl px-5 py-10 text-sm text-[var(--muted)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-6">
        <p>
          © {new Date().getFullYear()} {site.author.name}
        </p>
        <div className="flex gap-4">
          <Link href="/rss.xml" className="hover:text-[var(--ink)]">
            RSS
          </Link>
          {site.social.github && (
            <a
              href={site.social.github}
              className="hover:text-[var(--ink)]"
              rel="me noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
