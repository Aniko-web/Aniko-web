"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { cn } from "@/lib/utils";

interface GalleryItem {
  caption: string;
  category: "events" | "hackathons" | "education";
  image?: string;
}

const CATS: GalleryItem["category"][] = ["events", "hackathons", "education"];
const HEIGHTS = ["h-56", "h-72", "h-64", "h-80", "h-60", "h-72"];

export function Gallery() {
  const t = useTranslations("gallery");
  const items = t.raw("items") as GalleryItem[];
  const [cat, setCat] = useState<GalleryItem["category"] | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (cat === "all" ? items : items.filter((i) => i.category === cat)),
    [items, cat]
  );

  return (
    <section id="gallery" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Container>
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setCat("all")}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              cat === "all"
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            )}
          >
            {t("categories.all")}
          </button>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                cat === c
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              )}
            >
              {t(`categories.${c}`)}
            </button>
          ))}
        </div>

        <div className="columns-2 gap-4 sm:columns-3 [column-fill:_balance]">
          {visible.map((item, i) => (
            <motion.button
              key={item.caption}
              onClick={() => setLightbox(i)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
              className={cn(
                "group relative mb-4 w-full overflow-hidden rounded-2xl border border-[var(--color-line)] bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-card)]",
                HEIGHTS[i % HEIGHTS.length]
              )}
            >
              {item.image ? (
                <Image src={item.image} alt={item.caption} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="text-[var(--color-accent)]/40 transition-transform duration-500 group-hover:scale-110" size={28} />
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-4 text-xs text-white transition-transform duration-300 group-hover:translate-y-0">
                {item.caption}
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((l) => (l !== null ? (l - 1 + visible.length) % visible.length : l));
              }}
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[70vh] w-full max-w-2xl items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-transparent"
            >
              {visible[lightbox]?.image ? (
                <Image src={visible[lightbox].image} alt={visible[lightbox].caption} fill className="rounded-2xl object-cover" />
              ) : (
                <ImageIcon className="text-white/40" size={64} />
              )}
              <p className="absolute bottom-6 text-sm text-white/80">{visible[lightbox]?.caption}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((l) => (l !== null ? (l + 1) % visible.length : l));
              }}
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
