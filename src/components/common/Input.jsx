import { forwardRef } from 'react'
import { classNames } from '@/utils/formatters.js'

/**
 * Input — styled form input that matches the app's glass design system.
 * Supports label, helper text, error state, and leading/trailing adornments.
 */
const Input = forwardRef(function Input(
  { label, helper, error, leading: Leading, trailing: Trailing, className, id, ...props },
  ref,
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={classNames('flex flex-col gap-1.5', className)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-ink-2 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Leading && (
          <span className="absolute left-3 text-ink-3 text-base pointer-events-none">
            <Leading />
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={classNames(
            'w-full glass rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-3',
            'outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all',
            error && 'border-accent-rose/50 focus:ring-accent-rose/20',
            Leading  && 'pl-9',
            Trailing && 'pr-9',
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error || helper ? `${inputId}-hint` : undefined}
          {...props}
        />
        {Trailing && (
          <span className="absolute right-3 text-ink-3 text-base pointer-events-none">
            <Trailing />
          </span>
        )}
      </div>
      {(error || helper) && (
        <p
          id={`${inputId}-hint`}
          className={classNames(
            'text-xs leading-relaxed',
            error ? 'text-accent-rose' : 'text-ink-3',
          )}
        >
          {error ?? helper}
        </p>
      )}
    </div>
  )
})

export default Input
