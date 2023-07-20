'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cnBase } from 'tailwind-variants'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cnBase(
      'peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent outline-none transition-colors ease-in-out focus:ring-subtle focus:ring-offset-2 focus:ring-offset-default placeholder:focus:ring-offset-default focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 radix-state-checked:bg-primary radix-state-unchecked:bg-primary/25',
      props.required ? 'ring-2 ring-danger ring-offset-2 ring-offset-default' : '',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cnBase(
        'pointer-events-none block h-4 w-4 rounded-full bg-base shadow-default ring-0 transition-transform ease-in-out radix-disabled:opacity-50 radix-state-checked:translate-x-5 radix-state-unchecked:translate-x-0 rtl:radix-state-checked:-translate-x-4'
      )}
    />
  </SwitchPrimitives.Root>
))

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
