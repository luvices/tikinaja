import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools | Tikinaja",
  description:
    "Kumpulan tools gratis untuk creator TikTok — cek stats video, validasi URL, dan batch checker. Langsung pakai, tanpa login.",
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
