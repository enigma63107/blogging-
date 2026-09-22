import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-6">
      <Link
        href="/"
        className="font-medium tracking-tight hover:text-[var(--accent)]"
      >
        {site.name}
      </Link>
      <nav className="flex items-center gap-1 text-sm">
        {site.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-2.5 py-1.5 text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
          >
            {item.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
