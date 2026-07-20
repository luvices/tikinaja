import { NextResponse } from "next/server";

// Used by tiktok-stats-tool.js and tiktok-downloader.js
// GET /api/tiktok-resolve?url=...&nocache=1
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const json = await response.json();

    if (json.code === -1 || !json.data) {
      return NextResponse.json(
        { error: "Invalid URL or video not found" },
        { status: 400 }
      );
    }

    const d = json.data;

    return NextResponse.json({
      id: d.id,
      title: d.title,
      cover: d.cover,
      play: d.play,
      hdplay: d.hdplay || d.play,
      music: d.music,
      duration: d.duration ?? 0,
      size: d.size ?? 0,
      hd_size: d.hd_size ?? d.size ?? 0,
      width: d.width ?? 0,
      height: d.height ?? 0,
      fps: d.video_fps ?? d.fps ?? null,
      author_nickname: d.author?.nickname ?? "Unknown",
      author_unique_id: d.author?.unique_id ?? "",
      author_avatar: d.author?.avatar ?? "",
      play_count: d.play_count ?? 0,
      digg_count: d.digg_count ?? 0,
      comment_count: d.comment_count ?? 0,
      share_count: d.share_count ?? 0,
      create_time: d.create_time ?? 0,
      music_info: {
        title: d.music_info?.title ?? "",
        author: d.music_info?.author ?? "",
      },
    });
  } catch (error) {
    console.error("tiktok-resolve error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
