import type { WorkoutSession, Exercise } from '../types/workout';
import { calculateExerciseVolume } from './volume';

export interface DayGroup {
  dayKey: string;
  dateLabel: string;
  timeLabel: string;
  sessionIds: string[];
  exercises: Exercise[];
  totalVolume: number;
}

export function groupByDay(sessions: WorkoutSession[]): DayGroup[] {
  const map = new Map<string, DayGroup>();

  for (const session of sessions) {
    const d = new Date(session.date);
    const dayKey = d.toISOString().slice(0, 10); // YYYY-MM-DD
    const dateLabel = d.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const timeLabel = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    if (!map.has(dayKey)) {
      map.set(dayKey, {
        dayKey,
        dateLabel,
        timeLabel,
        sessionIds: [],
        exercises: [],
        totalVolume: 0,
      });
    }

    const group = map.get(dayKey)!;
    group.sessionIds.push(session.id);

    for (const ex of session.exercises) {
      // Merge into same-named exercise if already present for this day
      const existing = group.exercises.find((e) => e.name === ex.name);
      if (existing) {
        existing.sets.push(...ex.sets);
      } else {
        group.exercises.push({ ...ex, sets: [...ex.sets] });
      }
      group.totalVolume += calculateExerciseVolume(ex);
    }
  }

  // Newest day first
  return Array.from(map.values()).sort((a, b) => b.dayKey.localeCompare(a.dayKey));
}
