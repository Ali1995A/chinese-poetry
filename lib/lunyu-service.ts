import { LunyuChapter, LunyuPoem } from '../types/lunyu';
import lunyuData from '../source_data/论语/lunyu.json';

/**
 * 论语数据服务
 * 专门处理论语数据的加载和转换
 */

// 论语数据缓存
let lunyuPoemsCache: LunyuPoem[] | null = null;

/**
 * 将论语原始数据转换为诗词格式
 */
function convertLunyuToPoems(): LunyuPoem[] {
  const poems: LunyuPoem[] = [];
  let globalIndex = 1;

  lunyuData.forEach((chapter: LunyuChapter, chapterIndex: number) => {
    chapter.paragraphs.forEach((paragraph: string, paragraphIndex: number) => {
      // 为每个段落创建一个诗词条目
      const poem: LunyuPoem = {
        id: `lunyu-${globalIndex}`,
        title: `${chapter.chapter}·第${paragraphIndex + 1}段`,
        author: '孔子及其弟子',
        dynasty: '春秋',
        content: [paragraph],
        tags: ['论语', '儒家', '经典', chapter.chapter],
        chapter: chapter.chapter,
        paragraphIndex: paragraphIndex,
        originalText: paragraph
      };
      
      poems.push(poem);
      globalIndex++;
    });
  });

  return poems;
}

/**
 * 获取所有论语诗词
 */
export async function getAllLunyuPoems(): Promise<LunyuPoem[]> {
  if (lunyuPoemsCache) {
    return lunyuPoemsCache;
  }

  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  lunyuPoemsCache = convertLunyuToPoems();
  return lunyuPoemsCache;
}

/**
 * 根据ID获取论语诗词
 */
export async function getLunyuPoemById(id: string): Promise<LunyuPoem | null> {
  const poems = await getAllLunyuPoems();
  return poems.find(poem => poem.id === id) || null;
}

/**
 * 搜索论语诗词
 */
export async function searchLunyuPoems(query: string): Promise<{ poems: LunyuPoem[], total: number }> {
  const poems = await getAllLunyuPoems();
  
  if (!query.trim()) {
    return { poems: [], total: 0 };
  }

  const lowerQuery = query.toLowerCase();
  const filteredPoems = poems.filter(poem =>
    poem.title.toLowerCase().includes(lowerQuery) ||
    poem.content.some(line => line.toLowerCase().includes(lowerQuery)) ||
    poem.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    poem.chapter.toLowerCase().includes(lowerQuery)
  );

  return {
    poems: filteredPoems,
    total: filteredPoems.length
  };
}

/**
 * 获取论语章节列表
 */
export async function getLunyuChapters(): Promise<LunyuChapter[]> {
  return lunyuData;
}

/**
 * 根据章节获取论语诗词
 */
export async function getLunyuPoemsByChapter(chapterName: string): Promise<LunyuPoem[]> {
  const poems = await getAllLunyuPoems();
  return poems.filter(poem => poem.chapter === chapterName);
}

/**
 * 获取随机论语诗词
 */
export async function getRandomLunyuPoem(): Promise<LunyuPoem> {
  const poems = await getAllLunyuPoems();
  const randomIndex = Math.floor(Math.random() * poems.length);
  return poems[randomIndex];
}

/**
 * 获取论语统计信息
 */
export async function getLunyuStats(): Promise<{
  totalChapters: number;
  totalParagraphs: number;
  totalPoems: number;
}> {
  const poems = await getAllLunyuPoems();
  const chapters = await getLunyuChapters();
  
  return {
    totalChapters: chapters.length,
    totalParagraphs: poems.length,
    totalPoems: poems.length
  };
}