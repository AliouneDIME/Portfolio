import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { CertificateModal } from './CertificateModal';

interface EducationCardProps {
  institution: string;
  degree: string;
  period: string;
  description: string;
  certificateUrl?: string;
}

export function EducationCard({ 
  institution, 
  degree, 
  period, 
  description,
  certificateUrl 
}: EducationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        className="bg-white p-6 rounded-xl shadow-lg mb-6 relative overflow-hidden group"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-600">{institution}</h3>
            <p className="text-lg font-semibold mt-1">{degree}</p>
            <p className="text-gray-600 text-sm mt-1">{period}</p>
            <p className="text-gray-700 mt-3">{description}</p>
          </div>
          
          {certificateUrl && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(true)}
              className="ml-4 p-2 bg-blue-100 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors group-hover:animate-pulse"
              title="View Certificate"
            >
              <Award className="w-6 h-6" />
            </motion.button>
          )}
        </div>
      </motion.div>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={certificateUrl || ''}
        title={degree}
      />
    </>
  );
}