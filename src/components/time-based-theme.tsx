"use client";

import { useEffect } from "react";

export function TimeBasedTheme() {
  useEffect(() => {
    const updateTimeTheme = () => {
      const now = new Date();
      const hour = Number(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Tashkent",
          hour: "2-digit",
          hour12: false
        })
          .formatToParts(now)
          .find((part) => part.type === "hour")?.value ?? "0"
      );

      const timeOfDay =
        hour >= 5 && hour < 12
          ? "morning"
          : hour >= 12 && hour < 17
            ? "afternoon"
            : hour < 20
              ? "sunset"
              : "night";

      document.documentElement.dataset.timeOfDay = timeOfDay;
      document.documentElement.style.colorScheme = timeOfDay === "night" ? "dark" : "light";
    };

    updateTimeTheme();
    const intervalId = window.setInterval(updateTimeTheme, 60000);

    return () => window.clearInterval(intervalId);
  }, []);

  return null;
}
