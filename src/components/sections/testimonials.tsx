"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";

interface TestimonialItem {
  name: string;
  position: string;
  comment: string;
}

export function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as TestimonialItem[];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 5500);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section id="testimonials" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
      <Container className="max-w-2xl">
        <div className="relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-3xl border border-[var(--color-line)] p-10 text-center shadow-lg"
            >
              <Quote className="mx-auto text-[var(--color-accent)]/50" size={28} />
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink)]">
                &ldquo;{items[index].comment}&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]/15 font-mono text-sm font-medium text-[var(--color-accent)]">
                  {items[index].name.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[var(--color-ink)]">{items[index].name}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{items[index].position}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === i ? "w-6 bg-[var(--color-accent)]" : "w-2 bg-[var(--color-line)]"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
