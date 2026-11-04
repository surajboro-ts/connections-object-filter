import React from 'react'
import { Icon } from '../Icon/Icon'
import './Toast.css'

export interface ToastProps {
  children: React.ReactNode
  /** Leading status icon (18px). Defaults to none. */
  icon?: React.ReactNode
  /** Inline underlined link on the right of the text. */
  link?: { label: React.ReactNode; onClick?: () => void }
  /** White pill action button. */
  action?: { label: React.ReactNode; onClick?: () => void }
  onDismiss?: () => void
}

/**
 * Radiant — Toast (15938:16564). Dark inverse bar: icon + message (+ optional
 * link / action) and a dismiss button. Menu elevation, radius 6.
 */
export function Toast({ children, icon, link, action, onDismiss }: ToastProps) {
  return (
    <div className="rad-toast" role="status">
      <div className="rad-toast__main">
        <div className="rad-toast__msg">
          {icon && <span className="rad-toast__icon" aria-hidden="true">{icon}</span>}
          <span className="rad-toast__text">
            <span className="rad-toast__label rd-body">{children}</span>
            {link && (
              <button type="button" className="rad-toast__link rd-body" onClick={link.onClick}>{link.label}</button>
            )}
          </span>
        </div>
        {action && (
          <button type="button" className="rad-toast__action rd-caption" onClick={action.onClick}>{action.label}</button>
        )}
      </div>
      {onDismiss && (
        <button type="button" className="rad-toast__dismiss" aria-label="Dismiss" onClick={onDismiss}>
          <Icon name="cross" size={16} />
        </button>
      )}
    </div>
  )
}

export default Toast
