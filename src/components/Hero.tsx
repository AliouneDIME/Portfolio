import React from 'react';
import { ArrowRight, Code2, Terminal, Database, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingIcons } from './decorative/FloatingIcons';

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
      <FloatingIcons />
      
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text animate-gradient">
              Hi, I'm <span>Alioune DIME</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              A passionate full-stack developer crafting beautiful and
              functional web experiences with modern technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
              >
                View My Work
                <ArrowRight className="ml-2 w-4 h-4" />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-300 w-full sm:w-auto"
              >
                Contact Me
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            animate={{ y: [0, -20, 0] }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-3xl blur-2xl"></div>
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                alt="Coding Environment"
                className="relative rounded-3xl w-full aspect-square object-cover shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <Code2 className="w-8 h-8 text-primary-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}