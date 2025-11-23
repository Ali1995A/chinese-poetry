import { MOCK_POEMS } from './mockData';
import { Poem } from '../types/poem';
import { getAllLunyuPoems, getLunyuPoemById, searchLunyuPoems, getRandomLunyuPoem } from './lunyu-service';
import { getAllChuciPoems, getChuciPoemById, searchChuciPoems, getRandomChuciPoem } from './chuci-service';
import { getShijingPoems, getShijingPoemById, searchShijing } from './shijing-service';
import { getYuanquPoems, getYuanquPoemById, searchYuanqu } from './yuanqu-service';
import { getAllCaoCaoPoems, getCaoCaoPoemById, searchCaoCaoPoems } from './caocao-service';
import { getAllNalanXingdePoems, getNalanXingdePoemById, searchNalanXingdePoems } from './nalanxingde-service';
import { LunyuPoem } from '../types/lunyu';
import { ChuciPoem } from '../types/chuci';
import { ShijingPoem } from '../types/shijing';
import { YuanquPoem } from '../types/yuanqu';

interface SearchResult {
  poems: Poem[];
  total: number;
}

/**
 * 将论语诗词转换为标准诗词格式
 */
function convertLunyuToStandardPoem(lunyuPoem: LunyuPoem): Poem {
  return {
    id: lunyuPoem.id,
    title: lunyuPoem.title,
    author: lunyuPoem.author,
    content: lunyuPoem.content.join('\n'),
    paragraphs: lunyuPoem.content,
    type: 'classic',
    dynasty: lunyuPoem.dynasty,
    source: '论语',
    tags: lunyuPoem.tags,
    metadata: {
      chapter: lunyuPoem.chapter,
      paragraphIndex: lunyuPoem.paragraphIndex,
      originalText: lunyuPoem.originalText
    }
  };
}

/**
 * 将楚辞诗词转换为标准诗词格式
 */
function convertChuciToStandardPoem(chuciPoem: ChuciPoem): Poem {
  return {
    id: chuciPoem.id,
    title: chuciPoem.title,
    author: chuciPoem.author,
    content: chuciPoem.content.join('\n'),
    paragraphs: chuciPoem.content,
    type: 'poem',
    dynasty: chuciPoem.dynasty,
    source: '楚辞',
    tags: chuciPoem.tags,
    metadata: {
      section: chuciPoem.section,
      originalText: chuciPoem.originalText
    }
  };
}

/**
 * 将诗经诗词转换为标准诗词格式
 */
function convertShijingToStandardPoem(shijingPoem: ShijingPoem): Poem {
  return {
    id: shijingPoem.id,
    title: shijingPoem.title,
    author: shijingPoem.author,
    content: shijingPoem.content.join('\n'),
    paragraphs: shijingPoem.content,
    type: 'poem',
    dynasty: shijingPoem.dynasty,
    source: '诗经',
    tags: shijingPoem.tags,
    metadata: {
      chapter: shijingPoem.metadata?.chapter,
      section: shijingPoem.metadata?.section,
      originalId: shijingPoem.metadata?.originalId
    }
  };
}

/**
 * 将元曲诗词转换为标准诗词格式
 */
function convertYuanquToStandardPoem(yuanquPoem: YuanquPoem): Poem {
  return {
    id: yuanquPoem.id,
    title: yuanquPoem.title,
    author: yuanquPoem.author,
    content: yuanquPoem.content.join('\n'),
    paragraphs: yuanquPoem.content,
    type: 'qu',
    dynasty: yuanquPoem.dynasty,
    source: '元曲',
    tags: yuanquPoem.tags,
    metadata: {
      originalId: yuanquPoem.metadata?.originalId
    }
  };
}

// 模拟网络延迟
const simulateNetworkDelay = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
};

/**
 * 获取所有诗词（包括所有数据源）
 * TODO: 替换为 Supabase 查询
 */
