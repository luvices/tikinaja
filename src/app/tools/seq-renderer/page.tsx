import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.seq_renderer.title")} — AM Zip Exporter | Tikinaja Tools`,
    description: t("toolCards.seq_renderer.desc"),
  };
}

export default async function ImageSequencePage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.seq_renderer.title")}
      description={t("toolCards.seq_renderer.desc")}
      badge="WASM · Alight Motion"
    >
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">
        {/* ZIP Drop */}
        <div>
          <p className="text-sm font-medium mb-2">{t("toolPages.seq_rend_zip")}</p>
          <input id="tool-seq-input" type="file" accept=".zip" className="hidden" />
          <div
            id="tool-seq-drop"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-10 text-center cursor-pointer transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div id="tool-seq-inner">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-2xl mx-auto mb-2">📦</div>
              <p className="font-medium text-sm">{t("toolPages.drag_drop_zip")}</p>
              <p className="text-xs text-neutral-400 mt-1">{t("toolPages.seq_rend_zip_sub")}</p>
            </div>
          </div>
        </div>

        {/* Audio Drop (optional) */}
        <div>
          <p className="text-sm font-medium mb-2">{t("toolPages.seq_rend_audio")}</p>
          <input id="tool-seq-audio-input" type="file" accept="audio/*,video/*" className="hidden" />
          <div
            id="tool-seq-audio-drop"
            className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-100 dark:border-neutral-900 p-6 text-center cursor-pointer transition-colors hover:border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div id="tool-seq-audio-inner">
              <p className="font-medium text-sm text-neutral-400">🎵 {t("toolPages.seq_rend_audio_add")}</p>
              <p className="text-xs text-neutral-400 mt-1">MP3, WAV, AAC, M4A</p>
            </div>
          </div>
        </div>

        {/* FPS & Bitrate */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="tool-seq-fps" className="block text-sm font-medium mb-2">Framerate (FPS)</label>
            <input
              id="tool-seq-fps"
              type="number"
              defaultValue={30}
              min={1}
              max={120}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>
          <div>
            <label htmlFor="tool-seq-bitrate" className="block text-sm font-medium mb-2">Bitrate (Mbps)</label>
            <input
              id="tool-seq-bitrate"
              type="number"
              defaultValue={8}
              min={1}
              max={50}
              step={0.5}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>
        </div>

        {/* Status */}
        <div id="tool-seq-status" className="text-sm text-neutral-500 min-h-[20px]"></div>

        {/* Progress */}
        <div id="seq-progress-container" className="hidden space-y-2">
          <div className="flex justify-between text-xs text-neutral-500">
            <span id="seq-progress-text">Converting...</span>
            <span id="seq-progress-percent">0%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <div id="seq-progress-fill" className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: "0%" }}></div>
          </div>
        </div>

        <button
          id="btn-start-seq"
          className="hidden w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Convert to Video
        </button>
      </div>

      <Script src="/assets/ffmpeg/ffmpeg.js?v=4" strategy="afterInteractive" />
      <Script src="/assets/ffmpeg/ffmpeg-util.js?v=4" strategy="afterInteractive" />
      <Script src="/tools-scripts/image-sequence-tool.js?v=4" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
