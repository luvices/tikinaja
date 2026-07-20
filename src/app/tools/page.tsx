"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";
import {
  Sparkles,
  Film,
  Music,
  Images,
  FileCode2,
  Repeat2,
  BarChart2,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const TOOLS = [
  {
    slug: "xml-optimizer",
    icon: FileCode2,
    title: "XML Optimizer",
    subtitle: "Alight Motion",
    description: "Proses file proyek Alight Motion (.xml) agar ukurannya di bawah batas 5MB untuk pengguna gratis.",
    tags: ["Client-side", "Alight Motion"],
  },
  {
    slug: "project-converter",
    icon: Repeat2,
    title: "Project Converter",
    subtitle: "Beatmark Converter",
    description: "Konversi beatmark dari Adobe After Effects ke format Alight Motion. Cross-platform editing jadi mudah.",
    tags: ["Client-side", "AE → AM"],
  },
  {
    slug: "audio-extractor",
    icon: Music,
    title: "Audio Extractor",
    subtitle: "Video → MP3",
    description: "Pisahkan trek audio dari video manapun dan export langsung sebagai MP3 tanpa kualitas yang turun.",
    tags: ["WASM", "FFmpeg"],
  },
  {
    slug: "seq-renderer",
    icon: Images,
    title: "Sequence Renderer",
    subtitle: "AM Zip Exporter",
    description: "Gabungkan sekuens gambar dari Alight Motion (.zip) menjadi video. Support audio opsional, atur FPS & bitrate.",
    tags: ["WASM", "Alight Motion"],
  },
  {
    slug: "media-enhancer",
    icon: Zap,
    title: "Media Enhancer",
    subtitle: "AI Upscaler",
    description: "Tingkatkan resolusi dan ketajaman gambar/video menggunakan AI WebGL. Berbagai preset tersedia.",
    tags: ["WebGL", "AI"],
    popular: true,
  },
  {
    slug: "upload-optimizer",
    icon: Sparkles,
    title: "Upload Optimizer",
    subtitle: "TikTok HQ Upload",
    description: "Kompresi & optimasi video agar upload ke TikTok dengan kualitas tertinggi — tidak pecah, tidak buram.",
    tags: ["WASM", "FFmpeg"],
    popular: true,
  },
  {
    slug: "social-analytics",
    icon: BarChart2,
    title: "Social Analytics",
    subtitle: "Metadata Analyser",
    description: "Analisis lengkap metadata video TikTok — resolusi, durasi, FPS, engagement, dan info musik.",
    tags: ["Server-side", "TikWM"],
  },
  {
    slug: "video-compressor",
    icon: Film,
    title: "Video Compressor",
    subtitle: "FFmpeg WASM",
    description: "Perkecil ukuran file video langsung di browser. Encoding H.264 CRF 20, pilihan preset Slow/Medium/Fast.",
    tags: ["WASM", "FFmpeg"],
    popular: true,
  },
  {
    slug: "motion-smoother",
    icon: TrendingUp,
    title: "Motion Smoother",
    subtitle: "FPS Upscaler",
    description: "Naikkan FPS video secara artifisial (24→60fps, dll.) untuk gerakan yang jauh lebih smooth.",
    tags: ["WASM", "WebCodecs"],
  },
];


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function ToolsPage() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center px-4 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl"
      >
        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 text-xs font-medium text-neutral-500 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            {t("tools.badge_9tools")}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4">
            {t("tools.page_title_1")}{" "}
            <span className="text-neutral-400">{t("tools.page_title_2")}</span>
          </h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-lg mx-auto">
            {t("tools.page_desc")}
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.slug} variants={item}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className={`group relative overflow-hidden flex flex-col h-full rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-gradient-to-br from-neutral-100/60 dark:from-neutral-900/50 to-transparent p-5 transition-all hover:border-neutral-300 dark:hover:border-neutral-700`}
                >
                  {(tool as any).popular && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-neutral-200 dark:bg-neutral-800 px-2.5 py-1 text-[10px] font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                      <span className="text-orange-500">🔥</span> {t("tools.badge_popular")}
                    </div>
                  )}
                  {/* Icon row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 dark:bg-neutral-800/70 transition-transform group-hover:scale-105">
                      <Icon className="h-4.5 w-4.5 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    {!(tool as any).popular && <ArrowRight className="h-4 w-4 text-neutral-300 dark:text-neutral-700 transition-all group-hover:text-neutral-400 dark:group-hover:text-neutral-500 group-hover:translate-x-0.5" />}
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-xs font-medium mb-0.5 text-neutral-400 dark:text-neutral-500">{t(`toolCards.${tool.slug.replace('-', '_')}.subtitle`)}</p>
                    <h2 className="font-semibold text-base mb-2 text-neutral-800 dark:text-neutral-200">{t(`toolCards.${tool.slug.replace('-', '_')}.title`)}</h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-500 leading-relaxed">{t(`toolCards.${tool.slug.replace('-', '_')}.desc`)}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/60 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-neutral-500 dark:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </motion.div>
            );

          })}
        </motion.div>

        <p className="text-center text-xs text-neutral-400 mt-10 leading-relaxed">
          {t("tools.footer_desc")}
        </p>
      </motion.div>
    </div>
  );
}
