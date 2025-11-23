/**
 * 元曲数据类型定义
 */

export interface YuanquItem {
  title: string;        // 曲牌名
  author: string;       // 作者
  dynasty: string;      // 朝代
  paragraphs: string[]; // 曲文内容数组
}

export interface YuanquPoem {
  id: string;
  title: string;
  author: string;
  content: string[];
  dynasty: string;
  tags: string[];
  category: string;
  source: string;
  metadata?: {
    originalId?: string;
  };
}