export async function getAllPoems(): Promise<Poem[]> {
  await simulateNetworkDelay();
  
  // TODO: 替换为 Supabase 查询
  // const { data, error } = await supabase.from('poems').select('*');
  // if (error) throw error;
  // return data;
  
  // 合并所有数据源
  const lunyuPoems = await getAllLunyuPoems();
  const chuciPoems = await getAllChuciPoems();
  const shijingPoems = await getShijingPoems();
  const yuanquPoems = await getYuanquPoems();
  const caocaoPoems = await getAllCaoCaoPoems();
  const nalanPoems = await getAllNalanXingdePoems();
  
  // 转换所有诗词为标准格式
  const convertedLunyuPoems = lunyuPoems.map(convertLunyuToStandardPoem);
  const convertedChuciPoems = chuciPoems.map(convertChuciToStandardPoem);
  const convertedShijingPoems = shijingPoems.map(convertShijingToStandardPoem);
  const convertedYuanquPoems = yuanquPoems.map(convertYuanquToStandardPoem);
  
  // 合并所有诗词
  const allPoems: Poem[] = [
    ...MOCK_POEMS,
    ...convertedLunyuPoems,
    ...convertedChuciPoems,
    ...convertedShijingPoems,
    ...convertedYuanquPoems,
    ...caocaoPoems,
    ...nalanPoems
  ];
  
  return allPoems;
}

/**
 * 根据ID获取诗词（包括所有数据源）
 * TODO: 替换为 Supabase 查询
 */
export async function getPoemById(id: string): Promise<Poem | null> {
  await simulateNetworkDelay();
  
  // TODO: 替换为 Supabase 查询
  // const { data, error } = await supabase
  //   .from('poems')
  //   .select('*')
  //   .eq('id', id)
  //   .single();
  // if (error) return null;
  // return data;
  
  // 首先在模拟诗词中查找
  const mockPoem = MOCK_POEMS.find(poem => poem.id === id);
  if (mockPoem) {
    return mockPoem;
  }
  
  // 然后在论语数据中查找
  const lunyuPoem = await getLunyuPoemById(id);
  if (lunyuPoem) {
    return convertLunyuToStandardPoem(lunyuPoem);
  }
  
  // 在楚辞数据中查找
  const chuciPoem = await getChuciPoemById(id);
  if (chuciPoem) {
    return convertChuciToStandardPoem(chuciPoem);
  }
  
  // 在诗经数据中查找
  const shijingPoem = await getShijingPoemById(id);
  if (shijingPoem) {
    return convertShijingToStandardPoem(shijingPoem);
  }
  
  // 在元曲数据中查找
  const yuanquPoem = await getYuanquPoemById(id);
  if (yuanquPoem) {
    return convertYuanquToStandardPoem(yuanquPoem);
  }
  
  // 在曹操诗集数据中查找
  const caocaoPoem = await getCaoCaoPoemById(id);
  if (caocaoPoem) {
    return caocaoPoem;
  }
  
  // 在纳兰性德数据中查找
  const nalanPoem = await getNalanXingdePoemById(id);
  if (nalanPoem) {
    return nalanPoem;
  }
  
  return null;
}

/**
 * 搜索诗词（包括所有数据源）
 * TODO: 替换为 Supabase 全文搜索
 */
export async function searchPoems(query: string): Promise<SearchResult> {
  await simulateNetworkDelay();
  
  if (!query.trim()) {
    return { poems: [], total: 0 };
  }
  
  // TODO: 替换为 Supabase 全文搜索
  // const { data, error, count } = await supabase
  //   .from('poems')
  //   .select('*', { count: 'exact' })
  //   .textSearch('search_vector', query);
  // if (error) return { poems: [], total: 0 };
  // return { poems: data, total: count || 0 };
  
  const lowerQuery = query.toLowerCase();
  
  // 搜索模拟诗词
  const filteredMockPoems = MOCK_POEMS.filter(poem =>
    poem.title.toLowerCase().includes(lowerQuery) ||
    poem.author.toLowerCase().includes(lowerQuery) ||
    poem.content.toLowerCase().includes(lowerQuery) ||
    poem.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
  );
  
  // 搜索论语数据
  const lunyuResult = await searchLunyuPoems(query);
  
  // 搜索楚辞数据
  const chuciResult = await searchChuciPoems(query);
  
  // 搜索诗经数据
  const shijingResult = await searchShijing(query);
  
  // 搜索元曲数据
  const yuanquResult = await searchYuanqu(query);
  
  // 搜索曹操诗集数据
  const caocaoPoems = await getAllCaoCaoPoems();
  const caocaoResult = searchCaoCaoPoems(caocaoPoems, query);
  
  // 搜索纳兰性德数据
  const nalanPoems = await getAllNalanXingdePoems();
  const nalanResult = searchNalanXingdePoems(nalanPoems, query);
  
  // 转换搜索结果为标准格式
  const convertedLunyuPoems = lunyuResult.poems.map(convertLunyuToStandardPoem);
  const convertedChuciPoems = chuciResult.poems.map(convertChuciToStandardPoem);
  const convertedShijingPoems = shijingResult.map(convertShijingToStandardPoem);
  const convertedYuanquPoems = yuanquResult.map(convertYuanquToStandardPoem);
  
  // 合并所有结果
  const allPoems: Poem[] = [
    ...filteredMockPoems,
    ...convertedLunyuPoems,
    ...convertedChuciPoems,
    ...convertedShijingPoems,
    ...convertedYuanquPoems,
    ...caocaoResult,
    ...nalanResult
  ];
  
  return {
    poems: allPoems,
    total: allPoems.length
  };
}

