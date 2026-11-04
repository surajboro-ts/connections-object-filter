import React from 'react'
import './Stepper.css'

export interface StepperStep { label?: React.ReactNode }
export interface StepperProps {
  steps: StepperStep[]
  /** 0-based index of the current step. Earlier steps render as completed. */
  current: number
  orientation?: 'horizontal' | 'vertical'
  /** Numbered circles joined by connector lines. Non-sequential = empty circles, no lines. */
  sequential?: boolean
  className?: string
}

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 8.5l2.5 2.5L12 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

type StepState = 'completed' | 'current' | 'upcoming'

/** Radiant — Stepper. Sequential (numbered + connectors) or non-sequential (empty). */
export function Stepper({ steps, current, orientation = 'horizontal', sequential = true, className }: StepperProps) {
  const hasLabels = steps.some((s) => s.label != null)
  return (
    <div
      className={[
        'rad-stepper',
        `rad-stepper--${orientation}`,
        hasLabels && 'has-labels',
        !sequential && 'is-nonseq',
        className,
      ].filter(Boolean).join(' ')}
    >
      {steps.map((s, i) => {
        const state: StepState = i < current ? 'completed' : i === current ? 'current' : 'upcoming'
        return (
          <React.Fragment key={i}>
            <div className="rad-stepper__step">
              <span className={`rad-stepper__num rad-stepper__num--${state}`}>
                {state === 'completed' ? <Check /> : sequential ? i + 1 : null}
              </span>
              {s.label != null && (
                <span className={`rad-stepper__label rad-stepper__label--${state} rd-body`}>{s.label}</span>
              )}
            </div>
            {sequential && i < steps.length - 1 && (
              <span className={`rad-stepper__line${i < current ? ' is-done' : ''}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Stepper
