import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Crown, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';

const inclusions = [
  'Private trial session 4 weeks prior',
  'Dedicated lead artist + assistant',
  'Skin prep, hair, makeup & touch-ups',
  'On-location service across Mumbai',
  'Premium product kit (Charlotte Tilbury, Kérastase)',
  'Touch-up kit to take home',
];

export default function Bridal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);

  return (
    <section id="bridal" ref={ref} className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-inksoft to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,142,114,0.08),transparent_50%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        {/* Image side */}
        <motion.div
          style={{ y }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-card">
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80"
              alt="Bridal experience"
              className="aspect-[4/5] w-full object-cover img-grade"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute -bottom-6 -right-6 rounded-2xl glass-strong p-5 md:-right-10"
          >
            <div className="flex items-center gap-3">
              <Crown className="text-rose-300" size={22} />
              <div>
                <p className="font-display text-2xl text-cream">850+</p>
                <p className="text-xs uppercase tracking-[0.2em] text-cream/50">
                  Brides served
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <div className="order-1 lg:order-2">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-rose-300/80"
          >
            <span className="h-px w-8 bg-rose-300/50" />
            Bridal Luxury Experience
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-light leading-[1.05] text-cream md:text-6xl"
          >
            Your wedding day,
            <br />
            <span className="italic text-gradient-rose">perfected.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-cream/60 md:text-lg"
          >
            A full-day, private experience designed around you. From the first
            trial to the last touch-up, our artists ensure you feel calm,
            confident, and utterly radiant — so you can be fully present for
            the most important day of your life.
          </motion.p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {inclusions.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-3 text-sm text-cream/70"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-gold-soft text-rose-300">
                  <Check size={12} />
                </span>
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <MagneticButton variant="primary" onClick={() => (window.location.hash = '#contact')}>
              Enquire for your date
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
