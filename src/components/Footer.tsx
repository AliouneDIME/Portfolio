import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-chalk/6 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-display font-800 text-xl mb-1">
              <span className="gold-shimmer">AD</span>
              <span className="text-chalk/30 mx-1">/</span>
              <span className="text-chalk/50 text-sm font-body font-400">Alioune DIME</span>
            </div>
            <div className="text-chalk/25 text-xs">Full Stack Developer · Dakar, SN</div>
          </div>

          <div className="flex items-center gap-4">
            {[
              { Icon: Github, href: 'https://github.com/AliouneDIME' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/in/alioune-dim%C3%A9-293213308/' },
              { Icon: Mail, href: 'mailto:aliounedime92@gmail.com' },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                className="w-9 h-9 rounded-xl bg-surface-2 border border-chalk/8 flex items-center justify-center text-chalk/40 hover:text-gold hover:border-gold/30 transition-all"
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-surface-2 border border-chalk/8 flex items-center justify-center text-chalk/40 hover:text-gold hover:border-gold/30 transition-all"
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-chalk/5 text-center">
          <p className="text-chalk/20 text-xs flex items-center justify-center gap-1.5">
            Made with <Heart size={11} className="text-magenta/60" /> by Alioune DIME
            <span className="mx-2 text-chalk/10">·</span>
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}