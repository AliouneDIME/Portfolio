import { useState, useEffect, useCallback } from 'react';
import { downloadPdf } from '../../../motion/utils/pdfUtils';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X, Download, ExternalLink } from 'lucide-react';

const navItems = [
  { label: 'About',          id: 'about' },
  { label: 'Expérience',     id: 'experience' },
  { label: 'Services',       id: 'services' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Projets',        id: 'projects' },
  { label: 'Skills',         id: 'skills' },
  { label: 'IT/SysAdmin',   id: 'it-admin' },
  { label: 'Contact',        id: 'contact' },
];

export function Header() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState('');
  const [scrollPct, setScrollPct] = useState(0);

  /* scroll progress + active section */
  useEffect(() => {
    const onScroll = () => {
      const sy   = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (sy / docH) * 100 : 0);
      setScrolled(sy > 40);
      let current = '';
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= 120) current = item.id;
      }
      setActiveId(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close drawer on lg breakpoint */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* lock body scroll */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] pointer-events-none transition-all duration-100"
        style={{
          width: `${scrollPct}%`,
          background: 'linear-gradient(90deg, #8a6f2e, #c9a84c, #e8d5a3, #c9a84c)',
        }}
      />

      {/* ── Header ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-void/88 backdrop-blur-2xl border-b border-gold/10 shadow-[0_2px_60px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 flex-none group"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-800 text-sm text-void flex-none"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d5a3)' }}
            >
              AD
            </motion.div>
            <div className="hidden sm:block leading-none">
              <div className="font-display font-700 text-chalk/90 text-sm">
                Alioune <span className="gold-shimmer">DIME</span>
              </div>
              <div className="text-chalk/25 text-[10px] tracking-[0.2em] uppercase mt-0.5">
                Dev · Security
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map(({ label, id }) => {
              const active = activeId === id;
              return (
                <li key={id}>
                  <button
                    onClick={() => handleNav(id)}
                    className="relative px-3 py-1.5 text-[13px] font-body rounded-lg transition-colors duration-200 group"
                    style={{ color: active ? '#c9a84c' : 'rgba(244,241,236,0.5)' }}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: 'rgba(201,168,76,0.08)',
                          border: '1px solid rgba(201,168,76,0.18)',
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 group-hover:text-chalk/80 transition-colors">
                      {label}
                    </span>
                    {!active && (
                      <span
                        className="absolute bottom-1 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ background: 'rgba(201,168,76,0.5)' }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2.5 flex-none">
            {[
              { Icon: Github,   href: 'https://github.com/AliouneDIME',                           title: 'GitHub' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/alioune-dim%C3%A9-293213308/', title: 'LinkedIn' },
            ].map(({ Icon, href, title }) => (
              <motion.a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                title={title}
                className="w-8 h-8 rounded-lg bg-chalk/4 border border-chalk/8 flex items-center justify-center text-chalk/35 hover:text-gold hover:border-gold/25 hover:bg-gold/6 transition-all"
              >
                <Icon size={14} />
              </motion.a>
            ))}

            <div className="w-px h-4 bg-chalk/10 mx-0.5" />

            <motion.button
              onClick={() => downloadPdf('/CV_Alioune_DIME_EN_1.pdf', 'CV_Alioune_DIME.pdf')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-display font-600 text-chalk/50 hover:text-chalk/80 border border-chalk/10 hover:border-chalk/20 transition-all"
            >
              <Download size={11} /> CV
            </motion.button>

            <motion.button
              onClick={() => handleNav('contact')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-display font-700 text-void transition-all glow"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d5a3)' }}
            >
              Hire me <ExternalLink size={11} />
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            whileTap={{ scale: 0.88 }}
            className="lg:hidden w-9 h-9 rounded-xl bg-chalk/4 border border-chalk/10 flex items-center justify-center text-chalk/55 hover:text-gold hover:border-gold/25 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen
                ? <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X size={15} />
                  </motion.div>
                : <motion.div key="m"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu size={15} />
                  </motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Active section pill — desktop only */}
        <AnimatePresence>
          {scrolled && activeId && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1,  y: 0 }}
              exit={{   opacity: 0,  y: -6 }}
              className="hidden lg:flex absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full items-center gap-1.5 px-3 py-[3px] rounded-b-lg"
              style={{
                background: 'rgba(6,6,12,0.88)',
                border: '1px solid rgba(201,168,76,0.12)',
                borderTop: 'none',
              }}
            >
              <span className="w-1 h-1 rounded-full bg-gold/70 animate-pulse" />
              <span className="text-[9px] font-display uppercase tracking-[0.25em] text-gold/50">
                {navItems.find((n) => n.id === activeId)?.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ══ Mobile slide-in drawer ══ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(6,6,12,0.7)', backdropFilter: 'blur(6px)' }}
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{   x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[290px] flex flex-col lg:hidden"
              style={{
                background: 'rgba(10,10,20,0.98)',
                backdropFilter: 'blur(30px)',
                borderLeft: '1px solid rgba(201,168,76,0.1)',
                boxShadow: '-20px 0 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Drawer top */}
              <div className="h-[68px] flex items-center justify-between px-6 border-b border-chalk/6">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-display font-800 text-xs text-void"
                    style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d5a3)' }}
                  >
                    AD
                  </div>
                  <span className="font-display text-chalk/50 text-xs tracking-wider">Navigation</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-7 h-7 rounded-lg bg-chalk/5 flex items-center justify-center text-chalk/40 hover:text-chalk transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Nav list */}
              <nav className="flex-1 overflow-y-auto py-6 px-4">
                <p className="px-4 text-[9px] font-display uppercase tracking-[0.3em] text-chalk/20 mb-3">
                  Sections
                </p>
                <ul className="space-y-1">
                  {navItems.map(({ label, id }, i) => {
                    const active = activeId === id;
                    return (
                      <motion.li
                        key={id}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                      >
                        <button
                          onClick={() => handleNav(id)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200"
                          style={{
                            background: active ? 'rgba(201,168,76,0.1)' : 'transparent',
                            border: `1px solid ${active ? 'rgba(201,168,76,0.2)' : 'transparent'}`,
                            color: active ? '#c9a84c' : 'rgba(244,241,236,0.55)',
                          }}
                        >
                          <span className="font-display font-600 text-sm">{label}</span>
                          {active && (
                            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                          )}
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-5 py-5 border-t border-chalk/6 space-y-2.5">
                <button
                  onClick={() => downloadPdf('/CV_Alioune_DIME_EN_1.pdf', 'CV_Alioune_DIME.pdf')}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-chalk/12 text-chalk/55 hover:text-chalk text-[13px] font-display font-600 transition-all"
                >
                  <Download size={12} /> Télécharger le CV
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className="w-full py-2.5 rounded-xl text-void text-[13px] font-display font-700 glow"
                  style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d5a3)' }}
                >
                  Me contacter
                </button>
                {/* Social row */}
                <div className="flex items-center justify-center gap-2.5 pt-1">
                  {[
                    { Icon: Github,   href: 'https://github.com/AliouneDIME' },
                    { Icon: Linkedin, href: 'https://www.linkedin.com/in/alioune-dim%C3%A9-293213308/' },
                    { Icon: Mail,     href: 'mailto:aliounedime92@gmail.com' },
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl bg-chalk/4 border border-chalk/8 flex items-center justify-center text-chalk/35 hover:text-gold hover:border-gold/25 transition-all"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
                <p className="text-chalk/15 text-[10px] text-center pt-1">
                  aliounedime92@gmail.com
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}