"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, X, Clock, TrendingUp, BookOpen, User, Hash, Filter } from 'lucide-react';
import { searchPoems, getSearchSuggestions, getPopularSearches, logSearch } from '@/utils/search';
import { useAuth } from '@/contexts/AuthContext';
import SearchFilters from '@/components/SearchFilters';
import Link from 'next/link';

// 服务端组件用于生成元数据
export async function generateMetadata({ searchParams }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';
  
  const title = query
    ? `搜索"${query}" - 诗词搜索 - 诗云 Poetry Cloud`
    : '诗词搜索 - 诗云 Poetry Cloud';
  
  const description = query
    ? `搜索关键词"${query}"相关的诗词作品，支持按标题、作者、内容、标签进行智能搜索。`
    : '智能诗词搜索平台，支持按标题、作者、内容、标签搜索唐诗、宋词、元曲等古典诗词作品。';

  return {
    title,
    description,
    keywords: query ? `诗词搜索,${query},智能搜索,古典文学` : '诗词搜索,智能搜索,唐诗搜索,宋词搜索,元曲搜索',
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'zh_CN',
    },
  };
}

interface SearchResult {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  content: string[];
  tags: string[];
  match_type: 'title' | 'author' | 'content' | 'tag';
  match_score: number;
}

interface SearchSuggestion {
  type: 'poem' | 'author' | 'tag';
  text: string;
  count?: number;
}

