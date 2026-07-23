"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Search, X, Calendar, Building2, Download } from "lucide-react";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { cn } from "@/lib/utils";

interface CertItem {
  title: string;
  organization: string;
  date: string;
  category: "programming" | "english" | "competitions" | "achievements";
  description: string;
  image?: string;
  downloadUrl?: string;
}

const CATS: CertItem["category"][] = ["programming", "english", "competitions", "achievements"];

export function Certificates() {
  const t = useTranslations("certificates");
  const items = t.raw("items") as CertItem[];
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CertItem["category"] | "all">("all");
  const [active, setActive] = useState<CertItem | null>(null);

  const visible = useMemo(() => {
    return items.filter((c) => {
      const matchesCat = cat === "all" || c.category === cat;
      const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [items, cat, query]);

  return (
    <section id="certificates" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCat("all")}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                cat === "all"
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              )}
            >
              {t("all")}
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
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search")}
              className="w-full rounded-full border border-[var(--color-line)] bg-[var(--color-card)] py-2 pl-9 pr-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:border-[var(--color-accent)] outline-none transition-colors"
            />
          </div>
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((cert) => (
              <motion.button
                layout
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setActive(cert)}
                className="group text-left rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-accent)]/40"
              >
                <div className="rounded-2xl overflow-hidden bg-[var(--color-card)]">
                  {cert.image ? (
                    <img src={cert.image} alt={cert.title} className="h-28 w-full object-cover" />
                  ) : (
                    <div className="flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)]/12 to-transparent">
                      <Award className="text-[var(--color-accent)]/60 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" size={32} />
                    </div>
                  )}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-[var(--color-ink)]">{cert.title}</h3>
                <p className="mt-1 text-xs text-[var(--color-ink-soft)]">{cert.organization} · {cert.date}</p>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-7 shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              >
                <X size={15} />
              </button>
              {active.image ? (
                <div className="mb-5 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)]">
                  <img src={active.image} alt={active.title} className="h-52 w-full object-cover" />
                </div>
              ) : (
                <div className="mb-5 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-accent)]/15 to-transparent">
                  <Award className="text-[var(--color-accent)]/70" size={44} />
                </div>
              )}
              <h3 className="text-xl font-semibold text-[var(--color-ink)]">{active.title}</h3>
              <div className="mt-4 space-y-2 text-sm text-[var(--color-ink-soft)]">
                <p className="flex items-center gap-2"><Building2 size={14} /> {t("modal.organization")}: {active.organization}</p>
                <p className="flex items-center gap-2"><Calendar size={14} /> {t("modal.date")}: {active.date}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-soft)]">{active.description}</p>
              <a
                href={active.downloadUrl ?? "#"}
                download={active.downloadUrl ? active.title : undefined}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90"
              >
                <Download size={14} /> {t("modal.download")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
