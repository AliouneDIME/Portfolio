import React from 'react';

interface EducationCardProps {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export function EducationCard({ institution, degree, period, description }: EducationCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
      <h3 className="text-xl font-bold text-blue-600">{institution}</h3>
      <p className="text-lg font-semibold mt-1">{degree}</p>
      <p className="text-gray-600 text-sm mt-1">{period}</p>
      <p className="text-gray-700 mt-3">{description}</p>
    </div>
  );
}