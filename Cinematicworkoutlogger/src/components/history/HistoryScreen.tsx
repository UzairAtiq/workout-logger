import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell } from 'lucide-react';
import { getSessions, deleteSession } from '../../services/storage';
import type { WorkoutSession } from '../../types/workout';
import { groupByDay } from '../../utils/historyGrouping';
import { DayCard } from './DayCard';

interface HistoryScreenProps {
  onClose: () => void;
  refreshKey?: number;
}

export function HistoryScreen({ onClose, refreshKey }: HistoryScreenProps) {
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getSessions();
    setSessions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const handleDeleteDay = async (sessionIds: string[]) => {
    for (const id of sessionIds) {
      await deleteSession(id);
    }
    setSessions((prev) => prev.filter((s) => !sessionIds.includes(s.id)));
  };

  const days = groupByDay(sessions);

  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex flex-col h-full text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-12 pb-4 border-b border-white/10">
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#00FFA3] hover:text-[#00FFA3]/80 transition-colors cursor-pointer"
          aria-label="Back to workout"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-xs tracking-[0.3em] uppercase text-[#00FFA3]/70">
          Workout History
        </h1>
        <div className="w-9" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {/* Loading spinner */}
        {loading && (
          <div className="flex items-center justify-center h-40">
            <motion.div
              className="w-6 h-6 border-2 border-[#00FFA3]/30 border-t-[#00FFA3] rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            />
          </div>
        )}

        {/* Empty state */}
        {!loading && days.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center h-64 gap-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Dumbbell className="w-14 h-14 text-white/15" />
            <p className="text-white/40 text-sm tracking-widest uppercase">
              No workouts yet
            </p>
            <p className="text-white/25 text-xs">Log your first set to see it here</p>
          </motion.div>
        )}

        {/* Day cards */}
        <AnimatePresence initial={false}>
          {days.map((day, di) => (
            <DayCard
              key={day.dayKey}
              day={day}
              index={di}
              onDelete={handleDeleteDay}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
