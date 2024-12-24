import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  delay?: number;
}

export function ServiceCard({ title, description, Icon, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center mb-4 transform transition-transform duration-300 hover:rotate-12">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}