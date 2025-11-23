import { supabase } from './supabase';
import { searchLunyuPoems } from '@/lib/lunyu-service';
import { searchChuciPoems } from '@/lib/chuci-service';
import { searchShijing } from '@/lib/shijing-service';
import { searchYuanqu } from '@/lib/yuanqu-service';

export interface SearchResult {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string[];
  tags: string[];
  match_type: 'title' | 'author' | 'content' | 'tag';
  match_score: number;
}

export interface SearchSuggestion {
  type: 'poem' | 'author' | 'tag';
  text: string;
  count?: number;
}

export interface SearchOptions {
  limit?: number;
  offset?: number;
  dynasty?: string;
  sortBy?: 'relevance' | 'title' | 'author' | 'dynasty';
}

/**
 * 执行诗词搜索
 */
export async function searchPoems(
  query: string, 
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  if (!query.trim()) {
    return [];
  }

  const { limit = 50, offset = 0, dynasty, sortBy = 'relevance' } = options;

  try {
    // 使用数据库函数进行搜索（如果已创建）
    // 如果函数不存在，则使用基础查询
    const { data, error } = await supabase
      .rpc('search_poems', { query_text: query })
      .range(offset, offset + limit - 1);

    if (error) {
      console.warn('搜索函数未找到，使用基础查询:', error.message);
      // 回退到基础查询
      return await basicSearch(query, options);
    }

    return data || [];
  } catch (error) {
    console.error('搜索错误:', error);
    return await basicSearch(query, options);
  }
}

/**
 * 基础搜索实现（回退方案）
 */
