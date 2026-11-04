import React from 'react'
import './Divider.css'

export interface DividerProps {
  /** Vertical margin around the rule (px). Default 0 — parent controls spacing. */
  spacing?: number
  className?: string
}

/** Radiant — horizontal Divider (Figma "Utils/Divider"): 1px subtle rule. */
export function Divider({ spacing = 0, className }: DividerProps) {
  return <hr className={['rad-divider', className].filter(Boolean).join(' ')} style={spacing ? { margin: `${spacing}px 0` } : undefined} />
}

export default Divider
