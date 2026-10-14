import type { Exercise } from '../../types/workout';
import { calculateExerciseVolume } from '../../utils/volume';

interface ExerciseCardProps {
  exercise: Exercise;
}

export function ExerciseCard({ exercise }: ExerciseCardProps) {
  const exVol = calculateExerciseVolume(exercise);

  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] px-4 pt-4 pb-3">
      {/* Exercise name — big heading */}
      <div className="text-white text-2xl font-bold tracking-tight mb-4">
        {exercise.name}
      </div>

      {/* Sets list */}
      <div className="space-y-2.5">
        {exercise.sets.map((set, si) => (
          <div key={set.id} className="flex items-baseline gap-3">
            {/* Set number */}
            <span className="text-white/30 text-sm w-8 shrink-0">Set {si + 1}</span>

            {/* Weight */}
            <span className="text-white text-lg font-semibold">
              {set.weight}
              <span className="text-white/40 text-sm font-normal ml-1">kg</span>
            </span>

            <span className="text-white/30 text-base">×</span>

            {/* Reps */}
            <span className="text-white text-lg font-semibold">
              {set.reps}
              <span className="text-white/40 text-sm font-normal ml-1">reps</span>
            </span>
          </div>
        ))}
      </div>

      {/* Total volume — small at bottom */}
      <div className="mt-4 pt-3 border-t border-white/8 text-xs text-white/35 tracking-wide">
        Total volume
        <span className="text-[#00FFA3]/60 font-semibold ml-1.5">
          {exVol.toLocaleString()} kg
        </span>
      </div>
    </div>
  );
}
