import React from 'react';
import { Stats } from './Stats';

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="Profile"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            
            <div className="md:w-2/3">
              <p className="text-lg text-gray-700 mb-6">
                Hi, I'm Alioune Dimé, a passionate full-stack developer with over 1 years of experience
                in creating web applications. I specialize in building scalable, user-friendly
                solutions that solve real-world problems.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                My journey in software development started at ESP, where I developed a strong
                foundation in computer science. Since then, I've worked with various technologies
                and frameworks, always staying up-to-date with the latest industry trends.
              </p>
              <p className="text-lg text-gray-700">
                When I'm not coding, you can find me contributing to open-source projects,
                writing technical blog posts, or mentoring aspiring developers.
              </p>
            </div>
          </div>

          <Stats />
        </div>
      </div>
    </section>
  );
}