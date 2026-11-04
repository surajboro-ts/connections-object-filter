import React from 'react'
import './Link.css'

export type LinkWeight = 'light' | 'medium'
export type LinkTone = 'blue' | 'white' | 'black' | 'gray'
export type LinkSize = 'medium' | 'small'

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  weight?: LinkWeight
  /** Color tone from the Figma "Type" axis. */
  tone?: LinkTone
  /** 14px (medium, default) or 12px (small). */
  size?: LinkSize
  /** Always underlined (Figma's underlined variant), not just on hover. */
  underline?: boolean
  /** Preview-only: pin the hover (underline) state. */
  forceHover?: boolean
  children?: React.ReactNode
}

/**
 * Radiant — Link. Text link: weight (Light/Medium) × tone (Blue/White/Black/Gray).
 * Underlines on hover (Figma "State=Hover").
 */
export function Link({
  weight = 'light',
  tone = 'blue',
  size = 'medium',
  underline,
  forceHover,
  className,
  children,
  ...rest
}: LinkProps) {
  const classes = [
    'rad-link',
    `rad-link--${weight}`,
    `rad-link--${tone}`,
    // Size only emits for 'small' — 'medium' is the base size, and a `--medium`
    // class here would collide with the medium *weight* rule.
    size === 'small' && 'rad-link--small',
    underline && 'rad-link--underline',
    forceHover && 'rad-link--force-hover',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  )
}

export default Link
