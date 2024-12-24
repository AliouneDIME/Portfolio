import React from 'react';
import { Code2, Terminal, Database, Cloud, Server, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = [
  { Icon: Code2, color: 'text-primary-400', size: 'w-8 h-8', position: 'top-20 left-10' },
  { Icon: Terminal, color: 'text-secondary-400', size: 'w-12 h-12', position: 'top-40 right-20' },
  { Icon: Database, color: 'text-primary-500', size: 'w-10 h-10', position: 'bottom-20 left-1/4' },
  { Icon: Cloud, color: 'text-secondary-500', size: 'w-8 h-8', position: 'top-1/3 left-1/3' },
  { Icon: Server, color: 'text-primary-600', size: 'w-6 h-6', position: 'bottom-32 right-1/4' },
  { Icon: Globe, color: 'text-secondary-600', size: 'w-10 h-10', position: 'top-1/2 right-10' },
];

export function FloatingIcons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.position} ${item.size} ${item.color} opacity-20`}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        >
          <item.Icon />
        </motion.div>
      ))}
    </div>
  );
}