// 搜索内容组件，包装在 Suspense 中
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const query = searchParams.get('q') || '';
  const dynasty = searchParams.get('dynasty') || '全部';
  const sort = searchParams.get('sort') || 'relevance';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<{text: string, count: number}[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('poetry_search_history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 保存搜索历史
  const saveToHistory = (query: string) => {
    if (!query.trim()) return;
    
    const newHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('poetry_search_history', JSON.stringify(newHistory));
  };

  // 执行搜索
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // 构建搜索选项
      const options = {
        limit: 50,
        dynasty: dynasty !== '全部' ? dynasty : undefined,
        sortBy: sort as 'relevance' | 'title' | 'author' | 'dynasty'
      };

      // 使用优化的搜索函数
      const searchResults = await searchPoems(searchQuery, options);
      setResults(searchResults);
      
      // 记录搜索日志
      await logSearch(searchQuery, searchResults.length, user?.id);
      
      // 保存到历史记录
      saveToHistory(searchQuery);
    } catch (error) {
      console.error('搜索错误:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取搜索建议
  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const suggestions = await getSearchSuggestions(query, 8);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('获取搜索建议错误:', error);
      setSuggestions([]);
    }
  };

  // 处理搜索输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim()) {
      fetchSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  // 处理建议项点击
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.text);
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
    setShowSuggestions(false);
  };

  // 清除搜索历史
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('poetry_search_history');
  };

  // 加载热门搜索数据
  useEffect(() => {
    const loadPopularSearches = async () => {
      try {
        const popular = await getPopularSearches(10);
        setPopularSearches(popular);
      } catch (error) {
        console.error('加载热门搜索错误:', error);
      }
    };
    loadPopularSearches();
  }, []);

  // 初始加载时执行搜索
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [query]);

  const getMatchTypeIcon = (type: SearchResult['match_type']) => {
    switch (type) {
      case 'title': return <BookOpen size={14} />;
      case 'author': return <User size={14} />;
      case 'content': return <Search size={14} />;
      case 'tag': return <Hash size={14} />;
      default: return <Search size={14} />;
    }
  };

  const getMatchTypeText = (type: SearchResult['match_type']) => {
    switch (type) {
      case 'title': return '标题匹配';
      case 'author': return '作者匹配';
      case 'content': return '内容匹配';
      case 'tag': return '标签匹配';
      default: return '匹配';
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[var(--background)]">
      <div className="max-w-4xl mx-auto">
        
        {/* 搜索框 */}
        <div className="mb-12">
          <h1 className="text-3xl font-serif font-bold text-primary mb-8 text-center">
            诗词搜索
          </h1>
          
          <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center bg-surface border border-[var(--border)] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary">
              <div className="pl-6 text-[var(--text-secondary)]">
                <Search size={20} />
              </div>
              
              <input 
                type="text" 
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="搜索诗词、作者、诗句、标签..."
                className="w-full py-4 px-4 bg-transparent border-none outline-none font-serif text-lg text-primary placeholder:text-[var(--text-secondary)]/60"
                autoFocus
              />
              
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="p-2 mr-2 text-[var(--text-secondary)] hover:text-primary transition-colors"
                >
                  <X size={18} />
                </button>
              )}

              <button 
                type="submit"
                className="hidden sm:block mr-2 px-8 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                搜索
              </button>
            </div>

            {/* 搜索建议下拉框 */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-[var(--border)] rounded-2xl shadow-xl z-50 overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-6 py-3 text-left hover:bg-[var(--background)] transition-colors flex items-center gap-3 border-b border-[var(--border)] last:border-b-0"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      suggestion.type === 'poem' ? 'bg-blue-100 text-blue-600' :
                      suggestion.type === 'author' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {suggestion.type === 'poem' ? <BookOpen size={16} /> :
                       suggestion.type === 'author' ? <User size={16} /> :
                       <Hash size={16} />}
                    </div>
                    <div>
                      <div className="font-medium text-primary">{suggestion.text}</div>
                      <div className="text-xs text-[var(--text-secondary)] capitalize">
                        {suggestion.type}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* 搜索结果或推荐内容 */}
        {query ? (
          <div className="space-y-8">
            {/* 搜索结果统计和筛选按钮 */}
            <div className="flex justify-between items-center">
              <p className="text-[var(--text-secondary)] font-serif">
                找到 <span className="text-accent font-bold">{results.length}</span> 个相关结果
                {query && <span>，搜索词：<span className="text-primary font-medium">"{query}"</span></span>}
              </p>
              
              {/* 移动端筛选按钮 */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-full text-[var(--text-secondary)] hover:text-primary transition-colors"
              >
                <Filter size={16} />
                <span>筛选</span>
              </button>
            </div>

            {/* 筛选组件和结果列表 */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* 桌面端筛选 - 左侧 */}
              <div className="hidden lg:block lg:col-span-1">
                <SearchFilters />
              </div>

              {/* 移动端筛选 - 展开时显示 */}
              {showFilters && (
                <div className="lg:hidden col-span-1">
                  <SearchFilters />
                </div>
              )}

              {/* 搜索结果列表 */}
              <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="mt-4 text-[var(--text-secondary)]">搜索中...</p>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((poem) => (
                      <Link key={poem.id} href={`/poem/${poem.id}`} className="block group">
                        <article className="bg-surface border border-[var(--border)] hover:border-primary/30 p-6 rounded-xl transition-all duration-300 hover:shadow-card">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
                                {poem.dynasty}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)] bg-[var(--background)] px-2 py-1 rounded">
                                {getMatchTypeIcon(poem.match_type)}
                                <span>{getMatchTypeText(poem.match_type)}</span>
                              </div>
                            </div>
                            <span className="text-sm font-medium text-[var(--text-secondary)]">
                              {poem.author}
                            </span>
                          </div>

                          <h3 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                            {poem.title}
                          </h3>

                          <div className="text-[var(--text-primary)] font-serif leading-relaxed opacity-80">
                            {Array.isArray(poem.content) ? poem.content.join('，') : poem.content}
                          </div>

                          {poem.tags && poem.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-1">
                              {poem.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="text-xs bg-[var(--background)] text-[var(--text-secondary)] px-2 py-1 rounded border border-[var(--border)]">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </article>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <Search size={48} className="mx-auto text-[var(--text-secondary)] mb-4 opacity-50" />
                    <p className="text-[var(--text-secondary)] font-serif text-lg mb-2">未找到相关诗词</p>
                    <p className="text-[var(--text-secondary)] text-sm">尝试使用其他关键词或浏览全部诗词</p>
                    <Link
                      href="/poems"
                      className="inline-block mt-4 px-6 py-2 bg-primary text-white rounded-full text-sm hover:bg-primary/90 transition-colors"
                    >
                      浏览诗词文库
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* 搜索推荐内容 */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 搜索历史 */}
            <div className="bg-surface border border-[var(--border)] rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif font-bold text-primary flex items-center gap-2">
                  <Clock size={18} />
                  搜索历史
                </h3>
                {searchHistory.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="text-xs text-[var(--text-secondary)] hover:text-primary transition-colors"
                  >
                    清空
                  </button>
                )}
              </div>
              
              {searchHistory.length > 0 ? (
                <div className="space-y-2">
                  {searchHistory.slice(0, 8).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => router.push(`/search?q=${encodeURIComponent(item)}`)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--background)] transition-colors flex items-center gap-2 text-[var(--text-secondary)] hover:text-primary"
                    >
                      <Clock size={14} className="opacity-60" />
                      <span className="truncate">{item}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--text-secondary)] text-sm text-center py-4">暂无搜索历史</p>
              )}
            </div>

            {/* 热门搜索 */}
            <div className="bg-surface border border-[var(--border)] rounded-2xl p-6">
              <h3 className="font-serif font-bold text-primary flex items-center gap-2 mb-4">
                <TrendingUp size={18} />
                热门搜索
              </h3>
              
              <div className="space-y-3">
                {popularSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => router.push(`/search?q=${encodeURIComponent(item.text)}`)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[var(--background)] transition-colors flex justify-between items-center group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
                        {item.text}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--text-secondary)] bg-[var(--background)] px-2 py-1 rounded">
                      {item.count}次
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// 主页面组件，包装在 Suspense 中
export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-[var(--text-secondary)]">加载中...</p>
        </div>
      </main>
    }>
      <SearchContent />
    </Suspense>
  );
}