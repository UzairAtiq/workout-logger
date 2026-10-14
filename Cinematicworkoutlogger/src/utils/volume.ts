import type { Exercise, WorkoutSession, WorkoutSet } from '../types/workout';

export function calculateSetVolume(set: Pick<WorkoutSet, 'weight' | 'reps'>): number {
  return set.weight * set.reps;
}

export function calculateExerciseVolume(exercise: Pick<Exercise, 'sets'>): number {
  return exercise.sets.reduce((total, s) => total + calculateSetVolume(s), 0);
}

export function calculateSessionVolume(session: Pick<WorkoutSession, 'exercises'>): number {
  return session.exercises.reduce((total, ex) => total + calculateExerciseVolume(ex), 0);
}
