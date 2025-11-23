"use client";

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ 
  placeholder = "搜索诗词、作者、意象...", 
  className = "",
  autoFocus = false
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`relative group w-full ${className}`}
    >
      <div className="relative flex items-center bg-surface border border-[var(--border)] rounded-full shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/30 focus-within:border-primary">
        <div className="pl-4 text-[var(--text-secondary)]">
          <Search size={20} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full py-3 px-3 bg-transparent border-none outline-none font-serif text-primary placeholder:text-[var(--text-secondary)]/50"
        />
        
        {/* 清除按钮 */}
        {query && (
          <button 
            type="button"
            onClick={() => setQuery('')}
            className="p-2 mr-1 text-[var(--text-secondary)] hover:text-primary transition-colors"
          >
            <X size={16} />
          </button>
        )}

        <button 
          type="submit"
          className="hidden sm:block mr-1.5 px-6 py-1.5 bg-primary text-white rounded-full text-sm hover:bg-primary-light transition-colors duration-300"
        >
          搜索
        </button>
      </div>
    </form>
  );
}