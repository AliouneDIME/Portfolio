import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Globe, Server, Shield, Layers, Terminal } from 'lucide-react';

const services = [
  {
    Icon: Code2,
    title: 'Frontend Dev',
    desc: 'React, Angular, TypeScript — pixel-perfect interfaces with smooth animations and accessibility.',
    accent: '#c9a84c',
    number: '01',
  },
  {
    Icon: Server,
    title: 'Backend Dev',
    desc: 'Node.js, Django, Spring Boot — robust REST APIs and microservices at any scale.',
    accent: '#00d4ff',
    number: '02',
  },
  {
    Icon: Globe,
    title: 'Full-Stack Apps',
    desc: 'End-to-end product development from database schema to deployed SaaS application.',
    accent: '#c9a84c',
    number: '03',
  },
  {
    Icon: Shield,
    title: 'Security Consulting',
    desc: 'Penetration testing mindset, OWASP compliance, 2FA/OTP integration and secure auth flows.',
    accent: '#ff2d78',
    number: '04',
  },
  {
    Icon: Layers,
    title: 'System Architecture',
    desc: 'Designing cloud-native systems with Docker, microservices and CI/CD pipelines.',
    accent: '#00d4ff',
    number: '05',
  },
  {
    Icon: Terminal,
    title: 'API Development',
    desc: 'RESTful and GraphQL APIs, documentation, versioning and performance optimization.',
    accent: '#c9a84c',
    number: '06',
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="services" ref={ref} className="py-32 relative">
      <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-electric/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">02 — Services</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-5xl text-chalk"
          >
            What I <span className="gold-shimmer">build.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-chalk/40 text-sm max-w-xs"
          >
            From concept to deployment — end-to-end development with quality at every layer.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ Icon, title, desc, accent, number }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="group relative bg-surface-1 border border-chalk/6 rounded-2xl p-6 overflow-hidden transition-all hover:border-gold/20 cursor-default"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 50%, ${accent}08 0%, transparent 60%)` }}
              />

              <div className="flex items-start justify-between mb-6 relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}
                >
                  <Icon size={18} style={{ color: accent }} />
                </div>
                <span className="font-display font-800 text-3xl" style={{ color: `${accent}18` }}>
                  {number}
                </span>
              </div>

              <h3 className="font-display font-700 text-chalk text-base mb-2 relative z-10">{title}</h3>
              <p className="text-chalk/40 text-sm leading-relaxed relative z-10">{desc}</p>

              {/* Bottom line */}
              <div
                className="absolute bottom-0 inset-x-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}