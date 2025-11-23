import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import PoemReader from '@/components/PoemReader';
import FavoriteButton from '@/components/FavoriteButton';
import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase';

// 这是一个服务端组件
export default async function PoemPage({ params }: { params: { id: string } }) {
  // 从数据库获取当前诗词数据
  const { data: poem, error } = await supabase
    .from('poems')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !poem) {
    console.error("Poem not found:", error);
    notFound();
  }

  // 获取上一首诗词
  const { data: prevPoem } = await supabase
    .from('poems')
    .select('id, title')
    .lt('created_at', poem.created_at)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  // 获取下一首诗词
  const { data: nextPoem } = await supabase
    .from('poems')
    .select('id, title')
    .gt('created_at', poem.created_at)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  return (
    <main className="min-h-screen pt-24 pb-20 bg-[var(--background)]">
      
      {/* 顶部导航 */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-8 flex justify-between items-center animate-fade-in-up">
        <Link 
          href="/poems" 
          className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-primary transition-colors group"
        >
          <div className="p-2 rounded-full bg-surface border border-[var(--border)] group-hover:border-primary/50 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="font-serif">返回文库</span>
        </Link>

        <div className="flex gap-3">
          <FavoriteButton poemId={poem.id} />
        </div>
      </div>

      {/* 核心阅读器 - 传入真实数据 */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <PoemReader poem={poem} />
      </div>

      {/* 上一首/下一首导航 */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-[var(--border)]">
        <div className="flex justify-between items-center">
          {/* 上一首按钮 */}
          {prevPoem ? (
            <Link
              href={`/poem/${prevPoem.id}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-surface hover:border-primary/50 hover:bg-primary/5 transition-all group min-w-[200px]"
            >
              <ChevronLeft size={20} className="text-[var(--text-secondary)] group-hover:text-primary group-hover:-translate-x-1 transition-all" />
              <div className="text-right flex-1">
                <div className="text-sm text-[var(--text-secondary)] font-sans">上一首</div>
                <div className="font-serif font-medium line-clamp-1 text-[var(--text-primary)]">{prevPoem.title}</div>
              </div>
            </Link>
          ) : (
            <span className="invisible min-w-[200px]">占位符</span>
          )}

          {/* 下一首按钮 */}
          {nextPoem ? (
            <Link
              href={`/poem/${nextPoem.id}`}
              className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-surface hover:border-primary/50 hover:bg-primary/5 transition-all group min-w-[200px]"
            >
              <div className="text-left flex-1">
                <div className="text-sm text-[var(--text-secondary)] font-sans">下一首</div>
                <div className="font-serif font-medium line-clamp-1 text-[var(--text-primary)]">{nextPoem.title}</div>
              </div>
              <ChevronRight size={20} className="text-[var(--text-secondary)] group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ) : (
            <span className="invisible min-w-[200px]">占位符</span>
          )}
        </div>
      </div>

    </main>
  );
}