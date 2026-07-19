import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Use GET request — returns full absolute CDN URLs for images
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
        nickname: data.author.nickname,
        avatar: data.author.avatar,
      },
      play: data.hdplay || data.play,
      music: data.music,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
