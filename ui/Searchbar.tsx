import { Search } from 'lucide-react'
import { forwardRef } from 'react'
import { cn } from 'tailwind-variants'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Searchbar = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative w-full rounded-default">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-subtle" aria-hidden="true" />
        </div>
        <input
          className={cn(
            'block w-full rounded-default border border-base bg-base py-2 pl-10 text-xs shadow-default outline-none transition-colors duration-200 placeholder:text-subtle focus:border-emphasis focus:ring-1 focus:ring-subtle',
            className
          )({
            twMerge: true,
          })}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Searchbar.displayName = 'Input'

export default Searchbar
