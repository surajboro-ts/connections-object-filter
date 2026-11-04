import React, { useEffect, useRef, useState } from 'react'
import '../Field/Field.css'
import './Select.css'

export interface SelectOption { value: string; label: string }

export interface SelectProps {
  label?: React.ReactNode
  helper?: React.ReactNode
  error?: string
  disabled?: boolean
  options: SelectOption[]
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
}

const Chevron = ({ up }: { up?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ transform: up ? 'rotate(180deg)' : undefined, transition: 'transform 120ms ease' }}>
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const ErrorIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="6" fill="currentColor" /><path d="M6 3v3.5" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" /><circle cx="6" cy="8.6" r="0.8" fill="#fff" /></svg>
)

/** Radiant — Select dropdown. Trigger + chevron + popover menu. */
export function Select({
  label, helper, error, disabled, options, value, placeholder = 'Select', onChange, className,
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const classes = [
    'rad-field', 'rad-select',
    error && 'rad-field--error',
    disabled && 'rad-field--disabled',
    open && 'rad-field--active',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} ref={ref}>
      {(label || helper || error) && (
        <div className="rad-field__label-row">
          {error && <span className="rad-field__erricon" aria-hidden="true"><ErrorIcon /></span>}
          {(label || error) && <span className="rad-field__label">{error ?? label}</span>}
          {helper && <span className="rad-field__helper">({helper})</span>}
        </div>
      )}
      <div className="rad-select__anchor">
        <button
          type="button"
          className="rad-field__box rad-select__trigger"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`rad-select__value${selected ? '' : ' is-placeholder'}`}>
            {selected?.label ?? placeholder}
          </span>
          <span className="rad-field__icon rad-select__chev"><Chevron up={open} /></span>
        </button>
        {open && (
          <div className="rad-select__menu" role="listbox">
            {options.length === 0 ? (
              <div className="rad-select__empty">No results found</div>
            ) : (
              options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  role="option"
                  aria-selected={o.value === value}
                  className={`rad-select__option${o.value === value ? ' is-selected' : ''}`}
                  onClick={() => { onChange?.(o.value); setOpen(false) }}
                >
                  {o.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Select
