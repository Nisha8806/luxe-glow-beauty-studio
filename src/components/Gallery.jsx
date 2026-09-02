import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery } from '@/data/content';
import SectionHeading from './SectionHeading';

export default function Gallery() {
  const [active, setActive] = useState(null);

  const open = (index) => setActive(index);
  const close = () => setActive(null);
  const next = () => setActive((p) => (p + 1) % gallery.length);
  const prev = () => setActive((p) => (p - 1 + gallery.length) % gallery.length);

  return (
    <section id="gallery" className="relative section-pad py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Transformations"
          title={<>Before &amp; <span className="italic text-gradient-rose">after glow</span></>}
          subtitle="Real clients, real results. Tap any image to view the full transformation."
        />

        {/* Masonry via CSS columns */}
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {gallery.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => open(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group relative block w-full overflow-hidden rounded-2xl"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-cover img-grade transition-all duration-700 group-hover:scale-110 group-hover:blur-[2px]"
                style={{ aspectRatio: i % 3 === 0 ? '3/4' : '4/3' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-5 text-left">
                <p className="text-[10px] uppercase tracking-[0.25em] text-rose-300/80">
                  {item.category}
                </p>
                <p className="font-display text-2xl text-cream">{item.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 backdrop-blur-xl"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-6 top-6 text-cream/70 hover:text-cream"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-10 text-cream/60 hover:text-cream"
              aria-label="Previous"
            >
              <ChevronLeft size={36} />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              src={gallery[active].image}
              alt={gallery[active].title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[80vh] max-w-[85vw] rounded-2xl object-contain img-grade"
            />
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-10 text-cream/60 hover:text-cream"
              aria-label="Next"
            >
              <ChevronRight size={36} />
            </button>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
              <p className="font-display text-2xl text-cream">{gallery[active].title}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-cream/50">
                {gallery[active].category} · {active + 1} / {gallery.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
