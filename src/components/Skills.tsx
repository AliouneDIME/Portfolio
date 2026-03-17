import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillGroups = [
  {
    label: 'Frontend',
    color: '#61dafb',
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Angular', level: 70 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'HTML / CSS / SCSS', level: 95 },
    ],
  },
  {
    label: 'Backend',
    color: '#c9a84c',
    skills: [
      { name: 'Django / Python', level: 88 },
      { name: 'Node.js / Express', level: 82 },
      { name: 'Spring Boot / Java', level: 72 },
      { name: 'PHP / Laravel', level: 75 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    label: 'Data & Infra',
    color: '#00d4ff',
    skills: [
      { name: 'PostgreSQL / SQL', level: 85 },
      { name: 'MongoDB', level: 72 },
      { name: 'Docker', level: 78 },
      { name: 'Git / GitHub', level: 92 },
      { name: 'Agile / Scrum', level: 88 },
    ],
  },
];

const techIcons = [
  'React', 'TypeScript', 'Python', 'Django', 'Node.js',
  'Docker', 'PostgreSQL', 'Git', 'Java', 'PHP',
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="skills" ref={ref} className="py-32 relative overflow-hidden">
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-gold/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">05 — Skills</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-800 text-5xl text-chalk mb-16"
        >
          The <span className="gold-shimmer">toolkit.</span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {skillGroups.map(({ label, color, skills }, gi) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + gi * 0.1, duration: 0.7 }}
              className="bg-surface-1 border border-chalk/6 rounded-2xl p-7"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                <h3 className="font-display font-700 text-chalk text-sm uppercase tracking-widest">
                  {label}
                </h3>
              </div>

              <div className="space-y-5">
                {skills.map(({ name, level }, i) => (
                  <div key={name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-chalk/60 text-sm">{name}</span>
                      <span className="font-display text-xs font-600" style={{ color }}>{level}%</span>
                    </div>
                    <div className="h-1 bg-chalk/6 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${level}%` } : { width: 0 }}
                        transition={{ delay: 0.3 + gi * 0.1 + i * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="text-xs text-chalk/25 font-display uppercase tracking-widest mb-5">Technologies used</div>
          <div className="flex flex-wrap gap-3">
            {[
              ...techIcons,
              'MongoDB', 'PHP', 'Laravel', 'Angular', 'SCSS',
              'SpringBoot', 'REST API', 'GraphQL', 'CI/CD', 'AWS',
            ].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.08, y: -2 }}
                className="tech-pill cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}