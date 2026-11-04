import React from 'react'
import './Chip.css'

export type ChipKind = 'attribute' | 'measure' | 'filter' | 'date' | 'input' | 'error'

export interface ChipProps {
  kind?: ChipKind
  leadingIcon?: React.ReactNode
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

/**
 * Radiant — Chip. Search / token chip. Fill + icon color come from the
 * --rd-sys-color-chip-<kind>-* tokens (attribute=blue, measure=green,
 * filter=gray, date=purple, input=neutral, error=red).
 */
export function Chip({ kind = 'attribute', leadingIcon, children, className, onClick }: ChipProps) {
  const Comp = onClick ? 'button' : 'span'
  return (
    <Comp
      className={['rad-chip', `rad-chip--${kind}`, className].filter(Boolean).join(' ')}
      onClick={onClick}
      {...(onClick ? { type: 'button' as const } : {})}
    >
      {leadingIcon && <span className="rad-chip__icon" aria-hidden="true">{leadingIcon}</span>}
      <span className="rad-chip__label">{children}</span>
    </Comp>
  )
}

export default Chip
