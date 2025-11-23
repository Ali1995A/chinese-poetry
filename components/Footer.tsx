"use client";

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, ArrowUp, Heart } from 'lucide-react'; // 引入 Heart 图标

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[var(--surface)] pt-20 pb-10 border-t border-[var(--border)] overflow-hidden">
      
      {/* 1. 顶部装饰：山峦曲线 (SVG) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 transform translate-y-[-1px]">
        <svg className="relative block w-full h-[40px] md:h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-[var(--background)]"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* 左侧：品牌与项目介绍 */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-primary rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="font-serif font-bold text-xl">诗</span>
                </div>
                <span className="text-2xl font-serif font-bold text-primary tracking-widest">
                  诗云
                </span>
              </Link>
              {/* 项目介绍 */}
              <p className="text-[var(--text-secondary)] font-sans font-light leading-relaxed">
                现代化的中文诗词数字文库，致力于让传统文化在现代设计中焕发新生，为每一位诗词爱好者提供静心阅读的栖息地。
              </p>
            </div>
            
            {/* 社交链接 */}
            <div className="flex gap-4">
              <a href="#" className="p-2 text-[var(--text-secondary)] hover:text-primary hover:bg-primary/5 rounded-full transition-colors border border-transparent hover:border-primary/20">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 text-[var(--text-secondary)] hover:text-primary hover:bg-primary/5 rounded-full transition-colors border border-transparent hover:border-primary/20">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 text-[var(--text-secondary)] hover:text-primary hover:bg-primary/5 rounded-full transition-colors border border-transparent hover:border-primary/20">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* 右侧：导航链接 */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 探索 */}
              <div>
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent rounded-full"></span>
                  探索
                </h4>
                <ul className="space-y-3 font-sans text-[var(--text-secondary)]">
                  <li><Link href="/poems" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">诗词文库</Link></li>
                  <li><Link href="/authors" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">历代诗人</Link></li>
                  <li><Link href="/collections" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">精选主题</Link></li>
                </ul>
              </div>

              {/* 关于 */}
              <div>
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent rounded-full"></span>
                  关于
                </h4>
                <ul className="space-y-3 font-sans text-[var(--text-secondary)]">
                  <li><Link href="/about" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">关于我们</Link></li>
                  <li><Link href="/log" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">更新日志</Link></li>
                  <li><Link href="/feedback" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">意见反馈</Link></li>
                </ul>
              </div>

              {/* 支持 */}
              <div>
                <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 bg-accent rounded-full"></span>
                  支持
                </h4>
                <ul className="space-y-3 font-sans text-[var(--text-secondary)]">
                  <li><Link href="/api" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">开放 API</Link></li>
                  <li><Link href="/help" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">帮助中心</Link></li>
                  <li><Link href="/contact" className="hover:text-primary hover:underline decoration-accent underline-offset-4 transition-all">联系我们</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 底部版权栏 + ICC 落款 */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-sans text-[var(--text-secondary)]">
            © {new Date().getFullYear()} 诗云 (Poetry Cloud). All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
             {/* ✅ 这里加入了 ICC 落款 */}
             <div className="flex items-center gap-1 text-xs md:text-sm font-sans text-[var(--text-secondary)] opacity-80 hover:opacity-100 transition-opacity cursor-default" title="I Love CC">
                <span className="font-bold tracking-widest text-primary">ICC</span>
                <span>·</span>
                <span>Made with</span>
                <Heart size={12} className="text-accent fill-accent animate-pulse" />
                <span>for</span>
                <span className="font-medium text-primary">CC</span>
             </div>
             
             {/* 返回顶部按钮 */}
             <button 
                onClick={scrollToTop}
                className="p-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 hover:-translate-y-1 transition-all duration-300 group"
                aria-label="Back to top"
             >
                <ArrowUp size={18} className="group-hover:animate-bounce" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
}