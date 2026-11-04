import React from 'react'
import './ProgressBar.css'

export interface ProgressBarProps {
  /** 0–100. */
  value: number
  className?: string
}

/** Radiant — Progress bar. 8px track (border-subtle), brand fill, radius-8. */
export function ProgressBar({ value, className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className={['rad-progress', className].filter(Boolean).join(' ')}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span className="rad-progress__fill" style={{ width: `${pct}%` }} />
    </div>
  )
}

export default ProgressBar
