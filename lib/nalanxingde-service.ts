import { NalanXingdePoem } from '../types/nalanxingde';
import { Poem } from '../types/poem';
import fs from 'fs/promises';
import path from 'path';

// 加载纳兰性德诗词数据
export async function loadNalanXingdePoems(): Promise<NalanXingdePoem[]> {
  try {
    const filePath = path.join(process.cwd(), 'source_data', '纳兰性德', '纳兰性德诗集.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data: NalanXingdePoem[] = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error('Error loading Nalan Xingde poems:', error);
    return [];
  }
}

// 将纳兰性德数据转换为标准诗词格式
export function convertNalanXingdeToPoems(nalanPoems: NalanXingdePoem[]): Poem[] {
  return nalanPoems.map((nalanPoem, index) => ({
    id: `nalan-${index}`,
    title: nalanPoem.title,
    author: nalanPoem.author,
    content: nalanPoem.para.join('\n'),
    paragraphs: nalanPoem.para,
    type: 'ci',
    dynasty: '清',
    source: '纳兰性德',
    tags: ['纳兰性德', '清', '词', '婉约派']
  }));
}

// 搜索纳兰性德诗词
export function searchNalanXingdePoems(poems: Poem[], query: string): Poem[] {
  const lowerQuery = query.toLowerCase();
  return poems.filter(poem => 
    poem.title.toLowerCase().includes(lowerQuery) ||
    poem.content.toLowerCase().includes(lowerQuery) ||
    poem.author.toLowerCase().includes(lowerQuery)
  );
}

// 获取所有纳兰性德诗词
export async function getAllNalanXingdePoems(): Promise<Poem[]> {
  const nalanPoems = await loadNalanXingdePoems();
  return convertNalanXingdeToPoems(nalanPoems);
}

// 根据ID获取纳兰性德诗词
export async function getNalanXingdePoemById(id: string): Promise<Poem | null> {
  const poems = await getAllNalanXingdePoems();
  return poems.find(poem => poem.id === id) || null;
}