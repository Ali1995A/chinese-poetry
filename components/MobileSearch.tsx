"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowLeft, TrendingUp, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSearchSuggestions, getPopularSearches } from '@/utils/search';

interface MobileSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchSuggestion {
  type: 'poem' | 'author' | 'tag';
  text: string;
  count?: number;
}

export default function MobileSearch({ isOpen, onClose }: MobileSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [popularSearches, setPopularSearches] = useState<{text: string, count: number}[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 聚焦输入框
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem('poetry_search_history');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 加载热门搜索
  useEffect(() => {
    const loadPopularSearches = async () => {
      try {
        const popular = await getPopularSearches(8);
        setPopularSearches(popular);
      } catch (error) {
        console.error('加载热门搜索错误:', error);
      }
    };
    loadPopularSearches();
  }, []);

  // 获取搜索建议
  const fetchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const suggestions = await getSearchSuggestions(query, 6);
      setSuggestions(suggestions);
    } catch (error) {
      console.error('获取搜索建议错误:', error);
      setSuggestions([]);
    }
  };

  // 处理搜索输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  // 执行搜索
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    // 保存到历史记录
    const newHistory = [searchQuery, ...searchHistory.filter(q => q !== searchQuery)].slice(0, 10);
    setSearchHistory(newHistory);
    localStorage.setItem('poetry_search_history', JSON.stringify(newHistory));
    
    // 跳转到搜索结果
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    onClose();
  };

  // 处理搜索提交
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  // 处理建议项点击
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    performSearch(suggestion.text);
  };

  // 处理历史记录点击
  const handleHistoryClick = (historyItem: string) => {
    performSearch(historyItem);
  };

  // 清除搜索历史
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('poetry_search_history');
  };

  // 清除输入
  const clearInput = () => {
    setQuery('');
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[var(--background)] md:hidden">
      {/* 搜索头部 */}
      <div className="flex items-center gap-4 p-4 border-b border-[var(--border)]">
        <button 
          onClick={onClose}
          className="p-2 text-[var(--text-secondary)] hover:text-primary transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative flex items-center bg-surface border border-[var(--border)] rounded-full">
            <div className="pl-4 text-[var(--text-secondary)]">
              <Search size={20} />
            </div>
            
            <input 
              ref={inputRef}
              type="text" 
              value={query}
              onChange={handleInputChange}
              placeholder="搜索诗词、作者、诗句..."
              className="w-full py-3 px-3 bg-transparent border-none outline-none font-serif text-primary placeholder:text-[var(--text-secondary)]/50"
            />
            
            {query && (
              <button 
                type="button"
                onClick={clearInput}
                className="p-2 mr-1 text-[var(--text-secondary)] hover:text-primary transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 搜索内容区域 */}
      <div className="p-4 overflow-y-auto h-[calc(100vh-80px)]">
        
        {/* 搜索建议 */}
        {suggestions.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">搜索建议</h3>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-surface border border-[var(--border)] hover:border-primary/30 transition-colors flex items-center gap-3"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    suggestion.type === 'poem' ? 'bg-blue-100 text-blue-600' :
                    suggestion.type === 'author' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {suggestion.type === 'poem' ? '诗' :
                     suggestion.type === 'author' ? '人' : '#'}
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
          </div>
        )}

        {/* 搜索历史 */}
        {searchHistory.length > 0 && query === '' && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2">
                <Clock size={16} />
                搜索历史
              </h3>
              <button 
                onClick={clearHistory}
                className="text-xs text-[var(--text-secondary)] hover:text-primary transition-colors"
              >
                清空
              </button>
            </div>
            <div className="space-y-2">
              {searchHistory.slice(0, 6).map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(item)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-surface border border-[var(--border)] hover:border-primary/30 transition-colors flex items-center gap-3"
                >
                  <Clock size={16} className="text-[var(--text-secondary)]" />
                  <span className="text-primary">{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 热门搜索 */}
        {query === '' && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--text-secondary)] flex items-center gap-2 mb-3">
              <TrendingUp size={16} />
              热门搜索
            </h3>
            <div className="space-y-2">
              {popularSearches.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(item.text)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-surface border border-[var(--border)] hover:border-primary/30 transition-colors flex justify-between items-center"
                >
                  <span className="text-primary">{item.text}</span>
                  <span className="text-xs text-[var(--text-secondary)] bg-[var(--background)] px-2 py-1 rounded">
                    {item.count}次
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 空状态 */}
        {query === '' && suggestions.length === 0 && searchHistory.length === 0 && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-[var(--text-secondary)] mb-4 opacity-50" />
            <p className="text-[var(--text-secondary)] font-serif">输入关键词开始搜索</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">支持搜索诗词、作者、诗句、标签</p>
          </div>
        )}
      </div>
    </div>
  );
}