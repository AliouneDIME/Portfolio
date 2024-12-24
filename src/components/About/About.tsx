import React from 'react';
import { Stats } from './Stats';
import { GradientBlob } from '../decorative/GradientBlob';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="relative py-20 bg-gray-50 overflow-hidden">
      <GradientBlob className="bg-primary-100 w-96 h-96 -left-48 top-0" />
      <GradientBlob className="bg-secondary-100 w-96 h-96 -right-48 bottom-0" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 text-transparent bg-clip-text">
            About Me
          </h2>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-xl blur opacity-30 transform rotate-6"></div>
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2"
                  alt="Profile"
                  className="relative rounded-xl shadow-lg w-full object-cover aspect-square"
                />
              </div>
            </motion.div>

            <div className="lg:w-2/3 space-y-6">
              <motion.p 
                className="text-lg text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hi, I'm Alioune Dime, a passionate full-stack developer with
                over 2 years of experience in creating web applications. I
                specialize in building scalable, user-friendly solutions that
                solve real-world problems.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                My journey in software development started at ESP, where I
                developed a strong foundation in computer science. Since then,
                I've worked with various technologies and frameworks, always
                staying up-to-date with the latest industry trends.
              </motion.p>
              <motion.p 
                className="text-lg text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                When I'm not coding, you can find me contributing to open-source
                projects, writing technical blog posts, or mentoring aspiring
                developers.
              </motion.p>
            </div>
          </div>

          <Stats />
        </div>
      </div>
    </section>
  );
}