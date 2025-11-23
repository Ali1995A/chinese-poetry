"use client";

import React from 'react';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface FavoriteButtonProps {
  poemId: string;
  className?: string;
}

export default function FavoriteButton({ poemId, className = '' }: FavoriteButtonProps) {
  const { user, isFavorite, toggleFavorite, loadingFavorites } = useAuth();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // 可以在这里添加登录提示或重定向
      return;
    }

    await toggleFavorite(poemId);
  };

  if (!user) {
    return (
      <button 
        className={`flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-surface text-[var(--text-secondary)] hover:text-primary hover:border-primary/30 transition-all text-sm font-serif ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // 可以在这里添加登录提示
        }}
      >
        <Heart size={16} />
        <span className="hidden sm:inline">收藏</span>
      </button>
    );
  }

  const isFavorited = isFavorite(poemId);

  return (
    <button 
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-sm font-serif ${
        isFavorited
          ? 'bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600'
          : 'bg-surface border-[var(--border)] text-[var(--text-secondary)] hover:text-primary hover:border-primary/30'
      } ${className}`}
      onClick={handleClick}
      disabled={loadingFavorites}
    >
      {loadingFavorites ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      ) : (
        <Heart size={16} className={isFavorited ? 'fill-current' : ''} />
      )}
      <span className="hidden sm:inline">
        {isFavorited ? '已收藏' : '收藏'}
      </span>
    </button>
  );
}