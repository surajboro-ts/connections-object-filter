import React from 'react'
import './SegmentedControl.css'

export interface SegmentOption {
  value: string
  label?: React.ReactNode
  icon?: React.ReactNode
  'aria-label'?: string
}

export interface SegmentedControlProps {
  options: SegmentOption[]
  value: string
  onChange?: (value: string) => void
  className?: string
}

/** Radiant — Segmented control. Gray pill container; active segment = white pill + brand content. */
export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div className={['rad-segmented', className].filter(Boolean).join(' ')} role="tablist">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={o['aria-label']}
            className={`rad-segmented__item${active ? ' is-active' : ''}${o.icon && !o.label ? ' rad-segmented__item--icon' : ''}`}
            onClick={() => onChange?.(o.value)}
          >
            {o.icon && <span className="rad-segmented__icon" aria-hidden="true">{o.icon}</span>}
            {o.label && <span className="rad-segmented__label">{o.label}</span>}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedControl
