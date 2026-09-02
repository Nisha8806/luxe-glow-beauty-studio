import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
}) {
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col ${alignment} gap-4 mb-14 md:mb-20`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-rose-300/80"
        >
          <span className="h-px w-8 bg-rose-300/50" />
          {eyebrow}
          <span className="h-px w-8 bg-rose-300/50" />
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className={`font-display text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] ${
          light ? 'text-ink' : 'text-cream'
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`max-w-2xl text-base md:text-lg leading-relaxed ${
            light ? 'text-ink/70' : 'text-cream/60'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
