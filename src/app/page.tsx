"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ClipboardPaste, Plus, X, Download } from "lucide-react";
import { VideoCard, type VideoData } from "@/components/VideoCard";
import { ToolsTeaser } from "@/components/ToolsTeaser";
import { useI18n } from "@/i18n/I18nProvider";

interface LinkItem {
  id: string;
  url: string;
  status: "idle" | "loading" | "done" | "error";
  data?: VideoData;
  error?: string;
}

let nextId = 1;
const makeId = () => String(nextId++);

export default function Home() {
  const { t } = useI18n();
  const [links, setLinks] = useState<LinkItem[]>([{ id: makeId(), url: "", status: "idle" }]);
  const [pastedId, setPastedId] = useState<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const isAnyLoading = links.some((l) => l.status === "loading");

  // --- link management ---
  const updateUrl = (id: string, value: string) =>
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, url: value, status: "idle", error: undefined } : l)));

  const addLink = () => {
    const newId = makeId();
    setLinks((prev) => [...prev, { id: newId, url: "", status: "idle" }]);
    setTimeout(() => inputRefs.current[newId]?.focus(), 50);
  };

  const removeLink = (id: string) =>
    setLinks((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));

  const handlePaste = async (id: string) => {
    try {
      const text = await navigator.clipboard.readText();
      updateUrl(id, text);
      setPastedId(id);
      setTimeout(() => setPastedId(null), 2000);
    } catch {
      // permission denied
    }
  };

  // --- fetching ---
  const fetchSingle = async (item: LinkItem): Promise<LinkItem> => {
    if (!item.url.trim()) return { ...item, status: "error", error: "URL kosong" };
    // Mark this one as loading
    setLinks((prev) => prev.map((l) => (l.id === item.id ? { ...l, status: "loading" } : l)));
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: item.url }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to fetch video");
      const updated: LinkItem = { ...item, status: "done", data: result };
      setLinks((prev) => prev.map((l) => (l.id === item.id ? updated : l)));
      return updated;
    } catch (err: any) {
      const updated: LinkItem = { ...item, status: "error", error: err.message };
      setLinks((prev) => prev.map((l) => (l.id === item.id ? updated : l)));
      return updated;
    }
  };

  const handleFetchAll = async (e: React.FormEvent) => {
    e.preventDefault();
    const toFetch = links.filter((l) => l.url.trim());
    // Sequential: wait for each to finish before starting the next
    for (const link of toFetch) {
      await fetchSingle(link);
      // Small pause between requests so the card animates in before next loading starts
      if (toFetch.indexOf(link) < toFetch.length - 1) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  };

  const filledLinks = links.filter((l) => l.url.trim());
  const doneResults = links.filter((l) => l.status === "done" && l.data);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl text-center"
      >
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {t("home.title_1")} <br className="hidden sm:block" />
          <span className="text-neutral-400">{t("home.title_2")}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          {t("home.subtitle")}
        </p>

        <form onSubmit={handleFetchAll} className="mx-auto mt-10 max-w-xl space-y-3">
          <AnimatePresence initial={false}>
            {links.map((link, i) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.2 }}
                className="relative flex items-center gap-2"
              >
                {/* number badge */}
                {links.length > 1 && (
                  <span className="shrink-0 w-6 text-center text-xs font-bold text-neutral-400">
                    {i + 1}
                  </span>
                )}

                {/* input row */}
                <div className="relative flex flex-1 items-center">
                  <Search className="absolute left-4 h-4 w-4 text-neutral-400 pointer-events-none" />
                  <input
                    ref={(el) => { inputRefs.current[link.id] = el; }}
                    type="url"
                    placeholder={t("home.input_placeholder")}
                    value={link.url}
                    onChange={(e) => updateUrl(link.id, e.target.value)}
                    className={`w-full rounded-2xl border bg-background py-3.5 pl-11 pr-28 text-sm shadow-sm outline-none transition-all placeholder:text-neutral-400 focus:ring-1
                      ${link.status === "error"
                        ? "border-red-400 focus:border-red-500 focus:ring-red-400"
                        : link.status === "done"
                        ? "border-green-400 focus:border-green-500 focus:ring-green-400"
                        : "border-neutral-200 focus:border-foreground focus:ring-foreground dark:border-neutral-800"
                      }`}
                  />

                  {/* paste + status inside input */}
                  <div className="absolute right-2 flex items-center gap-1">
                    {link.status === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin text-neutral-400" />
                    ) : (
                      <button
                        type="button"
                        onClick={() => handlePaste(link.id)}
                        className="flex items-center gap-1 rounded-lg border border-neutral-200 bg-background px-2.5 py-1.5 text-xs font-medium text-neutral-500 transition-all hover:border-foreground hover:text-foreground dark:border-neutral-700"
                      >
                        <ClipboardPaste className="h-3.5 w-3.5" />
                        <AnimatePresence mode="wait" initial={false}>
                          {pastedId === link.id ? (
                            <motion.span
                              key="pasted"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-green-500"
                            >
                              Pasted!
                            </motion.span>
                          ) : (
                            <motion.span key="paste" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                              {t("home.btn_paste")}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    )}
                  </div>
                </div>

                {/* remove button */}
                {links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLink(link.id)}
                    className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition-colors hover:border-red-400 hover:text-red-500 dark:border-neutral-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* error messages */}
          <AnimatePresence>
            {links.some((l) => l.status === "error") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                {links.filter((l) => l.status === "error").map((l) => (
                  <p key={l.id} className="text-left text-xs text-red-500 pl-2">
                    Link {links.indexOf(l) + 1}: {l.error}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* action buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={addLink}
              className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-background px-4 py-2.5 text-sm font-medium text-neutral-600 transition-all hover:border-foreground hover:text-foreground active:scale-95 dark:border-neutral-700 dark:text-neutral-400"
            >
              <Plus className="h-4 w-4" />
              {t("home.btn_add_more")}
            </button>

            <button
              type="submit"
              disabled={isAnyLoading || filledLinks.length === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
            >
              {isAnyLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t("home.btn_fetching")} {links.filter((l) => l.status === "loading").length}
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  {t("home.btn_fetch_all")} {filledLinks.length > 1 ? `(${filledLinks.length})` : ""}
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* results */}
      <AnimatePresence mode="popLayout">
        {doneResults.map((link) => (
          <VideoCard key={link.id} data={link.data!} />
        ))}
      </AnimatePresence>

      {/* soft tools discovery — appears after first successful download */}
      <AnimatePresence>
        {doneResults.length > 0 && <ToolsTeaser />}
      </AnimatePresence>
    </div>
  );
}
