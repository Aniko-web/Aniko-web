"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { Container } from "../ui/container";
import { MagneticButton } from "../ui/magnetic-button";

function TypingRoles({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length];
    const speed = deleting ? 35 : 65;
    const pause = !deleting && subIndex === current.length ? 1400 : deleting && subIndex === 0 ? 300 : speed;

    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((s) => s + 1);
      } else if (!deleting && subIndex === current.length) {
        setDeleting(true);
      } else if (deleting && subIndex > 0) {
        setSubIndex((s) => s - 1);
      } else {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      }
    }, pause);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <span className="text-[var(--color-accent)]">
      {roles[index % roles.length].slice(0, subIndex)}
      <span className="inline-block w-[2px] h-[1em] align-middle bg-[var(--color-accent)] ml-1 animate-blink" />
    </span>
  );
}

function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-10 right-10 h-40 w-40 rounded-[38%] bg-gradient-to-br from-[var(--color-accent)]/20 to-transparent blur-2xl animate-float-slow" />
      <div className="absolute top-10 left-1/2 h-2 w-2 rounded-full bg-[var(--color-accent)] animate-float" />
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const roles = t.raw("roles") as string[];

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 100, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="noise relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-100"
      >
        <div className="time-photo-backdrop absolute inset-0 opacity-80 brightness-105 saturate-115 [mask-image:radial-gradient(circle_at_center,black_62%,transparent_94%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--color-accent),transparent_70%)] opacity-[0.45]" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,var(--color-accent),transparent_70%)] opacity-[0.04]" />
      <FloatingShapes />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 sm:p-3">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-sm text-[var(--color-ink-soft)]"
          >
            {t("greeting")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gradient drop-shadow-[0_1px_1px_rgba(255,255,255,0.16)]"
          >
            {t("name")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 h-9 text-xl sm:text-2xl font-medium text-[var(--color-ink)]"
          >
            <TypingRoles roles={roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed text-[var(--color-ink-soft)]"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("ctaProjects")}
            </MagneticButton>
            <MagneticButton variant="outline">
              <Download size={15} />
              {t("ctaCv")}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
        >
          <div className="absolute inset-0 rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-card)]/70 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-[var(--color-line)] px-5 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="p-6 font-mono text-[13px] leading-7 text-[var(--color-ink-soft)]">
              <p><span className="text-[var(--color-accent)]">const</span> dev = {"{"}</p>
              <p className="pl-4">stack: [<span className="text-[var(--color-accent)]">&apos;React&apos;</span>, <span className="text-[var(--color-accent)]">&apos;Python&apos;</span>],</p>
              <p className="pl-4">focus: <span className="text-[var(--color-accent)]">&apos;AI products&apos;</span>,</p>
              <p className="pl-4">languages: [<span className="text-[var(--color-accent)]">&apos;uz&apos;</span>, <span className="text-[var(--color-accent)]">&apos;en&apos;</span>],</p>
              <p className="pl-4">shipping: <span className="text-[var(--color-accent)]">true</span>,</p>
              <p>{"}"}</p>
            </div>
          </div>
        </motion.div>
      </Container>

      <motion.button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[var(--color-ink-soft)]"
      >
        {t("scroll")}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.span>
      </motion.button>
    </section>
  );
}
