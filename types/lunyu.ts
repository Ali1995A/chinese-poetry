// 论语数据类型定义
export interface LunyuChapter {
  chapter: string;
  paragraphs: string[];
}

export interface LunyuData {
  chapters: LunyuChapter[];
}

// 论语条目转换为诗词格式的接口
export interface LunyuPoem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string[];
  tags: string[];
  chapter: string;
  paragraphIndex: number;
  originalText: string;
}