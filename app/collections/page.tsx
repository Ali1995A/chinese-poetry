import React from 'react';
import Link from 'next/link';
import { Crown, Mountain, Wind, User, BookOpen, Sparkles } from 'lucide-react';
import CalligraphyStroke from '@/components/CalligraphyStroke';

// 精选主题配置
const collections = [
  {
    id: 'tang-dynasty',
    title: '大唐风华',
    subtitle: 'Tang Dynasty',
    description: '盛唐气象，诗酒风流，感受李白、杜甫等大家的豪迈与沉郁',
    icon: <Mountain size={32} />,
    href: '/poems?dynasty=唐',
    color: 'from-blue-500/10 to-purple-500/10',
    accentColor: 'text-blue-600'
  },
  {
    id: 'song-ci',
    title: '宋词雅韵',
    subtitle: 'Song Ci',
    description: '婉约豪放，词牌格律，品味苏轼、李清照的词中意境',
    icon: <Wind size={32} />,
    href: '/poems?dynasty=宋',
    color: 'from-green-500/10 to-teal-500/10',
    accentColor: 'text-green-600'
  },
  {
    id: 'li-bai',
    title: '诗仙·李白',
    subtitle: 'Li Bai',
    description: '谪仙人，诗酒剑，浪漫主义诗歌的巅峰代表',
    icon: <Sparkles size={32} />,
    href: '/poems?q=李白',
    color: 'from-yellow-500/10 to-orange-500/10',
    accentColor: 'text-yellow-600'
  },
  {
    id: 'du-fu',
    title: '诗圣·杜甫',
    subtitle: 'Du Fu',
    description: '诗史，沉郁顿挫，现实主义诗歌的集大成者',
    icon: <BookOpen size={32} />,
    href: '/poems?q=杜甫',
    color: 'from-red-500/10 to-pink-500/10',
    accentColor: 'text-red-600'
  },
  {
    id: 'su-shi',
    title: '东坡·苏轼',
    subtitle: 'Su Shi',
    description: '豪放词宗，诗书画三绝，宋代文学的代表人物',
    icon: <User size={32} />,
    href: '/poems?q=苏轼',
    color: 'from-indigo-500/10 to-blue-500/10',
    accentColor: 'text-indigo-600'
  },
  {
    id: 'li-qingzhao',
    title: '易安·李清照',
    subtitle: 'Li Qingzhao',
    description: '婉约词后，才情横溢，宋代女词人的杰出代表',
    icon: <Crown size={32} />,
    href: '/poems?q=李清照',
    color: 'from-purple-500/10 to-pink-500/10',
    accentColor: 'text-purple-600'
  }
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

export default function CollectionsPage() {
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
      <div className="max-w-7xl mx-auto mb-16 animate-fade-in-up">
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
          
          <p className="text-lg font-sans font-light text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            精心策划的诗词主题，带你深入探索中国古典文学的精髓。
            从朝代到诗人，从风格到流派，发现诗词的无限魅力。
          </p>
        </div>
      </div>

      {/* 2. 精选主题网格 */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div 
              key={collection.id}
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-fade-in-up"
            >
              <CollectionCard collection={collection} />
            </div>
          ))}
        </div>
      </div>

      {/* 3. 底部说明 */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[var(--border)]">
        <div className="text-center text-[var(--text-secondary)] font-sans text-sm">
          <p>点击主题卡片可浏览相关诗词作品</p>
          <p className="mt-2 opacity-60">更多主题持续更新中...</p>
        </div>
      </div>
    </main>
  );
}