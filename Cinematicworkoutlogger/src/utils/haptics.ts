export type HapticType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'error'
  | 'warning'
  | 'selection';

const HAPTIC_PATTERNS: Record<HapticType, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 30,
  success: [30, 50, 20],
  error: [50, 100, 50],
  warning: [10, 50, 10],
  selection: 15,
};

export function triggerHaptic(type: HapticType | number | number[] = 'light'): void {
  if (
    typeof window !== 'undefined' &&
    'navigator' in window &&
    'vibrate' in navigator &&
    typeof navigator.vibrate === 'function'
  ) {
    try {
      const pattern = typeof type === 'string' ? HAPTIC_PATTERNS[type] : type;
      navigator.vibrate(pattern);
    } catch {
      // Ignore vibration failures on unsupported or permission-restricted environments
    }
  }
}