async function basicSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const { limit = 50, offset = 0, dynasty } = options;

  let dbQuery = supabase
    .from('poems')
    .select('*')
    .or(`title.ilike.%${query}%,author.ilike.%${query}%,content.cs.{${query}},tags.cs.{${query}}`)
    .range(offset, offset + limit - 1);

  // 应用朝代筛选
  if (dynasty && dynasty !== '全部') {
    dbQuery = dbQuery.eq('dynasty', dynasty);
  }

  const { data, error } = await dbQuery;

  if (error) {
    console.error('基础搜索错误:', error);
    return [];
  }

  // 计算匹配分数和类型
  const scoredResults: SearchResult[] = (data || []).map(poem => {
    let match_type: SearchResult['match_type'] = 'title';
    let match_score = 0;

    // 计算匹配分数
    if (poem.title.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'title';
      match_score += 100;
    }
    if (poem.author.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'author';
      match_score += 80;
    }
    if (poem.content.some(line => line.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'content';
      match_score += 60;
    }
    if (poem.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'tag';
      match_score += 40;
    }

    return {
      ...poem,
      match_type,
      match_score
    };
  });

  // 搜索论语数据
  const lunyuResults = await searchLunyuPoems(query);
  const lunyuScoredResults: SearchResult[] = lunyuResults.poems.map(poem => {
    let match_type: SearchResult['match_type'] = 'title';
    let match_score = 0;

    // 计算匹配分数
    if (poem.title.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'title';
      match_score += 100;
    }
    if (poem.author.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'author';
      match_score += 80;
    }
    if (poem.content.some(line => line.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'content';
      match_score += 60;
    }
    if (poem.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'tag';
      match_score += 40;
    }

    return {
      ...poem,
      match_type,
      match_score
    };
  });

  // 搜索楚辞数据
  const chuciResults = await searchChuciPoems(query);
  const chuciScoredResults: SearchResult[] = chuciResults.poems.map(poem => {
    let match_type: SearchResult['match_type'] = 'title';
    let match_score = 0;

    // 计算匹配分数
    if (poem.title.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'title';
      match_score += 100;
    }
    if (poem.author.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'author';
      match_score += 80;
    }
    if (poem.content.some(line => line.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'content';
      match_score += 60;
    }
    if (poem.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'tag';
      match_score += 40;
    }

    return {
      ...poem,
      match_type,
      match_score
    };
  });

  // 搜索诗经数据
  const shijingResults = await searchShijing(query);
  const shijingScoredResults: SearchResult[] = shijingResults.map(poem => {
    let match_type: SearchResult['match_type'] = 'title';
    let match_score = 0;

    // 计算匹配分数
    if (poem.title.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'title';
      match_score += 100;
    }
    if (poem.author.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'author';
      match_score += 80;
    }
    if (poem.content.some(line => line.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'content';
      match_score += 60;
    }
    if (poem.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'tag';
      match_score += 40;
    }

    return {
      ...poem,
      match_type,
      match_score
    };
  });

  // 搜索元曲数据
  const yuanquResults = await searchYuanqu(query);
  const yuanquScoredResults: SearchResult[] = yuanquResults.map(poem => {
    let match_type: SearchResult['match_type'] = 'title';
    let match_score = 0;

    // 计算匹配分数
    if (poem.title.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'title';
      match_score += 100;
    }
    if (poem.author.toLowerCase().includes(query.toLowerCase())) {
      match_type = 'author';
      match_score += 80;
    }
    if (poem.content.some(line => line.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'content';
      match_score += 60;
    }
    if (poem.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))) {
      match_type = 'tag';
      match_score += 40;
    }

    return {
      ...poem,
      match_type,
      match_score
    };
  });

  // 合并结果并按匹配分数排序
  const allResults = [
    ...scoredResults,
    ...lunyuScoredResults,
    ...chuciScoredResults,
    ...shijingScoredResults,
    ...yuanquScoredResults
  ];
  return allResults.sort((a, b) => b.match_score - a.match_score).slice(0, limit);
}

/**
 * 获取搜索建议
 */
export async function getSearchSuggestions(
  query: string, 
  limit: number = 8
): Promise<SearchSuggestion[]> {
  if (!query.trim()) {
    return [];
  }

  try {
    // 使用数据库函数获取建议（如果已创建）
    const { data, error } = await supabase
      .rpc('get_search_suggestions', { 
        query_text: query, 
        limit_count: limit 
      });

    if (error) {
      console.warn('搜索建议函数未找到，使用基础实现:', error.message);
      return await basicGetSuggestions(query, limit);
    }

    return (data || []).map(item => ({
      type: item.type as SearchSuggestion['type'],
      text: item.text,
      count: item.count
    }));
  } catch (error) {
    console.error('获取搜索建议错误:', error);
    return await basicGetSuggestions(query, limit);
  }
}

/**
 * 基础搜索建议实现（回退方案）
 */
async function basicGetSuggestions(
  query: string, 
  limit: number = 8
): Promise<SearchSuggestion[]> {
  const suggestions: SearchSuggestion[] = [];

  try {
    // 获取匹配的诗词标题
    const { data: poemData } = await supabase
      .from('poems')
      .select('title')
      .ilike('title', `%${query}%`)
      .limit(5);

    // 获取匹配的作者
    const { data: authorData } = await supabase
      .from('poems')
      .select('author')
      .ilike('author', `%${query}%`)
      .limit(5);

    // 获取匹配的标签
    const { data: tagData } = await supabase
      .from('poems')
      .select('tags')
      .limit(100);

    const allTags = new Set<string>();
    tagData?.forEach(poem => {
      poem.tags?.forEach(tag => {
        if (tag.toLowerCase().includes(query.toLowerCase())) {
          allTags.add(tag);
        }
      });
    });

    suggestions.push(
      ...(poemData?.map(p => ({ type: 'poem' as const, text: p.title })) || []),
      ...(authorData?.map(a => ({ type: 'author' as const, text: a.author })) || []),
      ...Array.from(allTags).slice(0, 5).map(tag => ({ type: 'tag' as const, text: tag }))
    );

    return suggestions.slice(0, limit);
  } catch (error) {
    console.error('基础搜索建议错误:', error);
    return [];
  }
}

/**
 * 获取热门搜索
 */
export async function getPopularSearches(limit: number = 10): Promise<{text: string, count: number}[]> {
  try {
    // 使用数据库函数获取热门搜索（如果已创建）
    const { data, error } = await supabase
      .rpc('get_popular_searches', { limit_count: limit });

    if (error) {
      console.warn('热门搜索函数未找到，使用静态数据:', error.message);
      return getStaticPopularSearches(limit);
    }

    return (data || []).map(item => ({
      text: item.search_term,
      count: item.search_count
    }));
  } catch (error) {
    console.error('获取热门搜索错误:', error);
    return getStaticPopularSearches(limit);
  }
}

/**
 * 静态热门搜索数据（回退方案）
 */
function getStaticPopularSearches(limit: number = 10): {text: string, count: number}[] {
  return [
    { text: '李白', count: 1280 },
    { text: '春江花月夜', count: 890 },
    { text: '相思', count: 760 },
    { text: '苏轼', count: 650 },
    { text: '静夜思', count: 540 },
    { text: '杜甫', count: 520 },
    { text: '水调歌头', count: 480 },
    { text: '登高', count: 420 },
    { text: '白居易', count: 380 },
    { text: '王维', count: 350 }
  ].slice(0, limit);
}

/**
 * 记录搜索日志（可选功能）
 */
export async function logSearch(
  query: string, 
  resultsCount: number,
  userId?: string
): Promise<void> {
  try {
    await supabase
      .from('search_logs')
      .insert({
        query,
        user_id: userId,
        results_count: resultsCount
      });
  } catch (error) {
    console.error('记录搜索日志错误:', error);
    // 静默失败，不影响搜索功能
  }
}

/**
 * 获取用户搜索历史
 */
export async function getUserSearchHistory(
  userId: string, 
  limit: number = 10
): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('search_logs')
      .select('query, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map(item => item.query);
  } catch (error) {
    console.error('获取搜索历史错误:', error);
    return [];
  }
}