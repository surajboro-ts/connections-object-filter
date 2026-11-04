import React from 'react'
import './Checkbox.css'

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  indeterminate?: boolean
  label?: React.ReactNode
  error?: boolean
}

/** Radiant — Checkbox. 16px box, outlined (brand border + brand mark) when checked, radius-4. */
export function Checkbox({ indeterminate, label, error, className, id, ...rest }: CheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate
  }, [indeterminate])

  const box = (
    <span className={['rad-check', error && 'rad-check--error'].filter(Boolean).join(' ')}>
      <input ref={ref} id={id} type="checkbox" className="rad-check__input" {...rest} />
      <span className="rad-check__box" aria-hidden="true">
        {/* 14×14 checkmark-s / minus-s glyphs, centred in the 16px box (1px inset). */}
        <svg className="rad-check__mark" viewBox="0 0 14 14" fill="none">
          {indeterminate ? (
            <path d="M1.55566 7.77778V6.22223H12.4446V7.77778H1.55566Z" fill="currentColor" />
          ) : (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.3777 4.21103L5.99443 10.5943L1.94446 6.54436L3.0444 5.44442L5.99443 8.39445L11.2778 3.11108L12.3777 4.21103Z"
              fill="currentColor"
            />
          )}
        </svg>
      </span>
    </span>
  )

  if (label == null) return React.cloneElement(box, { className: ['rad-check', error && 'rad-check--error', className].filter(Boolean).join(' ') })
  return (
    <label className={['rad-check-field', className].filter(Boolean).join(' ')} htmlFor={id}>
      {box}
      <span className="rad-check-field__label rd-body">{label}</span>
    </label>
  )
}

export default Checkbox
