# Radiant component library

A faithful, from-scratch React + CSS implementation of the **Radiant 3.0** design
system (built from the Figma specs + tokens). This folder is **fully self-contained** —
it imports only React and files within this folder. Drop it into any React + Vite
project and use it.

- **41 components** (`components/`) — Button, IconButton, SplitButton, Link, Checkbox,
  Radio, Toggle, SegmentedControl, Input, Textarea, NumberInput, Select, SearchBar,
  Field, Chip, TriggerChip, Tag, Avatar/AvatarGroup, Icon, Menu, Modal, Tabs, Banner,
  Divider, ExplainerCard, Tooltip, Toast, Spinner, PageLoader, Shimmer, ProgressBar, Stepper,
  ListItem, Breadcrumb, Pagination, ObjectTable, OrgSwitcher, UserProfile, NavSearch,
  TopNav, SideNav.
  TopNav and SideNav are the app shell: both are slot- or prop-driven and carry
  no product data, and they are designed to be used together.
- **189 icons** (`icons/svg/`) — themeable via `currentColor`, any size.
- **Design tokens** (`tokens/`) — color (light + dark), spacing, radius, typography,
  elevation.
- **Living gallery** (`RadiantApp.tsx` + `radiant.css`) — renders every component with
  its states/variants. Use it as your visual reference and smoke test.

---

## Requirements

| Need | Detail |
|---|---|
| **React 18** | `react` + `react-dom` `^18` (peer deps — the only runtime deps). |
| **Vite** | **Required as-is.** `components/Icon/Icon.tsx` loads the SVGs with `import.meta.glob('../../icons/svg/*.svg', { query: '?raw', eager: true })`, a Vite feature. On any other bundler you must replace that one block (see *Non-Vite* below). Everything else is plain React + CSS. |
| **Geist font** *(optional)* | Tokens request `'Geist'` / `'Geist Mono'` with a full system fallback stack, so text renders fine without it. For pixel-faithful output, add Geist (e.g. `@fontsource-variable/geist` + `@fontsource-variable/geist-mono`, or Google Fonts). |

No CSS framework, no component library, no state manager — just React and these files.

---

## Install (into another project)

1. **Copy this whole folder** to `src/radiant` in the target project.
2. Ensure the peer deps + Vite are present:
   ```bash
   npm install react react-dom
   npm install -D vite @vitejs/plugin-react
   ```
3. **Import the tokens once** at your app entry (before rendering) — this defines all
   `--rd-sys-*` CSS variables, the reset, and the typography classes:
   ```ts
   import './radiant/tokens/index.css'
   ```
4. Use components:
   ```tsx
   import { Button, ObjectTable, Icon, Modal, Tooltip } from './radiant/components'

   <Button variant="primary" leadingIcon={<Icon name="plus" size={16} />}>
     Secure column
   </Button>
   ```

That's it. Every component ships its own scoped CSS (imported by the component file),
so there's nothing else to wire.

---

## Tokens & conventions

- **Spacing** — `--rd-sys-spacing-a…f` = `4 / 8 / 12 / 16 / 20 / 24` px.
- **Radius** — `--rd-sys-radius-4/6/8/16`.
- **Typography classes** (use these; don't hand-roll font sizes/weights):
  `rd-display-large`, `rd-title-page`, `rd-title-modal`, `rd-label-section` (18/600),
  `rd-label-content` (16/600), `rd-label-subhead` (14/600), `rd-body`, `rd-body-large`,
  `rd-caption` (12).
- **Color** — semantic tokens `--rd-sys-color-*` (content / bg / border / brand /
  success / …). **Theming:** light lives on `:root`; dark overrides live under
  `[data-theme='dark']`. Toggle by setting `document.documentElement.dataset.theme =
  'dark'`.
- **Icons** — `<Icon name="lock" size={16} />`. To add one, drop its SVG in
  `icons/svg/` (black/`#1D232F` fills auto-swap to `currentColor`). `ICON_NAMES` lists
  them all.

---

## The gallery

`RadiantApp.tsx` is a single-page catalog of every component + state. Wire it to a route
to browse the library live:
```tsx
import RadiantApp from './radiant/RadiantApp'
// e.g. render <RadiantApp /> at #radiant
```

---

## Non-Vite bundlers

Only `Icon.tsx` is Vite-specific. Replace its `import.meta.glob(...)` registry with your
bundler's raw-import equivalent (webpack `require.context`, an esbuild loader, or a small
build step that inlines `icons/svg/*.svg` into a `Record<string,string>`). The
`process()` transform (fills → `currentColor`, strip intrinsic width/height) stays the
same.

---

## Known gotchas (already fixed here — keep them if you refactor)

1. **Divider** sets `flex-shrink: 0`. Without it, a 1px `<hr>` inside an *overflowing*
   flex column gets shrunk to `height: 0` and vanishes — but only for tall content, so
   it looks like an intermittent bug.
2. **Clamp / "Show more"** UI must recompute on **container** resize (grow *and* shrink)
   via `ResizeObserver`, not a window `resize` listener — otherwise it stays stuck in the
   truncated state when the container grows back.
