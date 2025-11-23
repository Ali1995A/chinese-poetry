// 楚辞数据类型定义
export interface ChuciItem {
  title: string;
  section: string;
  author: string;
  content: string[];
}

export interface ChuciData {
  items: ChuciItem[];
}

// 楚辞条目转换为诗词格式的接口
export interface ChuciPoem {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string[];
  tags: string[];
  section: string;
  originalText: string;
}