import React from 'react';
import { EducationCard } from './EducationCard';

const education = [
  {
    institution: 'Stanford University',
    degree: 'Master of Science in Computer Science',
    period: '2018 - 2020',
    description: 'Specialized in Artificial Intelligence and Machine Learning. Conducted research on deep learning applications in computer vision.'
  },
  {
    institution: 'MIT',
    degree: 'Bachelor of Science in Computer Science',
    period: '2014 - 2018',
    description: 'Graduated with honors. Focus on software engineering and distributed systems.'
  },
  {
    institution: 'Google Professional Certification',
    degree: 'Cloud Architecture',
    period: '2021',
    description: 'Completed advanced certification in cloud architecture and deployment strategies.'
  }
];

export function Formation() {
  return (
    <section id="formation" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Education & Formation</h2>
        <div className="max-w-3xl mx-auto">
          {education.map((item, index) => (
            <EducationCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}