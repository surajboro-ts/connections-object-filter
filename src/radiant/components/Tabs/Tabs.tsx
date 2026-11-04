import React from 'react'
import './Tabs.css'

export interface TabsProps {
  tabs: string[]
  value: string
  onChange: (t: string) => void
  className?: string
}

/** Radiant — underline Tabs (Figma "Tab" set 40:6140). 48px tall, 14px, active = brand + 2px underline. */
export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={['rad-tabs', className].filter(Boolean).join(' ')} role="tablist">
      {tabs.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={t === value}
          className={['rad-tab rd-body', t === value && 'is-active'].filter(Boolean).join(' ')}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  )
}

export default Tabs
