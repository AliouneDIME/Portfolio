import { motion } from 'framer-motion';
import { downloadPdf } from '../../../motion/utils/pdfUtils';
import { Github, Linkedin, Mail, ArrowUp, Heart, MapPin, Phone, ExternalLink } from 'lucide-react';

const footerNav = [
  { label: 'About',          id: 'about' },
  { label: 'Expérience',     id: 'experience' },
  { label: 'Services',       id: 'services' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Projets',        id: 'projects' },
  { label: 'Skills',         id: 'skills' },
  { label: 'Contact',        id: 'contact' },
];

const socials = [
  { Icon: Github,   href: 'https://github.com/AliouneDIME',                           label: 'GitHub' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/alioune-dim%C3%A9-293213308/', label: 'LinkedIn' },
  { Icon: Mail,     href: 'mailto:aliounedime92@gmail.com',                            label: 'Email' },
];

const skills = ['React', 'TypeScript', 'Django', 'Node.js', 'Docker', 'AWS', 'PostgreSQL', 'Spring Boot', 'Cybersecurity'];

export function Footer() {
  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-chalk/6 pt-20 pb-8">

      {/* Background atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">

        {/* ── Top CTA band ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-8 sm:p-10 mb-16 text-center relative overflow-hidden"
          style={{
            background: 'rgba(20,20,32,0.7)',
            border: '1px solid rgba(201,168,76,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 0% 0%, rgba(201,168,76,0.15), transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-20 h-20 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 100% 100%, rgba(0,212,255,0.08), transparent 70%)' }} />

          <p className="divider-glyph mb-3">Disponible pour de nouvelles opportunités</p>
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-chalk mb-4">
            Construisons quelque chose<br />
            <span className="gold-shimmer">d'exceptionnel.</span>
          </h2>
          <p className="text-chalk/45 text-sm max-w-md mx-auto mb-7">
            Développement full-stack, conseil en sécurité, architecture cloud —
            je suis à votre écoute pour tout projet ambitieux.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.button
              onClick={() => handleNav('contact')}
              whileHover={{ scale: 1.04, x: 3 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-void text-sm font-display font-700 glow"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d5a3)' }}
            >
              Démarrer un projet <ExternalLink size={13} />
            </motion.button>
            <a
              href="mailto:aliounedime92@gmail.com"
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-chalk/60 hover:text-chalk text-sm font-display border border-chalk/12 hover:border-chalk/25 transition-all"
            >
              <Mail size={13} /> aliounedime92@gmail.com
            </a>
          </div>
        </motion.div>

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Col 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-800 text-sm text-void"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d5a3)' }}
              >
                AD
              </div>
              <div>
                <div className="font-display font-700 text-chalk/90 text-sm">Alioune DIME</div>
                <div className="text-chalk/25 text-[10px] uppercase tracking-widest">Full-Stack · Security</div>
              </div>
            </div>

            <p className="text-chalk/40 text-xs leading-relaxed mb-5">
              Ingénieur logiciel passionné par la cybersécurité et les architectures scalables.
              Basé à Dakar, ouvert au monde.
            </p>

            {/* Contact infos */}
            <div className="space-y-2">
              {[
                { Icon: MapPin, val: 'Dakar, Sénégal — Sicap Liberté 1' },
                { Icon: Mail,   val: 'aliounedime92@gmail.com' },
              ].map(({ Icon, val }) => (
                <div key={val} className="flex items-start gap-2 text-chalk/35 text-[11px]">
                  <Icon size={11} className="flex-none mt-0.5 text-gold/50" />
                  <span>{val}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-5">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  title={label}
                  className="w-8 h-8 rounded-lg bg-chalk/4 border border-chalk/8 flex items-center justify-center text-chalk/35 hover:text-gold hover:border-gold/25 hover:bg-gold/6 transition-all"
                >
                  <Icon size={13} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6 }}
          >
            <p className="text-[9px] font-display uppercase tracking-[0.3em] text-chalk/25 mb-5">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {footerNav.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => handleNav(id)}
                    className="text-chalk/45 hover:text-gold text-sm font-body transition-colors reveal-line"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14, duration: 0.6 }}
          >
            <p className="text-[9px] font-display uppercase tracking-[0.3em] text-chalk/25 mb-5">
              Technologies
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="tech-pill text-[10px]">{s}</span>
              ))}
            </div>
          </motion.div>

          {/* Col 4 — Status */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-[9px] font-display uppercase tracking-[0.3em] text-chalk/25 mb-5">
              Disponibilité
            </p>

            {/* Status card */}
            <div
              className="rounded-xl p-4 mb-4"
              style={{ background: 'rgba(20,20,32,0.6)', border: '1px solid rgba(201,168,76,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-display font-600 text-sm text-chalk/80">Open to work</span>
              </div>
              <p className="text-chalk/35 text-xs leading-relaxed">
                Disponible pour CDI, freelance ou stage. Réponse sous 24h.
              </p>
            </div>

            {/* Certifications count */}
            <div
              className="rounded-xl p-4"
              style={{ background: 'rgba(20,20,32,0.6)', border: '1px solid rgba(201,168,76,0.1)' }}
            >
              <div className="font-display font-800 text-2xl text-gold mb-0.5">6</div>
              <div className="text-chalk/35 text-xs">Certifications obtenues</div>
              <div className="text-chalk/20 text-[10px] mt-0.5">Coursera · FORCE-N · AWS · CodeSignal</div>
            </div>

            {/* Website */}
            <a
              href="https://aliounedime.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 mt-4 text-xs text-chalk/30 hover:text-gold/70 transition-colors"
            >
              <ExternalLink size={10} /> aliounedime.netlify.app
            </a>
          </motion.div>
        </div>

        {/* ── Divider ── */}
        <div
          className="h-px w-full mb-8"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.15), transparent)' }}
        />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-chalk/18 text-[11px] flex items-center gap-1.5">
            Made with <Heart size={10} className="text-pink-500/60" /> by{' '}
            <span className="text-chalk/30">Alioune DIME</span>
            <span className="mx-2 text-chalk/8">·</span>
            © {new Date().getFullYear()} All rights reserved
          </p>

          <div className="flex items-center gap-4">
            <span className="text-chalk/18 text-[11px]">
              Built with React · TypeScript · Tailwind · Framer Motion
            </span>

            {/* Back to top */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="w-8 h-8 rounded-xl bg-chalk/4 border border-chalk/8 flex items-center justify-center text-chalk/35 hover:text-gold hover:border-gold/25 transition-all flex-none"
              title="Back to top"
            >
              <ArrowUp size={13} />
            </motion.button>
          </div>
        </div>

      </div>
    </footer>
  );
}