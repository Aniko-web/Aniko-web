"use client";

import { useTranslations } from "next-intl";
import { Globe, Bot, Server, Sparkles, LayoutTemplate, Workflow } from "lucide-react";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";

interface ServiceItem {
  title: string;
  description: string;
}

const ICONS = [Globe, Bot, Server, Sparkles, LayoutTemplate, Workflow];

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section id="services" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Reveal key={service.title} delay={i * 0.07}>
              <div className="group h-full rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-accent)]/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-[var(--color-ink)]">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-soft)]">{service.description}</p>
              </div>
            </Reveal>
          );
        })}
      </Container>
    </section>
  );
}
