import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import MagneticButton from './MagneticButton';

const particles = Array.from({ length: 18 });

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="home" ref={ref} className="relative h-screen min-h-[680px] w-full overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury salon"
          className="h-full w-full object-cover object-center img-grade"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,77,141,0.18),transparent_55%)]" />
        <div className="absolute inset-0 vignette" />
      </motion.div>

      {/* Floating particles */}
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-rose-200/40"
          style={{
            width: 2 + (i % 4),
            height: 2 + (i % 4),
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.3em] text-cream/80"
          >
            <Sparkles size={13} className="text-rose-300" />
            South Mumbai's most-loved beauty studio
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-7 font-display text-[3.2rem] leading-[0.95] sm:text-7xl md:text-8xl lg:text-[9rem] font-light text-cream"
          >
            Where beauty
            <br />
            <span className="italic text-gradient-rose">becomes ritual</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-cream/70 md:text-lg"
          >
            A cinematic sanctuary for skin, hair, and bridal artistry —
            crafted by award-winning artists who treat every face as a canvas.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <MagneticButton variant="primary" onClick={() => (window.location.hash = '#contact')}>
              Reserve your glow
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => (window.location.hash = '#services')}>
              Explore services
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={20} className="text-cream/50" />
      </motion.div>
    </section>
  );
}
