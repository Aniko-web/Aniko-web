"use client";

import { useTranslations } from "next-intl";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}
interface StatItem {
  label: string;
  value: string;
}

export function About() {
  const t = useTranslations("about");
  const timeline = t.raw("timeline") as TimelineItem[];
  const stats = t.raw("stats") as StatItem[];

  return (
    <section id="about" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("intro")} />

      <Container className="grid gap-16 lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <h3 className="mb-8 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
              {t("timelineTitle")}
            </h3>
          </Reveal>
          <div className="relative border-l border-[var(--color-line)] pl-8">
            {timeline.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[calc(2rem+5px)] top-1 h-[10px] w-[10px] rounded-full bg-[var(--color-accent)] ring-4 ring-[var(--color-bg)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
                  {item.year}
                </span>
                <h4 className="mt-1.5 text-lg font-semibold text-[var(--color-ink)]">{item.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-ink-soft)]">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 self-start">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="group h-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-accent)]/40">
                <p className="text-2xl font-semibold tracking-tight text-[var(--color-ink)]">{stat.value}</p>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)]">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
