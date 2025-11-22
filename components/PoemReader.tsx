import React from 'react';
import { Poem } from '@/types';

interface PoemReaderProps {
  poem: Poem;
}

export default function PoemReader({ poem }: PoemReaderProps) {
  return (
    <div className="bg-surface border border-[var(--border)] rounded-2xl p-8 md:p-12 shadow-sm">
      {/* 诗词标题 */}
      <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary text-center mb-6">
        {poem.title}
      </h1>
      
      {/* 作者和朝代 */}
      <div className="flex justify-center items-center gap-4 mb-8 text-[var(--text-secondary)] font-sans">
        <span className="text-lg">{poem.author}</span>
        <span className="w-1 h-1 bg-[var(--text-secondary)] rounded-full"></span>
        <span className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
          {poem.dynasty}
        </span>
      </div>

      {/* 诗词内容 */}
      <div className="space-y-6 mb-8">
        {Array.isArray(poem.content) ? (
          poem.content.map((line, index) => (
            <p
              key={index}
              className="text-xl md:text-2xl font-serif text-center leading-relaxed text-[var(--text-primary)]"
            >
              {line}
            </p>
          ))
        ) : (
          <p className="text-xl md:text-2xl font-serif text-center leading-relaxed text-[var(--text-primary)] whitespace-pre-line">
            {poem.content}
          </p>
        )}
      </div>

      {/* 标签 */}
      {poem.tags && poem.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {poem.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs font-sans text-[var(--text-secondary)] bg-[var(--background)] px-3 py-1 rounded-full border border-[var(--border)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 注释和背景信息 */}
      {(poem.notes || poem.background) && (
        <div className="border-t border-[var(--border)] pt-8">
          {poem.notes && (
            <div className="mb-6">
              <h3 className="text-lg font-serif font-bold text-primary mb-3">注释</h3>
              <p className="font-sans text-[var(--text-secondary)] leading-relaxed">
                {poem.notes}
              </p>
            </div>
          )}
          {poem.background && (
            <div>
              <h3 className="text-lg font-serif font-bold text-primary mb-3">创作背景</h3>
              <p className="font-sans text-[var(--text-secondary)] leading-relaxed">
                {poem.background}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}