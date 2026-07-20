import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { urls } = await req.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "URLs array is required" }, { status: 400 });
    }

    const results = await Promise.allSettled(
      urls.slice(0, 10).map(async (url: string) => {
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url.trim())}`;
        const response = await fetch(apiUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            Accept: "application/json",
          },
        });
        const json = await response.json();
        if (json.code === -1 || !json.data) {
          return { url, status: "invalid", reason: "Video not found or invalid URL" };
        }
        const d = json.data;
        return {
          url,
          status: "valid",
          id: d.id,
          title: (d.title ?? "").slice(0, 80),
          author: d.author?.nickname ?? "Unknown",
          duration: d.duration ?? 0,
          cover: d.cover ?? "",
        };
      })
    );

    const output = results.map((r, i) => {
      if (r.status === "fulfilled") return r.value;
      return { url: urls[i], status: "error", reason: "Request failed" };
    });

    return NextResponse.json({ results: output });
  } catch (error) {
    console.error("Batch Checker API Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
