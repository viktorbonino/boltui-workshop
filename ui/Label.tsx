'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { tv, VariantProps } from 'tailwind-variants'

const labelVariants = tv({
  base: 'text-default text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
})

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={labelVariants({
      class: className,
    })}
    {...props}
  />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }
