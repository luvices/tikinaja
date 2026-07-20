# Tikinaja

TikTok downloader + browser-side video tools. No watermark, no ads, no tracking.

## Tools

| Tool | Description |
|------|-------------|
| **Downloader** | Download TikTok videos (no watermark) and audio in MP3 |
| **Quality Method** | Re-encode videos to TikTok's ideal upload format (1080p 60fps H.264 VBR) |
| **Video Compressor** | Compress video files using FFmpeg WASM |
| **Audio Extractor** | Extract audio from any video file as MP3 |
| **Motion Smoother** | Frame interpolation via WebGPU (2x / 3x / 4x) |
| **Media Enhancer** | AI upscaling using WebGPU |
| **Image Sequence Renderer** | Render PNG/JPG image sequences into video |
| **XML Optimizer** | Clean & optimize TikTok-exported XML project files |
| **Social Analytics** | Fetch TikTok post stats by URL |

All video processing runs **entirely in the browser** — nothing is uploaded to a server.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **FFmpeg WASM** — in-browser video encoding
- **WebGPU** — GPU-accelerated upscaling & frame interpolation
- **i18n** — English, Indonesian, German

## Local Dev

```bash
git clone https://github.com/luvices/tikinaja.git
cd tikinaja
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Notes

- FFmpeg WASM core files are served locally from `/public/assets/ffmpeg/` to avoid cross-origin Worker restrictions.
- SharedArrayBuffer multi-threading requires proper COOP/COEP headers. Single-thread fallback is used automatically when unavailable.

## License

[MIT](LICENSE)
