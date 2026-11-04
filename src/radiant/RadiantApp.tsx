import React, { useState } from 'react'
import './tokens/index.css'
import './radiant.css'
import { Button, ButtonVariant, ButtonSize, Link, LinkTone, IconButton, IconButtonVariant, IconButtonSize, SplitButton, ObjectTable, ObjectTableColumn, ObjectTableRow, Modal, ModalSize, Input, Textarea, SearchBar, Select, NumberInput, Toggle, Radio, SegmentedControl, ProgressBar, Stepper, Checkbox, Menu, MenuItem, MenuItemTwoLine, MenuSection, MenuDivider, Icon, ICON_NAMES, Chip, Tag, TriggerChip, Avatar, AvatarGroup } from './components'

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'tertiary']
const STATES: { label: string; force?: 'hover' | 'activated'; disabled?: boolean }[] = [
  { label: 'Default' },
  { label: 'Hover', force: 'hover' },
  { label: 'Activated', force: 'activated' },
  { label: 'Disabled', disabled: true },
]

const Dot = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="5" fill="currentColor" />
  </svg>
)
const Gear = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M10 6.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm0 2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
    <path d="M8.6 1.8a1 1 0 011.9 0l.2.9a7 7 0 011.4.6l.8-.5a1 1 0 011.3.2l.9.9a1 1 0 01.2 1.3l-.5.8q.35.66.6 1.4l.9.2a1 1 0 010 1.9l-.9.2a7 7 0 01-.6 1.4l.5.8a1 1 0 01-.2 1.3l-.9.9a1 1 0 01-1.3.2l-.8-.5a7 7 0 01-1.4.6l-.2.9a1 1 0 01-1.9 0l-.2-.9a7 7 0 01-1.4-.6l-.8.5a1 1 0 01-1.3-.2l-.9-.9a1 1 0 01-.2-1.3l.5-.8a7 7 0 01-.6-1.4l-.9-.2a1 1 0 010-1.9l.9-.2a7 7 0 01.6-1.4l-.5-.8a1 1 0 01.2-1.3l.9-.9a1 1 0 011.3-.2l.8.5q.66-.35 1.4-.6z" fillOpacity="0" />
  </svg>
)

function ButtonMatrix({ size }: { size: ButtonSize }) {
  return (
    <table className="rad-spec-table">
      <thead>
        <tr>
          <th />
          {VARIANTS.map((v) => <th key={v} className="rd-caption">{v}</th>)}
        </tr>
      </thead>
      <tbody>
        {STATES.map((s) => (
          <tr key={s.label}>
            <td className="rd-caption rad-spec-rowlabel">{s.label}</td>
            {VARIANTS.map((v) => (
              <td key={v}>
                <Button variant={v} size={size} forceState={s.force} disabled={s.disabled}>Button</Button>
              </td>
            ))}
          </tr>
        ))}
        <tr>
          <td className="rd-caption rad-spec-rowlabel">Leading icon</td>
          {VARIANTS.map((v) => <td key={v}><Button variant={v} size={size} leadingIcon={<Dot />}>Button</Button></td>)}
        </tr>
        <tr>
          <td className="rd-caption rad-spec-rowlabel">Trailing icon</td>
          {VARIANTS.map((v) => <td key={v}><Button variant={v} size={size} trailingIcon={<Dot />}>Button</Button></td>)}
        </tr>
      </tbody>
    </table>
  )
}

const IB_VARIANTS: IconButtonVariant[] = ['primary', 'secondary', 'ghost']
const IB_SIZES: IconButtonSize[] = ['standard', 'small', 'xs']

const BarIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><rect x="3" y="9" width="3.5" height="8" rx="1" /><rect x="8.25" y="4" width="3.5" height="13" rx="1" /><rect x="13.5" y="11" width="3.5" height="6" rx="1" /></svg>
)
const PieIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 3a7 7 0 107 7h-7z" /><path d="M10 3v7h7A7 7 0 0010 3z" opacity="0.5" /></svg>
)
const MoreIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><circle cx="4" cy="10" r="1.6" /><circle cx="10" cy="10" r="1.6" /><circle cx="16" cy="10" r="1.6" /></svg>
)
const SealHeaderIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M10 2.2l2 1.5 2.5-.2.9 2.3 2.1 1.3-.5 2.4.5 2.4-2.1 1.3-.9 2.3-2.5-.2-2 1.5-2-1.5-2.5.2-.9-2.3L2.5 15l.5-2.4-.5-2.4 2.1-1.3.9-2.3L8 6.7z" strokeLinejoin="round" /><path d="M7.2 10l1.9 1.9L13 8.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)
const StarHeaderIcon = () => (
  <svg width="1em" height="1em" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M10 2.5l2.3 4.7 5.2.8-3.8 3.7.9 5.1-4.6-2.4-4.6 2.4.9-5.1L2.5 8l5.2-.8z" strokeLinejoin="round" /></svg>
)

const TABLE_COLUMNS: ObjectTableColumn[] = [
  { id: 'select', type: 'checkbox', width: 48 },
  { id: 'type', type: 'icon', header: 'Type', width: 60, align: 'center' },
  { id: 'verified', type: 'verified', headerIcon: <SealHeaderIcon />, width: 50, align: 'center' },
  { id: 'title', type: 'title', header: 'Title', width: 320, sortable: true },
  { id: 'star', type: 'star', headerIcon: <StarHeaderIcon />, width: 50, align: 'center' },
  { id: 'tags', type: 'tags', header: 'Tags', width: 200 },
  { id: 'author', type: 'author', header: 'Author', width: 180 },
  { id: 'edited', type: 'text', header: 'Last edited', width: 150, sortable: true },
  { id: 'share', type: 'button', width: 92, align: 'center' },
  { id: 'more', type: 'iconButton', width: 64, align: 'center' },
]

const share = { label: 'Share', variant: 'tertiary' as const }
const more = { icon: <MoreIcon />, 'aria-label': 'More actions' }

const TABLE_ROWS_SEED: ObjectTableRow[] = [
  { id: '1', selected: false, cells: { type: <BarIcon />, verified: true, title: { text: 'Executive Comp Summary', description: 'Compensation function', onClick: () => {} }, star: true, tags: ['Comp', 'Exec', 'Finance', 'Quarterly'], author: { name: 'Rana Prasad' }, edited: '5 minutes ago', share, more } },
  { id: '2', selected: false, cells: { type: <BarIcon />, verified: true, title: { text: 'Pay Equity Review — Global', description: 'Total Rewards', onClick: () => {} }, star: false, tags: ['Equity', 'DEI'], author: { name: 'Lena Okafor' }, edited: '2 hours ago', share, more } },
  { id: '3', selected: false, cells: { type: <PieIcon />, verified: true, title: { text: 'Attrition Risk Dashboard', onClick: () => {} }, star: false, tags: ['Talent'], author: { name: 'Marcus Feld' }, edited: '1 day ago', share, more } },
  { id: '4', selected: false, cells: { type: <BarIcon />, verified: false, title: { text: 'Merit Cycle Planning FY26', description: 'Footnote description', onClick: () => {} }, star: false, tags: ['Comp', 'Planning'], author: { name: 'Aditi Rao' }, edited: '3 days ago', share, more } },
  { id: '5', selected: false, cells: { type: <PieIcon />, verified: true, title: { text: 'DEI Representation Report', onClick: () => {} }, star: false, tags: ['DEI', 'Diversity'], author: { name: 'Sofia Marín' }, edited: '1 week ago', share, more } },
]

function TableDemo() {
  const [rows, setRows] = useState(TABLE_ROWS_SEED)
  const toggleRow = (id: string) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, selected: !r.selected } : r)))
  const toggleAll = () => setRows((rs) => {
    const all = rs.every((r) => r.selected)
    return rs.map((r) => ({ ...r, selected: !all }))
  })
  return (
    <ObjectTable
      columns={TABLE_COLUMNS}
      rows={rows}
      selectable
      onToggleRow={toggleRow}
      onToggleAll={toggleAll}
      sortBy="title"
      sortDir="desc"
    />
  )
}

