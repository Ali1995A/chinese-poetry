import { MOCK_POEMS } from './mockData';
import { Poem } from '../types';

interface SearchResult {
  poems: Poem[];
  total: number;
}

// 模拟网络延迟
const simulateNetworkDelay = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
};

/**
 * 获取所有诗词
 * TODO: 替换为 Supabase 查询
 */
export async function getAllPoems(): Promise<Poem[]> {
  await simulateNetworkDelay();
  
  // TODO: 替换为 Supabase 查询
  // const { data, error } = await supabase.from('poems').select('*');
  // if (error) throw error;
  // return data;
  
  return MOCK_POEMS;
}

/**
 * 根据ID获取诗词
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
  
  return MOCK_POEMS.find(poem => poem.id === id) || null;
}

/**
 * 搜索诗词
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
  const filteredPoems = MOCK_POEMS.filter(poem =>
    poem.title.toLowerCase().includes(lowerQuery) ||
    poem.author.toLowerCase().includes(lowerQuery) ||
    poem.content.some((line: string) => line.toLowerCase().includes(lowerQuery)) ||
    poem.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery))
  );
  
  return {
    poems: filteredPoems,
    total: filteredPoems.length
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
 * 获取随机诗词
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
  
  const randomIndex = Math.floor(Math.random() * MOCK_POEMS.length);
  return MOCK_POEMS[randomIndex];
}