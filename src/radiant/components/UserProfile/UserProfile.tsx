import React from 'react'
import { Avatar } from '../Avatar/Avatar'
import './UserProfile.css'

export interface UserProfileProps {
  /** The signed-in person (initials fallback derived from the name). */
  user: string
  avatarSrc?: string
  onClick?: () => void
  className?: string
}

/**
 * Radiant — User profile, RIGHT half of the account capsule (Figma 18244:18931).
 * An independent 32px secondary-filled tile holding a 28px avatar (2px inset).
 * Outer (right) corners fully round (20px), inner (left) corners near-square (2px)
 * so it mirrors the OrgSwitcher. Works independently from it.
 */
export function UserProfile({ user, avatarSrc, onClick, className }: UserProfileProps) {
  return (
    <button
      type="button"
      className={['rad-userprofile', className].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={`Account — ${user}`}
    >
      <Avatar name={user} src={avatarSrc} size={28} />
    </button>
  )
}

export default UserProfile
