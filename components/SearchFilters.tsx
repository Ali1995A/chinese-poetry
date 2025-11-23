"use client";

import React, { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchFiltersProps {
  className?: string;
}

const DYNASTIES = ['全部', '唐', '宋', '元', '明', '清', '五代'];
const SORT_OPTIONS = [
  { value: 'relevance', label: '相关度' },
  { value: 'title', label: '标题' },
  { value: 'author', label: '作者' },
  { value: 'dynasty', label: '朝代' },
];

export default function SearchFilters({ className = '' }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const currentDynasty = searchParams.get('dynasty') || '全部';
  const currentSort = searchParams.get('sort') || 'relevance';
  
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const updateFilters = (newDynasty: string, newSort: string) => {
    const params = new URLSearchParams();
    
    if (query) params.set('q', query);
    if (newDynasty !== '全部') params.set('dynasty', newDynasty);
    if (newSort !== 'relevance') params.set('sort', newSort);
    
    router.push(`/search?${params.toString()}`);
  };

  const handleDynastyChange = (dynasty: string) => {
    updateFilters(dynasty, currentSort);
  };

  const handleSortChange = (sort: string) => {
    updateFilters(currentDynasty, sort);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    router.push(`/search?${params.toString()}`);
  };

  const hasActiveFilters = currentDynasty !== '全部' || currentSort !== 'relevance';

  return (
    <div className={`bg-surface border border-[var(--border)] rounded-2xl p-6 ${className}`}>
      {/* 筛选头部 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-serif font-bold text-primary flex items-center gap-2">
          <Filter size={18} />
          筛选与排序
        </h3>
        
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-primary transition-colors"
          >
            <X size={14} />
            清除
          </button>
        )}
      </div>

      {/* 朝代筛选 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">朝代</h4>
        <div className="flex flex-wrap gap-2">
          {DYNASTIES.map(dynasty => (
            <button
              key={dynasty}
              onClick={() => handleDynastyChange(dynasty)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentDynasty === dynasty
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-[var(--background)] text-[var(--text-secondary)] hover:text-primary hover:bg-primary/5 border border-[var(--border)]'
              }`}
            >
              {dynasty}
            </button>
          ))}
        </div>
      </div>

      {/* 排序选项 */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">排序方式</h4>
        <div className="space-y-2">
          {SORT_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                currentSort === option.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-primary hover:bg-[var(--background)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 移动端展开/收起按钮 */}
      <button
        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        className="md:hidden w-full mt-4 py-2 border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:text-primary transition-colors flex items-center justify-center gap-2"
      >
        <span>{isFiltersOpen ? '收起筛选' : '展开筛选'}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
        />
      </button>
    </div>
  );
}