import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { artists } from '@/data/content';
import SectionHeading from './SectionHeading';

export default function Artists() {
  return (
    <section id="artists" className="relative section-pad py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,142,114,0.04),transparent_60%)]" />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Meet Our Artists"
          title={<>The hands behind <span className="italic text-gradient-rose">the glow</span></>}
          subtitle="Award-winning, internationally trained, and obsessed with the details. Your artist is hand-matched to your vision."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist, i) => (
            <motion.article
              key={artist.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl glass"
            >
              <div className="relative overflow-hidden">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="aspect-[3/4] w-full object-cover img-grade transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-rose-300/80">
                    {artist.role}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-cream">
                    {artist.name}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-relaxed text-cream/60">{artist.bio}</p>
                <a
                  href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs text-cream/50 transition-colors hover:text-rose-300"
                >
                  <Instagram size={14} />
                  {artist.instagram}
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
