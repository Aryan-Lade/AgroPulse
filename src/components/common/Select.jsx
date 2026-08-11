import { forwardRef } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi2'
import { classNames } from '@/utils/formatters.js'

/**
 * Select — styled native <select> that matches the glass design system.
 */
const Select = forwardRef(function Select(
  { label, helper, error, options = [], placeholder, className, id, ...props },
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
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={classNames(
            'w-full appearance-none glass rounded-xl px-4 py-2.5 pr-10 text-sm text-ink',
            'outline-none focus:border-primary-500/50 focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer',
            error && 'border-accent-rose/50 focus:ring-accent-rose/20',
            // Dim the text when the placeholder (empty) value is selected
            !props.value && 'text-ink-3',
          )}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        >
          {/* Bug fix #3 — placeholder must not be "disabled" alone; pairing with
              a hidden value="" ensures the controlled <select> always shows it
              when value="" on mount / after navigation resets the parent state. */}
          {placeholder && (
            <option value="" disabled hidden>{placeholder}</option>
          )}
          {options.map((opt) =>
            typeof opt === 'string'
              ? <option key={opt} value={opt}>{opt}</option>
              : <option key={opt.value} value={opt.value}>{opt.label}</option>
          )}
        </select>
        <HiOutlineChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 text-base pointer-events-none" />
      </div>
      {(error || helper) && (
        <p className={classNames('text-xs', error ? 'text-accent-rose' : 'text-ink-3')}>
          {error ?? helper}
        </p>
      )}
    </div>
  )
})

export default Select
