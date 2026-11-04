import React from 'react'
import './ListItem.css'

export interface ListItemProps {
  /** Primary label (content-primary Body/Normal). */
  label: React.ReactNode
  /** Optional secondary text shown inline after the label (content-secondary) —
   *  e.g. a column's data type. This is the "with data type" variant (Figma 501:79830). */
  secondary?: React.ReactNode
  /** Leading slot — typically a Checkbox / Radio. */
  leading?: React.ReactNode
  /** Trailing slot — pushed to the right (e.g. a lock, an info button). */
  trailing?: React.ReactNode
  disabled?: boolean
  className?: string
  /** Render as a <label> (so a leading checkbox toggles on row click) vs a <div>. */
  as?: 'label' | 'div'
  onClick?: (e: React.MouseEvent) => void
}

/**
 * Radiant — single-line List item (Figma "_Utils/ Single line List item" 501:79830):
 * 32px row, padding 6px 16px, gap 12px. leading · label [· secondary] … [trailing].
 * `secondary` is the data-type variant.
 */
export function ListItem({ label, secondary, leading, trailing, disabled, className, as = 'div', onClick }: ListItemProps) {
  const Comp: any = as
  return (
    <Comp
      className={['rad-listitem', disabled && 'is-disabled', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {leading}
      <span className="rad-listitem__text rd-body">{label}</span>
      {secondary != null && <span className="rad-listitem__secondary rd-body">{secondary}</span>}
      {trailing != null && <span className="rad-listitem__trailing">{trailing}</span>}
    </Comp>
  )
}

export default ListItem
