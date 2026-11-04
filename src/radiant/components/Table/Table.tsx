import React, { useState } from 'react'
import './Table.css'
import { Checkbox } from '../Checkbox/Checkbox'
import { Avatar } from '../Avatar/Avatar'
import { Tag } from '../Tag/Tag'
import { Chip, ChipKind } from '../Chip/Chip'
import { Button } from '../Button/Button'
import { IconButton } from '../IconButton/IconButton'
import { Icon } from '../Icon/Icon'

export type CellType =
  | 'checkbox' | 'icon' | 'verified' | 'title' | 'star'
  | 'tags' | 'tokens' | 'author' | 'text' | 'button' | 'iconButton' | 'actions'

export interface ObjectTableColumn {
  id: string
  header?: string
  /** Icon-type header (e.g. the verified / favorite columns) renders this glyph instead of a text label. */
  headerIcon?: React.ReactNode
  type: CellType
  width?: number | string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

/**
 * A title cell — brand-blue link text + optional footnote caption. An optional
 * leading `icon` (18px) promotes it to the media variant (Figma "Type=Title"
 * 17098:17655): icon + link + caption.
 */
export interface TitleCell { icon?: React.ReactNode; text: string; description?: string; href?: string; onClick?: () => void }
/**
 * A plain-text cell. `emphasis: 'default'` (the default) is secondary/supporting
 * text (Body Normal); `emphasis: 'strong'` is for an identifier or otherwise
 * significant value and renders as Content Label Subhead. A bare string is treated
 * as default. An optional leading `icon` (18px) and/or `description` (footnote
 * caption) promote it to the two-line media variant (Figma "Type=Text" 17098:18242):
 * icon + (Body Normal | Content Label Subhead) + caption.
 */
export interface TextCell { icon?: React.ReactNode; text: React.ReactNode; description?: string; emphasis?: 'default' | 'strong' }
export interface AuthorCell { name: string; src?: string }
export interface TokenCell { kind: ChipKind; label: string; icon?: React.ReactNode }
export interface ButtonCell { label: string; onClick?: () => void; variant?: 'primary' | 'secondary' | 'tertiary'; size?: 'basic' | 'small' }
export interface IconButtonCell { icon: React.ReactNode; onClick?: () => void; 'aria-label': string; variant?: 'primary' | 'secondary' | 'ghost'; size?: 'standard' | 'small' | 'xs' }

export interface ObjectTableRow {
  id: string
  selected?: boolean
  cells: Record<string, any>
}

export interface ObjectTableProps {
  columns: ObjectTableColumn[]
  rows: ObjectTableRow[]
  selectable?: boolean
  onToggleRow?: (id: string) => void
  onToggleAll?: () => void
  sortBy?: string
  sortDir?: 'asc' | 'desc'
  onSort?: (colId: string) => void
  /** How many tags/tokens to show before collapsing to +N. */
  maxChips?: number
  /** Makes body rows clickable (checkbox / action cells still handle their own clicks). */
  onRowClick?: (id: string) => void
  /** Toolbar row rendered above the table (e.g. search + primary actions). */
  toolbar?: React.ReactNode
  /**
   * When any row is selected, the toolbar is replaced by a selection action bar
   * ("N selected" + a divider + these actions). Receives the selected row ids so
   * the caller can vary actions by count (e.g. bulk-only actions for multi-select).
   */
  selectionActions?: (selectedIds: string[]) => React.ReactNode
  /** Overrides the "{n} selected" label in the selection bar. */
  selectionLabel?: (count: number) => string
  className?: string
}

/* Faithful Radiant "verified" seal (scalloped disc + check cut-out). */
const VerifiedBadge = () => (
  <span className="rad-table__verified"><Icon name="verified" size={16} /></span>
)
const Star = ({ on }: { on?: boolean }) => (
  <svg viewBox="0 0 20 20" width="18" height="18" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <path d="M10 2.5l2.3 4.7 5.2.8-3.8 3.7.9 5.1-4.6-2.4-4.6 2.4.9-5.1L2.5 8l5.2-.8z" strokeLinejoin="round" />
  </svg>
)
const SortIcon = ({ dir }: { dir?: 'asc' | 'desc' }) => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d={dir === 'asc' ? 'M8 12V4M8 4L4.5 7.5M8 4l3.5 3.5' : 'M8 4v8M8 12l-3.5-3.5M8 12l3.5-3.5'} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
/** Blue circular chevron shown on hover of a sortable header (Figma chevron-down-s). */
const SortChevron = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeWidth="1" />
    <path d="M5.5 7l2.5 2.5L10.5 7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function ChipOverflow({ items, max, render, moreVariant = 'plain' }: { items: any[]; max: number; render: (it: any, i: number) => React.ReactNode; moreVariant?: 'plain' | 'tag' }) {
  const [expanded, setExpanded] = useState(false)
  const overflow = items.length > max
  const shown = expanded || !overflow ? items : items.slice(0, max)
  return (
    <div className="rad-cell__chips">
      {shown.map((it, i) => render(it, i))}
      {overflow && !expanded && (
        <button
          type="button"
          className={moreVariant === 'tag' ? 'rad-tag rad-cell__more-tag' : 'rad-cell__more rd-caption'}
          onClick={() => setExpanded(true)}
        >
          +{items.length - max}
        </button>
      )}
    </div>
  )
}

