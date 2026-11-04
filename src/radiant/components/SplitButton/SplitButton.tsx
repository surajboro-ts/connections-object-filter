import React, { useEffect, useRef, useState } from 'react'
import './SplitButton.css'

export type SplitButtonVariant = 'primary' | 'secondary'

export interface SplitMenuItem {
  label: string
  onSelect?: () => void
}

export interface SplitButtonProps {
  variant?: SplitButtonVariant
  /** Left-half label (omit when using `leadingIcon` for the icon variant). */
  children?: React.ReactNode
  /** Icon variant: an icon in the left half instead of a text label. */
  leadingIcon?: React.ReactNode
  /** Chevron / caret icon for the right half. */
  caretIcon?: React.ReactNode
  /** Items shown in the dropdown the right half opens. */
  menuItems?: SplitMenuItem[]
  /** Which way the dropdown opens. */
  menuPosition?: 'bottom' | 'top'
  onAction?: () => void
  disabled?: boolean
  className?: string
}

const DefaultCaret = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/**
 * Radiant — Split button. Left action half + right chevron half (2px gap),
 * each hoverable independently; the right half opens a menu (Elevation/Menu).
 */
export function SplitButton({
  variant = 'primary',
  children,
  leadingIcon,
  caretIcon,
  menuItems = [],
  menuPosition = 'bottom',
  onAction,
  disabled,
  className,
}: SplitButtonProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  const classes = [
    'rad-split',
    `rad-split--${variant}`,
    open && 'rad-split--open',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} ref={rootRef}>
      <button
        type="button"
        className="rad-split__left"
        onClick={onAction}
        disabled={disabled}
      >
        {leadingIcon ? (
          <span className="rad-split__icon" aria-hidden="true">{leadingIcon}</span>
        ) : (
          <span className="rad-split__label">{children}</span>
        )}
      </button>
      <button
        type="button"
        className="rad-split__right"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
      >
        <span className="rad-split__caret" aria-hidden="true">
          {caretIcon ?? <DefaultCaret />}
        </span>
      </button>

      {open && menuItems.length > 0 && (
        <div
          className={`rad-split__menu rad-split__menu--${menuPosition}`}
          role="menu"
        >
          {menuItems.map((item, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              className="rad-split__menuitem"
              onClick={() => {
                item.onSelect?.()
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SplitButton
