import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  badge?: string;
  children: React.ReactNode;
}

export function ToolPageLayout({ title, description, badge, children }: ToolPageLayoutProps) {
  return (
    <div className="flex flex-col items-center px-4 py-16 md:py-24">
      <div className="w-full max-w-3xl">
        {/* Back link */}
        <Link
          href="/tools"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Semua Tools
        </Link>

        {/* Header */}
        <div className="mb-8">
          {badge && (
            <span className="inline-block mb-3 text-xs font-medium px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500">
              {badge}
            </span>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-2">{title}</h1>
          <p className="text-neutral-500 leading-relaxed max-w-xl">{description}</p>
        </div>

        {/* Tool content */}
        <div>{children}</div>
      </div>
    </div>
  );
}
