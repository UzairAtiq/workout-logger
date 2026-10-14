import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClockIcon } from 'lucide-react';
import { toast } from 'sonner';
import { DotGridBackground } from './components/common/DotGridBackground';
import { InputCanvas } from './components/input/InputCanvas';
import { ConfirmScreen } from './components/confirm/ConfirmScreen';
import { ExerciseNameInput } from './components/input/ExerciseNameInput';
import { HistoryScreen } from './components/history/HistoryScreen';
import { Toaster } from './components/ui/sonner';
import { useWorkoutSession } from './hooks/useWorkoutSession';
import { triggerHaptic } from './utils/haptics';
import { calculateSetVolume } from './utils/volume';
import type { InputMode } from './types/workout';

export default function App() {
  const [mode, setMode] = useState<InputMode>('exercise');
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const {
    historyRefreshKey,
    saveSetToSession,
    resetSession,
  } = useWorkoutSession();

  const handleExerciseComplete = () => {
    triggerHaptic('warning');
    setTimeout(() => setMode('weight'), 200);
  };

  const handleWeightComplete = () => {
    triggerHaptic('warning');
    setTimeout(() => setMode('reps'), 200);
  };

  const handleRepsComplete = () => {
    triggerHaptic('warning');
    setTimeout(() => setMode('confirm'), 200);
  };

  const handleConfirm = async () => {
    triggerHaptic('success');
    await saveSetToSession(exerciseName, weight, reps);

    const setVolume = calculateSetVolume({ weight, reps });
    toast.success('Set logged!', {
      description: `${exerciseName} · ${weight}kg × ${reps} reps = ${setVolume}kg`,
      duration: 3000,
    });

    // Keep same exercise, reset weight/reps for next set
    setTimeout(() => {
      setMode('weight');
      setWeight(0);
      setReps(0);
    }, 1500);
  };

  const handleConcludeExercise = async () => {
    triggerHaptic('success');
    await saveSetToSession(exerciseName, weight, reps);

    toast.success('Exercise concluded!', {
      description: `${exerciseName} · ${weight}kg × ${reps} reps logged`,
      duration: 2500,
    });

    // Move to next exercise — reset name, weight, reps
    setTimeout(() => {
      setExerciseName('');
      setWeight(0);
      setReps(0);
      setMode('exercise');
    }, 700);
  };

  const handleRedo = () => {
    triggerHaptic('selection');
    setMode('weight');
  };

  const handleSwipeLeft = () => {
    triggerHaptic([5, 30, 5]);
    if (mode === 'weight') setWeight(0);
    else if (mode === 'reps') setReps(0);
  };

  const isLogging = mode !== 'history';

  const handleNewSession = () => {
    resetSession();
    setExerciseName('');
    setWeight(0);
    setReps(0);
    setMode('exercise');
  };

  return (
    <div className="relative w-full h-screen bg-[#050A14] overflow-hidden">
      {/* Dot Grid Background */}
      <DotGridBackground />

      {/* History toggle — only show during logging modes */}
      <AnimatePresence>
        {isLogging && (
          <motion.button
            key="history-btn"
            type="button"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={() => setMode('history')}
            className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-[#00FFA3] hover:border-[#00FFA3]/40 transition-all text-xs tracking-widest uppercase cursor-pointer"
          >
            <ClockIcon className="w-3 h-3" />
            History
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          {/* ── History view ── */}
          {mode === 'history' && (
            <HistoryScreen
              key="history"
              refreshKey={historyRefreshKey}
              onClose={handleNewSession}
            />
          )}

          {/* ── Exercise name ── */}
          {mode === 'exercise' && (
            <ExerciseNameInput
              key="exercise"
              value={exerciseName}
              onChange={setExerciseName}
              onComplete={handleExerciseComplete}
              onBack={() => setMode('history')}
            />
          )}

          {/* ── Weight ── */}
          {mode === 'weight' && (
            <motion.div
              key="weight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <InputCanvas
                value={weight}
                onChange={setWeight}
                label="weight"
                unit="kg"
                max={999}
                onSwipeLeft={handleSwipeLeft}
                onComplete={handleWeightComplete}
                onBack={() => setMode('exercise')}
                canGoBack={true}
                canGoForward={true}
              />
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  type="button"
                  onClick={handleWeightComplete}
                  className="px-8 py-3 bg-[#00FFA3]/20 border border-[#00FFA3]/50 text-[#00FFA3] rounded-lg uppercase tracking-widest text-sm font-semibold hover:bg-[#00FFA3]/30 transition-all cursor-pointer"
                >
                  Continue to Reps →
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── Reps ── */}
          {mode === 'reps' && (
            <motion.div
              key="reps"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <InputCanvas
                value={reps}
                onChange={setReps}
                label="reps"
                unit="reps"
                max={99}
                onSwipeLeft={handleSwipeLeft}
                onComplete={handleRepsComplete}
                onBack={() => setMode('weight')}
                canGoBack={true}
                canGoForward={true}
              />
              <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  type="button"
                  onClick={handleRepsComplete}
                  className="px-8 py-3 bg-[#00FFA3]/20 border border-[#00FFA3]/50 text-[#00FFA3] rounded-lg uppercase tracking-widest text-sm font-semibold hover:bg-[#00FFA3]/30 transition-all cursor-pointer"
                >
                  Continue to Summary →
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* ── Confirm ── */}
          {mode === 'confirm' && (
            <ConfirmScreen
              key="confirm"
              weight={weight}
              reps={reps}
              onConfirm={handleConfirm}
              onConcludeExercise={handleConcludeExercise}
              onRedo={handleRedo}
              onBack={() => setMode('reps')}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Toast Notifications */}
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: '#0A1525',
            border: '1px solid rgba(0,255,163,0.3)',
            color: '#00FFA3',
          },
        }}
      />
    </div>
  );
}