function ModalDemo() {
  const [openSize, setOpenSize] = useState<ModalSize | null>(null)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [step, setStep] = useState(1)
  const total = 3

  return (
    <>
      <div className="rad-oncolor" style={{ background: 'transparent', padding: 0, flexWrap: 'wrap' }}>
        {(['m1', 'm2', 'm3', 'm4'] as ModalSize[]).map((s) => (
          <Button key={s} variant="secondary" onClick={() => setOpenSize(s)}>Open {s.toUpperCase()}</Button>
        ))}
        <Button variant="primary" onClick={() => { setStep(1); setWizardOpen(true) }}>Open wizard</Button>
      </div>

      <Modal
        open={openSize != null && openSize !== 'm4'}
        size={openSize ?? 'm2'}
        onClose={() => setOpenSize(null)}
        eyebrow="Column security"
        title="Set security"
        tertiaryAction={{ label: 'Learn more' }}
        secondaryAction={{ label: 'Cancel', onClick: () => setOpenSize(null) }}
        primaryAction={{ label: 'Set security', onClick: () => setOpenSize(null) }}
      >
        <p className="rd-body rad-muted" style={{ margin: 0 }}>
          Content area — swap this with any local component. The modal width is fixed ({openSize?.toUpperCase()}) and its height flexes to the content.
        </p>
      </Modal>

      <Modal
        open={openSize === 'm4'}
        size="m4"
        onClose={() => setOpenSize(null)}
        title="M4 — Full screen modal"
      >
        <p className="rd-body rad-muted" style={{ margin: 0 }}>Full-screen / responsive. Close lives in the header; no footer buttons.</p>
      </Modal>

      <Modal
        open={wizardOpen}
        size="m2"
        onClose={() => setWizardOpen(false)}
        eyebrow="Getting started"
        title="Introducing parameters"
        wizard={{
          total, current: step,
          onClose: () => setWizardOpen(false),
          onBack: () => setStep((s) => Math.max(1, s - 1)),
          onNext: () => setStep((s) => Math.min(total, s + 1)),
          onDone: () => setWizardOpen(false),
        }}
      >
        <p className="rd-body rad-muted" style={{ margin: 0 }}>Step {step} of {total} — create formulas with adjustable values to run different scenarios without changing your answers.</p>
      </Modal>
    </>
  )
}

const SELECT_OPTS = [
  { value: 'a', label: 'Option Label A' },
  { value: 'b', label: 'Option Label B' },
  { value: 'c', label: 'Option Label C' },
  { value: 'd', label: 'Option Label D' },
]

function FormDemo() {
  const [text, setText] = useState('')
  const [area, setArea] = useState('')
  const [search, setSearch] = useState('Filled text')
  const [sel, setSel] = useState<string | undefined>(undefined)
  const [num, setNum] = useState(10)
  return (
    <div className="rad-form-grid">
      <Input label="Label" helper="helper text - optional" placeholder="Text" value={text} onChange={(e) => setText(e.target.value)} />
      <Input label="Label" helper="helper text - optional" error='Please add "Label"' placeholder="Text" defaultValue="Text" />
      <Select label="Label" helper="helper text - optional" options={SELECT_OPTS} value={sel} onChange={setSel} placeholder="Option Label" />
      <NumberInput label="Label" helper="helper text - optional" value={num} onValueChange={setNum} min={0} />
      <div className="rad-form-col">
        <SearchBar value={search} onValueChange={setSearch} />
        <SearchBar variant="underline" value="" onValueChange={() => {}} placeholder="Search" />
      </div>
      <Textarea label="Label" helper="helper text - optional" placeholder="Text" value={area} onChange={(e) => setArea(e.target.value)} />
    </div>
  )
}

const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 2h4l-.5 3.5 2 2v1.5H4.5V7.5l2-2L6 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M8 9v4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

