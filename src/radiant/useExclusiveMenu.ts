import { useEffect, useRef } from 'react'

/**
 * Radiant rule — only ONE overflow menu / popover may be open at a time.
 * Call it with a menu's open state and its close handler. Whenever any menu that
 * uses this hook opens, every other one closes. Works across components via a
 * window-level event carrying each menu's unique id.
 */
const EVENT = 'rad-menu-open'

export function useExclusiveMenu(open: boolean, close: () => void) {
  const idRef = useRef<symbol | null>(null)
  if (idRef.current === null) idRef.current = Symbol('rad-menu')
  const closeRef = useRef(close)
  closeRef.current = close

  useEffect(() => {
    if (!open) return
    const id = idRef.current
    // Announce this menu opened → any other open menu closes itself.
    window.dispatchEvent(new CustomEvent(EVENT, { detail: id }))
    const onOther = (e: Event) => {
      if ((e as CustomEvent).detail !== id) closeRef.current()
    }
    window.addEventListener(EVENT, onOther as EventListener)
    return () => window.removeEventListener(EVENT, onOther as EventListener)
  }, [open])
}
