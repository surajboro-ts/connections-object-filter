import React from 'react'
import { Field } from '../Field/Field'
import './SearchBar.css'

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  value?: string
  onValueChange?: (v: string) => void
  /** Boxed (bordered) or underline (bottom-border only). */
  variant?: 'boxed' | 'underline'
  disabled?: boolean
  wrapperClassName?: string
}

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/** Radiant — Search bar. Leading search icon + clear ×; boxed or underline. */
export function SearchBar({
  value, onValueChange, variant = 'boxed', placeholder = 'Search', disabled, wrapperClassName, ...rest
}: SearchBarProps) {
  return (
    <Field
      disabled={disabled}
      className={['rad-searchbar', wrapperClassName].filter(Boolean).join(' ')}
      boxClassName={variant === 'underline' ? 'rad-field__box--underline' : undefined}
    >
      <span className="rad-field__icon" aria-hidden="true"><SearchIcon /></span>
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onValueChange?.(e.target.value)}
        {...rest}
      />
      {/* Clear button always occupies its slot so the field width never shifts
          when text appears; only its visibility toggles. */}
      <button
        type="button"
        className={['rad-searchbar__clear', !value && 'is-hidden'].filter(Boolean).join(' ')}
        aria-label="Clear"
        aria-hidden={!value}
        tabIndex={value ? 0 : -1}
        onClick={() => onValueChange?.('')}
      >
        <XIcon />
      </button>
    </Field>
  )
}

export default SearchBar
