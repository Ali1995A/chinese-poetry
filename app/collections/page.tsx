"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Crown, Mountain, Wind, User, BookOpen, Sparkles,
  Feather, Scroll, Moon, GraduationCap, BookMarked,
  Trees, Swords, Flower, Zap, Sun, Map, Heart, Cloud
} from 'lucide-react';
import CalligraphyStroke from '@/components/CalligraphyStroke';
import { getAllCollections, tagCategories } from '@/lib/tag-categories';

// 动态生成精选主题配置 - 基于标签数据
const collections = getAllCollections();

// 图标映射
const iconMap = {
  'mountain': <Mountain size={32} />,
  'wind': <Wind size={32} />,
  'feather': <Feather size={32} />,
  'scroll': <Scroll size={32} />,
  'sparkles': <Sparkles size={32} />,
  'book-open': <BookOpen size={32} />,
  'user': <User size={32} />,
  'crown': <Crown size={32} />,
  'book-marked': <BookMarked size={32} />,
  'trees': <Trees size={32} />,
  'map': <Map size={32} />,
  'flower': <Flower size={32} />,
  'zap': <Zap size={32} />,
  'swords': <Swords size={32} />,
  'heart': <Heart size={32} />,
  'moon': <Moon size={32} />,
  'sun': <Sun size={32} />,
  'cloud': <Cloud size={32} />
};

// 精选卡片组件
function CollectionCard({ collection }: { collection: typeof collections[0] }) {
  const icon = iconMap[collection.icon as keyof typeof iconMap] || <BookOpen size={32} />;
  
  return (
    <Link href={collection.href} className="group block">
      <article className="h-full bg-surface border border-[var(--border)] hover:border-primary/30 p-6 rounded-xl transition-all duration-300 hover:shadow-card hover:-translate-y-2 relative overflow-hidden">
        {/* 渐变背景 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${collection.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        {/* 装饰性背景 */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-xl group-hover:bg-accent/10 transition-colors"></div>
        
        <div className="relative z-10">
          {/* 图标区域 */}
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${collection.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ${collection.accentColor}`}>
            {icon}
          </div>
          
          {/* 标题区域 */}
          <div className="mb-3">
            <h3 className="text-xl font-serif font-bold text-primary group-hover:text-accent transition-colors">
              {collection.title}
            </h3>
            <p className="text-sm font-sans text-[var(--text-secondary)] mt-1">
              {collection.subtitle}
            </p>
          </div>
          
          {/* 描述 */}
          <p className="text-sm font-sans font-light text-[var(--text-secondary)] leading-relaxed opacity-80">
            {collection.description}
          </p>
          
          {/* 悬停指示器 */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

// 分类筛选组件
function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange
}: {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => onCategoryChange('全部')}
        className={`px-4 py-2 rounded-full border transition-all duration-300 font-sans text-sm ${
          activeCategory === '全部'
            ? 'bg-primary text-white border-primary shadow-md'
            : 'bg-surface border-[var(--border)] text-[var(--text-secondary)] hover:border-primary hover:text-primary'
        }`}
      >
        全部主题
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full border transition-all duration-300 font-sans text-sm ${
            activeCategory === category
              ? 'bg-primary text-white border-primary shadow-md'
              : 'bg-surface border-[var(--border)] text-[var(--text-secondary)] hover:border-primary hover:text-primary'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  
  // 获取所有分类
  const categories = Array.from(new Set(collections.map(c => c.category)));
  
  // 筛选主题
  const filteredCollections = activeCategory === '全部'
    ? collections
    : collections.filter(c => c.category === activeCategory);

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
      <div className="max-w-7xl mx-auto mb-8 animate-fade-in-up">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-accent/50"></div>
            <span className="text-accent tracking-[0.3em] text-xs md:text-sm uppercase font-semibold">
              Curated Collections
            </span>
            <div className="h-[1px] w-12 bg-accent/50"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
            精选主题
          </h1>
          
          <p className="text-lg font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-4">
            精心策划的诗词主题，带你深入探索中国古典文学的精髓。
            从朝代到诗人，从风格到流派，发现诗词的无限魅力。
          </p>
          
          <div className="text-sm font-sans text-[var(--text-secondary)] opacity-70">
            共 {collections.length} 个主题 • {categories.length} 大类别
          </div>
        </div>
      </div>

      {/* 2. 分类筛选 */}
      <div className="max-w-7xl mx-auto">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {/* 3. 精选主题网格 */}
      <div className="max-w-7xl mx-auto">
        {filteredCollections.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCollections.map((collection, index) => (
                <div
                  key={collection.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in-up"
                >
                  <CollectionCard collection={collection} />
                </div>
              ))}
            </div>
            
            {/* 分类统计 */}
            <div className="mt-12 text-center text-[var(--text-secondary)] font-sans text-sm">
              <p>
                当前显示 {filteredCollections.length} 个主题
                {activeCategory !== '全部' && ` • ${activeCategory}系列`}
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-[var(--text-secondary)] font-sans">
            <p className="text-lg mb-2">暂无该分类的主题</p>
            <p className="text-sm opacity-70">请选择其他分类查看</p>
          </div>
        )}
      </div>

      {/* 4. 底部说明 */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[var(--border)]">
        <div className="text-center text-[var(--text-secondary)] font-sans text-sm">
          <p>点击主题卡片可浏览相关诗词作品</p>
          <p className="mt-2 opacity-60">基于标签数据优化的24个主题，涵盖中国古典文学精华</p>
        </div>
      </div>
    </main>
  );
}