import { CaoCaoPoem } from '../types/caocao';
import { Poem } from '../types/poem';
import fs from 'fs/promises';
import path from 'path';

// 加载曹操诗集数据
export async function loadCaoCaoPoems(): Promise<CaoCaoPoem[]> {
  try {
    const filePath = path.join(process.cwd(), 'source_data', '曹操诗集', 'caocao.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data: CaoCaoPoem[] = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.error('Error loading CaoCao poems:', error);
    return [];
  }
}

// 将曹操诗集数据转换为标准诗词格式
export function convertCaoCaoToPoems(caocaoPoems: CaoCaoPoem[]): Poem[] {
  return caocaoPoems.map((caocaoPoem, index) => ({
    id: `caocao-${index}`,
    title: caocaoPoem.title,
    author: '曹操',
    content: caocaoPoem.paragraphs.join('\n'),
    paragraphs: caocaoPoem.paragraphs,
    type: 'poem',
    dynasty: '汉末',
    source: '曹操诗集',
    tags: ['曹操', '汉末', '建安文学']
  }));
}

// 搜索曹操诗集
export function searchCaoCaoPoems(poems: Poem[], query: string): Poem[] {
  const lowerQuery = query.toLowerCase();
  return poems.filter(poem => 
    poem.title.toLowerCase().includes(lowerQuery) ||
    poem.content.toLowerCase().includes(lowerQuery) ||
    poem.author.toLowerCase().includes(lowerQuery)
  );
}

// 获取所有曹操诗词
export async function getAllCaoCaoPoems(): Promise<Poem[]> {
  const caocaoPoems = await loadCaoCaoPoems();
  return convertCaoCaoToPoems(caocaoPoems);
}

// 根据ID获取曹操诗词
export async function getCaoCaoPoemById(id: string): Promise<Poem | null> {
  const poems = await getAllCaoCaoPoems();
  return poems.find(poem => poem.id === id) || null;
}