function MenuDemo() {
  const [single, setSingle] = useState('Sales')
  const [multi, setMulti] = useState<string[]>(['Finance', 'Marketing'])
  const [q, setQ] = useState('')
  const groups = ['Sales', 'Finance', 'Marketing', 'Engineering', 'Operations', 'Executive', 'Support']
  const toggle = (g: string) => setMulti((m) => (m.includes(g) ? m.filter((x) => x !== g) : [...m, g]))
  const filtered = groups.filter((g) => g.toLowerCase().includes(q.toLowerCase()))
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      {/* Single select — leading icon + chevron (nav), then rows with trailing counts.
          Activation = blue highlight + brand label/number. */}
      <div className="rad-form-col">
        <span className="rd-label-section rad-muted">Single select · counts</span>
        <Menu style={{ width: 200 }}>
          <MenuItem icon={<PinIcon />} label="Pinned view" trailingChevron />
          <MenuDivider />
          {groups.slice(0, 4).map((g, i) => (
            <MenuItem key={g} label={g} trailingNumber={[12, 8, 5, 3][i]} activated={single === g} onClick={() => setSingle(g)} />
          ))}
          <MenuItem label="Archived" disabled />
        </Menu>
      </div>

      {/* Multi select — checkbox rows (selection shown by the check, not a blue row),
          search + "Clear selection" footer. */}
      <div className="rad-form-col">
        <span className="rd-label-section rad-muted">Multi select · search · clear</span>
        <Menu
          style={{ width: 220 }}
          search={<SearchBar variant="underline" value={q} onValueChange={setQ} placeholder="Search groups" />}
          maxHeight={220}
          footer={<Button variant="tertiary" size="small" onClick={() => setMulti([])}>Clear selection</Button>}
        >
          {filtered.length === 0 ? (
            <div className="rad-menu__empty rd-body">No results found</div>
          ) : (
            filtered.map((g) => (
              <MenuItem key={g} checkbox checked={multi.includes(g)} label={g} onClick={() => toggle(g)} />
            ))
          )}
        </Menu>
      </div>

      {/* Two-line grouped (Groups / Users) */}
      <div className="rad-form-col">
        <span className="rd-label-section rad-muted">Two-line · grouped</span>
        <Menu style={{ width: 260 }} gap={4}>
          <MenuSection>Groups</MenuSection>
          <MenuItemTwoLine title="Finance" subtitle="Reporting & compliance" activated />
          <MenuItemTwoLine title="Marketing" subtitle="Growth team" />
          <MenuDivider />
          <MenuSection>Users</MenuSection>
          <MenuItemTwoLine title="Priya Nair" subtitle="priya@acme.com" />
          <MenuItemTwoLine title="Alex Kim" subtitle="alex@acme.com" />
        </Menu>
      </div>
    </div>
  )
}

const PEOPLE = [
  { name: 'Audrey Watson' }, { name: 'Priya Nair' }, { name: 'Alex Kim' },
  { name: 'Jordan Lee' }, { name: 'Sam Rivera' },
]
function AvatarsDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="rad-state-row" style={{ gap: 24 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}><Avatar name="Anje Keizer" size={40} /><span className="rd-body">Anje Keizer</span></span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Avatar name="Priya Nair" size={28} /><span className="rd-body">Priya Nair</span></span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Avatar name="Alex Kim" size={20} /><span className="rd-caption">Alex Kim</span></span>
      </div>
      <div className="rad-state-row" style={{ gap: 28 }}>
        <Avatar name="Audrey Watson" size={32} />
        <Avatar name="Priya Nair" size={32} />
        <Avatar name="Jordan Lee" size={32} />
        <Avatar name="Sam Rivera" size={32} />
        <Avatar name="Deveedaas N" size={32} />
        <span className="rd-caption rad-muted">colour-hashed fallbacks</span>
      </div>
      <div className="rad-state-row" style={{ gap: 28 }}>
        <AvatarGroup people={PEOPLE} label />
        <AvatarGroup people={PEOPLE} />
        <AvatarGroup people={PEOPLE.slice(0, 2)} />
      </div>
    </div>
  )
}

