"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Crown, Mountain, Wind, User, BookOpen, Sparkles,
  Feather, Scroll, Moon, GraduationCap, BookMarked,
  Trees, Swords, Flower, Zap, Sun, Map, Heart, Cloud
} from 'lucide-react';
import CalligraphyStroke from '@/components/CalligraphyStroke';

// 精选主题配置 - 基于标签数据优化的24个主题系列
const collections = [
  // 🏛️ 朝代经典系列 (5个)
  {
    id: 'tang-dynasty',
    title: '大唐风华',
    subtitle: 'Tang Dynasty',
    description: '盛唐气象，诗酒风流，感受李白、杜甫等大家的豪迈与沉郁',
    icon: <Mountain size={32} />,
    href: '/poems?dynasty=唐',
    color: 'from-blue-500/10 to-purple-500/10',
    accentColor: 'text-blue-600',
    category: '朝代经典'
  },
  {
    id: 'song-ci',
    title: '宋词雅韵',
    subtitle: 'Song Ci',
    description: '婉约豪放，词牌格律，品味苏轼、李清照的词中意境',
    icon: <Wind size={32} />,
    href: '/poems?dynasty=宋',
    color: 'from-green-500/10 to-teal-500/10',
    accentColor: 'text-green-600',
    category: '朝代经典'
  },
  {
    id: 'yuan-qu',
    title: '元曲风情',
    subtitle: 'Yuan Qu',
    description: '市井风情，散曲杂剧，体验元代文学的独特魅力',
    icon: <Feather size={32} />,
    href: '/poems?dynasty=元',
    color: 'from-orange-500/10 to-red-500/10',
    accentColor: 'text-orange-600',
    category: '朝代经典'
  },
  {
    id: 'shi-jing',
    title: '诗经古韵',
    subtitle: 'Shi Jing',
    description: '风雅颂三体，四言古韵，中国诗歌的源头活水',
    icon: <Scroll size={32} />,
    href: '/poems?q=诗经',
    color: 'from-amber-500/10 to-yellow-500/10',
    accentColor: 'text-amber-600',
    category: '朝代经典'
  },
  {
    id: 'chu-ci',
    title: '楚辞浪漫',
    subtitle: 'Chu Ci',
    description: '屈原离骚，浪漫主义，南方文学的瑰丽篇章',
    icon: <Sparkles size={32} />,
    href: '/poems?q=楚辞',
    color: 'from-pink-500/10 to-rose-500/10',
    accentColor: 'text-pink-600',
    category: '朝代经典'
  },

  // 👑 诗人名家系列 (6个)
  {
    id: 'li-bai',
    title: '诗仙·李白',
    subtitle: 'Li Bai',
    description: '谪仙人，诗酒剑，浪漫主义诗歌的巅峰代表',
    icon: <Sparkles size={32} />,
    href: '/poems?q=李白',
    color: 'from-yellow-500/10 to-orange-500/10',
    accentColor: 'text-yellow-600',
    category: '诗人名家'
  },
  {
    id: 'du-fu',
    title: '诗圣·杜甫',
    subtitle: 'Du Fu',
    description: '诗史，沉郁顿挫，现实主义诗歌的集大成者',
    icon: <BookOpen size={32} />,
    href: '/poems?q=杜甫',
    color: 'from-red-500/10 to-pink-500/10',
    accentColor: 'text-red-600',
    category: '诗人名家'
  },
  {
    id: 'su-shi',
    title: '东坡·苏轼',
    subtitle: 'Su Shi',
    description: '豪放词宗，诗书画三绝，宋代文学的代表人物',
    icon: <User size={32} />,
    href: '/poems?q=苏轼',
    color: 'from-indigo-500/10 to-blue-500/10',
    accentColor: 'text-indigo-600',
    category: '诗人名家'
  },
  {
    id: 'li-qingzhao',
    title: '易安·李清照',
    subtitle: 'Li Qingzhao',
    description: '婉约词后，才情横溢，宋代女词人的杰出代表',
    icon: <Crown size={32} />,
    href: '/poems?q=李清照',
    color: 'from-purple-500/10 to-pink-500/10',
    accentColor: 'text-purple-600',
    category: '诗人名家'
  },
  {
    id: 'wang-wei',
    title: '诗佛·王维',
    subtitle: 'Wang Wei',
    description: '诗中有画，画中有诗，山水田园诗派的杰出代表',
    icon: <Mountain size={32} />,
    href: '/poems?q=王维',
    color: 'from-emerald-500/10 to-green-500/10',
    accentColor: 'text-emerald-600',
    category: '诗人名家'
  },
  {
    id: 'bai-juyi',
    title: '诗魔·白居易',
    subtitle: 'Bai Juyi',
    description: '通俗易懂，关注民生，新乐府运动的倡导者',
    icon: <BookOpen size={32} />,
    href: '/poems?q=白居易',
    color: 'from-cyan-500/10 to-blue-500/10',
    accentColor: 'text-cyan-600',
    category: '诗人名家'
  },

  // 📚 蒙学启蒙系列 (2个) - 基于蒙学经典
  {
    id: 'sanzijing',
    title: '三字经',
    subtitle: 'Three Character Classic',
    description: '人之初，性本善，中国传统蒙学第一书',
    icon: <BookOpen size={32} />,
    href: '/poems?q=三字经',
    color: 'from-sky-500/10 to-blue-500/10',
    accentColor: 'text-sky-600',
    category: '蒙学启蒙'
  },
  {
    id: 'tangshi300',
    title: '唐诗三百首',
    subtitle: '300 Tang Poems',
    description: '熟读唐诗三百首，不会作诗也会吟，经典唐诗选集',
    icon: <BookMarked size={32} />,
    href: '/poems?dynasty=唐',
    color: 'from-rose-500/10 to-pink-500/10',
    accentColor: 'text-rose-600',
    category: '蒙学启蒙'
  },

  // 🏞️ 山水风光系列 (4个) - 基于山水、西湖、长江等地点标签
  {
    id: 'west-lake',
    title: '西湖诗韵',
    subtitle: 'West Lake',
    description: '欲把西湖比西子，淡妆浓抹总相宜，西湖美景的诗意表达',
    icon: <Trees size={32} />,
    href: '/poems?q=西湖',
    color: 'from-emerald-500/10 to-green-500/10',
    accentColor: 'text-emerald-600',
    category: '山水风光'
  },
  {
    id: 'yangtze-river',
    title: '长江情怀',
    subtitle: 'Yangtze River',
    description: '我住长江头，君住长江尾，长江流域的诗词情怀',
    icon: <Map size={32} />,
    href: '/poems?q=长江',
    color: 'from-blue-500/10 to-cyan-500/10',
    accentColor: 'text-blue-600',
    category: '山水风光'
  },
  {
    id: 'landscape-poetry',
    title: '山水田园',
    subtitle: 'Landscape Poetry',
    description: '采菊东篱下，悠然见南山，自然山水之美的诗意表达',
    icon: <Mountain size={32} />,
    href: '/poems?q=山水',
    color: 'from-green-500/10 to-emerald-500/10',
    accentColor: 'text-green-600',
    category: '山水风光'
  },
  {
    id: 'lake-poetry',
    title: '湖泊诗情',
    subtitle: 'Lake Poetry',
    description: '洞庭湖、太湖等湖泊的诗词意境，水天一色的美景',
    icon: <Cloud size={32} />,
    href: '/poems?q=湖',
    color: 'from-teal-500/10 to-cyan-500/10',
    accentColor: 'text-teal-600',
    category: '山水风光'
  },

  // 🎨 风格流派系列 (3个) - 基于婉约、豪放等风格标签
  {
    id: 'graceful-ci',
    title: '婉约词风',
    subtitle: 'Graceful Ci',
    description: '杨柳岸，晓风残月，婉约词的细腻柔情与含蓄之美',
    icon: <Flower size={32} />,
    href: '/poems?q=婉约',
    color: 'from-pink-500/10 to-rose-500/10',
    accentColor: 'text-pink-600',
    category: '风格流派'
  },
  {
    id: 'heroic-ci',
    title: '豪放词派',
    subtitle: 'Heroic Ci',
    description: '大江东去，浪淘尽，豪放词的磅礴气势与壮阔胸怀',
    icon: <Zap size={32} />,
    href: '/poems?q=豪放',
    color: 'from-red-500/10 to-orange-500/10',
    accentColor: 'text-red-600',
    category: '风格流派'
  },
  {
    id: 'frontier-poetry',
    title: '边塞豪情',
    subtitle: 'Frontier Poetry',
    description: '大漠孤烟直，长河落日圆，边塞军旅的豪情壮志',
    icon: <Swords size={32} />,
    href: '/poems?q=边塞',
    color: 'from-amber-500/10 to-yellow-500/10',
    accentColor: 'text-amber-600',
    category: '风格流派'
  },

  // 💕 情感主题系列 (4个) - 基于相思、离别等情感标签
  {
    id: 'love-poetry',
    title: '相思爱情',
    subtitle: 'Love Poetry',
    description: '此情可待成追忆，只是当时已惘然，爱情诗词的深情表达',
    icon: <Heart size={32} />,
    href: '/poems?q=相思',
    color: 'from-pink-500/10 to-rose-500/10',
    accentColor: 'text-pink-600',
    category: '情感主题'
  },
  {
    id: 'farewell-poetry',
    title: '离别愁绪',
    subtitle: 'Farewell Poetry',
    description: '劝君更尽一杯酒，西出阳关无故人，离别诗词的深情厚谊',
    icon: <Feather size={32} />,
    href: '/poems?q=离别',
    color: 'from-purple-500/10 to-violet-500/10',
    accentColor: 'text-purple-600',
    category: '情感主题'
  },
  {
    id: 'moon-poetry',
    title: '月夜相思',
    subtitle: 'Moon Poetry',
    description: '举头望明月，低头思故乡，月亮与相思的永恒主题',
    icon: <Moon size={32} />,
    href: '/poems?q=月',
    color: 'from-indigo-500/10 to-blue-500/10',
    accentColor: 'text-indigo-600',
    category: '情感主题'
  },
  {
    id: 'seasons-poetry',
    title: '四季诗情',
    subtitle: 'Four Seasons',
    description: '春华秋实，夏雨冬雪，四季变换的诗意表达',
    icon: <Sun size={32} />,
    href: '/poems?q=春',
    color: 'from-amber-500/10 to-orange-500/10',
    accentColor: 'text-amber-600',
    category: '情感主题'
  },

];

// 精选卡片组件
function CollectionCard({ collection }: { collection: typeof collections[0] }) {
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
            {collection.icon}
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