import React from 'react'
import { Field } from '../Field/Field'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: React.ReactNode
  helper?: React.ReactNode
  error?: string
  trailingIcon?: React.ReactNode
  wrapperClassName?: string
}

/** Radiant — Text input. Label + helper + 32px field, states from Field. */
export function Input({
  label, helper, error, trailingIcon, disabled, readOnly, wrapperClassName, ...rest
}: InputProps) {
  return (
    <Field label={label} helper={helper} error={error} disabled={disabled} readOnly={readOnly} className={wrapperClassName}>
      <input disabled={disabled} readOnly={readOnly} {...rest} />
      {trailingIcon && <span className="rad-field__icon" aria-hidden="true">{trailingIcon}</span>}
    </Field>
  )
}

export default Input
