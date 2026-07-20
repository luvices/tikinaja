import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.social_analytics.title")} — Metadata Analyser | Tikinaja Tools`,
    description: t("toolCards.social_analytics.desc"),
  };
}

export default async function TikTokStatsPage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.social_analytics.title")}
      description={t("toolCards.social_analytics.desc")}
      badge="Server-side · TikWM"
    >
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">
        {/* URL Input */}
        <div className="flex gap-2">
          <input
            id="tool-tiktok-stats-input"
            type="url"
            placeholder={t("toolPages.soc_ana_input")}
            className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground transition-all placeholder:text-neutral-400"
          />
          <button
            id="btn-analyse-tiktok"
            className="shrink-0 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("toolPages.soc_ana_btn")}
          </button>
        </div>

        {/* Status */}
        <div id="tool-tiktok-stats-status" className="text-sm text-neutral-500 min-h-[20px]"></div>

        {/* Results */}
        <div id="tiktok-stats-results" className="hidden space-y-5">
          {/* Cover + author */}
          <div className="flex gap-4 items-start p-4 rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              id="stats-video-cover"
              src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
              alt="cover"
              className="h-20 w-14 rounded-lg object-cover shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0">
              <p id="stats-creator-name" className="font-semibold text-sm"></p>
              <p id="stats-creator-handle" className="text-xs text-neutral-500 mb-2"></p>
              <p id="stats-caption" className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed"></p>
            </div>
          </div>

          {/* Technical stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "stats-resolution", label: t("toolPages.soc_ana_res") },
              { id: "stats-fps", label: t("toolPages.soc_ana_fps") },
              { id: "stats-bitrate", label: t("toolPages.soc_ana_bitrate") },
              { id: "stats-duration", label: t("toolPages.soc_ana_dur") },
            ].map(({ id, label }) => (
              <div key={id} className="rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 p-3 text-center">
                <p className="text-xs text-neutral-400 mb-1">{label}</p>
                <p id={id} className="font-bold text-sm">—</p>
              </div>
            ))}
          </div>

          {/* File size */}
          <div className="rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 p-3 flex justify-between items-center">
            <span className="text-sm text-neutral-500">{t("toolPages.soc_ana_size")}</span>
            <span id="stats-size" className="font-semibold text-sm">—</span>
          </div>
        </div>
      </div>

      <Script src="/tools-scripts/tiktok-stats-tool.js" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
