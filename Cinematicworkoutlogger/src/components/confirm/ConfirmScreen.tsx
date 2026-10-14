import { motion } from 'motion/react';
import { Check, RotateCcw, ArrowRight } from 'lucide-react';
import { calculateSetVolume } from '../../utils/volume';
import { StepNavigationHeader } from '../common/StepNavigationHeader';
import { ParticleBackground } from './ParticleBackground';

interface ConfirmScreenProps {
  weight: number;
  reps: number;
  onConfirm: () => void;
  onConcludeExercise: () => void;
  onRedo: () => void;
  onBack?: () => void;
}

export function ConfirmScreen({
  weight,
  reps,
  onConfirm,
  onConcludeExercise,
  onRedo,
  onBack,
}: ConfirmScreenProps) {
  const totalVolume = calculateSetVolume({ weight, reps });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center h-full px-8"
    >
      {/* Navigation Header */}
      <StepNavigationHeader
        currentStep="Done"
        steps={['Weight', 'Reps', 'Done']}
        onBack={onBack}
        canGoBack={Boolean(onBack)}
        canGoForward={false}
      />

      {/* Animated Background Particles */}
      <ParticleBackground />

      {/* Summary Card */}
      <motion.div
        className="relative z-10 text-center mb-16"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {/* Main Summary */}
        <motion.div
          className="text-7xl font-bold text-white mb-4 tracking-tight"
          animate={{
            textShadow: [
              '0 0 20px rgba(0,255,163,0.3)',
              '0 0 40px rgba(0,255,163,0.5)',
              '0 0 20px rgba(0,255,163,0.3)',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {weight}
          <span className="text-4xl text-white/60 ml-2">kg</span>
          <span className="text-5xl text-[#00FFA3] mx-4">×</span>
          {reps}
          <span className="text-4xl text-white/60 ml-2">reps</span>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FFA3]/50 to-transparent my-8" />

        {/* Total Volume */}
        <div className="space-y-2">
          <div className="text-xs tracking-[0.3em] text-[#00FFA3]/60 uppercase">
            Total Volume
          </div>
          <motion.div
            className="text-6xl font-bold text-[#00FFA3]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.4,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            {totalVolume}
            <span className="text-2xl ml-2 text-[#00FFA3]/60">kg</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="w-full max-w-md space-y-3 relative z-10">
        {/* Log Set — next set of same exercise */}
        <motion.button
          type="button"
          onClick={onConfirm}
          className="w-full bg-[#00FFA3] text-[#050A14] font-bold text-lg py-5 rounded-xl uppercase tracking-widest relative overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 bg-white/20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          <span className="relative z-10 flex items-center justify-center gap-3">
            <Check className="w-5 h-5" />
            Log Set
          </span>
        </motion.button>

        {/* Conclude Exercise — save set + move to next exercise */}
        <motion.button
          type="button"
          onClick={onConcludeExercise}
          className="w-full border-2 border-[#00FFA3]/50 text-[#00FFA3] font-semibold text-base py-4 rounded-xl uppercase tracking-widest hover:bg-[#00FFA3]/10 transition-colors cursor-pointer"
          whileHover={{ scale: 1.02, borderColor: 'rgba(0,255,163,0.8)' }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.58 }}
        >
          <span className="flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            Conclude Exercise
            <ArrowRight className="w-4 h-4" />
          </span>
        </motion.button>

        {/* Redo */}
        <motion.button
          type="button"
          onClick={onRedo}
          className="w-full text-white/30 font-medium text-sm py-3 rounded-xl uppercase tracking-widest hover:text-white/60 transition-colors cursor-pointer"
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.66 }}
        >
          <span className="flex items-center justify-center gap-2">
            <RotateCcw className="w-3.5 h-3.5" />
            Redo
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
