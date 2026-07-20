"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart2, Film, Music, Zap, ArrowRight, Sparkles } from "lucide-react";

const TOOL_PREVIEWS = [
  {
    icon: Film,
    title: "Video Compressor",
    blurb: "Perkecil video langsung di browser",
  },
  {
    icon: Music,
    title: "Audio Extractor",
    blurb: "Video → MP3 tanpa upload ke server",
  },
  {
    icon: BarChart2,
    title: "TikTok Stats",
    blurb: "Analisis metadata video TikTok",
  },
  {
    icon: Zap,
    title: "AI Upscaler",
    blurb: "Tingkatkan resolusi via WebGL",
  },
];

export function ToolsTeaser() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="w-full max-w-2xl mx-auto mt-8 mb-4"
    >
      <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <Sparkles className="h-3.5 w-3.5 text-neutral-400" />
          <p className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
            Mau eksplorasi lebih?
          </p>
        </div>

        {/* Content */}
        <div className="px-5 pb-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            Tikinaja juga punya <strong>9 tools</strong> gratis — kompres video, ekstrak audio, AI upscaler, TikTok stats, dan masih banyak lagi.
          </p>

          {/* Mini tool previews */}
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            {TOOL_PREVIEWS.map(({ icon: Icon, title, blurb }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex-1 flex items-start gap-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-background p-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Icon className="h-3.5 w-3.5 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold">{title}</p>
                  <p className="text-xs text-neutral-500 leading-tight mt-0.5">{blurb}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA — soft, not pushy */}
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-foreground transition-colors group"
          >
            Lihat semua tools
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
