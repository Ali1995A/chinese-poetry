"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowLeft, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/utils/supabase';
import CalligraphyStroke from '@/components/CalligraphyStroke';

export default function FavoritesPage() {
  const { user, favorites, loadingFavorites } = useAuth();
  const [favoritePoems, setFavoritePoems] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // 加载收藏的诗词详情
  React.useEffect(() => {
    const loadFavoritePoems = async () => {
      if (!user || favorites.length === 0) {
        setFavoritePoems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('poems')
          .select('*')
          .in('id', favorites)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFavoritePoems(data || []);
      } catch (error) {
        console.error('Error loading favorite poems:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoritePoems();
  }, [user, favorites]);

  if (!user) {
    return (
      <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Heart size={64} className="mx-auto text-accent mb-4" />
            <h1 className="text-4xl font-serif font-bold text-primary mb-4">我的收藏</h1>
            <p className="text-lg text-[var(--text-secondary)]">
              请先登录以查看和管理您的收藏
            </p>
          </div>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-serif"
          >
            立即登录
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[var(--background)]">
      
      {/* 背景装饰 */}
      <div className="absolute -top-20 -right-20 opacity-40 rotate-12">
        <CalligraphyStroke className="w-[600px] h-[600px]" />
      </div>
      <div className="absolute top-40 -left-20 opacity-30 -rotate-45">
        <CalligraphyStroke className="w-[400px] h-[400px]" />
      </div>

      {/* 头部区域 */}
      <div className="max-w-7xl mx-auto mb-12 animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/poems" 
              className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-primary transition-colors group"
            >
              <div className="p-2 rounded-full bg-surface border border-[var(--border)] group-hover:border-primary/50 transition-colors">
                <ArrowLeft size={18} />
              </div>
              <span className="font-serif">返回文库</span>
            </Link>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-accent/50"></div>
            <span className="text-accent tracking-[0.3em] text-xs md:text-sm uppercase font-semibold">
              My Favorites
            </span>
            <div className="h-[1px] w-12 bg-accent/50"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            我的收藏
          </h1>
          
          <p className="text-lg font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            您收藏的诗词作品将在这里显示，方便随时重温经典。
          </p>
        </div>
      </div>

      {/* 收藏列表 */}
      <div className="max-w-7xl mx-auto">
        {loading || loadingFavorites ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-[var(--text-secondary)] font-serif">加载中...</p>
          </div>
        ) : favoritePoems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoritePoems.map((poem, index) => (
              <div 
                key={poem.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="animate-fade-in-up"
              >
                <Link href={`/poem/${poem.id}`} className="group block">
                  <article className="h-full bg-surface border border-[var(--border)] hover:border-primary/30 p-6 rounded-xl transition-all duration-300 hover:shadow-card hover:-translate-y-2 relative overflow-hidden">
                    {/* 装饰性背景 */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors"></div>
                    
                    <div className="relative z-10">
                      {/* 朝代标签 */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
                          {poem.dynasty}
                        </span>
                        <Heart size={16} className="text-red-500 fill-red-500" />
                      </div>

                      {/* 标题 */}
                      <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors mb-3 line-clamp-1">
                        {poem.title}
                      </h3>

                      {/* 作者 */}
                      <p className="text-sm font-sans text-[var(--text-secondary)] mb-4">
                        {poem.author}
                      </p>

                      {/* 内容预览 */}
                      <div className="mb-4">
                        <p className="text-[var(--text-primary)] font-serif leading-relaxed opacity-80 line-clamp-3 text-sm">
                          {Array.isArray(poem.content) ? poem.content.join('，') : poem.content}
                        </p>
                      </div>

                      {/* 标签 */}
                      {poem.tags && poem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {poem.tags.slice(0, 3).map((tag: string, idx: number) => (
                            <span 
                              key={idx}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <BookOpen size={64} className="mx-auto text-[var(--text-secondary)] opacity-30 mb-6" />
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">暂无收藏</h3>
            <p className="text-[var(--text-secondary)] font-sans mb-8">
              您还没有收藏任何诗词作品
            </p>
            <Link 
              href="/poems" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-serif"
            >
              去发现诗词
            </Link>
          </div>
        )}
      </div>

      {/* 底部统计 */}
      {favoritePoems.length > 0 && (
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[var(--border)]">
          <div className="text-center text-[var(--text-secondary)] font-sans text-sm">
            <p>共收藏 {favoritePoems.length} 首诗词作品</p>
          </div>
        </div>
      )}
    </main>
  );
}