function ChipsDemo() {
  const fx = <Icon name="formula" size={14} />
  const funnel = <Icon name="funnel" size={14} />
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h3 className="rd-label-section rad-gallery__subhead">Trigger chips</h3>
        <div className="rad-state-row">
          <TriggerChip kind="attribute" onClick={() => {}}>Attribute</TriggerChip>
          <TriggerChip kind="measure" onClick={() => {}}>Measure</TriggerChip>
          <TriggerChip kind="filter" onClick={() => {}}>Filter <b>Value</b></TriggerChip>
          <TriggerChip kind="crossfilter" onClick={() => {}}>Filter <b>Value</b></TriggerChip>
          <TriggerChip kind="attribute" active>Attribute · pressed</TriggerChip>
          <TriggerChip kind="measure" disabled>Measure · disabled</TriggerChip>
        </div>
        <div className="rad-state-row" style={{ marginTop: 12 }}>
          <TriggerChip kind="attribute" onDelete={() => {}}>Hover me · delete</TriggerChip>
          <TriggerChip kind="measure" onDelete={() => {}}>Revenue</TriggerChip>
          <TriggerChip loading>Loading…</TriggerChip>
        </div>
      </div>
      <div>
        <h3 className="rd-label-section rad-gallery__subhead">Read-only tokens</h3>
        <div className="rad-state-row">
          <Chip kind="measure" leadingIcon={fx}>Revenue</Chip>
          <Chip kind="attribute" leadingIcon={fx}>Formula</Chip>
          <Chip kind="filter" leadingIcon={funnel}>Region</Chip>
          <Chip kind="date" leadingIcon={funnel}>Last 30 days</Chip>
          <Chip kind="error" leadingIcon={<Icon name="exclamation-point-circle" size={14} />}>Invalid</Chip>
        </div>
      </div>
      <div>
        <h3 className="rd-label-section rad-gallery__subhead">Tags</h3>
        <div className="rad-state-row">
          <Tag>Finance</Tag>
          <Tag>Verified</Tag>
          <Tag>DEI</Tag>
        </div>
      </div>
    </div>
  )
}

function IconsDemo() {
  return (
    <div>
      <div className="rad-state-row" style={{ gap: 20, alignItems: 'flex-end', marginBottom: 16 }}>
        <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 10 }}>
          <Icon name="attribute" size={12} /><Icon name="attribute" size={14} /><Icon name="attribute" size={16} /><Icon name="attribute" size={18} />
          <span className="rd-caption rad-muted">xs · s · m · l (12 / 14 / 16 / 18)</span>
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <Icon name="lock" size={20} style={{ color: 'var(--rd-sys-color-content-brand)' }} />
          <Icon name="key" size={20} style={{ color: 'var(--rd-sys-color-content-success)' }} />
          <Icon name="thumb-down" size={20} style={{ color: 'var(--rd-sys-color-content-failure)' }} />
          <span className="rd-caption rad-muted">inherits currentColor</span>
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: 4 }}>
        {ICON_NAMES.map((n) => (
          <div key={n} title={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '14px 6px', border: '1px solid var(--rd-sys-color-border-subtle)', borderRadius: 8 }}>
            <Icon name={n} size={20} />
            <span className="rd-caption rad-muted" style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%', whiteSpace: 'nowrap' }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ControlsDemo() {
  const [radio, setRadio] = useState('a')
  const [seg, setSeg] = useState('table')
  const [t1, setT1] = useState(false)
  const [t2, setT2] = useState(true)
  const [prog, setProg] = useState(60)
  return (
    <div className="rad-controls-grid">
      <div className="rad-form-col">
        <span className="rd-label-section rad-muted">Checkbox — all states</span>
        <div className="rad-state-row">
          <Checkbox aria-label="unchecked" />
          <Checkbox defaultChecked aria-label="checked" />
          <Checkbox indeterminate aria-label="indeterminate" />
          <Checkbox error aria-label="error" />
          <Checkbox error defaultChecked aria-label="error checked" />
          <Checkbox disabled aria-label="disabled" />
          <Checkbox disabled defaultChecked aria-label="disabled checked" />
        </div>
        <span className="rd-label-section rad-muted" style={{ marginTop: 8 }}>Radio — all states</span>
        <div className="rad-state-row">
          <Radio name="rs" aria-label="unchecked" />
          <Radio name="rs2" defaultChecked aria-label="checked" />
          <Radio error aria-label="error" />
          <Radio error defaultChecked aria-label="error checked" />
          <Radio disabled aria-label="disabled" />
          <Radio disabled defaultChecked aria-label="disabled checked" />
        </div>
        <span className="rd-label-section rad-muted" style={{ marginTop: 8 }}>Toggle — all states</span>
        <div className="rad-state-row">
          <Toggle checked={t1} onChange={(e) => setT1(e.target.checked)} aria-label="off" />
          <Toggle checked={t2} onChange={(e) => setT2(e.target.checked)} aria-label="on" />
          <Toggle disabled aria-label="disabled off" />
          <Toggle disabled defaultChecked aria-label="disabled on" />
        </div>
        <span className="rd-label-section rad-muted" style={{ marginTop: 8 }}>With label</span>
        <Radio name="demo" label="Option A" checked={radio === 'a'} onChange={() => setRadio('a')} />
        <Radio name="demo" label="Option B" checked={radio === 'b'} onChange={() => setRadio('b')} />
        <Toggle label="Notifications" defaultChecked />
      </div>
      <div className="rad-form-col">
        <span className="rd-label-section rad-muted">Segmented control</span>
        <SegmentedControl
          options={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]}
          value={seg === 'table' || seg === 'chart' ? 'week' : seg}
          onChange={setSeg}
        />
        <span className="rd-label-section rad-muted" style={{ marginTop: 12 }}>Progress bar</span>
        <ProgressBar value={prog} />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="small" variant="secondary" onClick={() => setProg((p) => Math.max(0, p - 20))}>−20</Button>
          <Button size="small" variant="secondary" onClick={() => setProg((p) => Math.min(100, p + 20))}>+20</Button>
        </div>
      </div>
      <div className="rad-form-col">
        <span className="rd-label-section rad-muted">Stepper — horizontal (sequential)</span>
        <div style={{ paddingRight: 24 }}>
          <Stepper current={2} steps={[{ label: 'Scope' }, { label: 'Rules' }, { label: 'Review' }, { label: 'Done' }]} />
        </div>
        <span className="rd-label-section rad-muted" style={{ marginTop: 20 }}>Vertical (non-sequential)</span>
        <Stepper orientation="vertical" sequential={false} current={1} steps={[{ label: 'Choose columns' }, { label: 'Define access' }, { label: 'Review dependents' }]} />
      </div>
    </div>
  )
}

