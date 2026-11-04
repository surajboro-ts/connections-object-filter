import React from 'react'
import { IconButton } from '../IconButton/IconButton'
import './Banner.css'

export type BannerStatus = 'warning' | 'info' | 'success' | 'failure' | 'muted'

export interface BannerProps {
  status?: BannerStatus
  children: React.ReactNode
  onDismiss?: () => void
  className?: string
}

/** Filled status glyph — dark disc + white mark (Figma banner status icon). */
const StatusIcon = ({ status }: { status: BannerStatus }) => {
  if (status === 'success') {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="8" fill="currentColor" />
        <path d="M4.8 8.2l2 2 4.2-4.4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  // warning / failure / info: exclamation
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path d="M8 4v4.6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.4" r="0.95" fill="#fff" />
    </svg>
  )
}

/**
 * Radiant — Banner / inline alert (Figma "Banner" set 14995:14835).
 * Status tints the background; the status glyph is a dark filled disc.
 */
export function Banner({ status = 'info', children, onDismiss, className }: BannerProps) {
  const showIcon = status !== 'muted'
  return (
    <div className={['rad-banner', `rad-banner--${status}`, className].filter(Boolean).join(' ')} role={status === 'failure' || status === 'warning' ? 'alert' : undefined}>
      {showIcon && <span className="rad-banner__icon" aria-hidden="true"><StatusIcon status={status} /></span>}
      <span className="rad-banner__body rd-body">{children}</span>
      {onDismiss && (
        <IconButton variant="ghost" size="small" aria-label="Dismiss" onClick={onDismiss} icon={<CloseGlyph />} />
      )}
    </div>
  )
}

const CloseGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export default Banner
