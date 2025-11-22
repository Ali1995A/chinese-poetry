import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Mountain, Wind, Feather, Scroll } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import PoemCard from '@/components/PoemCard';
import CalligraphyStroke from '@/components/CalligraphyStroke';
import { supabase } from '@/utils/supabase';

// 分类导航数据
const categories = [
  { name: '唐诗', icon: <Mountain size={20} />, count: '精选', href: '/poems?dynasty=唐' },
  { name: '宋词', icon: <Wind size={20} />, count: '精选', href: '/poems?dynasty=宋' },
  { name: '元曲', icon: <Feather size={20} />, count: '收录', href: '/poems?dynasty=元' },
  { name: '全部', icon: <Scroll size={20} />, count: '文库', href: '/poems' },
];

// 服务端组件
export default async function Home() {
  
  // ================= 从数据库获取真实数据 =================
  // 随机获取 3 首诗作为推荐 (使用 limit 简单获取)
  const { data: featuredPoems, error } = await supabase
    .from('poems')
    .select('*')
    .limit(3); 

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
              <div key={poem.id} style={{ animationDelay: `${index * 150}ms` }} className="animate-fade-in-up">
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