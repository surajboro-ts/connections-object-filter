import React from 'react'
import './PageLoader.css'

export interface PageLoaderProps {
  /** Optional caption below the dots (the "Copy=True" variant). */
  message?: React.ReactNode
  className?: string
}

/** Radiant — Global / Page loader (17953:18391). Three dots pulsing in a wave. */
export function PageLoader({ message, className }: PageLoaderProps) {
  return (
    <div className={['rad-pageloader', className].filter(Boolean).join(' ')} role="status" aria-label="Loading">
      <span className="rad-pageloader__dots" aria-hidden="true">
        <span className="rad-pageloader__dot" />
        <span className="rad-pageloader__dot" />
        <span className="rad-pageloader__dot" />
      </span>
      {message && <p className="rad-pageloader__msg rd-body">{message}</p>}
    </div>
  )
}

export default PageLoader
