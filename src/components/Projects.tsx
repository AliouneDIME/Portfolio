import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Authentification System',
    description: 'A full-featured online shopping platform built with React and Node.js',
    image: 'https://plus.unsplash.com/premium_photo-1700830193661-f6822dca5eee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3lzdGVtJTIwYXV0aGVudGlpY2F0aW9ufGVufDB8fDB8fHww',
    technologies: ['Python', 'JavaScript', 'TypeScript', 'SCSS'],
    githubUrl: 'https://github.com/AliouneDIME/Authentification-2F-OTP-QR.git ',
    //liveUrl: '',
  },
  {
    title: 'TrendyShop',
    description: 'A modern online shopping application that focuses on providing a seamless and engaging shopping experience for fashion enthusiasts.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?',
    technologies: ['React', 'Firebase', 'Material-UI'],
    githubUrl: 'https://github.com/AliouneDIME/TrendyShop.git',
    liveUrl: 'https://trendyshopp.netlify.app/',
  },
  {
    title: 'Health Services',
    description: 'An application that offers services including online consultation, remote appointment booking',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=60&ixlib=rb-',
    technologies: ['Php', 'Laravel','Lame'],
    githubUrl: 'https://github.com/AliouneDIME/ServicesSante.git',
    //liveUrl: '',
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a
                    href={project.githubUrl}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    Code
                  </a>
                  <a
                    href={project.liveUrl}
                    className="flex items-center text-gray-600 hover:text-gray-900"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}