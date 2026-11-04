import React from 'react'
import './Field.css'

export interface FieldProps {
  label?: React.ReactNode
  /** Helper text shown after the label as "(…)". */
  helper?: React.ReactNode
  /** When set, the label row turns red and shows the error message + icon. */
  error?: string
  disabled?: boolean
  readOnly?: boolean
  /** Force the focused (brand) border — e.g. an open Select. */
  active?: boolean
  /** Extra classes on the field box (e.g. search underline variant). */
  boxClassName?: string
  className?: string
  children?: React.ReactNode
}

const ErrorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <circle cx="6" cy="6" r="6" fill="currentColor" />
    <path d="M6 3v3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" />
    <circle cx="6" cy="8.6" r="0.8" fill="#fff" />
  </svg>
)

/**
 * Radiant — Field. Shared label + helper + box scaffold for all form inputs
 * (Text input 361:14470). Label 12px caption; box 32px, radius 6, 1px border.
 */
export function Field({
  label, helper, error, disabled, readOnly, active, boxClassName, className, children,
}: FieldProps) {
  const classes = [
    'rad-field',
    error && 'rad-field--error',
    disabled && 'rad-field--disabled',
    readOnly && 'rad-field--readonly',
    active && 'rad-field--active',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      {(label || helper || error) && (
        <div className="rad-field__label-row">
          {error && <span className="rad-field__erricon" aria-hidden="true"><ErrorIcon /></span>}
          {(label || error) && <span className="rad-field__label">{error ?? label}</span>}
          {helper && <span className="rad-field__helper">({helper})</span>}
        </div>
      )}
      <div className={['rad-field__box', boxClassName].filter(Boolean).join(' ')}>{children}</div>
    </div>
  )
}

export default Field
