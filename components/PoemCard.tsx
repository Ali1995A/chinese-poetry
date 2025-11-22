import React from 'react';
import Link from 'next/link';

interface PoemCardProps {
  id: string;
  title: string;
  author: string;
  dynasty: string;
  excerpt: string;
  tags?: string[];
  variant?: 'default' | 'compact';
}

export default function PoemCard({ 
  id, 
  title, 
  author, 
  dynasty, 
  excerpt, 
  tags = [], 
  variant = 'default' 
}: PoemCardProps) {
  
  if (variant === 'compact') {
    return (
      <Link href={`/poem/${id}`} className="group block">
        <div className="bg-surface border border-[var(--border)] hover:border-primary/30 p-4 rounded-lg transition-all duration-300 hover:shadow-md flex items-center justify-between">
          <div>
            <h4 className="font-serif font-bold text-primary group-hover:text-accent transition-colors">{title}</h4>
            {/* ✅ 这里改为 font-sans */}
            <p className="text-xs font-sans text-[var(--text-secondary)] mt-1">{dynasty} · {author}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
            <span className="font-serif text-sm">读</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/poem/${id}`} className="group block h-full">
      <article className="h-full bg-surface border border-[var(--border)] hover:border-primary/30 p-8 rounded-xl transition-all duration-300 hover:shadow-card hover:-translate-y-1 relative overflow-hidden flex flex-col">
        
        {/* 背景装饰字 */}
        <div className="absolute -bottom-4 -right-4 text-6xl font-serif text-[var(--border)] opacity-20 select-none pointer-events-none group-hover:opacity-40 transition-opacity">
          {dynasty}
        </div>

        {/* 顶部元数据 */}
        <div className="flex justify-between items-start mb-4 relative z-10">
          <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
            {dynasty}
          </span>
          {tags && tags.length > 0 && (
            <div className="flex gap-2">
              {tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs text-[var(--text-secondary)] bg-[var(--background)] px-1.5 py-0.5 rounded">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* 标题 (保留宋体，更有古风) */}
        <h3 className="text-xl font-serif font-bold text-primary mb-2 group-hover:text-accent transition-colors relative z-10">
          {title}
        </h3>
        
        {/* 作者 (改为细黑/幼圆) */}
        <p className="text-sm font-sans font-medium text-[var(--text-secondary)] mb-6 flex items-center gap-2 relative z-10">
          <span className="w-4 h-[1px] bg-primary/30"></span>
          {author}
        </p>

        {/* 摘录内容 (✅ 关键修改：font-sans + font-light) */}
        <div className="flex-grow relative z-10">
           <p className="text-[var(--text-primary)] font-sans font-light leading-loose opacity-80 line-clamp-3 group-hover:opacity-100 transition-opacity text-justify">
             {excerpt}
           </p>
        </div>

        {/* 底部悬停条 */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </article>
    </Link>
  );
}