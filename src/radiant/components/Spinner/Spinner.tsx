import React from 'react'
import './Spinner.css'

export type SpinnerColor = 'blue' | 'gray' | 'white'

export interface SpinnerProps {
  /** Diameter in px (Figma default 18). */
  size?: number
  color?: SpinnerColor
  className?: string
  'aria-label'?: string
}

/** Radiant — Contextual loader / Spinner (4813:10). A rotating 3/4 arc ring. */
export function Spinner({ size = 18, color = 'blue', className, ...rest }: SpinnerProps) {
  return (
    <span
      className={['rad-spinner', `rad-spinner--${color}`, className].filter(Boolean).join(' ')}
      style={{ width: size, height: size }}
      role="status"
      aria-label={rest['aria-label'] ?? 'Loading'}
    >
      <svg viewBox="0 0 18 18" width={size} height={size} fill="none" aria-hidden="true">
        <path
          d="M2.6527e-06 9C1.18765e-06 4.02944 4.02944 0 9 0C9.55228 1.03081e-06 10 0.447716 10 1C10 1.55228 9.55228 2 9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C12.866 16 16 12.866 16 9C16 8.44772 16.4477 8 17 8C17.5523 8 18 8.44772 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 4.11774e-06 13.9706 2.6527e-06 9Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}

export default Spinner
