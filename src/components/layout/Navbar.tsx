import Link from "next/link";
import { Download } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-background/80 backdrop-blur-md dark:border-neutral-800">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background transition-transform group-hover:scale-105">
            <Download className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Tikinaja</span>
        </Link>
        <div className="ml-auto">
          <nav className="flex gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-foreground"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
