/**
 * 诗经数据服务
 */

import { ShijingItem, ShijingPoem } from '../types/shijing';
import { Poem } from '../types';
import shijingData from '../source_data/诗经/shijing.json';

let shijingPoems: ShijingPoem[] | null = null;

/**
 * 加载诗经数据
 */
export async function loadShijingData(): Promise<ShijingItem[]> {
  return shijingData as ShijingItem[];
}

/**
 * 将诗经数据转换为诗词格式
 */
export function convertShijingToPoems(shijingItems: ShijingItem[]): ShijingPoem[] {
  return shijingItems.map((item, index) => {
    const id = `shijing_${index + 1}`;
    
    return {
      id,
      title: item.title,
      author: '佚名',
      content: item.content,
      dynasty: '先秦',
      tags: ['诗经', item.chapter, item.section],
      category: '诗经',
      source: 'shijing',
      metadata: {
        chapter: item.chapter,
        section: item.section,
        originalId: id
      }
    };
  });
}

/**
 * 获取诗经诗词数据
 */
export async function getShijingPoems(): Promise<ShijingPoem[]> {
  if (shijingPoems) {
    return shijingPoems;
  }

  const data = await loadShijingData();
  shijingPoems = convertShijingToPoems(data);
  return shijingPoems;
}

/**
 * 搜索诗经诗词
 */
export async function searchShijing(query: string): Promise<ShijingPoem[]> {
  const poems = await getShijingPoems();
  
  if (!query.trim()) {
    return poems;
  }

  const lowercaseQuery = query.toLowerCase();
  
  return poems.filter(poem =>
    poem.title.toLowerCase().includes(lowercaseQuery) ||
    poem.content.some(line => line.toLowerCase().includes(lowercaseQuery)) ||
    poem.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * 根据ID获取诗经诗词
 */
export async function getShijingPoemById(id: string): Promise<ShijingPoem | null> {
  const poems = await getShijingPoems();
  return poems.find(poem => poem.id === id) || null;
}

/**
 * 获取诗经统计信息
 */
export async function getShijingStats() {
  const poems = await getShijingPoems();
  const chapters = [...new Set(poems.map(p => p.metadata?.chapter).filter(Boolean))];
  const sections = [...new Set(poems.map(p => p.metadata?.section).filter(Boolean))];
  
  return {
    total: poems.length,
    chapters: chapters.length,
    sections: sections.length
  };
}