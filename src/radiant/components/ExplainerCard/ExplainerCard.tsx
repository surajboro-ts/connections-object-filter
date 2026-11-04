import React from 'react'
import { IconButton } from '../IconButton/IconButton'
import { Icon } from '../Icon/Icon'
import './ExplainerCard.css'

export interface ExplainerCardProps {
  /** Section-label heading. Omit for the compact form: body and dismiss share one row. */
  title?: React.ReactNode
  /** Body slot. Copy is the intended content; the spec caps it at 4 lines (see `maxLines`). */
  children?: React.ReactNode
  /**
   * Tinted slot below the body (Figma "Media"). Left empty it draws the spec's
   * 170px placeholder block; given content it sizes to it.
   */
  media?: React.ReactNode
  /** Right-aligned footer. The spec pairs a small tertiary Button with a small primary one. */
  actions?: React.ReactNode
  /**
   * Dismiss handler. Present → the click-opened card, which carries the ×.
   * Absent → the hover-opened card, which the spec gives no dismiss button.
   */
  onDismiss?: () => void
  /** Accessible label for the dismiss button. */
  dismissLabel?: string
  /**
   * Clamp the body to N lines. Figma notes "maximum text length — 4 lines" as a
   * content rule, so it is opt-in here rather than on by default: the component
   * should never silently truncate copy it was handed.
   */
  maxLines?: number
  className?: string
}

/**
 * Radiant — Explainer card (Figma "Explainer card" 18310:23047).
 *
 * A 340px card that explains the thing you just pointed at. Two forms, both here:
 * opened by a click it takes a title and a dismiss button and persists until
 * dismissed; opened by hover it is body text alone and closes when the pointer
 * leaves. Media and actions are optional and belong to the titled form.
 *
 * The card draws the surface only — placing and showing it is the caller's job,
 * so it works as a popover, an inline aside or a hover card without assuming one.
 */
export function ExplainerCard({
  title,
  children,
  media,
  actions,
  onDismiss,
  dismissLabel = 'Dismiss',
  maxLines,
  className,
}: ExplainerCardProps) {
  const titled = title != null
  const dismiss = onDismiss && (
    <IconButton
      variant="ghost"
      size="small"
      aria-label={dismissLabel}
      onClick={onDismiss}
      icon={<Icon name="cross" size={16} />}
    />
  )
  const body = children != null && (
    <div
      className="rad-explainer__body rd-body"
      style={maxLines ? ({ WebkitLineClamp: maxLines } as React.CSSProperties) : undefined}
      data-clamp={maxLines ? '' : undefined}
    >
      {children}
    </div>
  )

  return (
    <div
      className={['rad-explainer', titled ? 'rad-explainer--titled' : 'rad-explainer--compact', className]
        .filter(Boolean)
        .join(' ')}
      role="dialog"
      aria-label={typeof title === 'string' ? title : undefined}
    >
      {titled ? (
        <>
          <div className="rad-explainer__head">
            <div className="rad-explainer__title rd-label-section">{title}</div>
            {dismiss}
          </div>
          {body}
          {media !== undefined && <div className="rad-explainer__media">{media}</div>}
          {actions && <div className="rad-explainer__actions">{actions}</div>}
        </>
      ) : (
        <>
          {body}
          {dismiss}
        </>
      )}
    </div>
  )
}

export default ExplainerCard
