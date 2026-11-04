import React from 'react'
import './Tag.css'

export interface TagProps {
  children: React.ReactNode
  className?: string
}

/** Radiant — Tag. Outlined label used in object tables (blue-60 border, 14px). */
export function Tag({ children, className }: TagProps) {
  return <span className={['rad-tag', className].filter(Boolean).join(' ')}>{children}</span>
}

export default Tag
