import { motion } from 'framer-motion';
import { Instagram, Facebook, Twitter, Heart, ArrowUp } from 'lucide-react';
import { navLinks } from '@/data/content';

const socials = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-inksoft pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,142,114,0.08),transparent_50%)]" />

      {/* Floating particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-rose-300/30"
          style={{ left: `${(i * 31) % 100}%`, top: `${(i * 47) % 100}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="block h-2.5 w-2.5 rounded-full bg-rose-gold shadow-glow" />
              <span className="font-display text-2xl tracking-[0.3em] text-cream">
                LUXE GLOW
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/50">
              A cinematic sanctuary for skin, hair, and bridal artistry in the
              heart of South Mumbai. Crafted with intention, delivered with love.
            </p>
            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full glass text-cream/70 transition-colors hover:text-rose-300"
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cream/40">Explore</p>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-cream/60 transition-colors hover:text-rose-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cream/40">Visit us</p>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-cream/60">
              <li>12 Marine Drive, Mumbai 400020</li>
              <li>+91 98765 43210</li>
              <li>hello@luxeglow.studio</li>
              <li>Mon–Sun · 10am–8pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 md:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-cream/40">
            © {new Date().getFullYear()} LUXE GLOW Beauty Studio · Crafted with
            <Heart size={12} className="text-rose-300" fill="currentColor" /> in Mumbai
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-xs text-cream/50 transition-colors hover:text-rose-300"
          >
            Back to top
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="flex h-8 w-8 items-center justify-center rounded-full glass"
            >
              <ArrowUp size={14} />
            </motion.span>
          </a>
        </div>
      </div>
    </footer>
  );
}
