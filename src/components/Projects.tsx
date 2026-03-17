import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Authentication System 2FA',
    tagline: 'Security-first auth with QR + OTP',
    desc: 'A two-factor authentication system using QR codes and time-based OTPs for enhanced security. Django backend with React frontend.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    tech: ['Python', 'Django', 'React', 'TypeScript', 'SCSS'],
    github: 'https://github.com/AliouneDIME/Authentification-2F-OTP-QR.git',
    accent: '#ff2d78',
    year: '2024',
    featured: true,
  },
  {
    title: 'TrendyShop',
    tagline: 'Fashion e-commerce platform',
    desc: 'Modern online shopping experience with product catalog, cart system, and smooth UX optimized for fashion enthusiasts.',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    tech: ['React', 'Node.js', 'TypeScript', 'CSS'],
    github: 'https://github.com/AliouneDIME/TrendyShop.git',
    live: 'https://trendyshopp.netlify.app/',
    accent: '#c9a84c',
    year: '2023',
    featured: true,
  },
  {
    title: 'Health Services Platform',
    tagline: 'Telemedicine & booking system',
    desc: 'Online consultation and remote appointment booking system for healthcare providers with patient management dashboard.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tech: ['PHP', 'Laravel', 'MySQL'],
    github: 'https://github.com/AliouneDIME/ServicesSante.git',
    accent: '#00d4ff',
    year: '2023',
    featured: false,
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const onMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setMouse({
      x: (e.clientX - rect.left - rect.width / 2) / rect.width,
      y: (e.clientY - rect.top - rect.height / 2) / rect.height,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`group ${project.featured ? 'lg:col-span-1' : ''}`}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setMouse({ x: 0, y: 0 })}
        className="perspective-container h-full"
      >
        <motion.div
          style={{
            rotateX: mouse.y * -8,
            rotateY: mouse.x * 10,
            transformStyle: 'preserve-3d',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="relative bg-surface-1 border border-chalk/6 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-gold/20"
          whileHover={{ scale: 1.01 }}
        >
          {/* Image */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ filter: 'saturate(0.6) brightness(0.7)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-1 via-surface-1/40 to-transparent" />

            {/* Year badge */}
            <div className="absolute top-3 right-3 px-2.5 py-1 bg-void/70 backdrop-blur-sm border border-chalk/10 rounded-lg text-xs text-chalk/50 font-display">
              {project.year}
            </div>

            {/* Accent line on hover */}
            <div
              className="absolute bottom-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{ background: project.accent }}
            />
          </div>

          {/* Content */}
          <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
            <div className="text-xs mb-1" style={{ color: project.accent }}>
              {project.tagline}
            </div>
            <h3 className="font-display font-700 text-chalk text-lg mb-2">{project.title}</h3>
            <p className="text-chalk/45 text-sm leading-relaxed mb-5">{project.desc}</p>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 text-xs text-chalk/50 hover:text-chalk transition-colors"
                >
                  <Github size={13} /> Code
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 text-xs transition-colors"
                  style={{ color: project.accent }}
                >
                  <ExternalLink size={13} /> Live demo
                </motion.a>
              )}
              <motion.div
                className="ml-auto w-8 h-8 rounded-xl border border-chalk/10 flex items-center justify-center text-chalk/30 group-hover:border-gold/30 group-hover:text-gold transition-all"
                whileHover={{ rotate: 45 }}
              >
                <ArrowUpRight size={13} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-magenta/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">04 — Projects</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-5xl text-chalk"
          >
            Selected <span className="gold-shimmer">work.</span>
          </motion.h2>
          <motion.a
            href="https://github.com/AliouneDIME"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-2 text-sm text-chalk/40 hover:text-gold transition-colors"
          >
            All repos on GitHub <ArrowUpRight size={14} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}