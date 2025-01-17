import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Briefcase, Award } from 'lucide-react';

interface StatItemProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

function StatItem({ number, label, icon, delay = 0 }: StatItemProps) {
  return (
    <motion.div 
      className="relative p-6 bg-white rounded-xl shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="absolute -top-4 left-4 w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center text-white">
        {icon}
      </div>
      <div className="pt-4">
        <div className="text-3xl font-bold text-gray-800 mb-1">{number}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </motion.div>
  );
}

export function Stats() {
  const stats = [
    { icon: <Code size={20} />, number: "3+", label: "Years Experience", delay: 0 },
    { icon: <Briefcase size={20} />, number: "5+", label: "Projects Completed", delay: 0.1 },
    { icon: <Users size={20} />, number: "2", label: "Happy Clients", delay: 0.2 },
    { icon: <Award size={20} />, number: "99%", label: "Client Satisfaction", delay: 0.3 }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
}