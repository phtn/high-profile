import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 px-4 py-8 dark:border-neutral-800 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          © {new Date().getFullYear()} High Profile. Crypto payment gateway.
        </span>
        <nav
          className="flex flex-wrap items-center justify-center gap-6"
          aria-label="Footer navigation"
        >
          <Link
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            Status
          </Link>
          <Link
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
