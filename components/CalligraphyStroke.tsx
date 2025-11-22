"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface CalligraphyStrokeProps {
  className?: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  color?: string;
  direction?: "horizontal" | "vertical";
}

export default function CalligraphyStroke({
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

// Specialized stroke components for common use cases
export function HorizontalStroke(props: Omit<CalligraphyStrokeProps, 'direction'>) {
  return <CalligraphyStroke direction="horizontal" {...props} />;
}

export function VerticalStroke(props: Omit<CalligraphyStrokeProps, 'direction'>) {
  return <CalligraphyStroke direction="vertical" {...props} />;
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