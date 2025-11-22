"use client";

import { Poem } from "../types";
import { motion } from "framer-motion";
import Link from "next/link";

interface PoemCardProps {
  poem: Poem;
}

export default function PoemCard({ poem }: PoemCardProps) {
  return (
    <Link href={`/poem/${poem.id}`}>
      <motion.div
        whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
        className="group cursor-pointer relative overflow-hidden rounded-xl border border-[#E5E5E5] bg-[#FAF9F6] p-6 transition-colors hover:border-[#B93632]/30"
      >
        {/* Decorative Background Stamp (Optional) */}
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#B93632]/5 blur-2xl transition-all group-hover:bg-[#B93632]/10" />

        <div className="relative z-10 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-baseline justify-between border-b border-[#E5E5E5] pb-3">
            <h3 className="font-serif text-xl font-bold text-[#2C2C2C] group-hover:text-[#B93632] transition-colors">
              {poem.title}
            </h3>
            <span className="text-xs font-medium text-[#595959] bg-[#E5E5E5]/50 px-2 py-1 rounded-full">
              [{poem.dynasty}] {poem.author}
            </span>
          </div>

          {/* Preview Content (First 2 lines) */}
          <div className="space-y-2 font-serif text-base leading-loose text-[#595959]">
            {poem.content.slice(0, 2).map((line: string, index: number) => (
              <p key={index}>{line}</p>
            ))}
            {poem.content.length > 2 && <span className="text-xs text-gray-400">...</span>}
          </div>

          {/* Footer Tags */}
          <div className="mt-2 flex flex-wrap gap-2">
            {poem.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] text-[#888] border border-[#eee] px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}