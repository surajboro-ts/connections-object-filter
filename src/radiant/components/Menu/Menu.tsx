import React from 'react'
import { Checkbox } from '../Checkbox/Checkbox'
import './Menu.css'

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ------------------------------------------------------------------ Surface */
export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional search field rendered at the top with a divider under it. */
  search?: React.ReactNode
  /** Optional footer (e.g. a "Clear selection" action). */
  footer?: React.ReactNode
  /** Cap the list height and scroll (px). */
  maxHeight?: number
  /** Gap between list rows (px). Single-line menus use 0; two-line menus use 4. */
  gap?: number
  children?: React.ReactNode
}

/** Radiant — Menu surface: white, radius-6, Elevation/Menu, 8px vertical padding. */
export function Menu({ search, footer, maxHeight, gap, children, className, style, ...rest }: MenuProps) {
  const listStyle: React.CSSProperties = {}
  if (maxHeight != null) listStyle.maxHeight = maxHeight
  if (gap != null) listStyle.gap = gap
  return (
    <div className={['rad-menu', className].filter(Boolean).join(' ')} role="menu" style={style} {...rest}>
      {search != null && <div className="rad-menu__search">{search}</div>}
      <div
        className={['rad-menu__list', maxHeight != null && 'rad-menu__list--scroll'].filter(Boolean).join(' ')}
        style={Object.keys(listStyle).length ? listStyle : undefined}
      >
        {children}
      </div>
      {footer != null && <div className="rad-menu__footer">{footer}</div>}
    </div>
  )
}

/* -------------------------------------------------------------- Single-line */
export interface MenuItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
  label: React.ReactNode
  /** Leading icon (16px). */
  icon?: React.ReactNode
  /** Show a leading chevron-right before the label (drill-in / category rows). */
  leadingChevron?: boolean
  /** Show a trailing chevron-right (navigational). */
  trailingChevron?: boolean
  /** Trailing count, right-aligned. */
  trailingNumber?: React.ReactNode
  /** Render a leading checkbox instead of an icon (multi-select). */
  checkbox?: boolean
  checked?: boolean
  /** Activated / selected row (blue highlight + brand label). */
  activated?: boolean
  disabled?: boolean
}

/** Radiant — single-line menu list item. */
export function MenuItem({
  label, icon, leadingChevron, trailingChevron, trailingNumber, checkbox, checked, activated, disabled, className, ...rest
}: MenuItemProps) {
  // Figma: a checkbox row shows selection via the check itself — it does NOT get
  // the blue "activated" highlight (that's for single-select rows only).
  const showActivated = activated && !checkbox
  return (
    <button
      type="button"
      role={checkbox ? 'menuitemcheckbox' : 'menuitem'}
      disabled={disabled}
      aria-checked={checkbox ? !!checked : undefined}
      className={['rad-menu-item', showActivated && 'is-activated', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {checkbox ? (
        <span className="rad-menu-item__check"><Checkbox checked={checked} readOnly tabIndex={-1} aria-hidden="true" /></span>
      ) : leadingChevron ? (
        <span className="rad-menu-item__icon"><ChevronRight /></span>
      ) : icon != null ? (
        <span className="rad-menu-item__icon">{icon}</span>
      ) : null}
      <span className="rad-menu-item__label rd-body">{label}</span>
      {trailingNumber != null && <span className="rad-menu-item__num rd-body">{trailingNumber}</span>}
      {trailingChevron && <span className="rad-menu-item__chevron"><ChevronRight /></span>}
    </button>
  )
}

/* ---------------------------------------------------------------- Two-line */
export interface MenuItemTwoLineProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  title: React.ReactNode
  subtitle: React.ReactNode
  activated?: boolean
  disabled?: boolean
}

/** Radiant — two-line menu list item (name + secondary caption). */
export function MenuItemTwoLine({ title, subtitle, activated, disabled, className, ...rest }: MenuItemTwoLineProps) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={['rad-menu-item', 'rad-menu-item--two', activated && 'is-activated', className].filter(Boolean).join(' ')}
      {...rest}
    >
      <span className="rad-menu-item__title rd-body">{title}</span>
      <span className="rad-menu-item__sub rd-caption">{subtitle}</span>
    </button>
  )
}

/* ------------------------------------------------------------ Section title */
export function MenuSection({ children }: { children: React.ReactNode }) {
  return <div className="rad-menu-section rd-label-subhead">{children}</div>
}

/* ------------------------------------------------------------------ Divider */
export function MenuDivider() {
  return <hr className="rad-menu-divider" />
}

export default Menu
