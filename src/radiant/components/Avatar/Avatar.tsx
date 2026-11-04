import React from 'react'
import './Avatar.css'

const HUES = ['purple', 'blue', 'green', 'red', 'yellow', 'gray'] as const
export type AvatarHue = (typeof HUES)[number]

export interface AvatarProps {
  name: string
  src?: string
  size?: number
  /** Fixed fallback colour; by default it's derived from the name. */
  hue?: AvatarHue
  /** White separating ring (used inside a group). */
  ring?: boolean
  className?: string
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase()
}

function hueFor(name: string): AvatarHue {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return HUES[h % HUES.length]
}

/** Radiant — Avatar. Circular image with a colour-hashed initials fallback. */
export function Avatar({ name, src, size = 32, hue, ring, className }: AvatarProps) {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.4) }
  return (
    <span
      className={['rad-avatar', `rad-avatar--${hue ?? hueFor(name)}`, ring && 'rad-avatar--ring', className].filter(Boolean).join(' ')}
      style={style}
      title={name}
    >
      {src ? (
        <img className="rad-avatar__img" src={src} alt={name} />
      ) : (
        <span className="rad-avatar__initials" aria-hidden="true">{initials(name)}</span>
      )}
    </span>
  )
}

export default Avatar
