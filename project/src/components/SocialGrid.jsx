import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';
import { socialGrid } from '@/data/content';

export default function SocialGrid() {
  return (
    <section className="relative section-pad py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-rose-300/80">
              <span className="h-px w-8 bg-rose-300/50" />
              @luxe.glow.studio
            </span>
            <h2 className="mt-4 font-display text-4xl font-light text-cream md:text-6xl">
              Follow the <span className="italic text-gradient-rose">glow</span>
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm text-cream/80 transition-colors hover:text-rose-300"
          >
            <Instagram size={16} />
            Follow on Instagram
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {socialGrid.map((img, i) => (
            <motion.a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <img
                src={img}
                alt="Instagram post"
                className="h-full w-full object-cover img-grade transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Heart className="text-rose-300" size={24} fill="currentColor" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
