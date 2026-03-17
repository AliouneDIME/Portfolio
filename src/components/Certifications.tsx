import { useRef, useState, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, ExternalLink, X, Shield, Code, Globe, FileText } from 'lucide-react';

interface Cert {
  id: number;
  title: string;
  issuer: string;
  date: string;
  category: string;
  color: string;
  accent: string;
  icon: typeof Award;
  credential?: string;
  pdfFile?: string;
  skills: string[];
  description: string;
}

const certifications: Cert[] = [
  {
    id: 1,
    title: 'Cybersecurity for Everyone',
    issuer: 'University of Maryland — Coursera',
    date: 'Mai 2024',
    category: 'Security',
    color: '#18101e',
    accent: '#ff2d78',
    icon: Shield,
    credential: 'https://coursera.org/verify/A8JLHDR67YNZ',
    pdfFile: '/certificates/Certifiation_Coursera.pdf',
    skills: ['Threat Analysis', 'Risk Management', 'Cyber Policy', 'Incident Response'],
    description: 'Certified by the University of Maryland, this course covers fundamentals of cybersecurity policy, threat analysis, and risk management for modern organizations.',
  },
  {
    id: 2,
    title: 'Analyste en Cybersécurité',
    issuer: 'FORCE-N · Université Numérique Cheikh Hamidou Kane',
    date: 'Novembre 2024',
    category: 'Security',
    color: '#1a0c18',
    accent: '#ff2d78',
    icon: Shield,
    pdfFile: '/certificates/Certificat_Analyste_Cybersécurité.pdf',
    skills: ['Cybersécurité', 'Analyse de vulnérabilités', 'SIEM', 'Forensics'],
    description: 'Certification avancée en analyse de cybersécurité délivrée par FORCE-N (Mastercard Foundation). Couvre la détection d\'incidents, la réponse aux menaces et l\'analyse forensique.',
  },
  {
    id: 3,
    title: 'Analyste Junior en Cybersécurité',
    issuer: 'FORCE-N · Université Numérique Cheikh Hamidou Kane',
    date: 'Août 2024',
    category: 'Security',
    color: '#160c1e',
    accent: '#c026d3',
    icon: Shield,
    pdfFile: '/certificates/Certificat_Analyste_junior_en_Cybersécurité.pdf',
    skills: ['Network Security', 'OWASP', 'Vulnerability Scanning', 'Security Ops'],
    description: 'Première étape du parcours cybersécurité FORCE-N. Formation intensive sur les fondamentaux de la sécurité des systèmes d\'information et des réseaux.',
  },
  {
    id: 4,
    title: 'Commerce Digital',
    issuer: 'FORCE-N · Université Numérique Cheikh Hamidou Kane',
    date: 'Juin 2025',
    category: 'Business',
    color: '#1a1208',
    accent: '#f59e0b',
    icon: Globe,
    pdfFile: '/certificates/Certificat_Commerce_Digitale.pdf',
    skills: ['E-commerce', 'Marketing Digital', 'SEO/SEM', 'Stratégie digitale'],
    description: 'Certification en commerce digital couvrant les stratégies de vente en ligne, le marketing numérique et la transformation digitale des entreprises.',
  },
  {
    id: 5,
    title: 'Getting Started with DevOps on AWS',
    issuer: 'AWS Training & Certification',
    date: 'Décembre 2024',
    category: 'Cloud',
    color: '#1a1208',
    accent: '#ff9900',
    icon: Globe,
    pdfFile: '/certificates/Certificat_Getting_Started_with_Devops_on_AWS.pdf',
    skills: ['AWS', 'CI/CD', 'CodePipeline', 'CloudFormation', 'DevOps'],
    description: 'Certification officielle AWS sur les pratiques DevOps dans le cloud. Couvre CodeBuild, CodeDeploy, CodePipeline et les infrastructures automatisées.',
  },
  {
    id: 6,
    title: 'Mastering Docker: Containers, Networking & Orchestration',
    issuer: 'CodeSignal',
    date: 'Octobre 2025',
    category: 'DevOps',
    color: '#0c1620',
    accent: '#0db7ed',
    icon: Code,
    credential: 'https://codesignal.com/learn/certificates/cm4jt3vr1000g5kuxyv6ij6kn/course-paths/134',
    pdfFile: '/certificates/Certification_Mastering_Docker_Containers__Networking__and_Orchestration.pdf',
    skills: ['Docker', 'Container Networking', 'Orchestration', 'Infrastructure as Code'],
    description: 'Maîtrise avancée de Docker — conteneurisation, réseaux, volumes et orchestration. Certification vérifiable sur CodeSignal avec compétences en Infrastructure as Code.',
  },
  {
    id: 7,
    title: 'Git Version Control for Beginners',
    issuer: 'CodeSignal',
    date: 'Octobre 2025',
    category: 'DevOps',
    color: '#0f0e1a',
    accent: '#f05032',
    icon: Code,
    credential: 'https://codesignal.com/learn/certificates/cmd3xft3a0004l7045w7hqz26/course-paths/140',
    pdfFile: '/certificates/Git_Version_Control_for_Beginners.pdf',
    skills: ['Git', 'Branching', 'Collaboration', 'Code Review', 'GitHub'],
    description: 'Certification CodeSignal couvrant Git de A à Z : commits, branches, merges, résolution de conflits et workflows collaboratifs en équipe.',
  },
];

