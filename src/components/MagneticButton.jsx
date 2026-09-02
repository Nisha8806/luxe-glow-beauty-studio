import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.3, y: y * 0.3 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors duration-300 select-none';
  const variants = {
    primary:
      'bg-rose-gold text-ink px-7 py-3.5 shadow-glow hover:shadow-[0_0_50px_-8px_rgba(255,77,141,0.6)]',
    ghost:
      'glass text-cream px-7 py-3.5 hover:bg-white/10',
    outline:
      'border border-rose-300/40 text-cream px-7 py-3.5 hover:border-rose-300',
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
