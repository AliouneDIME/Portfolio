import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const navItems = ['About', 'Experience', 'Services', 'Certifications', 'Projects', 'Skills', 'Contact'];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-void/80 backdrop-blur-xl border-b border-gold/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="font-display font-800 text-xl tracking-tight">
          <span className="gold-shimmer">AD</span>
          <span className="text-chalk/40 mx-1">/</span>
          <span className="text-chalk/70 text-sm font-body">Alioune DIME</span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setActive(item)}
                onMouseLeave={() => setActive('')}
                className="reveal-line text-sm font-body text-chalk/60 hover:text-chalk transition-colors"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Social + CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {[
            { Icon: Github, href: 'https://github.com/AliouneDIME' },
            { Icon: Linkedin, href: 'https://www.linkedin.com/in/alioune-dim%C3%A9-293213308/' },
          ].map(({ Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="text-chalk/40 hover:text-gold transition-colors"
            >
              <Icon size={16} />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="magnetic-btn px-4 py-2 text-sm font-display font-600 border border-gold/40 text-gold hover:bg-gold hover:text-void transition-all rounded-lg"
          >
            Hire me
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-chalk/60 hover:text-gold transition-colors"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface-2/95 backdrop-blur-xl border-b border-gold/10"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-chalk/70 hover:text-gold font-display text-lg transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}