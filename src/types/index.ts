export interface StatItem {
  label: string;
  icon: string;
  colorClass: string;
  value: number; // 0–100
}

export interface ProjectCard {
  title: string;
  desc: string;
  tags: string[];
}

export interface ZoneData {
  key: string;
  name: string;
  color: string;
  bg: string;
  sub: string;
  intro: string;
  projects: ProjectCard[];
}

export interface InventoryItem {
  icon: string;
  label: string;
  active: boolean;
}

export type ZoneId = 1 | 2 | 3 | 4 | 5;
