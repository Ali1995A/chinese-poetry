import React from 'react';
import Link from 'next/link';
import { Search, Filter, ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '@/utils/supabase';

// 定义每页显示多少条
const ITEMS_PER_PAGE = 24;
const DYNASTIES = ['全部', '唐', '宋', '元', '明', '清', '五代'];

// 这是一个服务端组件 (Server Component)
export default async function PoemsLibrary({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 1. 获取 URL 参数
  const dynasty = typeof searchParams.dynasty === 'string' ? searchParams.dynasty : '全部';
  const query = typeof searchParams.q === 'string' ? searchParams.q : '';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;

  // 2. 构建数据库查询
  let dbQuery = supabase
    .from('poems')
    .select('id, title, author, dynasty, content, tags', { count: 'exact' }); // 请求总数

  // 应用筛选条件
  if (dynasty !== '全部') {
    dbQuery = dbQuery.eq('dynasty', dynasty);
  }

  // 应用搜索条件 (搜索标题或作者)
  if (query) {
    dbQuery = dbQuery.or(`title.ilike.%${query}%,author.ilike.%${query}%`);
  }

  // 应用分页 (from - to)
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;
  
  const { data: poems, count, error } = await dbQuery
    .range(from, to)
    .order('created_at', { ascending: false }); // 按导入时间倒序，或者按 id 排序

  if (error) {
    console.error('Error fetching poems:', error);
  }

  const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 1;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[var(--background)]">
      
      {/* 1. 头部与搜索 */}
      <div className="max-w-7xl mx-auto mb-12 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--border)] pb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-3">诗词文库</h1>
            <p className="text-[var(--text-secondary)] font-serif">
              当前收录 <span className="text-accent font-bold">{count || 0}</span> 篇经典作品
            </p>
          </div>
          
          {/* 搜索表单 - 重定向到搜索页面 */}
          <form action="/search" method="get" className="relative group w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
              <Search size={18} />
            </div>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="查找诗名 / 作者 / 诗句..."
              className="w-full py-2.5 pl-10 pr-4 bg-surface border border-[var(--border)] rounded-full text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-serif"
            />
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* 2. 左侧筛选 (链接跳转方式) */}
        <aside className="hidden lg:block lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-surface p-6 rounded-2xl border border-[var(--border)] shadow-sm sticky top-24">
            <h3 className="font-serif font-bold text-primary mb-4 flex items-center gap-2">
              <Filter size={18} />
              朝代
            </h3>
            <div className="flex flex-col gap-2">
              {DYNASTIES.map(d => (
                <Link
                  key={d}
                  href={`/poems?dynasty=${d}${query ? `&q=${query}` : ''}`}
                  className={`flex justify-between items-center px-4 py-2 rounded-lg text-sm font-serif transition-all ${
                    dynasty === d 
                      ? 'bg-primary text-white shadow-md transform translate-x-2' 
                      : 'text-[var(--text-secondary)] hover:bg-[var(--background)] hover:text-primary'
                  }`}
                >
                  <span>{d}</span>
                  {dynasty === d && <ChevronRight size={14} />}
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* 3. 右侧列表 */}
        <div className="col-span-1 lg:col-span-10 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          
          {/* 列表网格 */}
          {poems && poems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {poems.map((poem) => (
                <Link key={poem.id} href={`/poem/${poem.id}`} className="group block">
                  <article className="h-full bg-surface border border-[var(--border)] hover:border-primary/30 p-6 rounded-xl transition-all duration-300 hover:shadow-card hover:-translate-y-1 relative overflow-hidden flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
                        {poem.dynasty}
                      </span>
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {poem.author}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-1">
                      {poem.title}
                    </h3>

                    <div className="flex-grow">
                      <p className="text-[var(--text-primary)] font-serif leading-loose opacity-80 line-clamp-3 text-sm">
                        {/* 取第一句或前几个字 */}
                        {Array.isArray(poem.content) ? poem.content.join('，') : poem.content}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-[var(--text-secondary)] font-serif">未找到相关诗词</p>
            </div>
          )}

          {/* 4. 分页控件 */}
          <div className="flex justify-center items-center gap-4 pt-8 border-t border-[var(--border)]">
            {page > 1 && (
              <Link 
                href={`/poems?page=${page - 1}&dynasty=${dynasty}${query ? `&q=${query}` : ''}`}
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-[var(--border)] hover:border-primary hover:text-primary transition-colors text-sm font-serif"
              >
                <ChevronLeft size={16} /> 上一页
              </Link>
            )}
            
            <span className="font-serif text-sm text-[var(--text-secondary)]">
              第 {page} 页 / 共 {totalPages} 页
            </span>

            {page < totalPages && (
              <Link 
                href={`/poems?page=${page + 1}&dynasty=${dynasty}${query ? `&q=${query}` : ''}`}
                className="flex items-center gap-1 px-4 py-2 rounded-full border border-[var(--border)] hover:border-primary hover:text-primary transition-colors text-sm font-serif"
              >
                下一页 <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}