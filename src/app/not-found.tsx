"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#FAFAFA] px-6 text-center font-sans">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-7xl font-semibold text-[#2563EB]"
          >
            404
          </motion.p>
          <h1 className="text-2xl font-semibold text-[#111111]">Page not found</h1>
          <p className="max-w-sm text-sm text-[#666666]">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
          </p>
          <Link
            href="/en"
            className="rounded-full bg-[#111111] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Back home
          </Link>
        </div>
      </body>
    </html>
  );
}
