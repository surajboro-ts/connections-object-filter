import React from 'react'
import './Radio.css'

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: React.ReactNode
  error?: boolean
}

/** Radiant — Radio button. Ring → filled brand dot; error = red. */
export function Radio({ label, error, className, disabled, id, ...rest }: RadioProps) {
  const control = (
    <span className={['rad-radio', error && 'rad-radio--error'].filter(Boolean).join(' ')}>
      <input type="radio" className="rad-radio__input" disabled={disabled} id={id} {...rest} />
      <span className="rad-radio__ring" aria-hidden="true">
        <span className="rad-radio__dot" />
      </span>
    </span>
  )
  if (label == null) return control
  return (
    <label className={['rad-radio-field', className].filter(Boolean).join(' ')} htmlFor={id}>
      {control}
      <span className="rad-radio-field__label rd-body">{label}</span>
    </label>
  )
}

export default Radio
