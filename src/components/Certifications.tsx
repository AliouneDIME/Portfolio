import { useRef, useState, useCallback, memo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, X, Shield, Code, Globe, FileText, Download } from 'lucide-react';
import { openPdf, downloadPdf } from '../../motion/utils/pdfUtils';
import { PartnersMarquee } from './PartnersMarquee';

interface Cert {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  bg: string;
  accent: string;
  Icon: typeof Shield;
  credential?: string;
  pdfFile?: string;
  skills: string[];
  description: string;
}

const CERTS: Cert[] = [
  {
    id: 1,
    title: 'Cybersecurity for Everyone',
    issuer: 'University of Maryland — Coursera',
    date: 'Mai 2024',
    category: 'Security',
    bg: '#18101e', accent: '#ff2d78', Icon: Shield,
    credential: 'https://coursera.org/verify/A8JLHDR67YNZ',
    pdfFile: '/certificates/Certificat_Coursera_Cybersecurity.pdf',
    skills: ['Threat Analysis', 'Risk Management', 'Cyber Policy', 'Incident Response'],
    description: "Certifié par l'Université du Maryland via Coursera. Couvre les fondamentaux de la politique de cybersécurité, l'analyse des menaces et la gestion des risques pour les organisations modernes.",
  },
  {
    id: 2,
    title: 'Analyste en Cybersécurité',
    issuer: 'FORCE-N · Université Numérique CHK',
    date: 'Novembre 2024',
    category: 'Security',
    bg: '#1a0c18', accent: '#ff2d78', Icon: Shield,
    pdfFile: '/certificates/Certificat_Analyste_Cybersecurite.pdf',
    skills: ['Analyse vulnérabilités', 'SIEM', 'Forensics', 'Incident Response'],
    description: "Certification avancée délivrée par FORCE-N (Mastercard Foundation). Couvre la détection d'incidents, la réponse aux menaces et l'analyse forensique.",
  },
  {
    id: 3,
    title: 'Analyste Junior en Cybersécurité',
    issuer: 'FORCE-N · Université Numérique CHK',
    date: 'Août 2024',
    category: 'Security',
    bg: '#160c1e', accent: '#c026d3', Icon: Shield,
    pdfFile: '/certificates/Certificat_Analyste_Junior_Cybersecurite.pdf',
    skills: ['Network Security', 'OWASP', 'Vulnerability Scanning', 'Security Ops'],
    description: "Première étape du parcours cybersécurité FORCE-N. Formation intensive sur les fondamentaux de la sécurité des systèmes d'information et des réseaux.",
  },
  {
    id: 4,
    title: 'Commerce Digital',
    issuer: 'FORCE-N · Université Numérique CHK',
    date: 'Juin 2025',
    category: 'Business',
    bg: '#1a1208', accent: '#f59e0b', Icon: Globe,
    pdfFile: '/certificates/Certificat_Commerce_Digital.pdf',
    skills: ['E-commerce', 'Marketing Digital', 'SEO/SEM', 'Stratégie digitale'],
    description: "Certification en commerce digital couvrant les stratégies de vente en ligne, le marketing numérique et la transformation digitale des entreprises.",
  },
  {
    id: 5,
    title: 'Getting Started with DevOps on AWS',
    issuer: 'AWS Training & Certification',
    date: 'Décembre 2024',
    category: 'Cloud',
    bg: '#1a1208', accent: '#ff9900', Icon: Globe,
    pdfFile: '/certificates/Certificat_DevOps_AWS.pdf',
    skills: ['AWS', 'CI/CD', 'CodePipeline', 'CloudFormation'],
    description: "Certification officielle AWS sur les pratiques DevOps dans le cloud. Couvre CodeBuild, CodeDeploy, CodePipeline et les infrastructures automatisées.",
  },
  {
    id: 6,
    title: 'Mastering Docker: Containers, Networking & Orchestration',
    issuer: 'CodeSignal',
    date: 'Octobre 2025',
    category: 'DevOps',
    bg: '#0c1620', accent: '#0db7ed', Icon: Code,
    credential: 'https://codesignal.com/learn/certificates/cm4jt3vr1000g5kuxyv6ij6kn/course-paths/134',
    pdfFile: '/certificates/Certificat_Docker.pdf',
    skills: ['Docker', 'Container Networking', 'Orchestration', 'IaC'],
    description: "Maîtrise avancée de Docker — conteneurisation, réseaux, volumes et orchestration. Certification vérifiable sur CodeSignal.",
  },
  {
    id: 7,
    title: 'Git Version Control for Beginners',
    issuer: 'CodeSignal',
    date: 'Octobre 2025',
    category: 'DevOps',
    bg: '#0f0e1a', accent: '#f05032', Icon: Code,
    credential: 'https://codesignal.com/learn/certificates/cmd3xft3a0004l7045w7hqz26/course-paths/140',
    pdfFile: '/certificates/Certificat_Git.pdf',
    skills: ['Git', 'Branching', 'Merge', 'Code Review', 'GitHub'],
    description: "Certification CodeSignal couvrant Git de A à Z : commits, branches, merges, résolution de conflits et workflows collaboratifs.",
  },
];

