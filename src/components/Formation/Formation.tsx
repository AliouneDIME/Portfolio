import React from 'react';
import { EducationCard } from './EducationCard';

const education = [
  {
    institution: 'Ecole Superieure Polytechnique de Dakar (ESP)',
    degree: 'Professional degree in Software Engineering and Operating System',
    period: '2023 - 2024',
    description: 'Specialized in Artificial Intelligence and Machine Learning. Conducted research on deep learning applications in computer vision.'
  },
  {
    institution: 'Ecole Superieure Polytechnique de Dakar (ESP)',
    degree: 'Higher Diploma in Technology',
    period: '2021 - 2023',
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