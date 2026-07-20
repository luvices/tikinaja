import { NextResponse } from "next/server";

// Used by tiktok-stats-tool.js to get FPS info from stream URL
// GET /api/tiktok-fps?url=...
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Fetch just the first few bytes to get container info via HEAD
    const headRes = await fetch(videoUrl, {
      method: "HEAD",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Range": "bytes=0-1023",
      },
    });

    // We can't fully parse fps server-side without FFprobe.
    // Return what we know from the TikWM metadata — the client already has width/height.
    // Return null fps to signal client to fall back to metadata.
    if (!headRes.ok) {
      return NextResponse.json({ fps: null, width: null, height: null });
    }

    const contentType = headRes.headers.get("content-type") ?? "";
    const contentLength = headRes.headers.get("content-length");

    return NextResponse.json({
      fps: null, // We can't determine FPS without ffprobe server-side
      width: null,
      height: null,
      contentType,
      contentLength: contentLength ? parseInt(contentLength) : null,
    });
  } catch (error) {
    console.error("tiktok-fps error:", error);
    return NextResponse.json({ fps: null, width: null, height: null });
  }
}
