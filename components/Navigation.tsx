"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Search, User, BookOpen, Feather, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  // 监听滚动以改变导航栏状态
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由变化时关闭移动端菜单
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: '首页', href: '/' },
    { name: '文库', href: '/poems' },
    { name: '诗人', href: '/authors' },
    { name: '精选', href: '/collections' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-surface/80 backdrop-blur-md border-b border-[var(--border)] shadow-sm py-3' 
            : 'bg-transparent py-5 border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center">
            
            {/* 1. Logo 区域 */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className={`w-8 h-8 flex items-center justify-center border rounded-lg transition-colors duration-300 ${
                isScrolled ? 'border-primary text-primary' : 'border-primary/80 text-primary'
              }`}>
                <span className="font-serif font-bold text-lg">诗</span>
              </div>
              <span className="text-2xl font-serif font-bold text-primary tracking-widest group-hover:text-accent transition-colors duration-300">
                诗云
              </span>
            </Link>

            {/* 2. 桌面端导航链接 */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-sans text-lg md:text-xl font-medium tracking-wide transition-colors duration-300 ${
                    pathname === link.href
                      ? 'text-primary font-bold'
                      : 'text-[var(--text-secondary)] hover:text-primary'
                  }`}
                >
                  {link.name}
                  {/* 激活状态下的底部指示点 */}
                  {pathname === link.href && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            {/* 3. 右侧功能区 (桌面) */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/poems" className="p-2 text-[var(--text-secondary)] hover:text-primary hover:bg-primary/5 rounded-full transition-colors">
                <Search size={20} />
              </Link>
              <div className="h-4 w-[1px] bg-[var(--border)]"></div>
              
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 text-primary text-sm">
                    <User size={16} />
                    <span>{user.email?.split('@')[0]}</span>
                  </div>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-sm hover:bg-red-600 transition-all duration-300"
                  >
                    <LogOut size={16} />
                    <span>退出</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 text-primary text-sm hover:bg-primary hover:text-white transition-all duration-300">
                    <UserPlus size={16} />
                    <span>注册</span>
                  </Link>
                  <Link href="/login" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-white text-sm hover:bg-primary/90 transition-all duration-300">
                    <User size={16} />
                    <span>登入</span>
                  </Link>
                </>
              )}
            </div>

            {/* 4. 移动端菜单按钮 */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= 移动端全屏菜单 ================= */}
      <div 
        className={`fixed inset-0 z-40 bg-[var(--background)] md:hidden transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-10">
          {/* 装饰背景 */}
          <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
            <Feather size={300} />
          </div>

          {/* 移动端链接 */}
          <div className="flex flex-col gap-6 text-center space-y-4">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-sans text-primary hover:text-accent transition-colors py-4 border-b border-[var(--border)]/50"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 移动端底部功能 */}
          <div className="mt-auto space-y-6">
            {user ? (
              <>
                <div className="flex items-center justify-center gap-2 w-full py-4 border border-primary/30 text-primary rounded-xl text-lg">
                  <User size={20} />
                  <span>{user.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-4 bg-red-500 text-white rounded-xl text-lg shadow-lg active:scale-95 transition-transform"
                >
                  <LogOut size={20} />
                  <span>退出登录</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white rounded-xl text-lg shadow-lg active:scale-95 transition-transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={20} />
                  <span>立即登录</span>
                </Link>
                
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 w-full py-4 border border-primary text-primary rounded-xl text-lg active:scale-95 transition-transform"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserPlus size={20} />
                  <span>注册账号</span>
                </Link>
              </>
            )}
             
             <div className="flex justify-center gap-8 text-[var(--text-secondary)]">
               <Link href="/poems" className="flex flex-col items-center gap-1 text-xs" onClick={() => setIsMobileMenuOpen(false)}>
                 <div className="p-3 bg-surface border border-[var(--border)] rounded-full">
                   <Search size={20} />
                 </div>
                 搜索
               </Link>
               <Link href="/poems" className="flex flex-col items-center gap-1 text-xs" onClick={() => setIsMobileMenuOpen(false)}>
                 <div className="p-3 bg-surface border border-[var(--border)] rounded-full">
                   <BookOpen size={20} />
                 </div>
                 文库
               </Link>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}