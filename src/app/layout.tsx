import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getLocale, getDictionary } from "@/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tikinaja | TikTok Downloader No Watermark",
  description: "Download video TikTok tanpa watermark dan audio MP3 secara gratis. Multi-link, cepat, dan aman.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Tikinaja",
    description: "Download video TikTok tanpa watermark, gratis.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLocale();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <I18nProvider lang={lang} dict={dict}>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </I18nProvider>
        {/* beforeInteractive = runs before page hydration; debugger fires before user sees anything */}
        <Script src="/devtools-guard.js" strategy="beforeInteractive" />
        <Script src="/anti-devtools.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
