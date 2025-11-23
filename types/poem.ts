/**
 * 标准诗词数据类型定义
 */

export interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
  paragraphs: string[];
  type: string;
  dynasty: string;
  source: string;
  tags: string[];
  metadata?: {
    originalId?: string;
    chapter?: string;
    section?: string;
    [key: string]: any;
  };
}