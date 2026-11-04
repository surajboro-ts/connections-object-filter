import React from 'react'
import { Icon } from '../Icon/Icon'
import './TriggerChip.css'

export type TriggerChipKind = 'attribute' | 'measure' | 'filter' | 'crossfilter'

export interface TriggerChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  kind?: TriggerChipKind
  children?: React.ReactNode
  /** Pressed / open state (darkest fill). */
  active?: boolean
  disabled?: boolean
  /** Render the dashed loading skeleton instead of content. */
  loading?: boolean
  /** Show a delete badge (appears on hover); called when it's clicked. */
  onDelete?: () => void
  onClick?: () => void
}

/** Radiant — Trigger chip. Attribute / Measure / Filter pill with trailing chevron. */
export function TriggerChip({
  kind = 'attribute', children, active, disabled, loading, onDelete, onClick, className, ...rest
}: TriggerChipProps) {
  if (loading) {
    return <span className={['rad-trigger', 'rad-trigger--skeleton', className].filter(Boolean).join(' ')}>{children}</span>
  }
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={['rad-trigger', `rad-trigger--${kind}`, active && 'is-active', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="rad-trigger__label">{children}</span>
      <span className="rad-trigger__chev"><Icon name="chevron-right" size={16} /></span>
      {onDelete && (
        <span
          role="button"
          tabIndex={0}
          aria-label="Remove"
          className="rad-trigger__delete"
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); onDelete() } }}
        >
          <Icon name="cross" size={8} />
        </span>
      )}
    </button>
  )
}

export default TriggerChip
