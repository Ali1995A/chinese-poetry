"use client";

import { useState, useEffect } from "react";
import { getAllPoems, searchPoems, getDailyPoem } from "../lib/data-service";
import { Poem } from "../types";
import PoemCard from "../components/PoemCard";
import SearchBar from "../components/SearchBar";

export default function HomePage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [dailyPoem, setDailyPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [allPoems, daily] = await Promise.all([
        getAllPoems(),
        getDailyPoem()
      ]);
      setPoems(allPoems);
      setDailyPoem(daily);
    } catch (error) {
      console.error("Failed to load poems:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      const allPoems = await getAllPoems();
      setPoems(allPoems);
      return;
    }

    try {
      setLoading(true);
      const result = await searchPoems(query);
      setPoems(result.poems);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && poems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F3EF] py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B93632] mx-auto mb-4"></div>
              <p className="text-gray-600">加载中...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F3EF] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl font-bold text-[#2C2C2C] mb-4">
            中国诗词精选
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            探索千年文化瑰宝，品味经典诗词韵味。从唐诗宋词到元曲明清，感受中华文化的深厚底蕴。
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Daily Poem */}
        {dailyPoem && !searchQuery && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#2C2C2C]">今日诗词</h2>
              <span className="text-xs bg-[#B93632] text-white px-2 py-1 rounded-full">
                每日推荐
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PoemCard poem={dailyPoem} />
            </div>
          </div>
        )}

        {/* All Poems */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold text-[#2C2C2C]">
              {searchQuery ? `搜索结果 (${poems.length})` : "全部诗词"}
            </h2>
            {searchQuery && (
              <button
                onClick={() => handleSearch("")}
                className="text-sm text-gray-500 hover:text-[#B93632] transition-colors"
              >
                清除搜索
              </button>
            )}
          </div>

          {poems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">没有找到相关诗词</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {poems.map((poem) => (
                <PoemCard key={poem.id} poem={poem} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}