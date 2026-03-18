import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/* ─── Terminal animation ─────────────────────────────────── */
const TERMINAL_LINES = [
  { cmd: '$ glpi-console db:install', out: '✓  Database initialized (MySQL 8.0)', delay: 0 },
  { cmd: '$ ldapsearch -H ldap://dc01 -b "dc=min,dc=sn" sAMAccountName', out: '✓  128 users found in Active Directory', delay: 800 },
  { cmd: '$ systemctl status nextcloud', out: '● nextcloud.service — active (running) since 2h ago', delay: 1600 },
  { cmd: '$ glpi-console itil:ticket --status=open', out: '📋 47 open tickets  |  SLA compliance: 94%', delay: 2400 },
  { cmd: '$ df -h /mnt/nas', out: '✓  NAS /mnt/nas  1.2T  used 380G  available 820G  31%', delay: 3200 },
  { cmd: '$ ping -c 3 dc01.ministere.sn', out: '✓  3 packets  rtt min/avg = 0.4/0.6 ms', delay: 4000 },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typed, setTyped] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let t: ReturnType<typeof setTimeout>;
    TERMINAL_LINES.forEach((line, i) => {
      t = setTimeout(() => {
        setVisibleLines(i + 1);
        // Typing effect for last line
        if (i === TERMINAL_LINES.length - 1) {
          let chars = 0;
          const iv = setInterval(() => {
            chars++;
            setTyped(line.cmd.slice(0, chars));
            if (chars >= line.cmd.length) clearInterval(iv);
          }, 35);
        }
      }, line.delay + 400);
    });
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <div ref={ref}
      className="bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden font-mono text-sm shadow-2xl">
      {/* Window bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[#8b949e] text-xs">alioune@ministere-integ:~</span>
      </div>
      {/* Lines */}
      <div className="p-5 space-y-3 min-h-[260px]">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <div className="text-[#58a6ff]">
              {i < visibleLines - 1 ? line.cmd : typed}
              {i === visibleLines - 1 && typed.length < line.cmd.length && (
                <span className="inline-block w-1.5 h-4 bg-[#58a6ff] ml-0.5 animate-pulse align-middle" />
              )}
            </div>
            {i < visibleLines - 1 && (
              <div className="text-[#3fb950] text-xs mt-0.5 pl-2">{line.out}</div>
            )}
            {i === visibleLines - 1 && typed.length === line.cmd.length && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="text-[#3fb950] text-xs mt-0.5 pl-2">{line.out}</motion.div>
            )}
          </motion.div>
        ))}
        {visibleLines === 0 && (
          <div className="text-[#8b949e] text-xs">Initialisation du terminal...</div>
        )}
      </div>
    </div>
  );
}


/* ─── IT Skill cards ─────────────────────────────────────── */
const IT_SKILLS = [
  {
    icon: '🖥',
    title: 'Administration Système',
    color: '#00d4ff',
    items: [
      'Active Directory / LDAP', 'Windows Server 2019',
      'Linux (Ubuntu, Debian)', 'Gestion de domaine DNS/DHCP',
      'Gestion des GPO', 'Virtualisation (VMware)',
    ],
  },
  {
    icon: '🎫',
    title: 'Support IT & ITSM',
    color: '#c9a84c',
    items: [
      'GLPI 11 — ticketing & inventaire', 'Support N1 / N2',
      'Gestion parc informatique', 'Maintenance matériel & logiciel',
      'Procédures ITIL', 'Onboarding utilisateurs',
    ],
  },
  {
    icon: '☁️',
    title: 'Services & Infra',
    color: '#ff2d78',
    items: [
      'Nextcloud (déploiement & admin)', 'MinIO (stockage objet S3)',
      'Keycloak (SSO / IAM)', 'Docker & containerisation',
      'Sauvegarde & restauration', 'Monitoring système',
    ],
  },
  {
    icon: '🔒',
    title: 'Sécurité & Réseaux',
    color: '#3fb950',
    items: [
      'Analyse de vulnérabilités', 'Politique de sécurité SI',
      'VPN & accès distants', 'Firewall & segmentation réseau',
      'Gestion des accès (IAM)', 'Audit et conformité',
    ],
  },
];

