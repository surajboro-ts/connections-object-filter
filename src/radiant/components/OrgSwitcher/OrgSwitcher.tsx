import React from 'react'
import { Icon } from '../Icon/Icon'
import './OrgSwitcher.css'

export interface OrgSwitcherProps {
  /** Organisation name shown in the pill. */
  org: string
  onClick?: () => void
  className?: string
}

/**
 * Radiant — Org switcher (Figma 18244:18931). An independent secondary-filled
 * button: org name (14/600) + chevron-down. Sits beside — but works
 * independently from — the UserProfile avatar.
 */
export function OrgSwitcher({ org, onClick, className }: OrgSwitcherProps) {
  return (
    <button
      type="button"
      className={['rad-orgswitcher', className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={`Switch organisation — ${org}`}
    >
      <span className="rad-orgswitcher__label">{org}</span>
      <Icon name="chevron-down" size={12} className="rad-orgswitcher__chev" />
    </button>
  )
}

export default OrgSwitcher
