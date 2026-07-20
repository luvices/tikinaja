import type { Metadata } from "next";
import Script from "next/script";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getTranslations } from "@/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: `${t("toolCards.media_enhancer.title")} — AI Upscaler | Tikinaja Tools`,
    description: t("toolCards.media_enhancer.desc"),
  };
}

export default async function UpscalerPage() {
  const t = await getTranslations();
  return (
    <ToolPageLayout
      title={t("toolCards.media_enhancer.title")}
      description={t("toolCards.media_enhancer.desc")}
      badge="WebGL · AI"
    >
      {/* Compatibility notice */}
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20 p-4 text-sm text-amber-700 dark:text-amber-400">
        <span className="text-lg shrink-0">⚠️</span>
        <span>Tool ini membutuhkan browser modern dengan dukungan <strong>WebGL</strong>. Tidak bekerja di Safari iOS lama atau browser tanpa WebGL.</span>
      </div>

      <div id="upscale-video-card" className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-background p-6 space-y-6">

        {/* Checking screen */}
        <div id="upscale-checking-screen" className="hidden space-y-3 py-6 text-center">
          <p className="text-sm font-medium">Memeriksa kompatibilitas browser...</p>
          <div className="flex flex-col gap-2 max-w-xs mx-auto text-left">
            {[
              { dotId: "upscale-engine-dot", statusId: "upscale-engine-status", label: "AI Engine" },
              { dotId: "upscale-gpu-dot", statusId: "upscale-gpu-status", label: "GPU / WebGL" },
              { dotId: "upscale-webcodecs-dot", statusId: "upscale-webcodecs-status", label: "WebCodecs" },
            ].map(({ dotId, statusId, label }) => (
              <div key={dotId} className="flex items-center gap-2 text-sm">
                <span id={dotId} className="h-2 w-2 rounded-full bg-neutral-300 shrink-0"></span>
                <span className="text-neutral-500 w-24 shrink-0">{label}</span>
                <span id={statusId} className="text-neutral-600 dark:text-neutral-400 text-xs">Checking...</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drop area */}
        <div>
          <input id="upscale-file-input" type="file" accept="video/*,image/*" className="hidden" />
          <div
            id="upscale-drop-area"
            className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center cursor-pointer transition-colors hover:border-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-900 text-2xl">✨</div>
            <div>
              <p className="font-medium text-sm">{t("toolPages.drag_drop_media")}</p>
              <p className="text-xs text-neutral-400 mt-1">{t("toolPages.media_enh_drop_sub")}</p>
            </div>
          </div>
        </div>

        {/* Zoom badge */}
        <div id="upscale-zoom-badge" className="hidden"></div>

        {/* Workspace */}
        <div id="upscale-workspace" className="hidden space-y-4">

          {/* Preset list */}
          <div>
            <p className="text-sm font-medium mb-2">Preset Enhancement</p>
            <div id="upscale-preset-list" className="flex flex-wrap gap-2"></div>
          </div>

          {/* Normalise toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input id="upscale-normalise-toggle" type="checkbox" className="rounded" />
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Normalize output size</span>
          </label>

          {/* Video element */}
          <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video id="upscale-video" className="w-full h-full object-contain" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img id="upscale-image" alt="input" className="hidden w-full h-full object-contain" />

            {/* Comparison container */}
            <div id="upscale-comparison-container" className="hidden absolute inset-0">
              <div id="upscale-canvas-clip" className="absolute inset-0 overflow-hidden">
                <canvas id="upscale-canvas" className="absolute top-0 left-0 w-full h-full object-contain" />
              </div>
              <div id="upscale-slider-line" className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize" style={{ left: "50%" }}>
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-black">⇔</span>
                </div>
              </div>
              <div id="upscale-slider-label-right" className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-0.5 rounded">Enhanced</div>
            </div>

            <div id="upscale-unprocessed-overlay" className="hidden absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-sm">Preview original</span>
            </div>
          </div>

          {/* Timeline */}
          <div id="upscale-duration-container" className="hidden space-y-1">
            <input id="upscale-timeline" type="range" defaultValue={0} min={0} max={100} step={0.1} className="w-full" />
            <div className="flex justify-between text-xs text-neutral-500">
              <span id="upscale-time-current">0:00</span>
              <span id="upscale-time-duration">0:00</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button id="upscale-btn-preview" className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-800 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">Preview</button>
            <button id="upscale-btn-enhance" className="flex-1 rounded-xl bg-foreground py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.01]">Enhance</button>
            <button id="upscale-btn-zoom" className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">Zoom</button>
            <button id="upscale-btn-reset" className="rounded-xl border border-neutral-200 dark:border-neutral-800 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">Reset</button>
          </div>
        </div>

        {/* Progress */}
        <div id="upscale-progress-container" className="hidden space-y-2">
          <div className="flex justify-between text-xs text-neutral-500">
            <span id="upscale-progress-text">Enhancing...</span>
            <span id="upscale-progress-percent">0%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden">
            <div id="upscale-progress-fill" className="h-full rounded-full bg-foreground transition-all duration-300" style={{ width: "0%" }}></div>
          </div>
          <button id="upscale-btn-cancel" className="text-xs text-red-500 hover:underline">Batalkan</button>
        </div>

        {/* Logs */}
        <div id="upscale-logs-container" className="hidden">
          <p className="text-xs font-medium text-neutral-500 mb-2">Log</p>
          <pre id="upscale-logs" className="rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900 p-4 text-xs font-mono leading-relaxed overflow-auto max-h-40 whitespace-pre-wrap"></pre>
        </div>

        {/* Completed panel */}
        <div id="upscale-completed-panel" className="hidden space-y-4">
          <p className="text-sm font-medium text-green-600 dark:text-green-400">✓ Enhancement selesai!</p>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video id="upscale-completed-video" className="hidden w-full rounded-xl" controls />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img id="upscale-completed-image" alt="enhanced" className="hidden w-full rounded-xl" />
          <button id="upscale-btn-download" className="w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01]">
            Download Hasil
          </button>
        </div>
      </div>

      <Script src="/tools-scripts/upscale/webm-muxer.min.js" strategy="afterInteractive" />
      <Script src="/tools-scripts/upscale-gpu-enhancer.js" strategy="beforeInteractive" />
      <Script src="/tools-scripts/upscale-tool.js" strategy="afterInteractive" />
    </ToolPageLayout>
  );
}
