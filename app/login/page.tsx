"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, UserPlus, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import CalligraphyStroke from '@/components/CalligraphyStroke';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // 登录
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        // 登录成功，跳转到首页
        router.push('/');
        router.refresh();
      } else {
        // 注册
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username,
            },
          },
        });

        if (error) throw error;

        if (data.user) {
          // 注册成功，显示提示信息
          alert('注册成功！请检查您的邮箱验证邮件。');
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      setError(error.message || '发生错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 bg-[var(--background)]">
      
      {/* 背景装饰 */}
      <div className="absolute -top-20 -right-20 opacity-40 rotate-12">
        <CalligraphyStroke className="w-[600px] h-[600px]" />
      </div>
      <div className="absolute top-40 -left-20 opacity-30 -rotate-45">
        <CalligraphyStroke className="w-[400px] h-[400px]" />
      </div>

      <div className="max-w-md mx-auto animate-fade-in-up">
        
        {/* 卡片容器 */}
        <div className="bg-surface border border-[var(--border)] rounded-2xl p-8 shadow-card">
          
          {/* 头部 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              {isLogin ? <User size={24} /> : <UserPlus size={24} />}
            </div>
            <h1 className="text-2xl font-serif font-bold text-primary mb-2">
              {isLogin ? '欢迎回来' : '加入诗云'}
            </h1>
            <p className="text-[var(--text-secondary)] font-sans">
              {isLogin ? '登录您的账号继续探索' : '创建账号开始您的诗词之旅'}
            </p>
          </div>

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {!isLogin && (
              <div>
                <label className="block text-sm font-sans font-medium text-[var(--text-secondary)] mb-2">
                  用户名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="请输入用户名"
                    className="w-full py-2.5 pl-10 pr-4 bg-surface border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-sans font-medium text-[var(--text-secondary)] mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="请输入邮箱地址"
                  className="w-full py-2.5 pl-10 pr-4 bg-surface border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-sans font-medium text-[var(--text-secondary)] mb-2">
                密码
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[var(--text-secondary)]">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  className="w-full py-2.5 pl-10 pr-10 bg-surface border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-secondary)] hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-sans">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-sans font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
            </button>
          </form>

          {/* 切换链接 */}
          <div className="mt-6 text-center">
            <p className="text-[var(--text-secondary)] font-sans text-sm">
              {isLogin ? '还没有账号？' : '已有账号？'}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="ml-1 text-primary hover:text-accent font-medium transition-colors"
              >
                {isLogin ? '立即注册' : '立即登录'}
              </button>
            </p>
          </div>

          {/* 返回首页 */}
          <div className="mt-6 pt-6 border-t border-[var(--border)] text-center">
            <Link 
              href="/" 
              className="text-[var(--text-secondary)] hover:text-primary font-sans text-sm transition-colors"
            >
              ← 返回首页
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}