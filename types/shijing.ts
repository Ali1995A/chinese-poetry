/**
 * 诗经数据类型定义
 */

export interface ShijingItem {
  title: string;      // 诗篇标题
  chapter: string;    // 篇章（如：国风、小雅等）
  section: string;    // 章节（如：周南、召南等）
  content: string[];  // 诗句内容数组
}

export interface ShijingPoem {
  id: string;
  title: string;
  author: string;
  content: string[];
  dynasty: string;
  tags: string[];
  category: string;
  source: string;
  metadata?: {
    chapter?: string;
    section?: string;
    originalId?: string;
  };
}