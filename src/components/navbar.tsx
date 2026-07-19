"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Container } from "./ui/container";
import { cn } from "@/lib/utils";

const SECTIONS = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "services",
  "certificates",
  "gallery",
  "blog",
  "testimonials",
  "contact"
] as const;

const LANGS = [
  { code: "uz", flag: "🇺🇿", label: "UZ" },
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "ru", flag: "🇷🇺", label: "RU" }
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-[var(--color-line)] py-3 shadow-sm"
          : "bg-[var(--color-bg)]/85 py-4 backdrop-blur-md"
      )}
    >
      <Container className="flex items-center justify-between gap-3">
        <button
          onClick={() => scrollTo("home")}
          className="shrink-0 font-mono text-lg font-semibold tracking-tight text-[var(--color-ink)]"
        >
          Aniko<span className="text-[var(--color-accent)]">.</span>
        </button>

        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-[var(--color-line)]/70 bg-[var(--color-card)]/70 p-1 backdrop-blur-sm" aria-label="Primary">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                "relative px-3 py-2 text-sm font-medium rounded-full transition-colors",
                active === id ? "text-[var(--color-accent)]" : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
              )}
            >
              {active === id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-[var(--color-accent)]/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{t(id)}</span>
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-sm text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
            >
              <span>{LANGS.find((l) => l.code === locale)?.flag}</span>
              <span className="font-mono text-xs">{locale.toUpperCase()}</span>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                  className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-card)] shadow-lg"
                >
                  {LANGS.map((l) => (
                    <li key={l.code}>
                      <button
                        role="option"
                        aria-selected={locale === l.code}
                        onClick={() => {
                          setLangOpen(false);
                          router.replace(pathname, { locale: l.code });
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-[var(--color-accent)]/10 transition-colors",
                          locale === l.code && "text-[var(--color-accent)]"
                        )}
                      >
                        <span>{l.flag}</span>
                        {l.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] hover:border-[var(--color-accent)] transition-colors"
          >
            {mounted && resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] text-[var(--color-ink)] lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden glass border-t border-[var(--color-line)]"
          >
            <Container className="flex flex-col gap-1 py-4">
              {SECTIONS.map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-left text-sm font-medium",
                    active === id ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10" : "text-[var(--color-ink-soft)]"
                  )}
                >
                  {t(id)}
                </button>
              ))}
              <div className="mt-2 flex gap-2 border-t border-[var(--color-line)] pt-4">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      router.replace(pathname, { locale: l.code });
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-1 rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs",
                      locale === l.code && "border-[var(--color-accent)] text-[var(--color-accent)]"
                    )}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
