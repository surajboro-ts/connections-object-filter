import React from 'react'
import './Button.css'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
/** Basic and Large share geometry in Figma; kept distinct for intent. */
export type ButtonSize = 'basic' | 'large' | 'small'
/** Standard = on light surfaces; white = on colored/brand surfaces (on-color tokens). */
export type ButtonColorway = 'standard' | 'white'
/** Forces a visual state for previews/galleries. Real interaction uses :hover/:active. */
export type ButtonForceState = 'default' | 'hover' | 'activated'

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant?: ButtonVariant
  size?: ButtonSize
  colorway?: ButtonColorway
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  /** Native button type (defaults to "button" so it never submits a form by accident). */
  htmlType?: 'button' | 'submit' | 'reset'
  /** Preview-only: pin the button to a visual state. Omit for real interactivity. */
  forceState?: ButtonForceState
  children?: React.ReactNode
}

/**
 * Radiant — Button. Faithful to the Figma "Button" component set:
 * Primary / Secondary / Tertiary × Basic / Small, with Default/Hover/Activated/Disabled.
 */
export function Button({
  variant = 'primary',
  size = 'basic',
  colorway = 'standard',
  leadingIcon,
  trailingIcon,
  htmlType = 'button',
  forceState,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    'rad-btn',
    `rad-btn--${variant}`,
    `rad-btn--${size}`,
    colorway === 'white' && 'rad-btn--on-color',
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
      {leadingIcon && (
        <span className="rad-btn__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      {children != null && <span className="rad-btn__label">{children}</span>}
      {trailingIcon && (
        <span className="rad-btn__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  )
}

export default Button
