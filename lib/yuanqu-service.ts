/**
 * 元曲数据服务
 */

import { YuanquItem, YuanquPoem } from '../types/yuanqu';
import { Poem } from '../types';
import yuanquData from '../source_data/元曲/yuanqu.json';

let yuanquPoems: YuanquPoem[] | null = null;

/**
 * 加载元曲数据
 */
export async function loadYuanquData(): Promise<YuanquItem[]> {
  return yuanquData as YuanquItem[];
}

/**
 * 将元曲数据转换为诗词格式
 */
export function convertYuanquToPoems(yuanquItems: YuanquItem[]): YuanquPoem[] {
  return yuanquItems.map((item, index) => {
    const id = `yuanqu_${index + 1}`;
    const dynasty = item.dynasty === 'yuan' ? '元' : item.dynasty;
    
    return {
      id,
      title: item.title,
      author: item.author,
      content: item.paragraphs,
      dynasty: dynasty,
      tags: ['元曲', '散曲', item.author, dynasty],
      category: '元曲',
      source: 'yuanqu',
      metadata: {
        originalId: id
      }
    };
  });
}

/**
 * 获取元曲诗词数据
 */
export async function getYuanquPoems(): Promise<YuanquPoem[]> {
  if (yuanquPoems) {
    return yuanquPoems;
  }

  const data = await loadYuanquData();
  yuanquPoems = convertYuanquToPoems(data);
  return yuanquPoems;
}

/**
 * 搜索元曲诗词
 */
export async function searchYuanqu(query: string): Promise<YuanquPoem[]> {
  const poems = await getYuanquPoems();
  
  if (!query.trim()) {
    return poems;
  }

  const lowercaseQuery = query.toLowerCase();
  
  return poems.filter(poem => 
    poem.title.toLowerCase().includes(lowercaseQuery) ||
    poem.content.some(line => line.toLowerCase().includes(lowercaseQuery)) ||
    poem.author.toLowerCase().includes(lowercaseQuery) ||
    poem.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

/**
 * 根据ID获取元曲诗词
 */
export async function getYuanquPoemById(id: string): Promise<YuanquPoem | null> {
  const poems = await getYuanquPoems();
  return poems.find(poem => poem.id === id) || null;
}

/**
 * 获取元曲作者列表
 */
export async function getYuanquAuthors(): Promise<string[]> {
  const poems = await getYuanquPoems();
  const authors = [...new Set(poems.map(poem => poem.author))];
  return authors.sort();
}

/**
 * 根据作者获取元曲诗词
 */
export async function getYuanquPoemsByAuthor(authorName: string): Promise<YuanquPoem[]> {
  const poems = await getYuanquPoems();
  return poems.filter(poem => poem.author === authorName);
}

/**
 * 获取元曲统计信息
 */
export async function getYuanquStats() {
  const poems = await getYuanquPoems();
  const authors = await getYuanquAuthors();
  
  return {
    total: poems.length,
    authors: authors.length
  };
}