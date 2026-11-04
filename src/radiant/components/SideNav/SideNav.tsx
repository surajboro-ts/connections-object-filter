import React from 'react'
import { Icon } from '../Icon/Icon'
import { Tooltip } from '../Tooltip/Tooltip'
import './SideNav.css'

/** ↗ external-link glyph (no equivalent in the icon set). */
const ExternalLink = () => (
  <svg className="rad-sidenav__ext" viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
    <path d="M6.5 3.5H4A1.5 1.5 0 0 0 2.5 5v7A1.5 1.5 0 0 0 4 13.5h7A1.5 1.5 0 0 0 12.5 12V9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M9.5 2.5h4v4M13.5 2.5 7.5 8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** A tab in the app-switcher rail (top of the nav). `icon` is a Radiant icon name. */
export interface SideNavApp {
  icon: string
  label: string
  active?: boolean
  onClick?: () => void
}

/** A list entry: either a section header (`{ section }`) or a navigable item. */
export type SideNavItem =
  | { section: string }
  | {
      label: string
      active?: boolean
      external?: boolean
      /** Leading glyph before the label (e.g. a liveboard favicon). */
      favicon?: React.ReactNode
      onClick?: () => void
    }

export interface SideNavProps {
  /** App-switcher rail across the top. Omit to hide the rail. */
  apps?: SideNavApp[]
  /** Section title shown under the rail (with the optional add button). */
  title?: React.ReactNode
  /** When provided, renders a circled-plus add button beside the title. */
  onAdd?: () => void
  /** Accessible label for the add button. */
  addLabel?: string
  /** The scrolling item list (items + section headers, in order). */
  items: SideNavItem[]
  /** Rail width (px). Default 261. */
  width?: number
  className?: string
  'aria-label'?: string
}

/**
 * Radiant — side navigation rail. An app-switcher strip, a title row, and a
 * scrolling list of items grouped by section. Content is entirely prop-driven.
 * Pairs with `TopNav`.
 */
export function SideNav({
  apps,
  title,
  onAdd,
  addLabel = 'Add',
  items,
  width = 261,
  className,
  'aria-label': ariaLabel = 'Primary',
}: SideNavProps) {
  return (
    <nav className={['rad-sidenav', className].filter(Boolean).join(' ')} aria-label={ariaLabel} style={{ width }}>
      {apps && apps.length > 0 && (
        <div className="rad-sidenav__apps">
          {apps.map((a) => (
            <Tooltip key={a.label} label={a.label} placement="top">
              <button
                type="button"
                className={`rad-sidenav__app${a.active ? ' is-active' : ''}`}
                aria-label={a.label}
                aria-current={a.active ? 'page' : undefined}
                onClick={a.onClick}
              >
                <Icon name={a.icon} size={18} />
              </button>
            </Tooltip>
          ))}
        </div>
      )}

      {title && (
        <div className="rad-sidenav__titlerow">
          <span className="rad-sidenav__title rd-label-section">{title}</span>
          {onAdd && (
            <button type="button" className="rad-sidenav__add" aria-label={addLabel} onClick={onAdd}>
              <Icon name="add-circle" size={18} />
            </button>
          )}
        </div>
      )}

      <div className="rad-sidenav__list">
        {items.map((item, i) =>
          'section' in item ? (
            <div key={`s${i}`} className="rad-sidenav__section">{item.section}</div>
          ) : (
            // A real button when it does something, so Enter and Space work and
            // it is focusable, without hand-rolling key handling. A plain div
            // when there is nothing to activate.
            React.createElement(
              item.onClick ? 'button' : 'div',
              {
                key: `i${i}`,
                className: `rad-navitem${item.active ? ' is-active' : ''}`,
                ...(item.onClick
                  ? { type: 'button', onClick: item.onClick, 'aria-current': item.active ? 'page' : undefined }
                  : {}),
              },
              item.favicon && <span key="f" className="rad-navitem__fav">{item.favicon}</span>,
              <span key="l" className="rad-navitem__label rd-body">{item.label}</span>,
              item.external && <ExternalLink key="e" />,
            )
          ),
        )}
      </div>
    </nav>
  )
}

export default SideNav
