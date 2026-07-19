"use client";

import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";

interface ExperienceItem {
  company: string;
  position: string;
  date: string;
  description: string;
}

export function Experience() {
  const t = useTranslations("experience");
  const items = t.raw("items") as ExperienceItem[];

  return (
    <section id="experience" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Container className="max-w-3xl">
        <div className="relative border-l border-[var(--color-line)] pl-10">
          {items.map((item, i) => (
            <Reveal key={item.company} delay={i * 0.1} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[calc(2.5rem+9px)] top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-bg)]">
                <Briefcase size={9} className="text-[var(--color-accent)]" />
              </span>
              <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-[var(--color-ink)]">{item.position}</h3>
                  <span className="font-mono text-xs text-[var(--color-accent)]">{item.date}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-[var(--color-ink-soft)]">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-soft)]">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
