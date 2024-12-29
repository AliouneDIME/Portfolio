import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export function CertificateViewer({ isOpen, onClose, pdfUrl, title }: CertificateViewerProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl h-[80vh] bg-white rounded-xl p-2 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-2">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          </div>
          
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            className="w-full h-[calc(100%-2rem)] rounded-lg"
            title={title}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}