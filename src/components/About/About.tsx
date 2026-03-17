import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, ShieldCheck, Zap, Users } from 'lucide-react';

const traits = [
  { Icon: Code2, label: 'Full-Stack', sub: 'React · Django · Spring' },
  { Icon: ShieldCheck, label: 'Security', sub: 'Cyber analyst certified' },
  { Icon: Zap, label: 'Performance', sub: 'Cloud-optimized apps' },
  { Icon: Users, label: 'Agile', sub: 'Scrum · team player' },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-32 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-gold/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">01 — About</span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-20 items-start">
          {/* Left: headline + image */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-800 text-5xl lg:text-6xl leading-tight text-chalk mb-10"
            >
              Turning ideas<br />
              <span className="gold-shimmer">into code.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, rotateY: -15 }}
              animate={inView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="perspective-container"
            >
              <div className="gradient-border rounded-2xl overflow-hidden relative w-full max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=500&q=80"
                  alt="Alioune Dime"
                  className="w-full aspect-[4/5] object-cover"
                  style={{ filter: 'saturate(0.6)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Right: bio + traits */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-chalk/55 text-lg leading-relaxed mb-6"
            >
              Hi — I'm <span className="text-chalk font-500">Alioune DIME</span>, IT Engineering Assistant
              spécialisé en <span className="text-gold">Génie Logiciel & Systèmes d'Information</span>,
              basé à Dakar. Passionné par la cybersécurité, le développement full-stack et la transformation digitale.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-chalk/55 text-lg leading-relaxed mb-12"
            >
              Diplômé de l'<span className="text-gold">École Supérieure Polytechnique de Dakar</span> (Licence Pro GLSI),
              j'ai acquis une expérience concrète en développement web chez <span className="text-chalk/80">Common Technologie (Hey!Bus)</span> et
              en administration systèmes au <span className="text-chalk/80">Ministère des Affaires Étrangères</span>.
              Je conçois des architectures sécurisées, scalables et centrées utilisateur.
            </motion.p>

            {/* Trait grid */}
            <div className="grid grid-cols-2 gap-4">
              {traits.map(({ Icon, label, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.6 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-surface-2 border border-chalk/6 rounded-xl p-5 transition-all hover:border-gold/25"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div className="font-display font-700 text-chalk text-sm mb-0.5">{label}</div>
                  <div className="text-chalk/40 text-xs">{sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}