import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Wrench } from 'lucide-react';
import { GradientBlob } from './decorative/GradientBlob';

const skills = [
  {
    category: 'Frontend',
    icon: <Code2 className="w-6 h-6" />,
    items: ['React', 'TypeScript', 'JavaScript', 'Angular', 'Tailwind CSS', 'HTML&CSS', 'SCSS'],
    color: 'from-blue-400 to-cyan-400',
  },
  {
    category: 'Backend',
    icon: <Server className="w-6 h-6" />,
    items: ['Node.js', 'Express','Python', 'Java','PHP','Django','SpringBoot' , 'SQL','PostgreSQL', 'MongoDB', 'REST APIs'],
    color: 'from-purple-400 to-pink-400',
  },
  {
    category: 'Tools & Others',
    icon: <Wrench className="w-6 h-6" />,
    items: ['Git', 'Docker', 'GitHub','GitLab', 'Agile', 'Scrum'],
    color: 'from-orange-400 to-red-400',
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <GradientBlob className="bg-blue-100 w-96 h-96 -left-48 top-0" />
      <GradientBlob className="bg-purple-100 w-96 h-96 -right-48 bottom-0" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
          Skills & Technologies
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skills.map((skillSet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className={`w-12 h-12 mb-6 rounded-xl bg-gradient-to-br ${skillSet.color} flex items-center justify-center text-white`}>
                {skillSet.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                {skillSet.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {skillSet.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}