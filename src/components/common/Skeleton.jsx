import { classNames } from '../../utils/formatters.js'

/**
 * Skeleton — pulse + shimmer placeholder blocks (CSS-driven, honors
 * prefers-reduced-motion via the global media query).
 *
 * <Skeleton className="h-4 w-32" />           — single line
 * <Skeleton.Text lines={3} />                 — paragraph
 * <Skeleton.Card />                           — full card placeholder
 */
function Skeleton({ className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={classNames('skeleton animate-pulse', className)}
      {...props}
    />
  )
}

function SkeletonText({ lines = 3, className }) {
  return (
    <div className={classNames('flex flex-col gap-2.5', className)} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className="h-3.5"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

function SkeletonCard({ className }) {
  return (
    <div className={classNames('glass-card p-5 sm:p-6', className)} aria-hidden="true">
      <div className="flex items-center gap-3 mb-5">
        <Skeleton className="size-11 rounded-xl" />
        <div className="flex-1 flex flex-col gap-2">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  )
}

Skeleton.Text = SkeletonText
Skeleton.Card = SkeletonCard

export default Skeleton
