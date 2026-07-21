export interface Skill {
  name: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "ai" | "database" | "tools";
}

export const skills: Skill[] = [
  { name: "React", level: 90, category: "frontend" },
  { name: "Next.js", level: 82, category: "frontend" },
  { name: "Tailwind CSS", level: 88, category: "frontend" },
  { name: "JavaScript", level: 50, category: "frontend" },
  { name: "Python", level: 80, category: "backend" },
  { name: "FastAPI", level: 78, category: "backend" },
  { name: "C# ", level: 65, category: "backend" },
  { name: "Claude API", level: 24, category: "ai" },
  { name: "Gemini API", level: 75, category: "ai" },
  { name: "Prompt Engineering", level: 84, category: "ai" },
  { name: "PostgreSQL", level: 72, category: "database" },
  { name: "SQLite", level: 14, category: "database" },
  { name: "Redis", level: 65, category: "database" },
  { name: "Git & GitHub", level: 88, category: "tools" },
  { name: "Vite", level: 85, category: "tools" },
  { name: "Figma", level: 68, category: "tools" }
];
