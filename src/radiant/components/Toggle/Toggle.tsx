import React from 'react'
import './Toggle.css'

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode
  /** Label side. */
  labelPosition?: 'start' | 'end'
}

/** Radiant — Toggle switch. Track/thumb from the toggle-* tokens. */
export function Toggle({ label, labelPosition = 'end', className, disabled, id, ...rest }: ToggleProps) {
  const control = (
    <span className="rad-toggle">
      <input type="checkbox" className="rad-toggle__input" disabled={disabled} id={id} {...rest} />
      <span className="rad-toggle__track" aria-hidden="true" />
      <span className="rad-toggle__thumb" aria-hidden="true" />
    </span>
  )
  if (label == null) return React.cloneElement(control, { className: ['rad-toggle', disabled && 'is-disabled', className].filter(Boolean).join(' ') })
  return (
    <label className={['rad-toggle-field', `rad-toggle-field--${labelPosition}`, disabled && 'is-disabled', className].filter(Boolean).join(' ')} htmlFor={id}>
      {labelPosition === 'start' && <span className="rad-toggle-field__label rd-body">{label}</span>}
      {control}
      {labelPosition === 'end' && <span className="rad-toggle-field__label rd-body">{label}</span>}
    </label>
  )
}

export default Toggle
