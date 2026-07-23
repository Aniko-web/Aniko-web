"use client";

import { useState, type SVGProps } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Mail, Phone, Copy, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../icons";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";
import { Reveal } from "../ui/reveal";
import { MagneticButton } from "../ui/magnetic-button";

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const EMAIL = "anikosanuno@gmail.com";
const SOCIALS = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/Aniko-web" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Send, label: "Telegram", href: "https://t.me/aniko_ss" },
  { icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/a.sattorqulov?igsh=eTl4c3h6bDFxZHJ2" }
];

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});
type FormValues = z.infer<typeof schema>;

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));

    const subject = encodeURIComponent(`Portfolio contact from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setStatus("success");
    reset();
    setTimeout(() => setStatus("idle"), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] p-7 shadow-sm">
            <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
              {t("info")}
            </h3>
            <button
              onClick={copyEmail}
              className="mt-4 flex items-center gap-2.5 text-sm text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
            >
              <Mail size={15} /> anikosanuno@gmail.com
              {copied ? <Check size={13} className="text-[var(--color-accent)]" /> : <Copy size={13} />}
            </button>
            <p className="mt-3 flex items-center gap-2.5 text-sm text-[var(--color-ink)]">
              <Phone size={15} /> +998 (93) 321 82 28
            </p>

            <h3 className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
              {t("social")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => {
                const Icon = s.icon;

                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                  </a>
                );
              })}
            </div>

            <div className="mt-8 h-40 rounded-xl border border-[var(--color-line)] bg-[radial-gradient(circle_at_30%_30%,var(--color-accent),transparent_60%)] bg-[var(--color-bg)] opacity-70" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                {t("form.name")}
              </label>
              <input
                id="name"
                {...register("name")}
                placeholder={t("form.namePlaceholder")}
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:border-[var(--color-accent)] outline-none transition-colors"
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-500">{t("form.errors.name")}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                {t("form.email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder={t("form.emailPlaceholder")}
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:border-[var(--color-accent)] outline-none transition-colors"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{t("form.errors.email")}</p>}
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--color-ink)]">
                {t("form.message")}
              </label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                placeholder={t("form.messagePlaceholder")}
                className="w-full resize-none rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:border-[var(--color-accent)] outline-none transition-colors"
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500">{t("form.errors.message")}</p>}
            </div>

            <MagneticButton type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
              {status === "sending" ? t("form.sending") : t("form.send")}
            </MagneticButton>

            {status === "success" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-[var(--color-accent)]"
              >
                {t("form.success")}
              </motion.p>
            )}
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