export default function RadiantApp() {
  return (
    <div className="rad-root rad-gallery">
      <header className="rad-gallery__head">
        <h1 className="rd-display-large">Radiant</h1>
        <p className="rd-body rad-muted">Component gallery — built faithfully from the Radiant 3.0 tokens and Figma specs.</p>
      </header>

      {/* ---------------- Controls ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Controls & indicators</h2>
        <p className="rd-body rad-muted">Checkbox, Radio, Toggle, Segmented control, Progress bar, Stepper (horizontal + vertical).</p>
        <ControlsDemo />
      </section>

      {/* ---------------- Form inputs ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Form inputs</h2>
        <p className="rd-body rad-muted">Text input, Select, Number (with spinners), Search (boxed + underline), Text area · focus / error / disabled from one Field base.</p>
        <FormDemo />
      </section>

      {/* ---------------- Avatars ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Avatar</h2>
        <p className="rd-body rad-muted">Circular avatar with colour-hashed initials fallback (per name), three sizes, and overlapping groups with a “+N” overflow and optional name label.</p>
        <AvatarsDemo />
      </section>

      {/* ---------------- Chips & Tokens ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Chips &amp; Tokens</h2>
        <p className="rd-body rad-muted">Trigger chips (Attribute = blue, Measure = green, Filter = gray, Cross-filter = outlined) — pill, trailing chevron, hover-to-delete badge, pressed &amp; disabled states, loading skeleton. Plus read-only tokens and tags.</p>
        <ChipsDemo />
      </section>

      {/* ---------------- Iconography ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Iconography</h2>
        <p className="rd-body rad-muted">Faithful Radiant icons — each imported from the Figma Iconography page, themed via <code>currentColor</code>, scalable to any size. <code>&lt;Icon name="lock" size=&#123;16&#125; /&gt;</code></p>
        <IconsDemo />
      </section>

      {/* ---------------- Menu / Dropdown ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Menu / Dropdown</h2>
        <p className="rd-body rad-muted">Elevation surface · single-line (icon / chevron / trailing number), checkbox multi-select with search + clear, and two-line grouped items. Hover = ghost-hover, activated = blue highlight + brand label, disabled = 40%.</p>
        <MenuDemo />
      </section>

      {/* ---------------- Modal ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Modal</h2>
        <p className="rd-body rad-muted">M1–M4 sizes · Simple + Wizard (progress bar) · footer built from the real Buttons.</p>
        <ModalDemo />
      </section>

      {/* ---------------- Object Table ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Object table</h2>
        <p className="rd-body rad-muted">1:1 with the Figma _Full Table — checkbox, type, verified, title + footnote, star, tags, author, last edited, Share (tertiary), and the 3-dot overflow. Select rows · +N tag overflow expands.</p>
        <TableDemo />
      </section>

      {/* ---------------- Button ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Button</h2>
        <p className="rd-body rad-muted">Primary / Secondary / Tertiary · hover for live states.</p>
        <h3 className="rd-label-section rad-gallery__subhead">Basic / Large</h3>
        <ButtonMatrix size="basic" />
        <h3 className="rd-label-section rad-gallery__subhead">Small</h3>
        <ButtonMatrix size="small" />
        <h3 className="rd-label-section rad-gallery__subhead">White colorway (on a brand surface)</h3>
        <div className="rad-oncolor">
          <Button variant="primary" colorway="white">Button</Button>
          <Button variant="tertiary" colorway="white">Button</Button>
        </div>
      </section>

      {/* ---------------- Icon button ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Icon button</h2>
        <p className="rd-body rad-muted">Primary / Secondary / Ghost · Standard 32 · Small 24 · XS 20.</p>
        <table className="rad-spec-table">
          <thead>
            <tr><th /><th className="rd-caption">Standard</th><th className="rd-caption">Small</th><th className="rd-caption">XS</th><th className="rd-caption">Disabled</th></tr>
          </thead>
          <tbody>
            {IB_VARIANTS.map((v) => (
              <tr key={v}>
                <td className="rd-caption rad-spec-rowlabel">{v}</td>
                {IB_SIZES.map((sz) => (
                  <td key={sz}><IconButton variant={v} size={sz} icon={<Gear />} aria-label="Settings" /></td>
                ))}
                <td><IconButton variant={v} size="standard" icon={<Gear />} aria-label="Settings" disabled /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ---------------- Split button ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Split button</h2>
        <p className="rd-body rad-muted">Left action + right chevron · click the chevron to open the menu.</p>
        <div className="rad-oncolor" style={{ background: 'transparent', padding: 0 }}>
          <SplitButton variant="primary" menuItems={[{ label: 'Option one' }, { label: 'Option two' }, { label: 'Option three' }]}>Button</SplitButton>
          <SplitButton variant="secondary" menuItems={[{ label: 'Option one' }, { label: 'Option two' }, { label: 'Option three' }]}>Button</SplitButton>
        </div>
      </section>

      {/* ---------------- Link ---------------- */}
      <section className="rad-gallery__section">
        <h2 className="rd-title-page">Link</h2>
        <p className="rd-body rad-muted">Weight (Light / Medium) × tone · underlines on hover.</p>
        <table className="rad-spec-table">
          <thead>
            <tr><th /><th className="rd-caption">Blue</th><th className="rd-caption">Black</th><th className="rd-caption">Gray</th></tr>
          </thead>
          <tbody>
            {(['light', 'medium'] as const).map((w) => (
              <tr key={w}>
                <td className="rd-caption rad-spec-rowlabel">{w}</td>
                {(['blue', 'black', 'gray'] as LinkTone[]).map((t) => (
                  <td key={t}><Link weight={w} tone={t} href="#radiant" onClick={(e) => e.preventDefault()}>Link</Link></td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="rd-label-section rad-gallery__subhead">White tone (on a brand surface)</h3>
        <div className="rad-oncolor">
          <Link tone="white" href="#radiant" onClick={(e) => e.preventDefault()}>Link</Link>
          <Link weight="medium" tone="white" href="#radiant" onClick={(e) => e.preventDefault()}>Link</Link>
        </div>
      </section>
    </div>
  )
}
