import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useScrollPosition, useActiveSection, useLockBodyScroll } from '@/hooks/useScroll';

export default function Navbar() {
  const scrollY = useScrollPosition();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(navLinks.map((l) => l.href.replace('#', '')));
  useLockBodyScroll(open);

  const scrolled = scrollY > 40;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-strong py-3' : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-10">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="block h-2.5 w-2.5 rounded-full bg-rose-gold shadow-glow" />
            <span className="font-display text-xl tracking-[0.3em] text-cream">
              LUXE
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.3em] text-cream/40 md:inline">
              Glow
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = active === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative text-sm tracking-wide text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-rose-gold transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full bg-rose-gold px-6 py-2.5 text-sm font-medium text-ink shadow-glow transition-transform hover:scale-105 md:inline-block"
          >
            Book Now
          </a>

          <button
            onClick={() => setOpen(true)}
            className="text-cream lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-xl tracking-[0.3em] text-cream">
                LUXE
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} className="text-cream" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/5 py-5 font-display text-3xl text-cream/80 transition-colors hover:text-rose-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto p-6">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-rose-gold py-4 text-center font-medium text-ink"
              >
                Book an appointment
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
