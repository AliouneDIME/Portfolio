import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Mail, MapPin, Github, Linkedin,
  Send, CheckCircle2, AlertCircle, ArrowUpRight,
  MessageSquare, User, AtSign, Sparkles, Clock, Globe,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

/* ─── Floating particle ─────────────────────────────────────── */
function Particle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, background: 'rgba(201,168,76,0.35)' }}
      animate={{ y: [-10, 10, -10], x: [-6, 6, -6], opacity: [0.2, 0.7, 0.2], scale: [1, 1.4, 1] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  );
}

/* ─── Animated field wrapper ────────────────────────────────── */
function Field({
  label, icon: Icon, children, focused, filled,
}: {
  label: string; icon: typeof Mail; children: React.ReactNode; focused: boolean; filled: boolean;
}) {
  return (
    <div className="relative group">
      <motion.label
        animate={{
          y:       focused || filled ? -26 : 0,
          scale:   focused || filled ? 0.82 : 1,
          color:   focused ? '#c9a84c' : filled ? 'rgba(244,241,236,0.45)' : 'rgba(244,241,236,0.3)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="absolute left-11 top-3.5 font-display text-sm pointer-events-none origin-left z-10"
      >
        {label}
      </motion.label>

      {/* Icon */}
      <motion.div
        animate={{ color: focused ? '#c9a84c' : 'rgba(244,241,236,0.25)' }}
        className="absolute left-3.5 top-3.5 pointer-events-none z-10"
      >
        <Icon size={15} />
      </motion.div>

      {/* Border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        animate={{
          boxShadow: focused
            ? '0 0 0 1px rgba(201,168,76,0.5), 0 0 20px rgba(201,168,76,0.08)'
            : '0 0 0 1px rgba(244,241,236,0.06)',
        }}
        transition={{ duration: 0.2 }}
      />

      {children}
    </div>
  );
}

/* ─── Contact info card ─────────────────────────────────────── */
function InfoCard({
  Icon, label, value, href, accent, delay,
}: {
  Icon: typeof Mail; label: string; value: string; href: string; accent: string; delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: 6 }}
      className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden"
      style={{
        background: hovered ? `${accent}08` : 'rgba(15,15,24,0.5)',
        borderColor: hovered ? `${accent}30` : 'rgba(244,241,236,0.06)',
      }}
    >
      {/* Hover glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at 20% 50%, ${accent}08, transparent 60%)` }}
      />

      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-none relative z-10 transition-all duration-300"
        style={{
          background: hovered ? `${accent}18` : 'rgba(244,241,236,0.04)',
          border: `1px solid ${hovered ? `${accent}35` : 'rgba(244,241,236,0.07)'}`,
        }}
      >
        <Icon size={15} style={{ color: hovered ? accent : 'rgba(244,241,236,0.35)' }} />
      </div>

      <div className="flex-1 min-w-0 relative z-10">
        <div className="text-[10px] font-display uppercase tracking-widest mb-0.5"
          style={{ color: 'rgba(244,241,236,0.3)' }}>
          {label}
        </div>
        <div
          className="text-sm font-body truncate transition-colors duration-200"
          style={{ color: hovered ? accent : 'rgba(244,241,236,0.65)' }}
        >
          {value}
        </div>
      </div>

      <motion.div
        animate={{ x: hovered ? 2 : 0, opacity: hovered ? 1 : 0.25 }}
        style={{ color: hovered ? accent : 'rgba(244,241,236,0.25)' }}
        className="flex-none relative z-10"
      >
        <ArrowUpRight size={14} />
      </motion.div>
    </motion.a>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);
  const [values,  setValues]  = useState({ from_name: '', reply_to: '', service: '', message: '' });
  const [charCount, setCharCount] = useState(0);

  /* mouse-parallax for orbs */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const orb1X = useTransform(springX, [-1, 1], [-30, 30]);
  const orb1Y = useTransform(springY, [-1, 1], [-20, 20]);
  const orb2X = useTransform(springX, [-1, 1], [20, -20]);
  const orb2Y = useTransform(springY, [-1, 1], [15, -15]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth, h = window.innerHeight;
      mouseX.set((e.clientX / w) * 2 - 1);
      mouseY.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const handleChange = (field: string, val: string) => {
    setValues((v) => ({ ...v, [field]: val }));
    if (field === 'message') setCharCount(val.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('loading');
    try {
      await emailjs.sendForm('service_vq6qwri', 'template_0b8w1of', formRef.current, 'WXlmg_sPF09mVXIht');
      setStatus('success');
      formRef.current.reset();
      setValues({ from_name: '', reply_to: '', service: '', message: '' });
      setCharCount(0);
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const inputBase =
    'w-full bg-transparent pt-6 pb-2 pl-11 pr-4 text-chalk/80 text-sm font-body ' +
    'focus:outline-none placeholder-transparent rounded-xl transition-colors duration-200';

  const particles = [
    { x: 8, y: 20, size: 3, delay: 0 }, { x: 92, y: 15, size: 2, delay: 1.5 },
    { x: 15, y: 70, size: 2, delay: 0.8 }, { x: 85, y: 65, size: 3.5, delay: 2.2 },
    { x: 50, y: 8,  size: 2, delay: 1.1 }, { x: 60, y: 85, size: 2.5, delay: 0.4 },
    { x: 30, y: 90, size: 2, delay: 1.9 }, { x: 78, y: 40, size: 2, delay: 0.6 },
  ];

  const contactLinks = [
    { Icon: Mail,     label: 'Email',      value: 'aliounedime92@gmail.com',                           href: 'mailto:aliounedime92@gmail.com',                            accent: '#c9a84c', delay: 0.3  },
    { Icon: MapPin,   label: 'Localisation', value: 'Sicap Liberté 1, Dakar — SN',                    href: '#',                                                         accent: '#ff2d78', delay: 0.44 },
    { Icon: Github,   label: 'GitHub',     value: 'github.com/AliouneDIME',                            href: 'https://github.com/AliouneDIME',                            accent: '#e8d5a3', delay: 0.5  },
    { Icon: Linkedin, label: 'LinkedIn',   value: 'alioune-dimé',                                      href: 'https://www.linkedin.com/in/alioune-dim%C3%A9-293213308/', accent: '#0077b5', delay: 0.56 },
    { Icon: Globe,    label: 'Website',    value: 'aliounedime.netlify.app',                           href: 'https://aliounedime.netlify.app',                           accent: '#c9a84c', delay: 0.62 },
  ];

  const services = [
    'Développement Web', 'API REST / GraphQL', 'Architecture Cloud',
    'Conseil Sécurité', 'Administration Sys.', 'Autre',
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">

      {/* ── Atmospheric background ── */}
      <motion.div
        style={{ x: orb1X, y: orb1Y, background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)' }}
        className="absolute -top-20 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ x: orb2X, y: orb2Y, background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)' }}
        className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.025), transparent)' }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => <Particle key={i} {...p} />)}
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-6 h-px bg-gold/60" />
          <span className="divider-glyph">07 — Contact</span>
        </motion.div>

        {/* ── Main heading ── */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-800 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-chalk mb-5"
          >
            Travaillons
            <br />
            <span className="gold-shimmer">ensemble.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-chalk/45 text-lg max-w-xl leading-relaxed"
          >
            Un projet, une idée, une opportunité ? Je réponds sous{' '}
            <span className="text-gold">24h</span>. Ouverts aux collaborations en CDI,
            freelance ou stage.
          </motion.p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 xl:gap-16 items-start">

          {/* ══ LEFT — Info + availability ══ */}
          <div className="space-y-5">

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-xs font-display font-600">Disponible — Open to work</span>
              <Clock size={11} className="text-emerald-400/60" />
            </motion.div>

            {/* Contact cards */}
            <div className="space-y-2.5">
              {contactLinks.map((link) => (
                <InfoCard key={link.label} {...link} />
              ))}
            </div>

            {/* Response time card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{
                background: 'rgba(12,12,22,0.7)',
                border: '1px solid rgba(201,168,76,0.12)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)' }}
              />
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-none">
                  <Sparkles size={14} className="text-gold" />
                </div>
                <div>
                  <div className="font-display font-700 text-chalk/80 text-sm mb-1">Réponse garantie</div>
                  <p className="text-chalk/35 text-xs leading-relaxed">
                    Je réponds à chaque message dans les <span className="text-gold/80">24 heures</span>.
                    Pour les urgences, utilisez le téléphone ou LinkedIn.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ══ RIGHT — Form ══ */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -8 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="perspective-container"
          >
            <div
              className="rounded-2xl relative overflow-hidden"
              style={{
                background: 'rgba(11,11,20,0.8)',
                border: '1px solid rgba(244,241,236,0.07)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(244,241,236,0.04)',
              }}
            >
              {/* Top shimmer line */}
              <div
                className="h-px w-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }}
              />

              {/* Form header */}
              <div className="px-7 pt-7 pb-5 border-b border-chalk/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gold/12 border border-gold/20 flex items-center justify-center">
                    <MessageSquare size={14} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-display font-700 text-chalk/80 text-sm">Envoyer un message</div>
                    <div className="text-chalk/30 text-[10px] mt-0.5">Tous les champs marqués * sont requis</div>
                  </div>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="px-7 py-6 space-y-4">

                {/* Row: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">

                  {/* Name */}
                  <Field
                    label="Nom complet *"
                    icon={User}
                    focused={focused === 'from_name'}
                    filled={!!values.from_name}
                  >
                    <input
                      type="text"
                      name="from_name"
                      required
                      placeholder="Nom complet"
                      value={values.from_name}
                      onChange={(e) => handleChange('from_name', e.target.value)}
                      onFocus={() => setFocused('from_name')}
                      onBlur={() => setFocused(null)}
                      className={inputBase}
                      style={{
                        background: focused === 'from_name'
                          ? 'rgba(201,168,76,0.04)'
                          : 'rgba(244,241,236,0.025)',
                      }}
                    />
                  </Field>

                  {/* Email */}
                  <Field
                    label="Email *"
                    icon={AtSign}
                    focused={focused === 'reply_to'}
                    filled={!!values.reply_to}
                  >
                    <input
                      type="email"
                      name="reply_to"
                      required
                      placeholder="Email"
                      value={values.reply_to}
                      onChange={(e) => handleChange('reply_to', e.target.value)}
                      onFocus={() => setFocused('reply_to')}
                      onBlur={() => setFocused(null)}
                      className={inputBase}
                      style={{
                        background: focused === 'reply_to'
                          ? 'rgba(201,168,76,0.04)'
                          : 'rgba(244,241,236,0.025)',
                      }}
                    />
                  </Field>
                </div>

                {/* Service selector */}
                <div>
                  <div className="text-[10px] font-display uppercase tracking-widest text-chalk/25 mb-2.5">
                    Type de demande
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <motion.button
                        key={s}
                        type="button"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleChange('service', values.service === s ? '' : s)}
                        className="px-3 py-1.5 rounded-xl text-xs font-display font-600 transition-all duration-200"
                        style={{
                          background: values.service === s ? 'rgba(201,168,76,0.18)' : 'rgba(244,241,236,0.04)',
                          border: `1px solid ${values.service === s ? 'rgba(201,168,76,0.4)' : 'rgba(244,241,236,0.08)'}`,
                          color: values.service === s ? '#c9a84c' : 'rgba(244,241,236,0.4)',
                        }}
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                  {/* Hidden field to pass service type */}
                  <input type="hidden" name="service" value={values.service} />
                </div>

                {/* Message */}
                <Field
                  label="Message *"
                  icon={MessageSquare}
                  focused={focused === 'message'}
                  filled={!!values.message}
                >
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Message"
                    value={values.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    className={inputBase + ' resize-none pt-7'}
                    style={{
                      background: focused === 'message'
                        ? 'rgba(201,168,76,0.04)'
                        : 'rgba(244,241,236,0.025)',
                    }}
                  />
                  {/* Char counter */}
                  <div className="absolute bottom-2.5 right-3.5 text-[10px] text-chalk/20 font-body pointer-events-none">
                    {charCount}
                  </div>
                </Field>

                {/* Submit button */}
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1,   y: 0 }}
                      exit={{   opacity: 0, scale: 0.9, y: -10 }}
                      className="flex items-center gap-3 p-4 rounded-xl border"
                      style={{
                        background: 'rgba(16,185,129,0.08)',
                        border: '1px solid rgba(16,185,129,0.2)',
                      }}
                    >
                      <CheckCircle2 size={18} className="text-emerald-400 flex-none" />
                      <div>
                        <div className="font-display font-700 text-emerald-400 text-sm">Message envoyé !</div>
                        <div className="text-emerald-400/60 text-xs mt-0.5">Je vous répondrai dans les 24h.</div>
                      </div>
                    </motion.div>
                  ) : status === 'error' ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1,   y: 0 }}
                      exit={{   opacity: 0, scale: 0.9, y: -10 }}
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{
                        background: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                      }}
                    >
                      <AlertCircle size={18} className="text-red-400 flex-none" />
                      <div>
                        <div className="font-display font-700 text-red-400 text-sm">Échec de l'envoi</div>
                        <div className="text-red-400/60 text-xs mt-0.5">
                          Réessayez ou écrivez directement à aliounedime92@gmail.com
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      type="submit"
                      disabled={status === 'loading'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{   opacity: 0, y: -10 }}
                      whileHover={status !== 'loading' ? { scale: 1.02, y: -2 } : {}}
                      whileTap={status !== 'loading'  ? { scale: 0.98 } : {}}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-display font-700 text-sm transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: status === 'loading'
                          ? 'rgba(244,241,236,0.06)'
                          : 'linear-gradient(135deg, #c9a84c, #e8d5a3)',
                        color: status === 'loading' ? 'rgba(244,241,236,0.3)' : '#06060c',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        boxShadow: status !== 'loading'
                          ? '0 8px 32px rgba(201,168,76,0.25), 0 2px 8px rgba(201,168,76,0.15)'
                          : 'none',
                      }}
                    >
                      {/* Shimmer sweep on hover */}
                      {status !== 'loading' && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
                            backgroundSize: '200% 100%',
                          }}
                          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                        />
                      )}

                      {status === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-chalk/20 border-t-chalk/60 rounded-full animate-spin" />
                          <span>Envoi en cours…</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Envoyer le message
                          <ArrowUpRight size={13} />
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Privacy note */}
                <p className="text-chalk/18 text-[10px] text-center leading-relaxed">
                  Vos données ne sont jamais partagées avec des tiers.
                  En soumettant ce formulaire vous acceptez d'être contacté en retour.
                </p>
              </form>

              {/* Bottom shimmer line */}
              <div
                className="h-px w-full"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}