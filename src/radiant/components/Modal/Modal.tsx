import React, { useEffect } from 'react'
import './Modal.css'
import { Button } from '../Button/Button'
import { Link } from '../Link/Link'
import { Tooltip } from '../Tooltip/Tooltip'

export type ModalSize = 'm1' | 'm2' | 'm3' | 'm4'

export interface ModalAction {
  label: string
  onClick?: () => void
  disabled?: boolean
}

export interface ModalWizard {
  total: number
  current: number // 1-based
  onBack?: () => void
  onNext?: () => void
  onDone?: () => void
  onClose?: () => void
  /** Optional label overrides (defaults: Close / Back / Next / Done). */
  closeLabel?: string
  backLabel?: string
  nextLabel?: string
  doneLabel?: string
  /** Disable the primary (Next/Done) button. */
  nextDisabled?: boolean
  /** Tooltip shown on hover of the disabled primary button (e.g. why it's blocked). */
  nextDisabledReason?: string
}

export interface ModalProps {
  open: boolean
  onClose?: () => void
  size?: ModalSize
  eyebrow?: string
  title: string
  children?: React.ReactNode
  /** Left-aligned tertiary/link action in the footer. */
  tertiaryAction?: ModalAction
  /** Right-aligned secondary "Cancel"-style action. */
  secondaryAction?: ModalAction
  /** Right-aligned primary action. Its label should mirror the title's verb. */
  primaryAction?: ModalAction
  /** Renders the multi-step wizard footer (progress bar + Close/Back/Next/Done). */
  wizard?: ModalWizard
  /** Show a "Close" link in the header (default for m4 / full screen). */
  closeInHeader?: boolean
  /** Adds default 20/24 padding to the body. Set false to manage padding in content. */
  bodyPadded?: boolean
  /** Fixes the body to a constant height (px) — e.g. so a wizard doesn't resize between steps. */
  bodyHeight?: number
  /** Close when the scrim is clicked (default true). */
  dismissOnScrim?: boolean
  className?: string
}

export function Modal({
  open, onClose, size = 'm2', eyebrow, title, children,
  tertiaryAction, secondaryAction, primaryAction, wizard,
  closeInHeader, bodyPadded = true, bodyHeight, dismissOnScrim = true, className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const showHeaderClose = closeInHeader ?? size === 'm4'
  const isWizard = !!wizard
  const isLast = wizard ? wizard.current >= wizard.total : false
  const hasFooter = isWizard || !!tertiaryAction || !!secondaryAction || !!primaryAction

  return (
    <div
      className="rad-modal-overlay"
      onMouseDown={dismissOnScrim ? () => onClose?.() : undefined}
    >
      <div
        className={['rad-modal', `rad-modal--${size}`, className].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="rad-modal__header">
          <div className="rad-modal__titles">
            {eyebrow && <span className="rad-modal__eyebrow rd-body">{eyebrow}</span>}
            <h2 className="rad-modal__title rd-title-modal">{title}</h2>
          </div>
          {showHeaderClose && (
            <Link tone="blue" onClick={(e) => { e.preventDefault(); onClose?.() }} href="#">Close</Link>
          )}
        </header>

        <div
          className={`rad-modal__body${bodyPadded ? ' is-padded' : ''}`}
          style={bodyHeight ? { height: bodyHeight } : undefined}
        >{children}</div>

        {hasFooter && (
          <footer className="rad-modal__footer">
            {isWizard && (
              <div className="rad-modal__progress" aria-hidden="true">
                {Array.from({ length: wizard!.total }).map((_, i) => (
                  <span key={i} className={`rad-modal__progress-seg${i < wizard!.current ? ' is-filled' : ''}`} />
                ))}
              </div>
            )}
            <div className="rad-modal__footer-inner">
              <div className="rad-modal__footer-left">
                {isWizard ? (
                  <Button variant="tertiary" onClick={wizard!.onClose ?? onClose}>{wizard!.closeLabel ?? 'Close'}</Button>
                ) : tertiaryAction ? (
                  <Button variant="tertiary" onClick={tertiaryAction.onClick} disabled={tertiaryAction.disabled}>{tertiaryAction.label}</Button>
                ) : <span />}
              </div>
              <div className="rad-modal__footer-right">
                {isWizard ? (
                  <>
                    {wizard!.current > 1 && <Button variant="secondary" onClick={wizard!.onBack}>{wizard!.backLabel ?? 'Back'}</Button>}
                    {(() => {
                      const primary = isLast
                        ? <Button variant="primary" onClick={wizard!.onDone} disabled={wizard!.nextDisabled}>{wizard!.doneLabel ?? 'Done'}</Button>
                        : <Button variant="primary" onClick={wizard!.onNext} disabled={wizard!.nextDisabled}>{wizard!.nextLabel ?? 'Next'}</Button>
                      return wizard!.nextDisabled && wizard!.nextDisabledReason
                        ? <Tooltip label={wizard!.nextDisabledReason} placement="top">{primary}</Tooltip>
                        : primary
                    })()}
                  </>
                ) : (
                  <>
                    {secondaryAction && <Button variant="secondary" onClick={secondaryAction.onClick} disabled={secondaryAction.disabled}>{secondaryAction.label}</Button>}
                    {primaryAction && <Button variant="primary" onClick={primaryAction.onClick} disabled={primaryAction.disabled}>{primaryAction.label}</Button>}
                  </>
                )}
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}

export default Modal
