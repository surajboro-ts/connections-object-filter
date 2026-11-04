import React from 'react'
import './TopNav.css'

export interface TopNavProps {
  /** Brand mark, rendered in a fixed-width zone at the far left. Pass your own
   *  logo node — the library ships no brand. */
  logo?: React.ReactNode
  /** Width (px) of the logo zone. Defaults to 65 so the logo centres over the
   *  first app tab of a 261px-wide SideNav (4 tabs ≈ 65px each). */
  logoZoneWidth?: number
  /** Center/leading-of-the-right-cluster control, e.g. `<NavSearch />`. */
  search?: React.ReactNode
  /** Trailing icon controls, e.g. help / notification `<IconButton />`s. */
  actions?: React.ReactNode
  /** Right-most account cluster, e.g. `<OrgSwitcher /><UserProfile />`. Rendered
   *  in a 2px-gap capsule. */
  account?: React.ReactNode
  className?: string
}

/**
 * Radiant — top navigation bar. A 56px app-shell header that lays out a logo
 * zone, a flexible spacer, and a right-aligned cluster (search → actions →
 * account). All content is supplied via slots, so it carries no product data.
 * Pairs with `SideNav`.
 */
export function TopNav({ logo, logoZoneWidth = 65, search, actions, account, className }: TopNavProps) {
  return (
    <header className={['rad-topnav', className].filter(Boolean).join(' ')}>
      {logo && (
        <div className="rad-topnav__logozone" style={{ width: logoZoneWidth }}>{logo}</div>
      )}
      <div className="rad-topnav__spacer" />
      {search}
      {actions}
      {account && <div className="rad-topnav__account">{account}</div>}
    </header>
  )
}

export default TopNav
