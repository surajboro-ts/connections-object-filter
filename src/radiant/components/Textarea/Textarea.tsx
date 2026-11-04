import React from 'react'
import { Field } from '../Field/Field'
import './Textarea.css'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode
  helper?: React.ReactNode
  error?: string
  wrapperClassName?: string
}

/** Radiant — Text area. Multi-line variant of the field. */
export function Textarea({
  label, helper, error, disabled, readOnly, rows = 4, wrapperClassName, ...rest
}: TextareaProps) {
  return (
    <Field label={label} helper={helper} error={error} disabled={disabled} readOnly={readOnly} className={wrapperClassName} boxClassName="rad-field__box--area">
      <textarea rows={rows} disabled={disabled} readOnly={readOnly} {...rest} />
    </Field>
  )
}

export default Textarea
