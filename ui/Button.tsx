'use client'

import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

export const button = tv({
  base: 'inline-flex gap-2 items-center rounded-default border justify-center font-medium transition-colors duration-200 outline-none focus-visible:ring-2 disabled:cursor-not-allowed',
  variants: {
    size: {
      xs: 'text-xs px-2 py-1',
      sm: 'text-xs px-3 py-1.5',
      md: 'text-xs px-4 py-2',
      lg: 'text-sm px-4 py-2',
      xl: 'text-base px-6 py-3',
    },
    variant: {
      primary: `
        border-transparent bg-primary text-inverted shadow-default
        hover:bg-muted disabled:opacity-50 active:bg-primary-active
        focus:ring-default focus:ring-offset-2 focus:ring-offset-default`,
      secondary:
        'shadow-default border-base text-default hover:border-emphasis hover:bg-foreground bg-base disabled:opacity-50 focus:ring-subtle active:bg-subtle focus:ring-offset-2 focus:ring-offset-default',
      ghost:
        'border-transparent text-default hover:bg-subtle focus:ring-subtle  bg-transparent disabled:opacity-50 active:bg-accent',
      danger:
        'shadow-default bg-danger border-transparent text-danger-inverted hover:bg-danger-subtle hover:text-danger hover:border-danger active:bg-danger-active disabled:opacity-50 focus:ring-danger focus:ring-offset-2 focus:ring-offset-default',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { size, variant, className, asChild = false, ...rest } = props
  const Comp = asChild ? Slot : 'button'
  return <Comp ref={ref} className={button({ size, variant, className })} {...rest} />
})

Button.displayName = 'Button'

export default Button
