import { motion } from 'motion/react';

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00FFA3]/30 rounded-full"
          initial={{
            x: '50%',
            y: '50%',
            scale: 0,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </div>
  );
}
