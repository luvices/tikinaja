"use client";

import { motion } from "framer-motion";
import { Download, Music, User } from "lucide-react";

export interface VideoData {
  id: string;
  title: string;
  cover: string;
  author: {
    nickname: string;
    avatar: string;
  };
  play: string;
  music: string;
}

interface VideoCardProps {
  data: VideoData;
}

export function VideoCard({ data }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto mt-12 overflow-hidden rounded-2xl border border-neutral-200 bg-background shadow-sm dark:border-neutral-800"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative aspect-[9/16] w-full sm:w-64 bg-neutral-100 dark:bg-neutral-900 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.cover}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.author.avatar}
                alt={data.author.nickname}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-semibold">{data.author.nickname}</p>
              <div className="flex items-center text-xs text-neutral-500">
                <User className="mr-1 h-3 w-3" /> TikTok Creator
              </div>
            </div>
          </div>
          
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 mb-6">
            {data.title}
          </p>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href={`/api/proxy-download?url=${encodeURIComponent(data.play)}&filename=tiktok_video.mp4`}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download className="h-4 w-4" />
              Download Video (No Watermark)
            </a>
            <a
              href={`/api/proxy-download?url=${encodeURIComponent(data.music)}&filename=tiktok_audio.mp3`}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
            >
              <Music className="h-4 w-4" />
              Download Audio (MP3)
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
