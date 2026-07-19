"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { skills, type Skill } from "@/data/skills";
import { cn } from "@/lib/utils";

const CATEGORIES: Skill["category"][] = ["frontend", "backend", "ai", "database", "tools"];

export function Skills() {
  const t = useTranslations("skills");
  const [filter, setFilter] = useState<Skill["category"] | "all">("all");

  const visible = filter === "all" ? skills : skills.filter((s) => s.category === filter);

  return (
    <section id="skills" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Container>
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === "all"
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                filter === cat
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                  : "border-[var(--color-line)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              )}
            >
              {t(`categories.${cat}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((skill, i) => (
            <Reveal key={skill.name} delay={(i % 8) * 0.05}>
              <div className="group rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-accent)]/40">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--color-ink)]">{skill.name}</span>
                  <span className="font-mono text-xs text-[var(--color-ink-soft)]">{skill.level}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-line)]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-2)]"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
