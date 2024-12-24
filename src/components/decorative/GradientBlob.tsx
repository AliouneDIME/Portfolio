import React from 'react';
import { motion } from 'framer-motion';

interface GradientBlobProps {
  className?: string;
}

export function GradientBlob({ className = '' }: GradientBlobProps) {
  return (
    <motion.div
      className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 ${className}`}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 180, 270, 360],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
}