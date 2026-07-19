"use client";

import { motion } from "framer-motion";
import { Container } from "./container";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Container className={cn("mb-14", className)}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}
      >
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
          <span className="h-px w-6 bg-[var(--color-accent)]" />
          {eyebrow}
        </span>
        <h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-ink)]">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            {description}
          </p>
        )}
      </motion.div>
    </Container>
  );
}
