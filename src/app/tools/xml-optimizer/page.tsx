import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.xml_optimizer.title")} — Alight Motion | Tikinaja Tools`,
    description: t("toolCards.xml_optimizer.desc"),
  };
}

export default async function FiveMbGeneratorPage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.xml_optimizer.title")}
      description={t("toolCards.xml_optimizer.desc")}
      badge="Client-side · Alight Motion"
    >
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">
        {/* Drop area */}
        <div>
          <input id="tool-fivemb-input" type="file" accept=".xml" className="hidden" />
          <div
            id="tool-fivemb-drop"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-10 text-center cursor-pointer transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div id="tool-fivemb-inner" className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-2xl">📄</div>
              <p className="font-medium text-sm">{t("toolPages.drag_drop_xml")}</p>
              <p className="text-xs text-neutral-400">{t("toolPages.xml_opt_drop_sub")}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div id="tool-fivemb-status" className="text-sm min-h-[20px]"></div>

        {/* Layer selector — shown after file loaded */}
        <div id="tool-fivemb-layers-container" className="hidden space-y-4">
          {/* Filter tabs */}
          <div id="tool-fivemb-filter-tabs" className="flex gap-2 flex-wrap"></div>

          {/* Select/Deselect buttons */}
          <div className="flex gap-2">
            <button
              id="tool-fivemb-select-all"
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              Pilih Semua
            </button>
            <button
              id="tool-fivemb-deselect-all"
              className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              Hapus Pilihan
            </button>
          </div>

          {/* Layer list */}
          <div id="tool-fivemb-layers-list" className="space-y-2 max-h-80 overflow-y-auto rounded-xl border border-neutral-100 dark:border-neutral-900 p-3"></div>

          {/* Export button */}
          <button
            id="tool-fivemb-btn-export"
            className="w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Export XML (&lt;5MB)
          </button>
        </div>
      </div>

      <Script src="/tools-scripts/fivemb-generator.js" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
