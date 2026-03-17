import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ExternalLink, ArrowRight } from 'lucide-react';

const experiences = [
  {
    role: 'Stagiaire Administrateur Systèmes & Support ITSM',
    company: 'Ministère de l\'Intégration Africaine, des Affaires Étrangères et des Sénégalais de l\'Extérieur',
    location: 'Dakar, Sénégal',
    period: 'Novembre 2025 — Mars 2026',
    type: 'Stage',
    accent: '#c9a84c',
    current: true,
    logo: '🏛️',
    tasks: [
      'Maintenance du matériel informatique et gestion du parc',
      'Implémentation et configuration de GLPI 11 pour la gestion des assets et le ticketing',
      'Automatisation des inventaires et surveillance des équipements',
      'Gestion des identités : intégration GLPI ↔ Active Directory (LDAP) pour la synchronisation des utilisateurs',
      'Déploiement d\'outils collaboratifs (Nextcloud)',
    ],
    stack: ['GLPI 11', 'Active Directory', 'LDAP', 'Nextcloud', 'Windows Server'],
  },
  {
    role: 'Développeur Web — Stagiaire',
    company: 'Common Technologie (Hey!Bus)',
    location: 'Dakar, Sénégal',
    period: 'Juin 2024 — Septembre 2024',
    type: 'Stage',
    accent: '#00d4ff',
    current: false,
    logo: '🚌',
    tasks: [
      'Développement du site web de la plateforme Hey!Bus',
      'Intégration de Keycloak pour l\'authentification et la gestion des rôles',
      'Mise en place du stockage de fichiers via MinIO',
      'Organisation du projet avec Trello (méthode Agile)',
    ],
    stack: ['React', 'Keycloak', 'MinIO', 'Trello', 'TypeScript', 'REST API'],
  },
];

const education = [
  {
    degree: 'Licence Professionnelle — Génie Logiciel & Systèmes d\'Information (GLSI)',
    school: 'École Supérieure Polytechnique de Dakar (ESP)',
    period: 'Novembre 2023 — Juillet 2024',
    accent: '#c9a84c',
    description: 'Développement d\'applications informatiques avec des technologies modernes, analyse & conception logicielle, gestion de projets technologiques, méthodes de développement, support utilisateur, déploiement d\'applications distribuées.',
  },
  {
    degree: 'Diplôme Supérieur en Technologie (DST)',
    school: 'École Supérieure Polytechnique de Dakar (ESP)',
    period: 'Novembre 2021 — Juillet 2023',
    accent: '#00d4ff',
    description: 'Développement d\'applications, administration systèmes, gestion de projets IT. Maîtrise des langages de programmation et des cycles de vie logiciel.',
  },
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="experience" ref={ref} className="py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">02 — Expériences & Formation</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-800 text-5xl text-chalk mb-16"
        >
          Parcours <span className="gold-shimmer">professionnel.</span>
        </motion.h2>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16">
          {/* ── Expériences ── */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-8"
            >
              <Briefcase size={14} className="text-gold" />
              <span className="text-xs font-display uppercase tracking-widest text-chalk/40">
                Expériences professionnelles
              </span>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-5 top-0 bottom-0 w-px"
                style={{ background: 'linear-gradient(180deg, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.05) 100%)' }}
              />

              <div className="space-y-10">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={exp.company}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.7 }}
                    className="relative pl-14 group"
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute left-3.5 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300"
                      style={{
                        borderColor: exp.accent,
                        background: exp.current ? exp.accent : 'var(--void)',
                        boxShadow: exp.current ? `0 0 12px ${exp.accent}60` : 'none',
                      }}
                    />

                    {/* Card */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="bg-surface-1 border border-chalk/6 rounded-2xl p-6 transition-all duration-300 hover:border-gold/20"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {exp.current && (
                              <span className="text-xs px-2 py-0.5 rounded-full font-display font-600"
                                style={{ background: `${exp.accent}20`, color: exp.accent }}>
                                En cours
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-chalk/6 text-chalk/40 font-display">
                              {exp.type}
                            </span>
                          </div>
                          <h3 className="font-display font-700 text-chalk text-sm leading-snug">{exp.role}</h3>
                        </div>
                        <span className="text-xl flex-none">{exp.logo}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-chalk/40 mb-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Briefcase size={10} style={{ color: exp.accent }} />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={10} />
                          {exp.period}
                        </span>
                      </div>

                      {/* Tasks */}
                      <ul className="space-y-1.5 mb-4">
                        {exp.tasks.map((task, ti) => (
                          <li key={ti} className="flex items-start gap-2 text-xs text-chalk/50">
                            <ArrowRight size={10} className="flex-none mt-0.5" style={{ color: exp.accent }} />
                            {task}
                          </li>
                        ))}
                      </ul>

                      {/* Stack */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-chalk/6">
                        {exp.stack.map((s) => (
                          <span key={s} className="tech-pill">{s}</span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Formation ── */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-8"
            >
              <div className="w-3 h-3 rounded-full bg-gold/60" />
              <span className="text-xs font-display uppercase tracking-widest text-chalk/40">
                Formation académique
              </span>
            </motion.div>

            <div className="space-y-5">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -3 }}
                  className="bg-surface-1 border border-chalk/6 rounded-2xl p-6 transition-all duration-300 hover:border-gold/20"
                >
                  <div
                    className="w-full h-0.5 rounded-full mb-5"
                    style={{ background: `linear-gradient(90deg, ${edu.accent}, transparent)` }}
                  />
                  <h3 className="font-display font-700 text-chalk text-sm leading-snug mb-1">
                    {edu.degree}
                  </h3>
                  <div className="flex items-center gap-2 text-xs mb-3 flex-wrap">
                    <span style={{ color: edu.accent }}>{edu.school}</span>
                    <span className="text-chalk/25">·</span>
                    <span className="text-chalk/35">{edu.period}</span>
                  </div>
                  <p className="text-chalk/40 text-xs leading-relaxed">{edu.description}</p>
                </motion.div>
              ))}

              {/* Infos perso card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="bg-surface-2 border border-chalk/6 rounded-2xl p-6"
              >
                <div className="text-xs text-chalk/25 font-display uppercase tracking-widest mb-4">
                  Infos pratiques
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: 'Langues', val: 'FR · EN · DE (basique)' },
                    { label: 'Localisation', val: 'Dakar, SN' },
                    { label: 'Disponibilité', val: 'Open to work' },
                    { label: 'Contrat', val: 'CDI · Freelance · Stage' },
                  ].map(({ label, val }) => (
                    <div key={label}>
                      <div className="text-chalk/30 text-xs mb-0.5">{label}</div>
                      <div className="text-chalk/70 text-xs font-500">{val}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CV download */}
              <motion.a
                href="/CV_Alioune_DIME_EN_1.pdf"
                download
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.65, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between w-full bg-gold/10 border border-gold/25 rounded-2xl px-6 py-4 group transition-all hover:bg-gold/15 hover:border-gold/40"
              >
                <div>
                  <div className="font-display font-700 text-gold text-sm">Télécharger le CV</div>
                  <div className="text-chalk/35 text-xs mt-0.5">PDF · Alioune DIME · Anglais</div>
                </div>
                <ExternalLink size={16} className="text-gold/60 group-hover:text-gold transition-colors" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}