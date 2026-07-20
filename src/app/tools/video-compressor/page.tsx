import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.video_compressor.title")} — FFmpeg WASM | Tikinaja Tools`,
    description: t("toolCards.video_compressor.desc"),
  };
}

export default async function VideoCompressorPage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.video_compressor.title")}
      description={t("toolCards.video_compressor.desc")}
      badge="WASM · FFmpeg"
    >
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">
        {/* Preset chips */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Preset Encoding</label>
          <div id="ffmpeg-presets" className="flex gap-2">
            <button data-preset="slow" className="preset-switch rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium transition-all hover:border-neutral-400">🐢 Slow</button>
            <button data-preset="medium" className="preset-switch active rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium transition-all hover:border-neutral-400">⚖️ Medium</button>
            <button data-preset="fast" className="preset-switch rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium transition-all hover:border-neutral-400">⚡ Fast</button>
          </div>
          <p id="ffmpeg-preset-desc" className="text-xs text-neutral-500 leading-relaxed"></p>
        </div>

        {/* Drop area */}
        <div>
          <input id="tool-ffmpeg-input" type="file" accept="video/*" className="hidden" />
          <div
            id="tool-ffmpeg-drop"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center cursor-pointer transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-2xl">📁</div>
            <div>
              <p className="font-medium text-sm">{t("toolPages.drag_drop_video")}</p>
              <p className="text-xs text-neutral-400 mt-1">{t("toolPages.vid_comp_drop_sub")}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div id="tool-ffmpeg-status" className="text-sm text-neutral-500 min-h-[20px]"></div>

        {/* Progress */}
        <div id="ffmpeg-progress-container" className="hidden space-y-2">
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Compressing...</span>
            <span id="ffmpeg-progress-percent">0%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <div id="ffmpeg-progress-fill" className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: "0%" }}></div>
          </div>
        </div>

        <button
          id="btn-start-compression"
          className="hidden w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          {t("toolPages.vid_comp_btn")}
        </button>
      </div>

      <Script src="/assets/ffmpeg/ffmpeg.js?v=4" strategy="afterInteractive" />
      <Script src="/assets/ffmpeg/ffmpeg-util.js?v=4" strategy="afterInteractive" />
      <Script src="/tools-scripts/ffmpeg-tool.js?v=4" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
