import { useRef, useState, useCallback } from 'react';
import type { WorkoutSession, WorkoutSet, Exercise } from '../types/workout';
import { saveSession } from '../services/storage';
import { generateId } from '../utils/id';

export function useWorkoutSession() {
  const [historyRefreshKey, setHistoryRefreshKey] = useState(0);

  const currentSessionRef = useRef<WorkoutSession>({
    id: generateId(),
    date: new Date().toISOString(),
    exercises: [],
  });

  const saveSetToSession = useCallback(
    async (exerciseName: string, weight: number, reps: number): Promise<WorkoutSet> => {
      const newSet: WorkoutSet = { id: generateId(), weight, reps };
      const session = currentSessionRef.current;
      const trimmedName = exerciseName.trim();
      const existing = session.exercises.find((e) => e.name === trimmedName);

      if (existing) {
        existing.sets.push(newSet);
      } else {
        const ex: Exercise = {
          id: generateId(),
          name: trimmedName,
          sets: [newSet],
        };
        session.exercises.push(ex);
      }

      try {
        await saveSession({ ...session });
        setHistoryRefreshKey((k) => k + 1);
      } catch (err) {
        console.error('Failed to save workout session:', err);
      }

      return newSet;
    },
    [],
  );

  const resetSession = useCallback(() => {
    currentSessionRef.current = {
      id: generateId(),
      date: new Date().toISOString(),
      exercises: [],
    };
  }, []);

  return {
    currentSessionRef,
    historyRefreshKey,
    saveSetToSession,
    resetSession,
  };
}
