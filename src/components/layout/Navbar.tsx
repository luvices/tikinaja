"use client";

import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-background/80 backdrop-blur-md dark:border-neutral-800">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Tikinaja"
            width={32}
            height={32}
            className="rounded-md transition-transform group-hover:scale-105"
          />
          <span className="text-xl font-bold tracking-tight">Tikinaja</span>
        </Link>
        <div className="ml-auto">
          <nav className="flex items-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-foreground"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/tools"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-foreground"
            >
              {t("nav.tools")}
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-foreground"
            >
              {t("nav.about")}
            </Link>
            <LanguageSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}