/* ─── Card (memoized — skips re-render if cert unchanged) ── */
const CertCard = memo(function CertCard({ cert, onClick }: { cert: Cert; onClick: (c: Cert) => void }) {
  const { Icon } = cert;
  return (
    <div
      onClick={() => onClick(cert)}
      className="flex-none w-72 rounded-2xl overflow-hidden cursor-pointer select-none
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ background: cert.bg, border: `1px solid ${cert.accent}28` }}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${cert.accent},transparent)` }} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${cert.accent}18` }}>
            <Icon size={18} style={{ color: cert.accent }} />
          </div>
          <span className="text-xs font-display font-600 px-2.5 py-1 rounded-full"
            style={{ background: `${cert.accent}15`, color: cert.accent }}>
            {cert.category}
          </span>
        </div>
        <h3 className="font-display font-700 text-chalk text-sm leading-snug mb-1 line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-chalk/40 text-xs mb-4 truncate">{cert.issuer}</p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {cert.skills.slice(0, 3).map(s => <span key={s} className="tech-pill">{s}</span>)}
          {cert.skills.length > 3 && <span className="tech-pill">+{cert.skills.length - 3}</span>}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-chalk/30 text-xs">{cert.date}</span>
          <span className="flex items-center gap-1 text-xs" style={{ color: cert.accent }}>
            Voir détails <ExternalLink size={10} />
          </span>
        </div>
      </div>
    </div>
  );
});

