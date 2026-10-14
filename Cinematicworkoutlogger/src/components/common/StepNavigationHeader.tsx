import React from 'react';

export type StepName = 'Exercise' | 'Weight' | 'Reps' | 'Done';

interface StepNavigationHeaderProps {
  currentStep: StepName;
  steps?: StepName[];
  onBack?: () => void;
  onForward?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  className?: string;
}

export function StepNavigationHeader({
  currentStep,
  steps = ['Weight', 'Reps', 'Done'],
  onBack,
  onForward,
  canGoBack = true,
  canGoForward = false,
  className = '',
}: StepNavigationHeaderProps) {
  return (
    <div
      className={`absolute top-4 sm:top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-4 z-20 ${className}`}
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        disabled={!canGoBack || !onBack}
        className={`p-2 transition-all ${
          canGoBack && onBack
            ? 'text-[#00FFA3] hover:text-[#00FFA3]/80 cursor-pointer'
            : 'text-white/20 cursor-not-allowed'
        }`}
        aria-label="Previous step"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Steps Indicator */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-widest text-teal-400/60 uppercase select-none">
        {steps.map((step, idx) => (
          <React.Fragment key={step}>
            <span
              className={
                step.toLowerCase() === currentStep.toLowerCase()
                  ? 'text-[#00FFA3] font-semibold'
                  : ''
              }
            >
              {step}
            </span>
            {idx < steps.length - 1 && <span>·</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Forward Button */}
      <button
        type="button"
        onClick={onForward}
        disabled={!canGoForward || !onForward}
        className={`p-2 transition-all ${
          canGoForward && onForward
            ? 'text-[#00FFA3] hover:text-[#00FFA3]/80 cursor-pointer'
            : 'text-white/20 cursor-not-allowed'
        }`}
        aria-label="Next step"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 15L12.5 10L7.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
