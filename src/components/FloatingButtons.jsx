import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScroll';

export default function FloatingButtons() {
  const scrollY = useScrollPosition();
  const showTop = scrollY > 600;

  return (
    <>
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/919876543210?text=Hi%20LUXE%20GLOW,%20I'd%20like%20to%20book%20an%20appointment"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_30px_-5px_rgba(37,211,102,0.5)]"
      >
        <motion.span
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
        />
        <MessageCircle size={26} className="relative text-white" fill="white" stroke="#25D366" strokeWidth={1.5} />
      </motion.a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full glass-strong text-rose-300 shadow-glow"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
