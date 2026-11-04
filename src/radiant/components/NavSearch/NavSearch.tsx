import React, { useEffect, useState } from 'react'
import { Icon } from '../Icon/Icon'
import './NavSearch.css'

/** The placeholders that roll through the field (Figma 21498:18619). */
const DEFAULT_PHRASES = [
  'Search in your library',
  'Press Cmd + k to search',
  'Refer to popular queries',
]

export interface NavSearchProps {
  /** Phrases to cycle through. First one is shown on mount. */
  phrases?: string[]
  /** Milliseconds each phrase stays before rolling. */
  interval?: number
  onClick?: () => void
  className?: string
}

/**
 * Radiant — utility search bar (Figma 21498:18619). A secondary-filled pill with
 * a leading magnifying glass, a ⌘K hint, and a placeholder that rolls vertically
 * from one phrase to the next (starting from "Search in your library"), looping
 * seamlessly via a trailing clone of the first phrase.
 */
export function NavSearch({ phrases = DEFAULT_PHRASES, interval = 2600, onClick, className }: NavSearchProps) {
  // Append a clone of the first phrase so the wrap-around roll is seamless.
  const rows = [...phrases, phrases[0]]
  const last = rows.length - 1
  const [i, setI] = useState(0)
  const [animate, setAnimate] = useState(true)

  // Advance one phrase per interval.
  useEffect(() => {
    if (phrases.length < 2) return
    const t = setInterval(() => setI((v) => v + 1), interval)
    return () => clearInterval(t)
  }, [phrases.length, interval])

  // On reaching the trailing clone, let the roll finish, then snap back to the real
  // first phrase with the transition OFF (an invisible loop, since the clone === P0).
  // Guarded on `i >= last` so it still fires if the index ever overshoots.
  useEffect(() => {
    if (i < last) return
    const t = setTimeout(() => { setAnimate(false); setI(0) }, 460) // just after the 420ms roll
    return () => clearTimeout(t)
  }, [i, last])

  // Re-enable the transition on the frame after a silent snap (animate went false).
  useEffect(() => {
    if (animate) return
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
    return () => cancelAnimationFrame(r)
  }, [animate])

  // Clamp the visible row so the track can NEVER translate past the last phrase (which
  // would show a blank window) even if the index momentarily overshoots.
  const shown = Math.min(i, last)

  return (
    <button
      type="button"
      className={['rad-navsearch', className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      <Icon name="magnifying-glass" size={16} className="rad-navsearch__icon" />
      <span className="rad-navsearch__roll" aria-label={phrases[0]}>
        <span
          className="rad-navsearch__track"
          style={{
            transform: `translateY(${-shown * 20}px)`,
            transition: animate ? 'transform 420ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {rows.map((p, idx) => (
            <span key={idx} className="rad-navsearch__phrase">{p}</span>
          ))}
        </span>
      </span>
      <span className="rad-navsearch__kbd" aria-hidden="true">
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </span>
    </button>
  )
}

export default NavSearch
