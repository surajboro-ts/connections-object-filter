# Radiant — Explainer card

A 340px card that explains the thing you just pointed at.

Built from the Figma spec **Radiant 3.0 → Explainer card, node `18310:23047`**
(file `1QlRveXx4wppvDXyPVWUTK`), because the Radiant library copy it was added to
predated the component. Written 29 Sep 2026.

Two forms, both in one component:

- **Titled** — opened by a *click*. Carries a title and a dismiss ×, and persists
  until dismissed. Media and actions are optional and belong to this form.
- **Compact** — opened by *hover*. Body text alone on one row; the spec gives it
  no dismiss, since moving the pointer away closes it.

The component draws the **surface only**. Placing it, showing it and hiding it are
the caller's job, so it works as a popover, an inline aside or a hover card
without assuming any one of them.

---

## Dependencies

| Needs | Why |
|---|---|
| `components/IconButton` | the dismiss button (ghost, small) |
| `components/Icon` | the `cross` glyph |
| `tokens/index.css` | every value below is a token; nothing is hardcoded |

If the target project has the Radiant library, there is nothing else to wire. If
it does **not**, see [Standalone tokens](#standalone-tokens) at the end.

---

## Spec

| | |
|---|---|
| Width | 340px fixed (`min` and `max` both set) |
| Padding | 20px — `spacing-e` |
| Gap | 12px — `spacing-c` |
| Radius | 6px — `radius-6` |
| Background | `bg-raised` |
| Shadow | `elevation-menu` |
| Title | Section Label, 18/24 — `.rd-label-section` |
| Body | Body Normal, 14/20 — `.rd-body` |
| Media | Gray/10A fill, radius 6, full content width; **170px tall when empty** (the spec's placeholder block) |
| Actions | right-aligned, 16px gap — small Tertiary + small Primary |
| Dismiss | ghost IconButton, small, drawn in Content/Primary |

Compact form: body is 264px (340 − 2×20 padding − 12 gap − 24 dismiss).

---

## `ExplainerCard.tsx`

```tsx
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
```

---

## `ExplainerCard.css`

```css
/**
 * Radiant — Explainer card (Figma "Explainer card" 18310:23047).
 *
 *   Card      — 340px fixed, padding 20 (E), gap 12 (C), radius 6, bg Raised,
 *               Elevation/Menu.
 *   Titled    — column: [title · dismiss] / body / media / actions.
 *   Compact   — row: [body · dismiss]. No title, media or actions; this is the
 *               hover form, so it usually has no dismiss either.
 *   Media     — Gray/10A, radius 6, full content width. Empty it holds the
 *               spec's 170px placeholder; with content it sizes to it.
 *   Actions   — right-aligned, gap 16 (D); small Tertiary + small Primary.
 */
.rad-explainer {
  box-sizing: border-box;
  display: flex;
  gap: var(--rd-sys-spacing-c); /* 12px */
  align-items: flex-start;
  width: 340px;
  min-width: 340px;
  max-width: 340px;
  padding: var(--rd-sys-spacing-e); /* 20px */
  background: var(--rd-sys-color-bg-raised);
  border-radius: var(--rd-sys-radius-6);
  box-shadow: var(--rd-sys-elevation-menu);
}
.rad-explainer--titled { flex-direction: column; }

/* Title row — the title takes the width the dismiss button leaves. */
.rad-explainer__head {
  display: flex;
  align-items: center;
  gap: var(--rd-sys-spacing-c);
  width: 100%;
}
.rad-explainer__title {
  flex: 1 1 0;
  min-width: 0;
  color: var(--rd-sys-color-content-primary);
}

.rad-explainer__body { color: var(--rd-sys-color-content-primary); }
.rad-explainer--titled .rad-explainer__body { width: 100%; }
/* Compact: body beside the dismiss — 264px at the spec's 340 card. */
.rad-explainer--compact .rad-explainer__body { flex: 1 1 auto; min-width: 0; }
/* Opt-in line cap (maxLines); -webkit-line-clamp is the cross-browser spelling. */
.rad-explainer__body[data-clamp] {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rad-explainer__media {
  width: 100%;
  box-sizing: border-box;
  background: var(--rad-gray-10a); /* Figma Color/Gray/10A — no semantic alias for it */
  border-radius: var(--rd-sys-radius-6);
  overflow: hidden;
}
.rad-explainer__media:empty { height: 170px; } /* the spec's placeholder block */

.rad-explainer__actions {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: var(--rd-sys-spacing-d); /* 16px */
  width: 100%;
}

/* The dismiss never shrinks; in the compact form it sits against the first body line. */
.rad-explainer > .rad-iconbtn,
.rad-explainer__head .rad-iconbtn { flex: none; }
/* Drawn in Content/Primary, not the ghost button's muted secondary — the spec
   gives the card's dismiss the same weight as its title. Activate still goes brand. */
.rad-explainer .rad-iconbtn--ghost { color: var(--rd-sys-color-content-primary); }
.rad-explainer .rad-iconbtn--ghost:active,
.rad-explainer .rad-iconbtn--ghost[data-force-state='activated'] { color: var(--rd-sys-color-content-brand); }
```

---

## Install

1. Drop both files at `src/radiant/components/ExplainerCard/`.
2. Add to `src/radiant/components/index.ts` (kept alphabetical, after `Divider`):

```ts
export { ExplainerCard } from './ExplainerCard/ExplainerCard'
export type { ExplainerCardProps } from './ExplainerCard/ExplainerCard'
```

3. Bump the component count in `src/radiant/README.md` and add `ExplainerCard` to
   its component list.

---

## Usage

**Click-opened, full card**

```tsx
<ExplainerCard
  title="Net revenue definition"
  media={<pre>{sql}</pre>}
  actions={<Button variant="primary" size="small">Got it</Button>}
  onDismiss={close}
>
  486 queries · 11 users · last seen 1d ago
</ExplainerCard>
```

**Hover-opened, compact** — no title, no dismiss:

```tsx
<ExplainerCard maxLines={4}>
  Exclude rows where Is Deleted is true, unless the user asks for deleted records.
</ExplainerCard>
```

---

## Vanilla variant

For prototypes that are one self-contained HTML file rather than a React app, the
same markup and class names come from a template helper, so the component's own
CSS still governs every state. `RIC(name, size)` is a local icon helper that
inlines an SVG; swap it for whatever the target uses.

```js
const EXCARD=({title=null,body=null,media=null,actions=null,dismiss=true,cls=''})=>{
  const x=dismiss?`<button type="button" class="rad-iconbtn rad-iconbtn--ghost rad-iconbtn--small"
      data-ex-x aria-label="Dismiss"><span class="rad-iconbtn__icon">${RIC('cross',16)}</span></button>`:'';
  const b=body==null?'':`<div class="rad-explainer__body rd-body">${body}</div>`;
  return title==null
    ? `<div class="rad-explainer rad-explainer--compact${cls?' '+cls:''}" role="dialog">${b}${x}</div>`
    : `<div class="rad-explainer rad-explainer--titled${cls?' '+cls:''}" role="dialog"
        ><div class="rad-explainer__head"
          ><div class="rad-explainer__title rd-label-section">${title}</div>${x}</div>${b}${
        media==null?'':`<div class="rad-explainer__media">${media}</div>`}${
        actions==null?'':`<div class="rad-explainer__actions">${actions}</div>`}</div>`;
};
```

Wire the dismiss wherever the card is inserted:

```js
const xb = el.querySelector('[data-ex-x]');
if (xb) xb.onclick = closeTheCard;
```

### Using it as a popover

The card has no opinion about position. In the V3 prototype a `.pop` wrapper does
only that, and the card brings the surface:

```css
.pop { position: fixed; z-index: 60; opacity: 0; transform: translateY(-4px);
       transition: opacity .14s, transform .18s cubic-bezier(.32,.72,0,1); }
.pop.in { opacity: 1; transform: none; }
/* the card is 340 by spec; only a viewport narrower than that overrides it */
@media (max-width: 376px) {
  .pop .rad-explainer { width: auto; min-width: 0; max-width: calc(100vw - 24px); }
}
```

---

## Deliberate deviations from Figma

Both were judgement calls — worth revisiting if the target project disagrees.

1. **The 4-line cap is opt-in, not default.** Figma notes "maximum text length —
   4 lines" as a content rule. Enforcing it in CSS would silently truncate copy
   the component was handed, which fails worse than growing, so it is the
   `maxLines` prop instead.
2. **Actions take whatever Buttons you pass.** The spec pairs a small tertiary
   with a small primary. The slot does not enforce that pairing or the small
   size, because the consuming project may have its own CTA sizing convention.

One thing the spec does not cover: at 340px fixed, long monospace content in the
media slot will overflow. Wrapping it (`white-space: pre-wrap`) reads better than
a sideways scroll inside a small card — a line you have to drag into view is a
line you don't read.

---

## Standalone tokens

If the target project has no Radiant, these are the values the component
references. Light mode shown; in Radiant each is re-pointed under
`[data-theme='dark']`, so the card themes itself with no extra rules.

```css
:root {
  --rd-sys-spacing-c: 12px;
  --rd-sys-spacing-d: 16px;
  --rd-sys-spacing-e: 20px;
  --rd-sys-radius-6: 6px;
  --rd-sys-color-bg-raised: #ffffff;        /* dark: darkgray-15 */
  --rd-sys-color-content-primary: #1d232f;
  --rd-sys-color-content-brand: #2770ef;
  --rad-gray-10a: rgba(192, 198, 207, 0.12); /* #C0C6CF @ 12% */
  --rd-sys-elevation-menu:
    0 0 4px 0 rgba(25, 35, 49, 0.08),
    0 12px 24px 0 rgba(25, 35, 49, 0.12);
}
/* type classes the markup uses */
.rd-label-section { font: 600 18px/24px 'Geist', system-ui, sans-serif; letter-spacing: -0.4px; margin: 0; }
.rd-body          { font: 400 14px/20px 'Geist', system-ui, sans-serif; margin: 0; }
```

You will also need an `IconButton` (ghost, small — a 24px transparent circle with
a 16px glyph, washing on hover) and a `cross` icon, or substitute your own
dismiss button and keep the `.rad-iconbtn` class names so the CSS above still
colours it.