function CertCard({ cert, onClick }: { cert: Cert; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const IconComp = cert.icon;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className="cert-card relative flex-none w-72 rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background: cert.color,
        border: `1px solid ${cert.accent}25`,
        boxShadow: hovered ? `0 20px 60px ${cert.accent}20, 0 0 0 1px ${cert.accent}30` : 'none',
        transition: 'box-shadow 0.3s',
      }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${cert.accent}, transparent)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${cert.accent}18` }}
          >
            <IconComp size={18} style={{ color: cert.accent }} />
          </div>
          <span
            className="text-xs font-display font-600 px-2.5 py-1 rounded-full"
            style={{ background: `${cert.accent}15`, color: cert.accent }}
          >
            {cert.category}
          </span>
        </div>

        <h3 className="font-display font-700 text-chalk text-sm leading-snug mb-2 line-clamp-2">
          {cert.title}
        </h3>
        <p className="text-chalk/40 text-xs mb-4 line-clamp-1">{cert.issuer}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {cert.skills.slice(0, 3).map((s) => (
            <span key={s} className="tech-pill">{s}</span>
          ))}
          {cert.skills.length > 3 && (
            <span className="tech-pill">+{cert.skills.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-chalk/30 text-xs">{cert.date}</span>
          <motion.div
            animate={{ x: hovered ? 3 : 0 }}
            className="flex items-center gap-1 text-xs"
            style={{ color: cert.accent }}
          >
            View details <ExternalLink size={10} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function CertModal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const IconComp = cert.icon;
  const [showPdf, setShowPdf] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(6,6,12,0.9)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, rotateX: -15 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          background: cert.color,
          border: `1px solid ${cert.accent}35`,
          boxShadow: `0 40px 80px ${cert.accent}15`,
          maxWidth: showPdf ? '900px' : '500px',
          maxHeight: '90vh',
        }}
      >
        {/* Accent bar */}
        <div className="h-1.5 w-full flex-none" style={{ background: `linear-gradient(90deg, ${cert.accent}, transparent)` }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-chalk/10 flex items-center justify-center text-chalk/60 hover:text-chalk hover:bg-chalk/20 transition-all"
        >
          <X size={14} />
        </button>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 6px)' }}>
          {/* Info panel */}
          <div className="p-7">
            <div className="flex items-start gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-none"
                style={{ background: `${cert.accent}18`, border: `1px solid ${cert.accent}30` }}
              >
                <IconComp size={20} style={{ color: cert.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className="text-xs font-display font-600 mb-1.5 px-2 py-0.5 rounded-full inline-block"
                  style={{ background: `${cert.accent}15`, color: cert.accent }}
                >
                  {cert.category}
                </div>
                <h3 className="font-display font-800 text-chalk text-base leading-tight">{cert.title}</h3>
                <p className="text-chalk/50 text-xs mt-0.5">{cert.issuer} · {cert.date}</p>
              </div>
            </div>

            <p className="text-chalk/55 text-sm leading-relaxed mb-5">{cert.description}</p>

            <div className="mb-5">
              <div className="text-xs text-chalk/25 font-display uppercase tracking-wider mb-2.5">Compétences</div>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((s) => (
                  <span key={s} className="tech-pill">{s}</span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {cert.pdfFile && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowPdf(!showPdf)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-display font-600 transition-all"
                  style={{
                    background: showPdf ? `${cert.accent}25` : `${cert.accent}15`,
                    color: cert.accent,
                    border: `1px solid ${cert.accent}30`,
                  }}
                >
                  <FileText size={13} />
                  {showPdf ? 'Masquer' : 'Voir le certificat'}
                </motion.button>
              )}
              {cert.credential && (
                <a
                  href={cert.credential}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs transition-colors hover:opacity-80"
                  style={{ color: cert.accent }}
                >
                  <ExternalLink size={12} /> Vérifier en ligne
                </a>
              )}
            </div>
          </div>

          {/* PDF viewer */}
          <AnimatePresence>
            {showPdf && cert.pdfFile && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 580, opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t"
                style={{ borderColor: `${cert.accent}20` }}
              >
                <iframe
                  src={`${cert.pdfFile}#toolbar=0&navpanes=0`}
                  className="w-full"
                  style={{ height: 580, background: '#fff' }}
                  title={cert.title}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [selected, setSelected] = useState<Cert | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'right' ? 320 : -320, behavior: 'smooth' });
  };

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(false);
    dragStartX.current = e.clientX;
    scrollStartX.current = scrollRef.current?.scrollLeft ?? 0;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartX.current;
      if (Math.abs(dx) > 5) setIsDragging(true);
      if (scrollRef.current) scrollRef.current.scrollLeft = scrollStartX.current - dx;
    };
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <section id="certifications" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">03 — Certifications</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-5xl text-chalk"
          >
            {certifications.length} Certifications
            <br /><span className="gold-shimmer">& diplômes réels.</span>
          </motion.h2>

          {/* Nav arrows */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-xl border border-chalk/15 flex items-center justify-center text-chalk/50 hover:text-gold hover:border-gold/40 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-xl border border-chalk/15 flex items-center justify-center text-chalk/50 hover:text-gold hover:border-gold/40 transition-all"
            >
              <ChevronRight size={16} />
            </button>
            <span className="text-xs text-chalk/30 ml-2">Drag to browse all {certifications.length}</span>
          </motion.div>
        </div>

        {/* Scrollable track */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative"
        >
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-12 pointer-events-none z-10"
            style={{ background: 'linear-gradient(90deg, var(--void), transparent)' }}
          />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none z-10"
            style={{ background: 'linear-gradient(-90deg, var(--void), transparent)' }}
          />

          <div
            ref={scrollRef}
            className="overflow-x-auto pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={onMouseDown}
          >
            <div className="cert-scroll-track py-4">
              {certifications.map((cert) => (
                <CertCard
                  key={cert.id}
                  cert={cert}
                  onClick={() => {
                    if (!isDragging) setSelected(cert);
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stacked preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 flex items-center gap-4"
        >
          <div className="flex -space-x-3">
            {certifications.slice(0, 6).map((cert, i) => (
              <div
                key={cert.id}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-display font-700"
                style={{
                  background: cert.color,
                  borderColor: cert.accent,
                  color: cert.accent,
                  zIndex: 6 - i,
                }}
              >
                {cert.title[0]}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full bg-surface-3 border-2 border-gold/30 flex items-center justify-center text-xs text-gold font-display font-700"
              style={{ zIndex: 0 }}>
              +{certifications.length - 6}
            </div>
          </div>
          <span className="text-chalk/40 text-sm">
            Coursera · FORCE-N · AWS · CodeSignal · Université Numérique CHK
          </span>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CertModal cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}