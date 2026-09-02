import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export default function LoadingScreen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2600);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,142,114,0.12),transparent_60%)]" />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="block h-3 w-3 rounded-full bg-rose-gold shadow-glow"
            />
            <span className="font-display text-3xl md:text-5xl tracking-[0.25em] text-cream">
              LUXE
            </span>
          </div>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="mt-6 h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-4 text-center text-[10px] uppercase tracking-[0.5em] text-cream/40"
          >
            Beauty Studio
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.4, ease: 'easeInOut' }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-rose-gold"
        />
      </motion.div>
    </AnimatePresence>
  );
}
