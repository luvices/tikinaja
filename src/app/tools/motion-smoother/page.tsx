import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.motion_smoother.title")} — FPS Upscaler | Tikinaja Tools`,
    description: t("toolCards.motion_smoother.desc"),
  };
}

export default async function InterpolationPage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.motion_smoother.title")}
      description={t("toolCards.motion_smoother.desc")}
      badge="WASM · WebCodecs"
    >
      {/* Compatibility notice */}
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-amber-700 dark:text-amber-400">
        <span className="text-lg shrink-0">⚠️</span>
        <span>Tool ini membutuhkan <strong>WebGPU</strong> dan browser modern (Chrome/Edge terbaru). Tidak bekerja di Firefox atau Safari.</span>
      </div>

      <div id="interpolation-video-card" className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">

        {/* Drop area */}
        <div>
          <input id="interp-file-input" type="file" accept="video/*" className="hidden" />
          <div
            id="interp-drop-area"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center cursor-pointer transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-2xl">🎬</div>
            <div>
              <p className="font-medium text-sm">{t("toolPages.drag_drop_video")}</p>
              <p className="text-xs text-neutral-400 mt-1">{t("toolPages.mot_smooth_drop_sub")}</p>
            </div>
          </div>
        </div>

        {/* Checking screen */}
        <div id="interp-checking-screen" className="hidden space-y-3 py-4">
          <p className="text-sm font-medium text-center">Memeriksa kompatibilitas...</p>
          <div className="flex items-center gap-2 text-sm justify-center">
            <span id="interp-gpu-dot" className="h-2 w-2 rounded-full bg-neutral-300 shrink-0"></span>
            <span id="interp-gpu-status" className="text-neutral-500 text-xs">Checking WebGPU...</span>
          </div>
        </div>

        {/* Workspace */}
        <div id="interp-workspace" className="hidden space-y-5">
          {/* FPS info */}
          <div className="flex items-center justify-between rounded-xl border border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 p-4">
            <div className="text-center">
              <p className="text-xs text-neutral-400 mb-1">{t("toolPages.mot_smooth_fps_in")}</p>
              <p id="interp-input-fps" className="text-lg font-bold">—</p>
            </div>
            <span className="text-neutral-300 text-2xl">→</span>
            <div className="text-center">
              <p className="text-xs text-neutral-400 mb-1">{t("toolPages.mot_smooth_fps_out")}</p>
              <p id="interp-target-fps" className="text-lg font-bold text-green-500">—</p>
            </div>
          </div>

          {/* Multiplier chips */}
          <div>
            <p className="text-sm font-medium mb-2">Multiplier</p>
            <div id="interp-multipliers" className="flex gap-2">
              <button data-mult="2" className="preset-switch active rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium">×2</button>
              <button data-mult="3" className="preset-switch rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium">×3</button>
              <button data-mult="4" className="preset-switch rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm font-medium">×4</button>
            </div>
          </div>

          {/* Process button */}
          <div className="flex gap-2">
            <button id="interp-btn-process" className="flex-1 rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01] active:scale-[0.99]">
              {t("toolPages.mot_smooth_btn")}
            </button>
            <button id="interp-btn-reset" className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-3 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
              Reset
            </button>
          </div>
        </div>

        {/* Progress */}
        <div id="interp-progress-container" className="hidden space-y-2">
          <div className="flex justify-between text-xs text-neutral-500">
            <span id="interp-progress-text">Processing frames...</span>
            <span id="interp-progress-percent">0%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <div id="interp-progress-fill" className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: "0%" }}></div>
          </div>
          <button id="interp-btn-cancel" className="text-xs text-red-500 hover:underline">{t("common.btn_cancel")}</button>
        </div>

        {/* Logs */}
        <div id="interp-logs-container" className="hidden">
          <p className="text-xs font-medium text-neutral-500 mb-2">Log</p>
          <pre id="interp-logs" className="rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 p-4 text-xs font-mono leading-relaxed overflow-auto max-h-40 whitespace-pre-wrap"></pre>
        </div>

        {/* Completed panel with comparison */}
        <div id="interp-completed-panel" className="hidden space-y-4">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">✓ Interpolasi selesai!</p>
          <div id="interp-comparison-container" className="hidden relative rounded-xl overflow-hidden bg-black aspect-video">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video id="interp-video-original" className="absolute inset-0 w-full h-full object-contain" loop muted />
            <div id="interp-video-clip" className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video id="interp-video-output" className="absolute top-0 left-0 w-full h-full object-contain" loop muted />
            </div>
            <div id="interp-slider-line" className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize" style={{ left: "50%" }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                <span className="text-xs font-bold text-black">⇔</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script src="/tools-scripts/video-interpolation.js" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
