import React from 'react'
import './Icon.css'

/**
 * Radiant — Icon. Faithful SVG glyphs exported from the Radiant 3.0 Iconography
 * page. Each SVG is imported raw, its fills swapped to currentColor (so it
 * inherits text colour + theme) and its fixed width/height stripped so it
 * scales to the `size` prop. Add icons by dropping their SVG in ./svg.
 */
const raw = import.meta.glob('../../icons/svg/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const nameFromPath = (p: string) => p.replace(/.*\/(.+)\.svg$/, '$1')

const process = (svg: string) =>
  svg
    // fills + strokes → currentColor (Figma exports black / #1D232F). Multi-colour
    // file-type icons (pdf/excel/…) keep their brand colours since only the dark
    // neutral is swapped.
    .replace(/fill="(black|#000000|#000|#1[Dd]232[Ff])"/g, 'fill="currentColor"')
    .replace(/stroke="(black|#000000|#000|#1[Dd]232[Ff])"/g, 'stroke="currentColor"')
    // strip the intrinsic width/height so CSS controls the size
    .replace(/(<svg\b[^>]*?)\swidth="[\d.]+"\sheight="[\d.]+"/, '$1')

const REGISTRY: Record<string, string> = {}
for (const [path, svg] of Object.entries(raw)) REGISTRY[nameFromPath(path)] = process(svg)

/** All icon names available in the library, sorted. */
export const ICON_NAMES = Object.keys(REGISTRY).sort()

export interface IconProps {
  name: string
  /** Pixel size (square). Default 16. */
  size?: number
  /** Overrides the inherited colour. */
  color?: string
  /** Accessible label; omit for a decorative icon. */
  title?: string
  className?: string
  style?: React.CSSProperties
}

/** Radiant — Icon. `<Icon name="globe" size={16} />` */
export function Icon({ name, size = 16, color, title, className, style }: IconProps) {
  const svg = REGISTRY[name]
  if (svg == null) {
    if (import.meta.env?.DEV) console.warn(`[Radiant] Unknown icon "${name}"`)
    return null
  }
  return (
    <span
      className={['rad-icon', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, ...(color ? { color } : null), ...style }}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Icon