export function ObjectTable({
  columns, rows, selectable, onToggleRow, onToggleAll,
  sortBy, sortDir, onSort, maxChips = 3, onRowClick,
  toolbar, selectionActions, selectionLabel, className,
}: ObjectTableProps) {
  const allSelected = selectable && rows.length > 0 && rows.every((r) => r.selected)
  const someSelected = selectable && rows.some((r) => r.selected) && !allSelected
  const selectedIds = rows.filter((r) => r.selected).map((r) => r.id)
  const showSelbar = !!selectionActions && selectedIds.length > 0
  const hasToolbarRegion = !!toolbar || !!selectionActions

  const renderCell = (col: ObjectTableColumn, row: ObjectTableRow) => {
    const v = row.cells[col.id]
    switch (col.type) {
      case 'checkbox':
        return <Checkbox checked={!!row.selected} onChange={() => onToggleRow?.(row.id)} aria-label="Select row" />
      case 'icon':
        return <span className="rad-cell__icon">{v}</span>
      case 'verified':
        return v ? <VerifiedBadge /> : null
      case 'title': {
        const t = v as TitleCell
        const lines = (
          <div className="rad-cell__title">
            <a
              className="rad-cell__title-text rd-label-subhead"
              href={t.href ?? '#'}
              onClick={(e) => { if (t.onClick) { e.preventDefault(); t.onClick() } }}
            >
              {t.text}
            </a>
            {t.description && <span className="rad-cell__desc rd-caption">{t.description}</span>}
          </div>
        )
        // Leading-icon media variant when an icon is supplied.
        return t.icon ? (
          <div className="rad-cell__media">
            <span className="rad-cell__media-icon">{t.icon}</span>
            {lines}
          </div>
        ) : lines
      }
      case 'star':
        return (
          <button type="button" className={`rad-cell__star${v ? ' is-on' : ''}`} aria-pressed={!!v} aria-label="Favorite">
            <Star on={!!v} />
          </button>
        )
      case 'tags':
        return <ChipOverflow items={(v as string[]) ?? []} max={maxChips} moreVariant="tag" render={(tg, i) => <Tag key={i}>{tg}</Tag>} />
      case 'tokens':
        return <ChipOverflow items={(v as TokenCell[]) ?? []} max={maxChips} render={(tk: TokenCell, i) => <Chip key={i} kind={tk.kind} leadingIcon={tk.icon}>{tk.label}</Chip>} />
      case 'author': {
        const a = v as AuthorCell
        return (
          <div className="rad-cell__author">
            <Avatar name={a.name} src={a.src} size={32} />
            <span className="rad-cell__author-name rd-body">{a.name}</span>
          </div>
        )
      }
      case 'text': {
        // Accept a bare string (default emphasis) or a TextCell with emphasis.
        const tx: TextCell = v != null && typeof v === 'object' && 'text' in v ? (v as TextCell) : { text: v as React.ReactNode }
        const cls = tx.emphasis === 'strong' ? 'rd-label-subhead' : 'rd-body'
        const primary = <span className={`rad-cell__text ${cls}`}>{tx.text}</span>
        // Bare single-line cell unless an icon or caption promotes it to the
        // two-line media variant (icon + text + footnote caption).
        if (!tx.icon && !tx.description) return primary
        const lines = (
          <div className="rad-cell__lines">
            {primary}
            {tx.description && <span className="rad-cell__desc rd-caption">{tx.description}</span>}
          </div>
        )
        return tx.icon ? (
          <div className="rad-cell__media">
            <span className="rad-cell__media-icon">{tx.icon}</span>
            {lines}
          </div>
        ) : lines
      }
      case 'button': {
        const b = v as ButtonCell
        return b ? <Button size={b.size ?? 'basic'} variant={b.variant ?? 'tertiary'} onClick={b.onClick}>{b.label}</Button> : null
      }
      case 'iconButton': {
        const ib = v as IconButtonCell
        return ib ? <IconButton size={ib.size ?? 'standard'} variant={ib.variant ?? 'secondary'} icon={ib.icon} aria-label={ib['aria-label']} onClick={ib.onClick} /> : null
      }
      case 'actions':
        return v ?? null
      default:
        return null
    }
  }

  const selText = selectionLabel ? selectionLabel(selectedIds.length) : `${selectedIds.length} selected`

  return (
    <div className={['rad-objecttable', className].filter(Boolean).join(' ')}>
      {hasToolbarRegion && (
        showSelbar ? (
          <div className="rad-table-selbar">
            <span className="rad-table-selbar__count rd-body">{selText}</span>
            <span className="rad-table-selbar__sep" aria-hidden="true" />
            <div className="rad-table-selbar__actions">{selectionActions!(selectedIds)}</div>
          </div>
        ) : (
          toolbar ? <div className="rad-table-toolbar">{toolbar}</div> : null
        )
      )}
      <div className={['rad-table-wrap', showSelbar && 'has-selbar'].filter(Boolean).join(' ')}>
      <table className="rad-table">
        <colgroup>
          {/* Fixed control-column widths, per Figma _Full Table: checkbox 48px, icon /
             icon-button action columns 50px. Everything else uses the given width. */}
          {columns.map((c) => {
            const fixed = c.type === 'checkbox' ? 48 : (c.type === 'icon' || c.type === 'iconButton') ? 50 : c.width
            return <col key={c.id} style={{ width: fixed }} />
          })}
        </colgroup>
        <thead>
          <tr>
            {columns.map((col) => {
              const isSortable = col.sortable
              const active = sortBy === col.id
              return (
                <th
                  key={col.id}
                  className={`rad-th rad-th--${col.type}${col.align ? ` rad-th--${col.align}` : ''}${isSortable ? ' is-sortable' : ''}${active ? ' is-active' : ''}`}
                  onClick={isSortable ? () => onSort?.(col.id) : undefined}
                >
                  <span className="rad-th__inner">
                    {col.type === 'checkbox' && selectable ? (
                      <Checkbox checked={!!allSelected} indeterminate={!!someSelected} onChange={() => onToggleAll?.()} aria-label="Select all" />
                    ) : col.headerIcon ? (
                      <span className="rad-th__hicon">{col.headerIcon}</span>
                    ) : (
                      <span className="rad-th__label rd-caption">{col.header}</span>
                    )}
                    {isSortable && active && <span className="rad-th__sortind"><SortIcon dir={sortDir} /></span>}
                    {isSortable && <span className="rad-th__sortbtn" aria-hidden="true"><SortChevron /></span>}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={`rad-tr${row.selected ? ' is-selected' : ''}${onRowClick ? ' is-clickable' : ''}`}
              onClick={onRowClick ? () => onRowClick(row.id) : undefined}
            >
              {columns.map((col) => (
                <td
                  key={col.id}
                  className={`rad-td rad-td--${col.type}${col.align ? ` rad-td--${col.align}` : ''}`}
                  // Checkbox / action cells own their clicks — don't trigger the row.
                  onClick={col.type === 'checkbox' ? (e) => e.stopPropagation() : undefined}
                >
                  {renderCell(col, row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default ObjectTable
