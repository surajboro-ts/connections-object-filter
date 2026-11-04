import React from 'react'
import { Button, Link } from '../radiant/components'
import './WizardFrame.css'

export interface WizardFrameProps {
  /** Small grey overline above the title. */
  overline?: string
  title: string
  /** Optional badge rendered at the right of the header (e.g. an option label). */
  headerBadge?: React.ReactNode
  /** Number of filled progress segments (out of `segments`). */
  progress: number
  segments?: number
  primaryLabel: string
  onPrimary?: () => void
  primaryDisabled?: boolean
  onBack?: () => void
  backDisabled?: boolean
  onCancel?: () => void
  /** Extra class on the scrollable body (e.g. to remove padding for a split layout). */
  bodyClassName?: string
  children: React.ReactNode
}

/**
 * The full-screen Create-connection wizard shell: a header (overline + title)
 * above a scrollable body, with a segmented progress strip sitting on the top
 * edge of the footer (Cancel · Back · primary).
 */
export function WizardFrame({
  overline = 'Create connection',
  title,
  headerBadge,
  progress,
  segments = 4,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  onBack,
  backDisabled,
  onCancel,
  bodyClassName,
  children,
}: WizardFrameProps) {
  return (
    <div className="wz">
      <header className="wz__header">
        <div className="wz__header-main">
          <span className="wz__overline rd-caption">{overline}</span>
          <h1 className="wz__title rd-title-page">{title}</h1>
        </div>
        {headerBadge != null && <div className="wz__header-badge">{headerBadge}</div>}
      </header>

      <div className={['wz__body', bodyClassName].filter(Boolean).join(' ')}>{children}</div>

      <footer className="wz__footer">
        <div className="wz__progress" aria-hidden="true">
          {Array.from({ length: segments }).map((_, i) => (
            <span
              key={i}
              className={['wz__seg', i < progress && 'is-filled'].filter(Boolean).join(' ')}
            />
          ))}
        </div>
        <div className="wz__actions">
          <Link
            tone="blue"
            weight="medium"
            className="wz__cancel"
            onClick={(e) => {
              e.preventDefault()
              onCancel?.()
            }}
          >
            Cancel
          </Link>
          <div className="wz__actions-right">
            <Button variant="secondary" onClick={onBack} disabled={backDisabled}>
              Back
            </Button>
            <Button variant="primary" onClick={onPrimary} disabled={primaryDisabled}>
              {primaryLabel}
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WizardFrame
