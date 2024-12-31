import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Authentification System',
    description: 'A full-featured online shopping platform built with React and Node.js',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/AliouneDIME/Authentification-2F-OTP-QR.git ',
    liveUrl: 'https://example.com',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91',
    technologies: ['React', 'Firebase', 'Material-UI'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    title: 'Weather Dashboard',
    description: 'A beautiful weather application with detailed forecasts',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b',
    technologies: ['React', 'TypeScript', 'OpenWeather API'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
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