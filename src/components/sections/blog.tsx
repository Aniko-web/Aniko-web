"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, Clock } from "lucide-react";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";

interface BlogItem {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
}

const PAGE_SIZE = 3;

export function Blog() {
  const t = useTranslations("blog");
  const items = t.raw("items") as BlogItem[];
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => items.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section id="blog" className="relative py-28">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />
      <Container>
        <div className="relative mb-10 w-full max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-soft)]" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder={t("search")}
            className="w-full rounded-full border border-[var(--color-line)] bg-[var(--color-card)] py-2 pl-9 pr-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)] focus:border-[var(--color-accent)] outline-none transition-colors"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col rounded-2xl border border-[var(--color-line)] bg-[var(--color-card)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-accent)]/40"
            >
              <div className="h-32 rounded-t-2xl bg-gradient-to-br from-[var(--color-accent)]/15 to-transparent" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-[var(--color-ink-soft)]">
                  <span className="rounded-full border border-[var(--color-line)] px-2.5 py-0.5">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--color-ink)]">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-[var(--color-line)] pt-4">
                  <span className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
                    <Clock size={12} /> {post.readTime} {t("minRead")}
                  </span>
                  <button className="flex items-center gap-1 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">
                    {t("readMore")} <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                aria-label={`Page ${i + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  page === i + 1 ? "bg-[var(--color-accent)]" : "bg-[var(--color-line)]"
                }`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
