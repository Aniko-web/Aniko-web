"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen loading sequence shown on first paint.
 * Uses @lottiefiles/dotlottie-web to render an animated mark on a canvas,
 * exactly as provided:
 *
 *   import { DotLottie } from '@lottiefiles/dotlottie-web';
 *   new DotLottie({ autoplay: true, loop: true, canvas, src: '...' });
 *
 * Replace LOTTIE_SRC below with your own .lottie / .json animation URL.
 * If left as-is, or if the network request fails, an elegant CSS
 * fallback mark is shown instead so the loader never breaks.
 */
const LOTTIE_SRC = "https://lottie.host/5896cd92-d813-405f-bd79-8c2ae44fa375/6RJOVIKuGc.lottie"; // e.g. "https://lottie.host/YOUR_ANIMATION_ID.lottie"

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lottieFailed, setLottieFailed] = useState(!LOTTIE_SRC);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const minTimer = setTimeout(() => setDone(true), 1600);
    return () => {
      clearTimeout(minTimer);
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  useEffect(() => {
    if (!LOTTIE_SRC || !canvasRef.current) return;
    let instance: import("@lottiefiles/dotlottie-web").DotLottie | undefined;

    import("@lottiefiles/dotlottie-web")
      .then(({ DotLottie }) => {
        if (!canvasRef.current) return;
        instance = new DotLottie({
          autoplay: true,
          loop: true,
          canvas: canvasRef.current,
          src: LOTTIE_SRC
        });
      })
      .catch(() => setLottieFailed(true));

    return () => instance?.destroy();
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[var(--color-bg)]"
          aria-label="Loading"
          role="status"
        >
          <div className="relative flex h-[280px] w-[280px] items-center justify-center">
            {!lottieFailed && (
              <canvas ref={canvasRef} width={280} height={280} className="h-[280px] w-[280px]" />
            )}
            {lottieFailed && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                className="h-32 w-32 rounded-full border-[4px] border-[var(--color-line)] border-t-[var(--color-accent)]"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
