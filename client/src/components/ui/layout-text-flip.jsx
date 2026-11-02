"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const LayoutTextFlip = ({
  text,
  words = [],
  suffix,
  duration = 2800,
  className,
  textClassName,
  wordClassName,
  suffixClassName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  const currentWord = words[currentIndex] || "";

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2",
        className
      )}
    >
      {text && (
        <span className={cn("text-white font-black", textClassName)}>
          {text}
        </span>
      )}
      <div className="relative inline-flex items-center overflow-hidden py-1 px-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentWord}
            initial={{ y: 40, opacity: 0, rotateX: 90, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
            exit={{ y: -40, opacity: 0, rotateX: -90, filter: "blur(6px)" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            className={cn(
              "inline-block font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 flame-glow",
              wordClassName
            )}
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </div>
      {suffix && (
        <span className={cn("text-white font-black", suffixClassName)}>
          {suffix}
        </span>
      )}
    </div>
  );
};

