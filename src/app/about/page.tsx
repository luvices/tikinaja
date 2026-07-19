import Image from "next/image";
import Link from "next/link";
import { Shield, Zap, Code2, Heart } from "lucide-react";

export const metadata = {
  title: "About | Tikinaja",
  description: "Tentang Tikinaja — TikTok downloader gratis, open source, dan aman.",
};

const features = [
  {
    icon: Zap,
    title: "Cepat & Ringan",
    desc: "Tidak ada iklan, tidak ada bloatware. Langsung fetch, langsung download.",
  },
  {
    icon: Shield,
    title: "Aman & Privasi",
    desc: "Tidak ada data yang disimpan. Semua request diproses di server kita sendiri, bukan langsung dari browsermu.",
  },
  {
    icon: Code2,
    title: "Open Source",
    desc: "Kode sepenuhnya terbuka di GitHub. Bebas dicek, difork, atau dikontribusi siapa saja.",
  },
  {
    icon: Heart,
    title: "Gratis Selamanya",
    desc: "Tidak ada paywall, tidak ada login. Pakai langsung, selama yang kamu mau.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center px-4 py-20 md:py-32">
      <div className="w-full max-w-2xl">
        {/* Logo + name */}
        <div className="flex flex-col items-center text-center mb-16">
          <Image
            src="/logo.png"
            alt="Tikinaja Logo"
            width={80}
            height={80}
            className="rounded-2xl mb-6"
          />
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Tikinaja</h1>
          <p className="text-neutral-500 text-lg leading-relaxed max-w-md">
            Download video TikTok tanpa watermark dan audio MP3 — gratis, cepat, dan open source.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="font-semibold mb-1">{title}</h2>
              <p className="text-sm text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Made by */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 mb-6">
          <h2 className="font-semibold text-lg mb-2">Dibuat oleh</h2>
          <p className="text-neutral-500 text-sm leading-relaxed mb-4">
            Tikinaja dibuat oleh{" "}
            <a
              href="https://github.com/luvices"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
            >
              luvices
            </a>
            . Proyek ini dibuat iseng buat ngebantu yang males buka-buka situs downloader ribet yang
            penuh iklan.
          </p>
          <a
            href="https://github.com/luvices/tikinaja"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105 active:scale-95"
          >
            <svg role="img" viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            Lihat di GitHub
          </a>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-neutral-400 text-center leading-relaxed">
          Tikinaja menggunakan{" "}
          <a href="https://tikwm.com" target="_blank" rel="noreferrer" className="underline underline-offset-2">
            TikWM API
          </a>{" "}
          sebagai sumber data. Gunakan secara bertanggung jawab dan hormati hak cipta kreator.
          Lisensi:{" "}
          <Link href="https://github.com/luvices/tikinaja/blob/main/LICENSE" className="underline underline-offset-2">
            MIT
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
