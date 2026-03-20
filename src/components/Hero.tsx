import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { downloadPdf } from '../../motion/utils/pdfUtils';

const MARQUEE_ITEMS = ['React', 'TypeScript', 'Node.js', 'Python', 'Django', 'SpringBoot', 'PostgreSQL', 'Docker', 'Cybersecurity', 'REST API'];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Ambient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          top: '10%', left: '50%',
          transform: `translate(calc(-50% + ${mousePos.x * 30}px), ${mousePos.y * 20}px)`,
          transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
          bottom: '20%', right: '10%',
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -15}px)`,
          transition: 'transform 0.8s cubic-bezier(0.23,1,0.32,1)',
        }}
      />

      <motion.div
        style={{ y: y1, opacity }}
        className="max-w-7xl mx-auto px-6 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-px bg-gold/60" />
              <span className="divider-glyph">IT Engineering Assistant - Full Stack Developer -  · Dakar, SN</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-800 text-6xl lg:text-8xl leading-[0.92] tracking-tight mb-6"
            >
              <span className="block text-chalk">Alioune</span>
              <span
                className="block glitch-text gold-shimmer"
                data-text="DIME"
              >
                DIME
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-chalk/50 text-lg leading-relaxed max-w-md mb-10"
            >
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, x: 4 }}
                whileTap={{ scale: 0.96 }}
                className="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-void font-display font-700 text-sm rounded-lg glow"
              >
                View Work <ArrowRight size={15} />
              </motion.a>
              <motion.button
                onClick={() => downloadPdf('/CV_Alioune_DIME_EN_1.pdf', 'CV_Alioune_DIME.pdf')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="magnetic-btn inline-flex items-center gap-2 px-7 py-3.5 border border-chalk/20 text-chalk/70 hover:text-chalk hover:border-chalk/40 font-display text-sm rounded-lg transition-all"
              >
                <Download size={14} /> Télécharger CV
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex gap-10 mt-14 pt-10 border-t border-chalk/8"
            >
              {[
                { val: '..', label: 'Années exp.' },
                { val: '3+', label: 'Projets livrés' },
                { val: '6', label: 'Certifications' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div className="font-display text-2xl font-800 text-gold">{val}</div>
                  <div className="text-chalk/40 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – 3D hero image */}
          <motion.div
            initial={{ opacity: 0, rotateY: -20 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-container hidden lg:block"
          >
            <motion.div
              style={{
                rotateX: mousePos.y * -10,
                rotateY: mousePos.x * 12,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              {/* Image card */}
              <div className="gradient-border rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                  alt="Code"
                  className="w-full aspect-square object-cover"
                  style={{ filter: 'saturate(0.7) brightness(0.85)' }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="text-xs text-gold/70 font-body mb-1">Currently working on</div>
                  <div className="font-display text-chalk text-sm">Security-first web architectures</div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 bg-surface-3 border border-gold/30 rounded-xl px-4 py-2.5 shadow-xl"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="text-xs text-chalk/50 mb-0.5">Stack</div>
                <div className="font-display text-sm text-gold font-700">React + Django</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-surface-3 border border-electric/20 rounded-xl px-4 py-2.5 shadow-xl"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="text-xs text-chalk/50 mb-0.5">Status</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-display text-sm text-chalk font-600">Open to work</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Marquee strip */}
      <div className="absolute bottom-0 inset-x-0 border-t border-gold/10 py-3 overflow-hidden">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6 text-xs font-display text-chalk/25 uppercase tracking-widest whitespace-nowrap">
              {item}
              <span className="text-gold/30">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}