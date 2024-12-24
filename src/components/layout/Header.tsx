import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#home" 
            className="text-2xl font-bold text-gray-800"
            whileHover={{ scale: 1.05 }}
          >
            Portfolio
          </motion.a>
          
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Services', 'Formation', 'Projects', 'Skills', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {[
              { Icon: Github, href: 'https://github.com' },
              { Icon: Linkedin, href: 'https://linkedin.com' },
              { Icon: Mail, href: 'mailto:your.email@example.com' }
            ].map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ y: 0, scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4"
            >
              <div className="flex flex-col space-y-4 py-4">
                {['About', 'Services', 'Formation', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    whileHover={{ x: 4 }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}