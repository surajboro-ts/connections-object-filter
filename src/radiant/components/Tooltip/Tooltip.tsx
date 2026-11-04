import React, { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './Tooltip.css'

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps {
  /** The tooltip text (Figma Tooltip 246:11127). */
  label: React.ReactNode
  placement?: TooltipPlacement
  /** Hover dwell before the tooltip appears, in ms (default 0 = immediate). */
  delay?: number
  children: React.ReactElement
}

/**
 * Radiant — Tooltip (246:11127). Dark inverse bubble, 8px 12px padding, radius 6,
 * Footnote/Caption white text, menu elevation. Shown on hover / keyboard focus of
 * the wrapped trigger. Portalled + fixed-positioned so it is never clipped by a
 * scrolling container.
 */
export function Tooltip({ label, placement = 'top', delay = 0, children }: TooltipProps) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const id = useId()

  const place = () => {
    const t = triggerRef.current?.getBoundingClientRect()
    const b = bubbleRef.current?.getBoundingClientRect()
    if (!t) return
    const gap = 6
    const bw = b?.width ?? 0
    const bh = b?.height ?? 0
    let top = 0
    let left = 0
    switch (placement) {
      case 'bottom': top = t.bottom + gap; left = t.left + t.width / 2 - bw / 2; break
      case 'left':   top = t.top + t.height / 2 - bh / 2; left = t.left - gap - bw; break
      case 'right':  top = t.top + t.height / 2 - bh / 2; left = t.right + gap; break
      default:       top = t.top - gap - bh; left = t.left + t.width / 2 - bw / 2 // top
    }
    setPos({ top, left })
  }

  // Position once the bubble has mounted (so we know its size), then keep it pinned.
  useEffect(() => {
    if (!open) { setPos(null); return }
    place()
    const onMove = () => setOpen(false)
    window.addEventListener('scroll', onMove, true)
    window.addEventListener('resize', onMove)
    return () => {
      window.removeEventListener('scroll', onMove, true)
      window.removeEventListener('resize', onMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const clearTimer = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null } }
  const show = () => {
    clearTimer()
    if (delay > 0) timer.current = setTimeout(() => setOpen(true), delay)
    else setOpen(true)
  }
  const hide = () => { clearTimer(); setOpen(false) }
  useEffect(() => clearTimer, [])

  const trigger = (
    <span
      ref={triggerRef}
      className="rad-tooltip-trigger"
      aria-describedby={open ? id : undefined}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
    </span>
  )

  return (
    <>
      {trigger}
      {open && createPortal(
        <div
          ref={bubbleRef}
          id={id}
          role="tooltip"
          className={`rad-tooltip rad-tooltip--${placement}`}
          style={pos ? { top: pos.top, left: pos.left } : { top: -9999, left: -9999 }}
        >
          {label}
        </div>,
        document.body,
      )}
    </>
  )
}

export default Tooltip
