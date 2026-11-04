import React from 'react'
import { Icon } from '../Icon/Icon'
import './Pagination.css'

export type PaginationVariant = 'range' | 'item'

export interface PaginationProps {
  variant?: PaginationVariant
  /** 1-based index of the first item on the page. */
  start: number
  /** 1-based index of the last item on the page. */
  end: number
  /** Total item count (range variant only). */
  total?: number
  onPrev?: () => void
  onNext?: () => void
  hasPrev?: boolean
  hasNext?: boolean
  className?: string
}

/**
 * Radiant — Pagination.
 *  - range: "Showing 1-20 of 500 results" with prev/next text links.
 *  - item:  "1 - 20" with circular prev/next icon buttons.
 */
export function Pagination({
  variant = 'range', start, end, total, onPrev, onNext, hasPrev = true, hasNext = true, className,
}: PaginationProps) {
  if (variant === 'item') {
    return (
      <div className={['rad-pagination', 'rad-pagination--item', className].filter(Boolean).join(' ')}>
        <span className="rad-pagination__range rd-body">{start} - {end}</span>
        <button type="button" className="rad-pagination__nav" aria-label="Previous" disabled={!hasPrev} onClick={onPrev}>
          <Icon name="chevron-left" size={14} />
        </button>
        <button type="button" className="rad-pagination__nav" aria-label="Next" disabled={!hasNext} onClick={onNext}>
          <Icon name="chevron-right" size={14} />
        </button>
      </div>
    )
  }
  return (
    <div className={['rad-pagination', 'rad-pagination--range', className].filter(Boolean).join(' ')}>
      <span className="rad-pagination__summary rd-body">
        Showing <b>{start}-{end}</b> of <b>{total}</b> results
      </span>
      <div className="rad-pagination__links">
        {onPrev && (
          <button type="button" className="rad-pagination__link" disabled={!hasPrev} onClick={onPrev}>
            <Icon name="chevron-left" size={14} /> Prev
          </button>
        )}
        {onNext && (
          <button type="button" className="rad-pagination__link" disabled={!hasNext} onClick={onNext}>
            Next <Icon name="chevron-right" size={14} />
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination
