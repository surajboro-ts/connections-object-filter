import { useState } from 'react'
import { Checkbox, Divider, Icon, Link, Modal, SearchBar, Select, Toggle } from '../radiant/components'
import { DATABASES, MATCH_MODES } from './data'
import WizardFrame from './WizardFrame'
import './App.css'

/**
 * Connection object filter — the "Edit connection → Select databases and
 * schemas" step: a stacked database / schema tree with an optional "Object
 * name" filter (match mode + chip input) applied in the next step, plus the
 * database-deselection warning modal.
 */

const XMark = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

/** In Pattern mode, tint the glob metacharacters (* ? %) so they stand out. */
function renderChipText(text: string, isPattern: boolean) {
  if (!isPattern) return text
  return text
    .split(/([*?%])/)
    .filter(Boolean)
    .map((seg, i) =>
      /^[*?%]$/.test(seg) ? (
        <span key={i} className="chipin__wild">
          {seg}
        </span>
      ) : (
        <span key={i}>{seg}</span>
      ),
    )
}

function ChipInput({
  chips,
  onChange,
  mode,
}: {
  chips: string[]
  onChange: (c: string[]) => void
  mode?: string
}) {
  const [draft, setDraft] = useState('')
  const isPattern = mode === 'wildcard'

  const commit = () => {
    const v = draft.trim()
    if (v && !chips.includes(v)) onChange([...chips, v])
    setDraft('')
  }

  return (
    <div className="chipin-wrap">
      <div className="chipin">
        {chips.map((c, i) => (
          <span className="chipin__chip" key={c + i}>
            <span className="chipin__chip-text">{renderChipText(c, isPattern)}</span>
            <button
              type="button"
              className="chipin__chip-x"
              aria-label={`Remove ${c}`}
              onClick={() => onChange(chips.filter((_, idx) => idx !== i))}
            >
              <XMark />
            </button>
          </span>
        ))}
        <input
          className="chipin__input"
          value={draft}
          placeholder={chips.length ? '' : isPattern ? 'e.g. FCT_*' : 'Type here, then press Enter'}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              commit()
            } else if (e.key === 'Backspace' && !draft && chips.length) {
              onChange(chips.slice(0, -1))
            }
          }}
        />
      </div>
      {isPattern && (
        <p className="chipin__hint rd-caption">
          % or * match any characters · ? matches one · _ is literal
        </p>
      )}
    </div>
  )
}

const keyOf = (db: string, schema: string) => `${db}/${schema}`

/** Edit-connection starting point: some databases already fully selected. */
const INITIAL_SELECTED = new Set([
  'CUSTOMER_ANALYTICS/PUBLIC',
  'CUSTOMER_ANALYTICS/STAGING',
  'CUSTOMER_ANALYTICS/MARTS',
  'FINANCE_REPORTING/PUBLIC',
  'FINANCE_REPORTING/FY2024',
])

