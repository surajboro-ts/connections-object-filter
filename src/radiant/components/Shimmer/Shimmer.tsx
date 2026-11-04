import React from 'react'
import './Shimmer.css'

export type ShimmerVariant = 'normal' | 'dark' | 'ai'

export interface ShimmerProps {
  /** CSS width (default 100%). */
  width?: number | string
  /** CSS height in px (Figma default 12). */
  height?: number | string
  /** Corner radius (Figma default: pill). */
  radius?: number | string
  variant?: ShimmerVariant
  className?: string
}

/** Radiant — Shimmer / skeleton (15797:13973). A placeholder bar with a sweeping highlight. */
export function Shimmer({ width = '100%', height = 12, radius = 20, variant = 'normal', className }: ShimmerProps) {
  return (
    <span
      className={['rad-shimmer', `rad-shimmer--${variant}`, className].filter(Boolean).join(' ')}
      style={{ width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  )
}

export default Shimmer
