import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data/content';
import SectionHeading from './SectionHeading';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((p) => (p + 1) % testimonials.length), []);
  const prev = () => setIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const t = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-inksoft via-ink to-inksoft" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,77,141,0.06),transparent_55%)]" />

      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Client Love"
          title={<>Words that <span className="italic text-gradient-rose">warm us</span></>}
        />

        <div className="relative min-h-[340px] md:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <Quote className="mb-6 text-rose-300/60" size={36} />

              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-rose-300 text-rose-300" />
                ))}
              </div>

              <p className="mt-6 max-w-3xl font-display text-2xl font-light italic leading-relaxed text-cream md:text-3xl">
                "{t.quote}"
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex items-center gap-4"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-rose-300/40 img-grade"
                />
                <div className="text-left">
                  <p className="font-medium text-cream">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-cream/50">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-cream/70 transition-colors hover:text-rose-300"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-rose-gold' : 'w-2 bg-cream/20'
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full glass text-cream/70 transition-colors hover:text-rose-300"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
