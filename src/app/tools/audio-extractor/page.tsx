import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.audio_extractor.title")} — Video ke MP3 | Tikinaja Tools`,
    description: t("toolCards.audio_extractor.desc"),
  };
}

export default async function AudioExtractorPage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.audio_extractor.title")}
      description={t("toolCards.audio_extractor.desc")}
      badge="WASM · FFmpeg"
    >
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">
        {/* Drop area */}
        <div>
          <input id="tool-audio-input" type="file" accept="video/*" className="hidden" />
          <div
            id="tool-audio-drop"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center cursor-pointer transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-2xl">🎵</div>
            <div>
              <p className="font-medium text-sm">{t("toolPages.drag_drop_video")}</p>
              <p className="text-xs text-neutral-400 mt-1">{t("toolPages.audio_ext_drop_sub")}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div id="tool-audio-status" className="text-sm text-neutral-500 min-h-[20px]"></div>

        {/* Progress */}
        <div id="audio-progress-container" className="hidden space-y-2">
          <div className="flex justify-between text-xs text-neutral-500">
            <span>Extracting audio...</span>
            <span id="audio-progress-percent">0%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <div id="audio-progress-fill" className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: "0%" }}></div>
          </div>
        </div>

        <button
          id="btn-start-audio"
          className="hidden w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          {t("toolPages.audio_ext_btn")}
        </button>
      </div>

      <Script src="/assets/ffmpeg/ffmpeg.js?v=4" strategy="afterInteractive" />
      <Script src="/assets/ffmpeg/ffmpeg-util.js?v=4" strategy="afterInteractive" />
      <Script src="/tools-scripts/audio-extractor-tool.js?v=4" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
