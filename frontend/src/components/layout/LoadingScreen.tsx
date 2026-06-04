import { useEffect } from 'react';
import { motion } from 'framer-motion';
import personal from '@/data/personal';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  // Fix: Use a timeout to call onComplete after the loading animation finishes.
  // Relying on onAnimationComplete caused a deadlock because the exit animation
  // never started (parent waits for onComplete before unmounting).
  useEffect(() => {
    const timer = setTimeout(onComplete, 2300);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-dark flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-5xl text-white border-2 border-white px-6 py-3 mb-6 inline-block"
          style={{ boxShadow: '6px 6px 0 #fff' }}
        >
          {personal.firstName}<span className="text-primary">.</span>
        </motion.div>

        {/* Progress bar */}
        <div className="w-48 mx-auto h-1 bg-slate-700 overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-mono text-xs text-slate-500 mt-3"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}
