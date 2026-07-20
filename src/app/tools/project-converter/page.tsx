import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.project_converter.title")} — Beatmark Converter | Tikinaja Tools`,
    description: t("toolCards.project_converter.desc"),
  };
}

export default async function AeToAmPage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.project_converter.title")}
      description={t("toolCards.project_converter.desc")}
      badge="Client-side · AE → AM"
    >
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">
        {/* Drop area */}
        <div>
          <input id="tool-ae-am-input" type="file" accept=".xml,.aepx" className="hidden" />
          <div
            id="tool-ae-am-drop"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-10 text-center cursor-pointer transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-2xl">🎞️</div>
            <div>
              <p className="font-medium text-sm">{t("toolPages.drag_drop_ae")}</p>
              <p className="text-xs text-neutral-400 mt-1">{t("toolPages.proj_conv_drop_sub")}</p>
            </div>
          </div>
        </div>

        {/* Config section — shown after file parsed */}
        <div id="tool-ae-am-config" className="hidden space-y-4">
          <h3 className="text-sm font-semibold">{t("toolPages.proj_conv_config")}</h3>

          {/* Composition select */}
          <div>
            <label className="block text-xs text-neutral-500 mb-1.5">{t("toolPages.proj_conv_comp")}</label>
            <select
              id="tool-ae-am-comp"
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground"
            >
            </select>
          </div>

          {/* Beat summary */}
          <div id="tool-ae-am-beat-summary" className="text-xs text-neutral-500"></div>

          {/* Project settings */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-neutral-500 mb-1.5">{t("toolPages.proj_conv_title")}</label>
              <input
                id="tool-ae-am-title"
                type="text"
                defaultValue="Project XML"
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1.5">{t("toolPages.proj_conv_fps")}</label>
              <input
                id="tool-ae-am-fps"
                type="number"
                defaultValue={30}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1.5">{t("toolPages.proj_conv_width")}</label>
              <input
                id="tool-ae-am-width"
                type="number"
                defaultValue={1080}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-500 mb-1.5">{t("toolPages.proj_conv_height")}</label>
              <input
                id="tool-ae-am-height"
                type="number"
                defaultValue={1920}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-neutral-500 mb-1.5">{t("toolPages.proj_conv_dur")}</label>
              <input
                id="tool-ae-am-duration"
                type="number"
                defaultValue={5000}
                className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
          </div>

          <button
            id="btn-ae-am-convert"
            className="w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Konversi & Download XML
          </button>
        </div>

        {/* Status */}
        <div id="tool-ae-am-status" className="text-sm text-neutral-500 min-h-[20px]"></div>
      </div>

      <Script src="/tools-scripts/ae-to-am-beatmark-tool.js" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
