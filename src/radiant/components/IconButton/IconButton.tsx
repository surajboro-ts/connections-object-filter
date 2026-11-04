import React from 'react'
import './IconButton.css'

export type IconButtonVariant = 'primary' | 'secondary' | 'ghost'
export type IconButtonSize = 'standard' | 'small' | 'xs'
export type IconButtonColorway = 'standard' | 'white'
export type IconButtonForceState = 'default' | 'hover' | 'activated'

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: IconButtonVariant
  size?: IconButtonSize
  colorway?: IconButtonColorway
  /** The icon element (sized via CSS font-size / em). */
  icon: React.ReactNode
  /** Accessible label — required since there's no visible text. */
  'aria-label': string
  htmlType?: 'button' | 'submit' | 'reset'
  forceState?: IconButtonForceState
  /** Red notification badge, top-right (Figma "Icon buttton" Type=Notif). */
  dot?: boolean
}

/**
 * Radiant — Icon button. Circular. Primary (filled blue), Secondary (filled gray),
 * Ghost (transparent → ghost washes). Sizes Standard 32 / Small 24 / XS 20.
 */
export function IconButton({
  variant = 'secondary',
  size = 'standard',
  colorway = 'standard',
  icon,
  htmlType = 'button',
  forceState,
  dot,
  disabled,
  className,
  ...rest
}: IconButtonProps) {
  const classes = [
    'rad-iconbtn',
    `rad-iconbtn--${variant}`,
    `rad-iconbtn--${size}`,
    colorway === 'white' && 'rad-iconbtn--on-color',
    dot && 'rad-iconbtn--dot',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={htmlType}
      className={classes}
      disabled={disabled}
      data-force-state={forceState}
      {...rest}
    >
      <span className="rad-iconbtn__icon" aria-hidden="true">
        {icon}
      </span>
      {dot && <span className="rad-iconbtn__dot" aria-hidden="true" />}
    </button>
  )
}

export default IconButton
