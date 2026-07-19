export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 py-6 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-neutral-500 leading-loose md:text-left">
          &copy; {new Date().getFullYear()} Tikinaja. All rights reserved.
        </p>
        <p className="text-center text-sm text-neutral-500 md:text-right">
          Built for fast, watermark-free downloads.
        </p>
      </div>
    </footer>
  );
}
