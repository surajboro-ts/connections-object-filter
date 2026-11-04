import React from 'react'
import { Avatar } from './Avatar'
import './Avatar.css'

export interface AvatarPerson { name: string; src?: string }

export interface AvatarGroupProps {
  people: AvatarPerson[]
  /** Max avatars rendered before collapsing to a “+N”. Default 3. */
  max?: number
  size?: number
  /** Append “{first name} +N” after the stack (Figma group-with-label). */
  label?: boolean
  className?: string
}

/** Radiant — Avatar group. 1–3 overlapping avatars + “+N”, optional name label. */
export function AvatarGroup({ people, max = 3, size = 28, label, className }: AvatarGroupProps) {
  const shown = people.slice(0, max)
  const overflow = people.length - shown.length
  return (
    <span className={['rad-avatar-group', className].filter(Boolean).join(' ')}>
      <span className="rad-avatar-group__stack">
        {shown.map((p, i) => (
          <Avatar key={i} name={p.name} src={p.src} size={size} ring />
        ))}
        {!label && overflow > 0 && (
          <span className="rad-avatar-group__more" style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}>
            +{overflow}
          </span>
        )}
      </span>
      {label && (
        <span className="rad-avatar-group__name rd-body">
          {people[0]?.name}{overflow > 0 ? ` +${overflow}` : ''}
        </span>
      )}
    </span>
  )
}

export default AvatarGroup
