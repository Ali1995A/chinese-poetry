import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Mountain, Wind, Feather, Scroll, Quote } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import PoemCard from '@/components/PoemCard';
import CalligraphyStroke from '@/components/CalligraphyStroke';
import { supabase } from '@/utils/supabase';

export const metadata: Metadata = {
  title: '诗云 Poetry Cloud - 寻觅中国诗词之美',
  description: '在数字世界重拾水墨丹青的感动，探索唐诗、宋词、元曲等中国古典诗词的无限魅力。每日推荐经典诗词，提供智能搜索和个性化收藏功能。',
  keywords: '诗词,唐诗,宋词,元曲,古典文学,中国诗词,诗歌欣赏,诗词搜索,李白,杜甫,苏轼',
  openGraph: {
    title: '诗云 Poetry Cloud - 寻觅中国诗词之美',
    description: '在数字世界重拾水墨丹青的感动，探索中国古典诗词的无限魅力',
    type: 'website',
    locale: 'zh_CN',
  },
};

// 分类导航数据
const categories = [
  { name: '唐诗', icon: <Mountain size={20} />, count: '精选', href: '/poems?dynasty=唐' },
  { name: '宋词', icon: <Wind size={20} />, count: '精选', href: '/poems?dynasty=宋' },
  { name: '元曲', icon: <Feather size={20} />, count: '收录', href: '/poems?dynasty=元' },
  { name: '全部', icon: <Scroll size={20} />, count: '文库', href: '/poems' },
];

// 生成基于日期的稳定随机数种子
function getDailySeed(): number {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 转换为32位整数
  }
  return Math.abs(hash);
}

