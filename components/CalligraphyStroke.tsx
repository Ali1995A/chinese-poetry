"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

// ==========================================
// 1. 新增：水墨形状定义 (用于修复首页报错)
// ==========================================

interface CalligraphyStrokeProps {
  className?: string;
  // 支持首页调用的 type 属性
  type?: 'splash' | 'circle' | 'line';
  // 保留原有的 props 定义，防止类型报错 (虽然在 SVG 模式下可能用不到)
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  color?: string;
  direction?: "horizontal" | "vertical";
}

// 默认导出组件：主要用于首页背景的水墨 SVG
export default function CalligraphyStroke({ 
  className = "", 
  type = 'splash',
  color = "currentColor" // 兼容颜色传参
}: CalligraphyStrokeProps) {
  
  // 定义三种水墨路径
  const paths = {
    splash: "M45.7,-76.3C58.9,-69.3,69.1,-55.8,75.8,-41.4C82.5,-27,85.7,-11.7,82.9,2.3C80.1,16.3,71.3,29.1,61.6,40.3C51.9,51.5,41.3,61.1,29.3,67.5C17.3,73.9,3.9,77.1,-8.4,75.2C-20.7,73.3,-31.9,66.3,-43.3,58.1C-54.7,49.9,-66.3,40.5,-73.6,28.2C-80.9,15.9,-83.9,0.7,-80.1,-12.7C-76.3,-26.1,-65.7,-37.7,-53.8,-45.4C-41.9,-53.1,-28.7,-56.9,-15.6,-59.3C-2.5,-61.7,10.5,-62.7,32.5,-83.3L45.7,-76.3Z",
    circle: "M42.3,-53.6C54.6,-43.4,64.1,-30.3,68.4,-15.5C72.7,-0.7,71.7,15.8,63.9,29.4C56.1,43,41.5,53.7,26.4,59.3C11.3,64.9,-4.3,65.4,-18.8,61.3C-33.3,57.2,-46.7,48.5,-56.3,36.5C-65.9,24.5,-71.7,9.2,-69.1,-4.8C-66.5,-18.8,-55.5,-31.5,-44.2,-41.4C-32.9,-51.3,-21.3,-58.4,-8.7,-59.5C3.9,-60.6,16.5,-55.7,30,-63.8",
    line: "M10,-10 L90,-10 L90,10 L10,10 Z"
  };

  const selectedPath = paths[type] || paths.splash;

  return (
    <div className={cn("absolute -z-10 pointer-events-none select-none", className)}>
      <motion.svg 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
        style={{ fill: color === "currentColor" ? "rgba(44, 85, 48, 0.05)" : color }} // 默认使用极淡的主题色
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <path 
          d={selectedPath} 
          transform="translate(100 100)" 
        />
      </motion.svg>
    </div>
  );
}

// ==========================================
// 2. 保留：原有的线条动画组件 (重命名为 LinearStroke)
// ==========================================

export function LinearStroke({
  className,
  delay = 0,
  duration = 2,
  strokeWidth = 2,
  color = "currentColor",
  direction = "horizontal"
}: CalligraphyStrokeProps) {
  const isHorizontal = direction === "horizontal";

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden",
        isHorizontal ? "w-full h-px" : "w-px h-full",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Main Stroke */}
      <motion.div
        className={cn(
          "absolute bg-gradient-to-r from-transparent via-current to-transparent",
          isHorizontal 
            ? "w-full h-px top-0 left-0" 
            : "h-full w-px top-0 left-0 bg-gradient-to-b from-transparent via-current to-transparent"
        )}
        style={{ 
          backgroundColor: color,
          height: isHorizontal ? `${strokeWidth}px` : '100%',
          width: isHorizontal ? '100%' : `${strokeWidth}px`
        }}
        initial={{ 
          scale: isHorizontal ? 0 : 1,
          opacity: 0.8
        }}
        animate={{ 
          scale: isHorizontal ? 1 : 1,
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Ink Bleed Effect */}
      <motion.div
        className={cn(
          "absolute blur-sm",
          isHorizontal 
            ? "w-full h-1 top-1/2 -translate-y-1/2" 
            : "h-full w-1 left-1/2 -translate-x-1/2"
        )}
        style={{ backgroundColor: color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.1, 0] }}
        transition={{
          duration: duration * 1.5,
          delay,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
}

// ==========================================
// 3. 保留：原有辅助组件 (保持不变)
// ==========================================

// Specialized stroke components for common use cases
export function HorizontalStroke(props: Omit<CalligraphyStrokeProps, 'direction'>) {
  return <LinearStroke direction="horizontal" {...props} />;
}

export function VerticalStroke(props: Omit<CalligraphyStrokeProps, 'direction'>) {
  return <LinearStroke direction="vertical" {...props} />;
}

// Decorative ink splash component
export function InkSplash({
  className,
  size = "medium",
  color = "#B93632",
  delay = 0
}: {
  className?: string;
  size?: "small" | "medium" | "large";
  color?: string;
  delay?: number;
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-16 h-16"
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-full opacity-20",
        sizeClasses[size],
        className
      )}
      style={{ backgroundColor: color }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1.2, 1],
        opacity: [0, 0.3, 0.1]
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        repeatDelay: 2
      }}
    >
      {/* Subtle pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: color }}
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 4,
          delay: delay + 1,
          repeat: Infinity
        }}
      />
    </motion.div>
  );
}

// Floating calligraphy character
export function FloatingCharacter({
  character,
  className,
  delay = 0,
  size = "medium"
}: {
  character: string;
  className?: string;
  delay?: number;
  size?: "small" | "medium" | "large";
}) {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl"
  };

  return (
    <motion.div
      className={cn(
        "font-calligraphy text-ink-300/30 select-none pointer-events-none",
        sizeClasses[size],
        className
      )}
      initial={{ 
        opacity: 0,
        y: 20,
        rotate: -5
      }}
      animate={{ 
        opacity: [0, 0.3, 0],
        y: [20, 0, -20],
        rotate: [-5, 0, 5]
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        repeatDelay: 4
      }}
    >
      {character}
    </motion.div>
  );
}