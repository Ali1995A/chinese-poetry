"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, User, BookOpen } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import CalligraphyStroke from '@/components/CalligraphyStroke';

// 作者数据类型定义
interface AuthorData {
  author: string;
  dynasty: string;
  count: number;
}

// 客户端搜索组件
function AuthorSearch({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <div className="relative group w-full md:w-80">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="搜索诗人姓名..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full py-2.5 pl-10 pr-4 bg-surface border border-[var(--border)] rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans"
      />
    </div>
  );
}

// 作者卡片组件
function AuthorCard({ author, count, dynasty }: AuthorData) {
  return (
    <Link
      href={`/poems?q=${encodeURIComponent(author)}`}
      className="group block"
    >
      <article className="h-full bg-surface border border-[var(--border)] hover:border-primary/30 p-6 rounded-xl transition-all duration-300 hover:shadow-card hover:-translate-y-1 relative overflow-hidden flex flex-col">
        {/* 装饰性背景 */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors"></div>
        
        {/* 作者头像区域 */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
            <User size={20} />
          </div>
          <div className="flex-grow">
            {/* 作者姓名 - 使用宋体 */}
            <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
              {author}
            </h3>
            {/* 朝代标签 */}
            <span className="text-xs font-sans font-bold text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
              {dynasty}
            </span>
          </div>
        </div>

        {/* 作品数量 */}
        <div className="flex items-center gap-2 text-sm font-sans text-[var(--text-secondary)] mt-auto pt-4 border-t border-[var(--border)]/50">
          <BookOpen size={16} />
          <span>收录 {count} 首</span>
        </div>
      </article>
    </Link>
  );
}

// 客户端组件
function AuthorsPageClient({ authors: initialAuthors }: { authors: AuthorData[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  // 使用 useMemo 来优化搜索过滤
  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) {
      return initialAuthors;
    }
    
    const query = searchQuery.toLowerCase();
    return initialAuthors.filter(author =>
      author.author.toLowerCase().includes(query)
    );
  }, [initialAuthors, searchQuery]);

  return (

    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[var(--background)]">
      
      {/* 背景装饰 */}
      <div className="absolute -top-20 -right-20 opacity-40 rotate-12">
        <CalligraphyStroke className="w-[600px] h-[600px]" />
      </div>
      <div className="absolute top-40 -left-20 opacity-30 -rotate-45">
        <CalligraphyStroke className="w-[400px] h-[400px]" />
      </div>

      {/* 1. 头部区域 */}
      <div className="max-w-7xl mx-auto mb-12 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border)] pb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-3">历代诗人</h1>
            <p className="text-[var(--text-secondary)] font-sans">
              共收录 <span className="text-accent font-bold">{initialAuthors.length}</span> 位诗人
            </p>
          </div>
          
          {/* 搜索组件 */}
          <div className="w-full md:w-auto">
            <AuthorSearch onSearch={setSearchQuery} />
          </div>
        </div>
      </div>

      {/* 2. 诗人网格 */}
      <div className="max-w-7xl mx-auto">
        {filteredAuthors.length > 0 ? (
          <>
            {searchQuery && (
              <div className="mb-6 text-center text-[var(--text-secondary)] font-sans">
                找到 <span className="text-accent font-bold">{filteredAuthors.length}</span> 位诗人
                {searchQuery && ` (搜索: "${searchQuery}")`}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAuthors.map((authorData, index) => (
                <div
                  key={`${authorData.author}-${authorData.dynasty}`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in-up"
                >
                  <AuthorCard
                    author={authorData.author}
                    dynasty={authorData.dynasty}
                    count={authorData.count}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-[var(--text-secondary)] font-sans">
              {searchQuery ? `未找到包含 "${searchQuery}" 的诗人` : '暂无诗人数据'}
            </p>
          </div>
        )}
      </div>

      {/* 3. 底部说明 */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[var(--border)]">
        <div className="text-center text-[var(--text-secondary)] font-sans text-sm">
          <p>点击诗人卡片可查看其所有作品</p>
          <p className="mt-2 opacity-60">数据来源于唐诗三百首、宋词精选等经典文集</p>
        </div>
      </div>
    </main>
  );
}

// 服务端组件 - 数据获取
async function AuthorsPageWrapper() {
  // 从数据库获取所有诗词数据
  const { data: poems, error } = await supabase
    .from('poems')
    .select('author, dynasty');

  if (error) {
    console.error('Error fetching authors:', error);
    return (
      <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-[var(--text-secondary)] font-serif">加载诗人数据失败，请刷新重试</p>
        </div>
      </main>
    );
  }

  // 处理数据：按作者分组并计算作品数量
  const authorsMap = new Map();
  
  poems?.forEach(poem => {
    if (!poem.author) return;
    
    const key = `${poem.author}-${poem.dynasty}`;
    if (authorsMap.has(key)) {
      authorsMap.set(key, authorsMap.get(key) + 1);
    } else {
      authorsMap.set(key, 1);
    }
  });

  // 转换为数组并排序（按作品数量降序）
  const authors = Array.from(authorsMap.entries())
    .map(([key, count]) => {
      const [author, dynasty] = key.split('-');
      return { author, dynasty, count };
    })
    .sort((a, b) => b.count - a.count);

  return <AuthorsPageClient authors={authors} />;
}

export default AuthorsPageWrapper;