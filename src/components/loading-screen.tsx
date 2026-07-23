"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getTimeOfDay } from "../lib/time-of-day";

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
const LOTTIE_SRC_BY_TIME: Record<string, string> = {
  morning: "https://lottie.host/4a1db694-de71-4f57-88d0-f55c0633fa44/WIJ2hks7Y0.json",
  afternoon: "https://lottie.host/2eea5b84-29c5-42e8-81ef-27d5177fec2b/nOaDZNhSZc.json",
  evening: "https://lottie.host/dda6f09e-73a5-4901-b6e6-e9fa030bae96/egFJBpOuzQ.lottie",
  sunset: "https://lottie.host/dda6f09e-73a5-4901-b6e6-e9fa030bae96/egFJBpOuzQ.lottie",
  night: "https://lottie.host/80e9cef5-63a3-4337-aa5f-b147bdde17aa/rkv0GTaD0p.lottie"
};

export function LoadingScreen() {
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [lottieFailed, setLottieFailed] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      setTimeOfDay(getTimeOfDay());
    };

    updateTime();
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
    const lottieSrc = LOTTIE_SRC_BY_TIME[timeOfDay];
    if (!lottieSrc || !canvasRef.current) return;
    let instance: import("@lottiefiles/dotlottie-web").DotLottie | undefined;

    import("@lottiefiles/dotlottie-web")
      .then(({ DotLottie }) => {
        if (!canvasRef.current) return;
        instance = new DotLottie({
          autoplay: true,
          loop: true,
          canvas: canvasRef.current,
          src: lottieSrc
        });
      })
      .catch(() => setLottieFailed(true));

    return () => instance?.destroy();
  }, [timeOfDay]);

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
          <div className="relative flex h-[420px] w-[420px] items-center justify-center">
            {!lottieFailed && (
              <canvas ref={canvasRef} width={420} height={420} className="h-[420px] w-[420px]" />
            )}
            {lottieFailed && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                className="h-40 w-40 rounded-full border-[6px] border-[var(--color-line)] border-t-[var(--color-accent)] shadow-[0_0_30px_rgba(37,99,235,0.25)]"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
