import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

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
    });

    const json = await response.json();

    if (json.code === -1 || !json.data) {
      return NextResponse.json({ error: "Invalid URL or video not found" }, { status: 400 });
    }

    const data = json.data;

    return NextResponse.json({
      id: data.id,
      title: data.title,
      cover: data.cover,
      author: {
        nickname: data.author?.nickname ?? "Unknown",
        uniqueId: data.author?.unique_id ?? "",
        avatar: data.author?.avatar ?? "",
      },
      duration: data.duration ?? 0,
      size: data.size ?? 0,
      hdSize: data.hd_size ?? data.size ?? 0,
      width: data.width ?? 0,
      height: data.height ?? 0,
      fps: data.video_fps ?? data.fps ?? null,
      playCount: data.play_count ?? 0,
      likeCount: data.digg_count ?? 0,
      commentCount: data.comment_count ?? 0,
      shareCount: data.share_count ?? 0,
      createTime: data.create_time ?? 0,
      musicTitle: data.music_info?.title ?? "",
      musicAuthor: data.music_info?.author ?? "",
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
