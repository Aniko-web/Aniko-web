"use client";

import { useTranslations } from "next-intl";
import { Send, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Container } from "./ui/container";

const SOCIALS = [
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Send, href: "https://t.me", label: "Telegram" },
  { icon: Mail, href: "mailto:hello@aniko.dev", label: "Email" }
];

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="border-t border-[var(--color-line)] py-14">
      <Container className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div>
          <p className="font-mono text-lg font-semibold text-[var(--color-ink)]">
            Aniko<span className="text-[var(--color-accent)]">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-[var(--color-ink-soft)]">{t("tagline")}</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[var(--color-ink-soft)]">
          {(["about", "projects", "services", "contact"] as const).map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className="hover:text-[var(--color-accent)] transition-colors">
              {nav(id)}
            </button>
          ))}
        </nav>

        <div className="flex gap-2.5">
          {SOCIALS.map((s) => {
            const Icon = s.icon;

            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                <Icon className="h-[15px] w-[15px] shrink-0" />
              </a>
            );
          })}
        </div>
      </Container>
      <Container className="mt-10 border-t border-[var(--color-line)] pt-6 text-center text-xs text-[var(--color-ink-soft)]">
        © {year} Aniko. {t("rights")}
      </Container>
    </footer>
  );
}
