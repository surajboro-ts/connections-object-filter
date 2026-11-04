import React from 'react'
import { Field } from '../Field/Field'
import './NumberInput.css'

export interface NumberInputProps {
  label?: React.ReactNode
  helper?: React.ReactNode
  error?: string
  disabled?: boolean
  value?: number
  min?: number
  max?: number
  step?: number
  /** Force the spin buttons always visible. By default they appear on hover/focus (Figma). */
  spinners?: boolean
  onValueChange?: (v: number) => void
  className?: string
}

const ChevUp = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)
const ChevDown = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)

/** Radiant — Number input, with optional spin buttons. */
export function NumberInput({
  label, helper, error, disabled, value, min, max, step = 1, spinners, onValueChange, className,
}: NumberInputProps) {
  const clamp = (n: number) => {
    if (min != null && n < min) return min
    if (max != null && n > max) return max
    return n
  }
  const bump = (dir: 1 | -1) => onValueChange?.(clamp((value ?? 0) + dir * step))

  return (
    <Field label={label} helper={helper} error={error} disabled={disabled} className={className} boxClassName={['rad-number__box', spinners && 'rad-number__box--spinners'].filter(Boolean).join(' ')}>
      <input
        type="text"
        inputMode="numeric"
        value={value ?? ''}
        disabled={disabled}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/[^\d.-]/g, ''))
          if (!Number.isNaN(n)) onValueChange?.(clamp(n))
        }}
      />
      {/* Spinners are always in the DOM; they fade in on hover/focus (Figma). */}
      <div className="rad-number__spin" aria-hidden="true">
        <button type="button" className="rad-number__spinbtn" tabIndex={-1} onClick={() => bump(1)}><ChevUp /></button>
        <button type="button" className="rad-number__spinbtn" tabIndex={-1} onClick={() => bump(-1)}><ChevDown /></button>
      </div>
    </Field>
  )
}

export default NumberInput
