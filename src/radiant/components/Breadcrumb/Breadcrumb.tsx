import React from 'react'
import { Icon } from '../Icon/Icon'
import './Breadcrumb.css'

export interface BreadcrumbProps {
  /** The parent page title shown after the back arrow. */
  label: string
  onClick?: () => void
  className?: string
}

/** Radiant — Breadcrumb (back to parent). A left-arrow chip + the parent title. */
export function Breadcrumb({ label, onClick, className }: BreadcrumbProps) {
  return (
    <button type="button" className={['rad-breadcrumb', className].filter(Boolean).join(' ')} onClick={onClick}>
      <span className="rad-breadcrumb__back" aria-hidden="true"><Icon name="arrow-left" size={14} /></span>
      <span className="rad-breadcrumb__label rd-body">{label}</span>
    </button>
  )
}

export default Breadcrumb
