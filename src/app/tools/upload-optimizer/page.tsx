import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.upload_optimizer.title")} — TikTok HQ Upload | Tikinaja Tools`,
    description: t("toolCards.upload_optimizer.desc"),
  };
}

export default async function QualityMethodPage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.upload_optimizer.title")}
      description={t("toolCards.upload_optimizer.desc")}
      badge="WASM · FFmpeg"
    >
      {/* getTranslation stub + i18n */}
      {/* Analysis Modal */}
      <div id="tiktok-analysis-modal" className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 shadow-xl">
          <h3 className="font-bold text-lg mb-4">Analisis Video</h3>
          <div className="space-y-3 mb-6">
            {[
              { id: "fps", label: "Frame Rate" },
              { id: "res", label: "Resolusi" },
              { id: "size", label: "Ukuran File" },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center justify-between">
                <span className="text-sm text-neutral-500">{label}</span>
                <div className="flex items-center gap-2">
                  <span id={`tktk-check-${id}`} className="text-sm font-medium">—</span>
                  <span id={`tktk-icon-${id}`} className="text-xs">⏳</span>
                  <span id={`tktk-val-${id}`} className="text-xs text-neutral-400"></span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button id="tktk-btn-cancel" className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">Batal</button>
            <button id="tktk-btn-compress" className="hidden flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">Kompresi Dulu</button>
            <button id="tktk-btn-proceed" className="flex-1 rounded-xl bg-foreground py-2.5 text-sm font-medium text-background">Lanjutkan</button>
          </div>
        </div>
      </div>

      {/* Main card */}
      <div id="tiktok-patcher-card" data-v1-patched="false" data-v2-patched="false" className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">

        {/* Version switch */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Versi TikTok</label>
          <div id="tiktok-version-switch" className="flex gap-2 relative">
            <button data-version="v1" className="tiktok-switch-option active flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 py-2.5 text-sm font-medium transition-all hover:border-neutral-400 data-[active=true]:bg-foreground data-[active=true]:text-background">v1 (Lama)</button>
            <button data-version="v2" className="tiktok-switch-option flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 py-2.5 text-sm font-medium transition-all hover:border-neutral-400">v2 (Baru)</button>
            <div id="tiktok-version-indicator" className="absolute top-0 bottom-0 left-0 bg-neutral-200 dark:bg-neutral-800 rounded-xl -z-10 transition-all duration-300"></div>
          </div>
        </div>

        {/* Compress mode */}
        <div id="tiktok-compress-toggle-row" className="space-y-2">
          <label className="text-sm font-medium">Mode Kompresi</label>
          <div id="tiktok-compress-mode" className="flex gap-2 flex-wrap relative">
            <button data-mode="off" className="tiktok-switch-option active rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium">Off</button>
            <button data-mode="compatibility" className="tiktok-switch-option rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium">Compatibility</button>
            <button data-mode="quality" className="tiktok-switch-option rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium">Quality</button>
            <div id="tiktok-mode-indicator" className="absolute top-0 bottom-0 left-0 bg-neutral-200 dark:bg-neutral-800 rounded-xl -z-10 transition-all duration-300"></div>
          </div>
          <p id="tiktok-mode-desc" className="text-xs text-neutral-500 leading-relaxed min-h-[20px] transition-opacity duration-150"></p>
        </div>

        {/* Drop area */}
        <div>
          <input id="tool-tiktok-input" type="file" accept="video/*" className="hidden" />
          <div
            id="tool-tiktok-drop"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center cursor-pointer transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-2xl">🎬</div>
            <div>
              <p className="font-medium text-sm">{t("toolPages.drag_drop_video")}</p>
              <p className="text-xs text-neutral-400 mt-1">{t("toolPages.upload_opt_drop_sub")}</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div id="tool-tiktok-status" className="text-sm text-neutral-500 min-h-[20px]"></div>

        {/* Progress */}
        <div id="tiktok-progress-container" className="hidden space-y-2">
          <div className="flex justify-between text-xs text-neutral-500">
            <span id="tiktok-progress-text">Processing...</span>
            <span id="tiktok-progress-percent">0%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <div id="tiktok-progress-fill" className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: "0%" }}></div>
          </div>
        </div>

        {/* Start button */}
        <button
          id="btn-start-tiktok"
          className="hidden w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-[0.99]"
        >
          Proses Video
        </button>

        {/* Logs */}
        <div id="tiktok-logs-container" className="hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-neutral-500">Log</span>
            <button id="btn-copy-logs" className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-neutral-500 hover:text-foreground transition-colors">
              <span id="btn-copy-logs-label">Copy</span>
            </button>
          </div>
          <pre id="tiktok-logs" className="rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 p-4 text-xs font-mono leading-relaxed overflow-auto max-h-48 whitespace-pre-wrap"></pre>
        </div>

        {/* Version patched modal */}
        <div id="tiktok-version-patched-modal" className="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 shadow-xl">
            <h3 id="vp-modal-title" className="font-bold text-lg mb-3">Info</h3>
            <div id="vp-modal-body" className="text-sm text-neutral-500 mb-6"></div>
            <div className="flex gap-2">
              <button id="btn-vp-switch" className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900">Ganti Versi</button>
              <button id="btn-vp-proceed" className="flex-1 rounded-xl bg-foreground py-2.5 text-sm font-medium text-background">Lanjutkan</button>
            </div>
          </div>
        </div>
        <div id="tiktok-patched-overlay" className="hidden"></div>
        <button id="btn-patched-overlay-ignore" className="hidden"></button>
      </div>

      <Script src="/assets/ffmpeg/ffmpeg.js?v=4" strategy="afterInteractive" />
      <Script src="/assets/ffmpeg/ffmpeg-util.js?v=4" strategy="afterInteractive" />
      <Script src="/tools-scripts/tiktok-quality-tool.js?v=4" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
