import { motion } from 'framer-motion';
import {
  Sparkles, Scissors, Brush, Hand, Flower2, Crown, ArrowUpRight,
} from 'lucide-react';
import { services } from '@/data/content';
import SectionHeading from './SectionHeading';

const iconMap = { Sparkles, Scissors, Brush, Hand, Flower2, Crown };

export default function Services() {
  return (
    <section id="services" className="relative section-pad py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,77,141,0.05),transparent_50%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Signature Services"
          title={<>Crafted for <span className="italic text-gradient-rose">your glow</span></>}
          subtitle="Each treatment is a considered ritual — not a transaction. Choose a moment of luxury, or build a full transformation journey."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12 }}
                className="glow-border group relative overflow-hidden rounded-3xl glass p-8 shadow-card"
              >
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-rose-gold-soft opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-gold-soft text-rose-300"
                  >
                    <Icon size={24} />
                  </motion.div>
                  <span className="rounded-full glass px-3 py-1 text-xs text-cream/60">
                    {service.duration}
                  </span>
                </div>

                <div className="relative mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-rose-300/70">
                    {service.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-light text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">
                    {service.description}
                  </p>
                </div>

                <div className="relative mt-7 flex items-center justify-between border-t border-white/5 pt-5">
                  <span className="font-display text-2xl text-gradient-rose">
                    {service.price}
                  </span>
                  <motion.span
                    whileHover={{ x: 4, y: -4 }}
                    className="flex h-9 w-9 items-center justify-center rounded-full glass text-cream/70"
                  >
                    <ArrowUpRight size={16} />
                  </motion.span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