/**
 * 获取每日诗词（基于日期哈希）
 * TODO: 替换为 Supabase 查询
 */
export async function getDailyPoem(): Promise<Poem> {
  await simulateNetworkDelay();
  
  // TODO: 替换为 Supabase 查询
  // const today = new Date().toISOString().split('T')[0];
  // const { data, error } = await supabase
  //   .from('daily_poems')
  //   .select('poem_id')
  //   .eq('date', today)
  //   .single();
  // if (data) {
  //   return getPoemById(data.poem_id);
  // }
  
  // 基于日期生成确定性随机索引
  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // YYYY-MM-DD
  const hash = dateString.split('-').reduce((acc, val) => acc + parseInt(val), 0);
  const index = hash % MOCK_POEMS.length;
  
  return MOCK_POEMS[index];
}

/**
 * 获取随机诗词的回退函数
 */
async function getRandomPoemFallback(): Promise<Poem> {
  // 尝试从模拟诗词中获取
  const randomIndex = Math.floor(Math.random() * MOCK_POEMS.length);
  return MOCK_POEMS[randomIndex];
}

/**
 * 获取随机诗词（包括所有数据源）
 * TODO: 替换为 Supabase 查询
 */
export async function getRandomPoem(): Promise<Poem> {
  await simulateNetworkDelay();
  
  // TODO: 替换为 Supabase 查询
  // const { data, error } = await supabase
  //   .from('poems')
  //   .select('*')
  //   .limit(1)
  //   .order('random()');
  // if (error || !data?.[0]) throw new Error('Failed to get random poem');
  // return data[0];
  
  // 随机选择从不同数据源中获取
  const randomType = Math.random();
  
  if (randomType < 0.15) {
    // 论语数据
    try {
      const lunyuPoem = await getRandomLunyuPoem();
      return convertLunyuToStandardPoem(lunyuPoem);
    } catch (error) {
      return await getRandomPoemFallback();
    }
  } else if (randomType < 0.3) {
    // 楚辞数据
    try {
      const chuciPoem = await getRandomChuciPoem();
      return convertChuciToStandardPoem(chuciPoem);
    } catch (error) {
      return await getRandomPoemFallback();
    }
  } else if (randomType < 0.45) {
    // 诗经数据
    try {
      const shijingPoems = await getShijingPoems();
      const randomIndex = Math.floor(Math.random() * shijingPoems.length);
      return convertShijingToStandardPoem(shijingPoems[randomIndex]);
    } catch (error) {
      return await getRandomPoemFallback();
    }
  } else if (randomType < 0.6) {
    // 元曲数据
    try {
      const yuanquPoems = await getYuanquPoems();
      const randomIndex = Math.floor(Math.random() * yuanquPoems.length);
      return convertYuanquToStandardPoem(yuanquPoems[randomIndex]);
    } catch (error) {
      return await getRandomPoemFallback();
    }
  } else if (randomType < 0.75) {
    // 曹操诗集数据
    try {
      const caocaoPoems = await getAllCaoCaoPoems();
      const randomIndex = Math.floor(Math.random() * caocaoPoems.length);
      return caocaoPoems[randomIndex];
    } catch (error) {
      return await getRandomPoemFallback();
    }
  } else if (randomType < 0.9) {
    // 纳兰性德数据
    try {
      const nalanPoems = await getAllNalanXingdePoems();
      const randomIndex = Math.floor(Math.random() * nalanPoems.length);
      return nalanPoems[randomIndex];
    } catch (error) {
      return await getRandomPoemFallback();
    }
  } else {
    // 模拟诗词
    return await getRandomPoemFallback();
  }
}