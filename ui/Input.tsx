import * as React from 'react'
import { cn } from 'tailwind-variants'
import { Label } from './Label'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  leftElement?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftElement, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        <Label htmlFor={props.name}>{props.label}</Label>
        <p className="text-xs leading-none text-subtle peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {props.description}
        </p>
        <div className="relative">
          {leftElement ? (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {leftElement}
            </div>
          ) : null}
          <input
            className={cn(
              'block w-full rounded-default border border-base bg-base px-4 py-2 text-xs font-medium text-default shadow-default outline-none transition-colors duration-200 placeholder:text-subtle invalid:border-danger focus:border-emphasis focus:ring-1 focus:ring-subtle focus:invalid:border-danger focus:invalid:ring-danger disabled:cursor-not-allowed disabled:opacity-50',
              leftElement ? 'pl-10' : '',
              className
            )({
              twMerge: true,
            })}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
