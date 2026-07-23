export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export function getTimeOfDay(date = new Date()): TimeOfDay {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Tashkent",
      hour: "2-digit",
      hour12: false
    })
      .formatToParts(date)
      .find((part) => part.type === "hour")?.value ?? "0"
  );

  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour < 20) return "evening";
  return "night";
}