function DatabaseTree() {
  const [q, setQ] = useState('')
  const [selected, setSelected] = useState<Set<string>>(() => new Set(INITIAL_SELECTED))
  const [showSelected, setShowSelected] = useState(false)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [pendingDeselect, setPendingDeselect] = useState<string | null>(null)

  const query = q.trim().toLowerCase()
  const autoExpand = query !== '' || showSelected

  const filtered = DATABASES.map((db) => {
    const dbMatch = !query || db.name.toLowerCase().includes(query)
    const schemas = db.schemas.filter((sc) => {
      const nameMatch = !query || dbMatch || sc.name.toLowerCase().includes(query)
      const selMatch = !showSelected || selected.has(keyOf(db.name, sc.name))
      return nameMatch && selMatch
    })
    return { db, schemas }
  }).filter(({ schemas }) => (query || showSelected ? schemas.length > 0 : true))

  const visibleKeys = filtered.flatMap(({ db, schemas }) => schemas.map((sc) => keyOf(db.name, sc.name)))

  const toggleExpand = (db: string) =>
    setExpanded((s) => {
      const x = new Set(s)
      x.has(db) ? x.delete(db) : x.add(db)
      return x
    })
  const toggleSchema = (db: string, sc: string) =>
    setSelected((s) => {
      const x = new Set(s)
      const k = keyOf(db, sc)
      x.has(k) ? x.delete(k) : x.add(k)
      return x
    })
  const toggleDb = (db: string, schemas: { name: string }[]) =>
    setSelected((s) => {
      const x = new Set(s)
      const keys = schemas.map((sc) => keyOf(db, sc.name))
      const all = keys.every((k) => x.has(k))
      keys.forEach((k) => (all ? x.delete(k) : x.add(k)))
      return x
    })
  const dbState = (db: string, schemas: { name: string }[]) => {
    if (!schemas.length) return { checked: false, indeterminate: false }
    const n = schemas.filter((sc) => selected.has(keyOf(db, sc.name))).length
    return { checked: n === schemas.length, indeterminate: n > 0 && n < schemas.length }
  }

  // Deselecting a whole database that is fully selected warns first (edit flow).
  const deselectDb = (db: string) =>
    setSelected((s) => {
      const x = new Set(s)
      DATABASES.find((d) => d.name === db)?.schemas.forEach((sc) => x.delete(keyOf(db, sc.name)))
      return x
    })
  const onDbToggle = (db: string, schemas: { name: string }[], st: { checked: boolean }) => {
    if (st.checked) setPendingDeselect(db)
    else toggleDb(db, schemas)
  }

  const pendingDb = pendingDeselect ? DATABASES.find((d) => d.name === pendingDeselect) : null
  const pendingCount = pendingDb
    ? pendingDb.schemas.filter((sc) => selected.has(keyOf(pendingDb.name, sc.name))).length
    : 0

  return (
    <>
      <div className="dbp">
        <SearchBar
          value={q}
          onValueChange={setQ}
          placeholder="Search databases and schemas"
          wrapperClassName="dbp__search"
        />
        <div className="dbp__labelrow">
          <span className="rd-label-subhead">Databases &amp; schemas</span>
          <span className="dbp__links">
            <Link
              tone="blue"
              size="small"
              onClick={(e) => (e.preventDefault(), setSelected((s) => new Set([...s, ...visibleKeys])))}
            >
              Select all
            </Link>
            <Link tone="blue" size="small" onClick={(e) => (e.preventDefault(), setSelected(new Set()))}>
              Clear
            </Link>
          </span>
        </div>
        <div className="dbp__box">
          <div className="dbp__list">
            {filtered.map(({ db, schemas }) => {
              const open = autoExpand || expanded.has(db.name)
              const st = dbState(db.name, schemas)
              return (
                <div key={db.name}>
                  <div className="dbp__node">
                    <button
                      type="button"
                      className="dbp__twisty"
                      aria-label={open ? 'Collapse' : 'Expand'}
                      onClick={() => toggleExpand(db.name)}
                    >
                      <Icon name={open ? 'chevron-down' : 'chevron-right'} size={16} />
                    </button>
                    <Checkbox
                      checked={st.checked}
                      indeterminate={st.indeterminate}
                      onChange={() => onDbToggle(db.name, schemas, st)}
                      aria-label={db.name}
                    />
                    <button type="button" className="dbp__name rd-body" onClick={() => toggleExpand(db.name)}>
                      {db.name}
                    </button>
                  </div>
                  {open &&
                    schemas.map((sc) => (
                      <div key={sc.name} className="dbp__node dbp__node--schema">
                        <Checkbox
                          checked={selected.has(keyOf(db.name, sc.name))}
                          onChange={() => toggleSchema(db.name, sc.name)}
                          aria-label={sc.name}
                        />
                        <button
                          type="button"
                          className="dbp__name rd-body"
                          onClick={() => toggleSchema(db.name, sc.name)}
                        >
                          {sc.name}
                        </button>
                      </div>
                    ))}
                </div>
              )
            })}
            {filtered.length === 0 && (
              <p className="dbp__empty rd-body">No databases or schemas match your search.</p>
            )}
          </div>
          <div className="dbp__foot">
            <Toggle label="Show selected" checked={showSelected} onChange={() => setShowSelected((v) => !v)} />
          </div>
        </div>
      </div>

      <Modal
        open={!!pendingDeselect}
        size="m1"
        title={`Deselect ${pendingDeselect ?? ''}?`}
        onClose={() => setPendingDeselect(null)}
        secondaryAction={{ label: 'Cancel', onClick: () => setPendingDeselect(null) }}
        primaryAction={{
          label: 'Deselect database',
          onClick: () => {
            if (pendingDeselect) deselectDb(pendingDeselect)
            setPendingDeselect(null)
          },
        }}
      >
        <p className="rd-body">
          <b>{pendingDeselect}</b> has {pendingCount} selected schema{pendingCount !== 1 ? 's' : ''}.
          Tables you've already added from it won't be removed — they stay in this connection and must
          be removed from <b>Manage tables</b>. Deselecting it here only stops new objects from loading.
        </p>
      </Modal>
    </>
  )
}

function ObjectNameFilter() {
  const [mode, setMode] = useState('contains')
  const [values, setValues] = useState<string[]>([])
  return (
    <div className="oe-group">
      <div className="oe-row">
        <Select options={MATCH_MODES} value={mode} onChange={setMode} className="oe-mode" />
        <div className="oe-input">
          <ChipInput chips={values} onChange={setValues} mode={mode} />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <WizardFrame overline="Edit connection" title="Select databases and schemas" progress={3} primaryLabel="Next">
      <div className="oe">
        <DatabaseTree />
        <Divider />
        <div className="oe-filter">
          <div className="oe-filter__head">
            <h2 className="oe-filter__title rd-label-section">
              Filter object name in next step <span className="oe-filter__opt">(Optional)</span>
            </h2>
            <p className="oe-filter__sub rd-body">
              This could help reduce loading times for objects in next step.
            </p>
          </div>
          <ObjectNameFilter />
        </div>
      </div>
    </WizardFrame>
  )
}
