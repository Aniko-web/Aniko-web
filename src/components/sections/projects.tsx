"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "../icons";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { cn } from "@/lib/utils";

interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  category: string[];
}

const FILTERS = ["all", "frontend", "backend", "ai", "bots"] as const;

export function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as ProjectItem[];
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const visible = filter === "all" ? items : items.filter((p) => p.category.includes(filter));

  return (
    <section id="projects" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Container>
        <div className="mb-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === f
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              )}
            >
              {t(`filters.${f}`)}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                layout
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[var(--color-accent)]/40"
              >
                <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-[var(--color-accent)]/15 via-transparent to-[var(--color-accent-2)]/10">
                  <Sparkles className="text-[var(--color-accent)]/50 transition-transform duration-500 group-hover:scale-110" size={36} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-[var(--color-ink)]">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--color-line)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-ink-soft)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-4 border-t border-[var(--color-line)] pt-4">
                    <button className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">
                      <ExternalLink size={14} /> {t("liveDemo")}
                    </button>
                    <button className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-accent)] transition-colors">
                      <GithubIcon className="h-3.5 w-3.5" /> {t("code")}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
