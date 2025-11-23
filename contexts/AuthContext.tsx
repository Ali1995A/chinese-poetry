"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  // 收藏功能
  favorites: string[];
  isFavorite: (poemId: string) => boolean;
  toggleFavorite: (poemId: string) => Promise<void>;
  loadingFavorites: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  // 加载用户收藏
  const loadFavorites = async (userId: string) => {
    setLoadingFavorites(true);
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('poem_id')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const favoriteIds = data?.map(item => item.poem_id) || [];
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  useEffect(() => {
    // 获取当前用户会话
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadFavorites(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // 监听认证状态变化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await loadFavorites(session.user.id);
      } else {
        setFavorites([]);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setFavorites([]);
  };

  // 检查是否为收藏
  const isFavorite = (poemId: string) => {
    return favorites.includes(poemId);
  };

  // 切换收藏状态
  const toggleFavorite = async (poemId: string) => {
    if (!user) return;

    setLoadingFavorites(true);
    try {
      if (isFavorite(poemId)) {
        // 取消收藏
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('poem_id', poemId);

        if (error) throw error;
        setFavorites(prev => prev.filter(id => id !== poemId));
      } else {
        // 添加收藏
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            poem_id: poemId
          });

        if (error) throw error;
        setFavorites(prev => [...prev, poemId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoadingFavorites(false);
    }
  };

  const value = {
    user,
    loading,
    signOut,
    favorites,
    isFavorite,
    toggleFavorite,
    loadingFavorites
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}