/* ─── Modal ──────────────────────────────────────────────── */
const CertModal = memo(function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const { Icon } = cert;
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(6,6,12,0.92)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 12 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: cert.bg,
          border: `1px solid ${cert.accent}35`,
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${cert.accent}18`,
        }}
      >
        {/* Accent bar */}
        <div className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg,${cert.accent},transparent)` }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-chalk/10
                     flex items-center justify-center text-chalk/60
                     hover:text-chalk hover:bg-chalk/20 transition-all"
        >
          <X size={14} />
        </button>

        <div className="p-7" style={{ maxHeight: 'calc(90vh - 6px)', overflowY: 'auto' }}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-5 pr-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-none"
              style={{ background: `${cert.accent}18`, border: `1px solid ${cert.accent}30` }}>
              <Icon size={22} style={{ color: cert.accent }} />
            </div>
            <div>
              <span className="text-xs font-display font-600 px-2 py-0.5 rounded-full inline-block mb-1.5"
                style={{ background: `${cert.accent}15`, color: cert.accent }}>
                {cert.category}
              </span>
              <h3 className="font-display font-800 text-chalk text-base leading-snug">{cert.title}</h3>
              <p className="text-chalk/45 text-xs mt-0.5">{cert.issuer} · {cert.date}</p>
            </div>
          </div>

          <p className="text-chalk/55 text-sm leading-relaxed mb-5">{cert.description}</p>

          {/* Skills */}
          <div className="mb-6">
            <p className="text-[9px] font-display uppercase tracking-[0.25em] text-chalk/25 mb-2.5">
              Compétences
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map(s => <span key={s} className="tech-pill">{s}</span>)}
            </div>
          </div>

          {/* ── Action buttons ── */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t"
            style={{ borderColor: `${cert.accent}18` }}>

            {/* View PDF — opens in new tab (most reliable) */}
            {cert.pdfFile && (
              <button
                onClick={() => openPdf(cert.pdfFile!)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-display font-700
                           transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: `linear-gradient(135deg,${cert.accent}CC,${cert.accent})`,
                  color: '#06060c',
                }}
              >
                <FileText size={13} />
                Voir le certificat
              </button>
            )}

            {/* Download PDF — fetch+Blob avoids .htm bug */}
            {cert.pdfFile && (
              <button
                onClick={() => downloadPdf(cert.pdfFile!, `${cert.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-display font-600
                           transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: `${cert.accent}15`,
                  border: `1px solid ${cert.accent}30`,
                  color: cert.accent,
                }}
              >
                <Download size={13} />
                Télécharger
              </button>
            )}

            {/* Verify online */}
            {cert.credential && (
              <a
                href={cert.credential}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs ml-auto hover:opacity-80 transition-opacity"
                style={{ color: cert.accent }}
              >
                <ExternalLink size={12} /> Vérifier en ligne
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

/* ─── Main section ──────────────────────────────────────── */
export function Certifications() {
  const ref       = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<Cert | null>(null);

  const dragging   = useRef(false);
  const dragStartX = useRef(0);
  const scrollBase = useRef(0);

  const scrollTo = useCallback((dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 312 : -312, behavior: 'smooth' });
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current  = false;
    dragStartX.current = e.clientX;
    scrollBase.current = scrollRef.current?.scrollLeft ?? 0;

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - dragStartX.current;
      if (Math.abs(dx) > 6) dragging.current = true;
      if (scrollRef.current) scrollRef.current.scrollLeft = scrollBase.current - dx;
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, []);

  const handleClick = useCallback((cert: Cert) => {
    if (!dragging.current) setSelected(cert);
  }, []);

  return (
    <section id="certifications" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 50%, rgba(201,168,76,0.035), transparent)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Label */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">03 — Certifications</span>
        </motion.div>

        {/* Heading + arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-5xl text-chalk"
          >
            {CERTS.length} certifications<br />
            <span className="gold-shimmer">& diplômes réels.</span>
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }} className="flex items-center gap-3">
            <button onClick={() => scrollTo('left')}
              className="w-10 h-10 rounded-xl border border-chalk/12 flex items-center justify-center
                         text-chalk/50 hover:text-gold hover:border-gold/35 transition-all">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scrollTo('right')}
              className="w-10 h-10 rounded-xl border border-chalk/12 flex items-center justify-center
                         text-chalk/50 hover:text-gold hover:border-gold/35 transition-all">
              <ChevronRight size={16} />
            </button>
            <span className="text-xs text-chalk/25 hidden sm:block">
              Glisser pour parcourir · cliquer pour ouvrir
            </span>
          </motion.div>
        </div>

        {/* Scrollable track */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }} className="relative">

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10"
            style={{ background: 'linear-gradient(90deg,#06060c,transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-14 pointer-events-none z-10"
            style={{ background: 'linear-gradient(-90deg,#06060c,transparent)' }} />

          <div
            ref={scrollRef}
            onMouseDown={onMouseDown}
            className="overflow-x-auto pb-4"
            style={{ cursor: 'grab' }}
          >
            <div className="flex gap-5 py-4 w-max px-2">
              {CERTS.map(cert => (
                <CertCard key={cert.id} cert={cert} onClick={handleClick} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Partners marquee */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }} className="mt-10">
          <p className="text-[9px] font-display uppercase tracking-[0.3em] text-chalk/20 mb-4 text-center">
            Organismes certificateurs
          </p>
          <PartnersMarquee />
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}