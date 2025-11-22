"use client";

import { Poem } from "../types";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";

interface PoemReaderProps {
  poem: Poem;
  onBack?: () => void;
}

export default function PoemReader({ poem, onBack }: PoemReaderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] to-[#F5F3EF] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#B93632] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>返回</span>
          </button>
          
          <div className="flex gap-3">
            <button className="p-2 text-gray-600 hover:text-[#B93632] transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#B93632] transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Poem Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E5E5E5] p-8 shadow-lg"
        >
          {/* Title and Author */}
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-[#2C2C2C] mb-4">
              {poem.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <span className="font-medium">{poem.author}</span>
              <span className="text-sm bg-[#E5E5E5] px-3 py-1 rounded-full">
                {poem.dynasty}
              </span>
            </div>
          </div>

          {/* Poem Lines */}
          <div className="space-y-6 text-center">
            {poem.content.map((line: string, index: number) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="font-serif text-xl leading-loose text-[#595959]"
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Tags */}
          {poem.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
              <div className="flex flex-wrap gap-2 justify-center">
                {poem.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs text-[#888] border border-[#eee] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Translation & Notes (if available) */}
          {poem.translation && (
            <div className="mt-8 pt-6 border-t border-[#E5E5E5]">
              <h3 className="font-medium text-gray-700 mb-3">译文</h3>
              <p className="text-gray-600 leading-relaxed">{poem.translation}</p>
            </div>
          )}

          {poem.notes && Object.keys(poem.notes).length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium text-gray-700 mb-3">注释</h3>
              <div className="space-y-2">
                {Object.entries(poem.notes).map(([word, note]) => (
                  <div key={word} className="text-sm text-gray-600">
                    <span className="font-medium">{word}：</span>
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}