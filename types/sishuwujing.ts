/**
 * 四书五经数据类型定义
 */

export interface SishuwujingChapter {
  chapter: string;
  paragraphs: string[];
}

export interface SishuwujingData {
  daxue: SishuwujingChapter;
  mengzi: SishuwujingChapter[];
  zhongyong: SishuwujingChapter;
}

export interface SishuwujingPoem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string;
  type: 'sishuwujing';
  source: 'daxue' | 'mengzi' | 'zhongyong';
  chapter?: string;
  paragraphs?: string[];
}