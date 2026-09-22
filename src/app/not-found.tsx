import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Not found</h1>
      <p className="mt-3 text-[var(--muted)]">
        That page does not exist, or the post was renamed.
      </p>
      <Link
        href="/blog"
        className="mt-6 inline-block text-sm text-[var(--muted)] hover:text-[var(--ink)]"
      >
        ← All writing
      </Link>
    </div>
  );
}