// 服务端组件
export default async function Home() {
  
  // ================= 从数据库获取真实数据 =================
  // 基于日期的稳定随机推荐算法
  const dailySeed = getDailySeed();
  
  // 获取所有诗歌ID
  const { data: allPoems, error: countError } = await supabase
    .from('poems')
    .select('id')
    .order('id');

  if (countError) {
    console.error('Error fetching poem IDs:', countError);
  }

  // 使用基于日期的随机算法选择6首不同的诗
  let featuredPoems = null;
  let error = null;
  
  if (allPoems && allPoems.length > 0) {
    const getRandomIndices = () => {
      const indices = new Set<number>();
      while (indices.size < Math.min(6, allPoems.length)) {
        const randomValue = Math.sin(dailySeed + indices.size * 100) * 10000;
        const index = Math.floor(Math.abs(randomValue) % allPoems.length);
        indices.add(index);
      }
      return Array.from(indices);
    };

    const randomIndices = getRandomIndices();
    const selectedIds = randomIndices.map(index => allPoems[index].id);
    
    // 获取选中的诗歌详情
    const { data: poemsData, error: poemsError } = await supabase
      .from('poems')
      .select('*')
      .in('id', selectedIds);

    featuredPoems = poemsData;
    error = poemsError;
  }

  if (error) {
    console.error('Error fetching home poems:', error);
  }
  // =======================================================

  return (
    <main className="min-h-screen bg-[var(--background)] selection:bg-accent/20 selection:text-primary overflow-x-hidden">
      
      {/* 1. Hero 区域：视觉中心 */}
      <section className="relative pt-32 pb-20 px-4 md:px-8">
        {/* 背景水墨装饰 */}
        <CalligraphyStroke className="w-[600px] h-[600px] -top-20 -right-20 opacity-40 rotate-12" type="splash" />
        <CalligraphyStroke className="w-[400px] h-[400px] top-40 -left-20 opacity-30 -rotate-45" type="circle" />

        {/* 背景超大淡字 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] leading-none font-serif font-bold text-primary opacity-[0.03] select-none pointer-events-none whitespace-nowrap z-0">
          水 墨 丹 青
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* 顶部小标签 */}
          <div className="flex items-center justify-center gap-3 mb-6 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
            <div className="h-[1px] w-12 bg-accent/50"></div>
            <span className="text-accent tracking-[0.3em] text-xs md:text-sm uppercase font-semibold">
              Neo-Chinese Poetry
            </span>
            <div className="h-[1px] w-12 bg-accent/50"></div>
          </div>
          
          {/* 主标题 - 保持宋体 (Serif) 以体现古风 */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-primary leading-tight tracking-tight drop-shadow-sm">
            寻觅<span className="italic text-accent relative inline-block mx-2 font-light">
              诗
              <Sparkles className="absolute -top-2 -right-5 w-5 h-5 text-accent/60 animate-pulse-slow" />
            </span>意
          </h1>
          
          {/* 副标题 - ✅ 改为幼圆/细黑 (Sans) 并加 font-light */}
          <p className="text-lg md:text-xl font-sans font-light text-[var(--text-secondary)] max-w-2xl mx-auto leading-loose pt-4">
            在数字世界重拾水墨丹青的感动，<br className="hidden md:block"/>
            让每一次阅读都成为一场心灵的修行。
          </p>

          {/* 每日一言 */}
          <div className="mt-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="bg-surface/60 backdrop-blur-sm border border-[var(--border)] rounded-2xl p-6 text-center relative overflow-hidden">
              {/* 装饰性背景 */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-accent/40 to-primary/20"></div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/5 rounded-full blur-xl"></div>
              
              <div className="flex items-center justify-center gap-2 mb-3">
                <Quote size={18} className="text-accent" />
                <span className="text-sm font-sans font-medium text-accent">每日一言</span>
              </div>
              
              <p className="text-lg font-serif text-primary leading-relaxed mb-2">
                {(() => {
                  const dailyQuotes = [
                    "诗者，志之所之也。在心为志，发言为诗。",
                    "不学诗，无以言。",
                    "诗可以兴，可以观，可以群，可以怨。",
                    "文章千古事，得失寸心知。",
                    "读书破万卷，下笔如有神。",
                    "腹有诗书气自华。",
                    "熟读唐诗三百首，不会作诗也会吟。",
                    "诗是无形画，画是有形诗。",
                    "吟安一个字，捻断数茎须。",
                    "两句三年得，一吟双泪流。"
                  ];
                  const seed = getDailySeed();
                  return dailyQuotes[seed % dailyQuotes.length];
                })()}
              </p>
              
              <p className="text-sm font-sans text-[var(--text-secondary)] opacity-70">
                每日更新 · 经典诗词名言
              </p>
            </div>
          </div>

          {/* 搜索组件 */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
              <SearchBar className="relative z-10" />
            </div>
            
            {/* 热门标签 - ✅ 改为幼圆/细黑 (Sans) */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-sans text-[var(--text-secondary)]">
              <span className="opacity-60">热门探索：</span>
              {['李白', '杜甫', '苏轼', '春江花月夜', '相思'].map((tag) => (
                <Link 
                  key={tag} 
                  href={`/poems?q=${encodeURIComponent(tag)}`}
                  className="hover:text-primary hover:text-glow transition-colors duration-300 relative group/link"
                >
                  {tag}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover/link:w-full"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. 分类导航 */}
      <section className="max-w-5xl mx-auto px-4 mb-20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.href} className="group">
              <div className="bg-surface/60 backdrop-blur-sm border border-[var(--border)] hover:border-accent/30 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:shadow-card hover:-translate-y-1 group-hover:bg-surface">
                <div className="w-12 h-12 rounded-full bg-primary/5 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {cat.icon}
                </div>
                <div>
                  {/* 分类标题保持宋体 */}
                  <h3 className="font-serif font-bold text-lg text-primary">{cat.name}</h3>
                  {/* 数量说明改为细黑 */}
                  <p className="text-xs font-sans text-[var(--text-secondary)]">{cat.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. 每日推荐区域 (真实数据) */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-24 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <div className="flex justify-between items-end mb-12 border-b border-[var(--border)] pb-4">
          <div className="relative">
            <h2 className="text-3xl font-serif font-bold text-primary flex items-center gap-2">
              <span className="w-1 h-8 bg-accent rounded-full mr-2"></span>
              今日赏析
            </h2>
          </div>
          <Link href="/poems" className="group flex items-center gap-1 text-[var(--text-secondary)] hover:text-primary transition-colors font-serif text-sm md:text-base">
            浏览文库
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* 数据展示 */}
        {featuredPoems && featuredPoems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPoems.map((poem, index) => (
              <div key={poem.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
                <PoemCard 
                  id={poem.id}
                  title={poem.title}
                  author={poem.author}
                  dynasty={poem.dynasty}
                  // 处理摘录：取数组第一句，或者截取前60字
                  excerpt={Array.isArray(poem.content) ? poem.content.join('，').slice(0, 60) + '...' : poem.content?.slice(0, 60) + '...'}
                  tags={poem.tags}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-[var(--text-secondary)] font-sans">
            {error ? '加载推荐失败，请刷新重试' : '暂无推荐诗词，请先运行导入脚本'}
          </div>
        )}
      </section>
      
    </main>
  );
}