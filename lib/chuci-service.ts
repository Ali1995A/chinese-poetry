import { ChuciItem, ChuciPoem } from '../types/chuci';
import chuciData from '../source_data/楚辞/chuci.json';

/**
 * 楚辞数据服务
 * 专门处理楚辞数据的加载和转换
 */

// 楚辞数据缓存
let chuciPoemsCache: ChuciPoem[] | null = null;

/**
 * 将楚辞原始数据转换为诗词格式
 */
function convertChuciToPoems(): ChuciPoem[] {
  const poems: ChuciPoem[] = [];
  let globalIndex = 1;

  chuciData.forEach((item: ChuciItem, itemIndex: number) => {
    // 为每个楚辞条目创建一个诗词条目
    const poem: ChuciPoem = {
      id: `chuci-${globalIndex}`,
      title: item.title,
      author: item.author,
      dynasty: getDynastyByAuthor(item.author),
      content: item.content,
      tags: ['楚辞', '楚辞体', '诗歌', item.section, item.author],
      section: item.section,
      originalText: item.content.join('\n')
    };
    
    poems.push(poem);
    globalIndex++;
  });

  return poems;
}

/**
 * 根据作者确定朝代
 */
function getDynastyByAuthor(author: string): string {
  const dynastyMap: Record<string, string> = {
    '屈原': '战国',
    '宋玉': '战国',
    '景差': '战国',
    '贾谊': '西汉',
    '东方朔': '西汉',
    '庄忌': '西汉',
    '王褒': '西汉',
    '刘向': '西汉',
    '王逸': '东汉'
  };
  
  return dynastyMap[author] || '战国';
}

/**
 * 获取所有楚辞诗词
 */
export async function getAllChuciPoems(): Promise<ChuciPoem[]> {
  if (chuciPoemsCache) {
    return chuciPoemsCache;
  }

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  chuciPoemsCache = convertChuciToPoems();
  return chuciPoemsCache;
}

/**
 * 根据ID获取楚辞诗词
 */
export async function getChuciPoemById(id: string): Promise<ChuciPoem | null> {
  const poems = await getAllChuciPoems();
  return poems.find(poem => poem.id === id) || null;
}

/**
 * 搜索楚辞诗词
 */
export async function searchChuciPoems(query: string): Promise<{ poems: ChuciPoem[], total: number }> {
  const poems = await getAllChuciPoems();
  
  if (!query.trim()) {
    return { poems: [], total: 0 };
  }

  const lowerQuery = query.toLowerCase();
  const filteredPoems = poems.filter(poem =>
    poem.title.toLowerCase().includes(lowerQuery) ||
    poem.content.some(line => line.toLowerCase().includes(lowerQuery)) ||
    poem.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    poem.author.toLowerCase().includes(lowerQuery) ||
    poem.section.toLowerCase().includes(lowerQuery)
  );

  return {
    poems: filteredPoems,
    total: filteredPoems.length
  };
}

/**
 * 获取楚辞章节列表
 */
export async function getChuciSections(): Promise<string[]> {
  const poems = await getAllChuciPoems();
  const sections = [...new Set(poems.map(poem => poem.section))];
  return sections.sort();
}

/**
 * 根据章节获取楚辞诗词
 */
export async function getChuciPoemsBySection(sectionName: string): Promise<ChuciPoem[]> {
  const poems = await getAllChuciPoems();
  return poems.filter(poem => poem.section === sectionName);
}

/**
 * 获取楚辞作者列表
 */
export async function getChuciAuthors(): Promise<string[]> {
  const poems = await getAllChuciPoems();
  const authors = [...new Set(poems.map(poem => poem.author))];
  return authors.sort();
}

/**
 * 根据作者获取楚辞诗词
 */
export async function getChuciPoemsByAuthor(authorName: string): Promise<ChuciPoem[]> {
  const poems = await getAllChuciPoems();
  return poems.filter(poem => poem.author === authorName);
}

/**
 * 获取随机楚辞诗词
 */
export async function getRandomChuciPoem(): Promise<ChuciPoem> {
  const poems = await getAllChuciPoems();
  const randomIndex = Math.floor(Math.random() * poems.length);
  return poems[randomIndex];
}

/**
 * 获取楚辞统计信息
 */
export async function getChuciStats(): Promise<{
  totalPoems: number;
  totalSections: number;
  totalAuthors: number;
}> {
  const poems = await getAllChuciPoems();
  const sections = await getChuciSections();
  const authors = await getChuciAuthors();
  
  return {
    totalPoems: poems.length,
    totalSections: sections.length,
    totalAuthors: authors.length
  };
}