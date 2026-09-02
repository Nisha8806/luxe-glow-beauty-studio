import { motion } from 'framer-motion';
import { stats } from '@/data/content';

export default function TrustedStrip() {
  return (
    <section className="relative border-y border-white/5 bg-inksoft py-12 md:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,142,114,0.06),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-xs uppercase tracking-[0.35em] text-cream/40"
        >
          Trusted by 10,000+ clients across Mumbai
        </motion.p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl font-light text-gradient-rose md:text-6xl">
                {stat.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-cream/50 md:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