/* ─── Network diagram animated ──────────────────────────── */
function NetworkDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const nodes = [
    { id: 'dc', label: 'DC (AD/LDAP)', x: 50, y: 15, icon: '🏛', color: '#00d4ff' },
    { id: 'glpi', label: 'GLPI', x: 20, y: 55, icon: '🎫', color: '#c9a84c' },
    { id: 'next', label: 'Nextcloud', x: 80, y: 55, icon: '☁️', color: '#ff2d78' },
    { id: 'pc1', label: 'Postes', x: 10, y: 85, icon: '💻', color: '#3fb950' },
    { id: 'pc2', label: 'Imprim.', x: 35, y: 85, icon: '🖨', color: '#3fb950' },
    { id: 'pc3', label: 'Serveur', x: 65, y: 85, icon: '🗄', color: '#3fb950' },
    { id: 'pc4', label: 'NAS', x: 90, y: 85, icon: '💾', color: '#3fb950' },
  ];

  const edges = [
    ['dc', 'glpi'], ['dc', 'next'], ['dc', 'pc1'], ['dc', 'pc2'],
    ['glpi', 'pc1'], ['glpi', 'pc2'], ['next', 'pc3'], ['next', 'pc4'],
  ];

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  return (
    <div ref={ref} className="relative bg-[#0a0a14] border border-chalk/10 rounded-xl p-6 overflow-hidden">
      <div className="absolute top-4 left-4 text-[10px] font-display uppercase tracking-widest text-chalk/30">
        Architecture réseau — Ministère
      </div>
      <svg viewBox="0 0 100 100" className="w-full h-64 mt-4">
        {/* Edges */}
        {edges.map(([a, b], i) => {
          const na = getNode(a), nb = getNode(b);
          return (
            <motion.line key={i}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(201,168,76,0.25)" strokeWidth="0.5"
              strokeDasharray="2 1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
            />
          );
        })}
        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={node.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.4, ease: 'backOut' }}>
            <circle cx={node.x} cy={node.y} r="7" fill="#12121e" stroke={node.color} strokeWidth="0.7" />
            <text x={node.x} y={node.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="5">
              {node.icon}
            </text>
            <text x={node.x} y={node.y + 10} textAnchor="middle" fontSize="3"
              fill="rgba(255,255,255,0.45)" fontFamily="sans-serif">
              {node.label}
            </text>
          </motion.g>
        ))}
        {/* Animated data packets */}
        {inView && edges.slice(0, 3).map(([a, b], i) => {
          const na = getNode(a), nb = getNode(b);
          return (
            <motion.circle key={`pkt-${i}`} r="1"
              fill={na.color} opacity={0.8}
              animate={{
                cx: [na.x, nb.x, na.x],
                cy: [na.y, nb.y, na.y],
              }}
              transition={{
                duration: 2.5, repeat: Infinity, delay: i * 0.8,
                ease: 'linear',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}

/* ─── Main section ─────────────────────────────────────────── */
export function ITAdmin() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="it-admin" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Section header */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">06 — Sysadmin & ITSM</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-800 text-5xl text-chalk mb-4">
          Support IT &{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00d4ff, #c9a84c)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Administration.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-chalk/50 text-lg max-w-2xl mb-16 leading-relaxed">
          Expérience concrète en administration systèmes, support utilisateurs N1/N2
          et gestion ITSM avec GLPI au sein du Ministère de l'Intégration Africaine du Sénégal.
        </motion.p>


        {/* Two-col: terminal + network */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}>
            <p className="text-[10px] font-display uppercase tracking-widest text-chalk/30 mb-3">
              Activité terminal — missions réelles
            </p>
            <Terminal />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}>
            <p className="text-[10px] font-display uppercase tracking-widest text-chalk/30 mb-3">
              Infrastructure déployée
            </p>
            <NetworkDiagram />
          </motion.div>
        </div>

        {/* IT skill cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {IT_SKILLS.map(({ icon, title, color, items }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
              className="bg-surface-1 border rounded-2xl p-6 cursor-pointer
                         transition-all duration-300 relative overflow-hidden group"
              style={{ borderColor: activeCard === i ? color + '60' : 'rgba(255,255,255,0.06)' }}
              whileHover={{ y: -5 }}>
              {/* Top glow */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                initial={{ scaleX: 0 }} animate={activeCard === i ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.3 }}
              />
              <div className="text-3xl mb-3">{icon}</div>
              <h3 className="font-display font-700 text-chalk text-sm mb-4 leading-tight">{title}</h3>
              <AnimatePresence>
                <motion.ul
                  initial={{ height: 'auto' }}
                  className="space-y-1.5">
                  {items.map((item, j) => (
                    <motion.li key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 + j * 0.05 }}
                      className="flex items-start gap-2 text-chalk/50 text-xs leading-relaxed">
                      <span className="mt-0.5 w-1.5 h-1.5 rounded-full flex-none"
                        style={{ background: color }} />
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* GLPI highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 bg-surface-1 border border-[#00d4ff]/20 rounded-2xl p-7
                     relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#00d4ff] to-transparent rounded-l-2xl" />
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🎫</span>
                <h3 className="font-display font-700 text-chalk text-xl">GLPI 11 — Expérience terrain</h3>
              </div>
              <p className="text-chalk/55 text-sm leading-relaxed max-w-xl">
                Déploiement et administration complète de GLPI 11 au Ministère de l'Intégration Africaine :
                configuration de la base CMDB, gestion du cycle de vie des tickets ITIL, inventaire automatique
                du parc (AgentGLPI), définition des SLA et tableaux de bord superviseur.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}