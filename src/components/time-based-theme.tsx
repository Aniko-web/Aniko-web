"use client";

import { useEffect } from "react";
import { getTimeOfDay } from "../lib/time-of-day";

export function TimeBasedTheme() {
  useEffect(() => {
    const updateTimeTheme = () => {
      const timeOfDay = getTimeOfDay();

      document.documentElement.dataset.timeOfDay = timeOfDay;
      document.documentElement.style.colorScheme = timeOfDay === "night" ? "dark" : "light";
    };

    updateTimeTheme();
    const intervalId = window.setInterval(updateTimeTheme, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  return null;
}
