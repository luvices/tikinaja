"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="w-full border-t border-neutral-200 py-6 dark:border-neutral-800">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-neutral-500 leading-loose md:text-left">
          &copy; {new Date().getFullYear()} Tikinaja. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/tools" className="text-sm text-neutral-500 hover:text-foreground transition-colors">
            {t("nav.tools")}
          </Link>
          <Link href="/about" className="text-sm text-neutral-500 hover:text-foreground transition-colors">
            {t("nav.about")}
          </Link>
        </div>
      </div>
    </footer>
  );
}

