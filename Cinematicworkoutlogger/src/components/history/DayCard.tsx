import { motion } from 'motion/react';
import { Trash2 } from 'lucide-react';
import type { DayGroup } from '../../utils/historyGrouping';
import { ExerciseCard } from './ExerciseCard';

interface DayCardProps {
  day: DayGroup;
  index: number;
  onDelete: (sessionIds: string[]) => void;
}

export function DayCard({ day, index, onDelete }: DayCardProps) {
  return (
    <motion.div
      key={day.dayKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl border border-[#00FFA3]/20 bg-[#0A1525] overflow-hidden"
    >
      {/* Day heading */}
      <div className="flex items-start justify-between px-5 pt-5 pb-3">
        <div>
          <div className="text-white text-xl font-bold tracking-tight leading-snug">
            {day.dateLabel}
          </div>
          <div className="text-[#00FFA3]/60 text-sm mt-0.5">{day.timeLabel}</div>
        </div>
        <button
          type="button"
          onClick={() => onDelete(day.sessionIds)}
          className="mt-1 p-1.5 text-white/20 hover:text-red-400 transition-colors rounded-lg cursor-pointer"
          aria-label="Delete day"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#00FFA3]/20 via-[#00FFA3]/10 to-transparent mx-5" />

      {/* Exercise cards */}
      <div className="px-4 py-4 space-y-4">
        {day.exercises.map((ex) => (
          <ExerciseCard key={ex.id} exercise={ex} />
        ))}
      </div>

      {/* Day total */}
      <div className="px-5 pb-4 text-xs text-white/25 tracking-wide">
        Day total
        <span className="text-[#00FFA3]/50 font-semibold ml-1.5">
          {day.totalVolume.toLocaleString()} kg
        </span>
      </div>
    </motion.div>
  );
}
