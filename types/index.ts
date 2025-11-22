// types/index.ts

export interface Poem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string[]; // Array of strings for each line
  tags: string[];
  translation?: string;
  notes?: Record<string, string>; // e.g. { "疑": "怀疑" }
}