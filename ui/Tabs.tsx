'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'
import { cn, tv, VariantProps } from 'tailwind-variants'

const tabStyles = tv({
  slots: {
    list: 'inline-flex shrink-0 items-center justify-center rounded-default border border-base p-0.5',
    trigger:
      'border-emphasis data-[state=active]:border inline-flex h-full items-center justify-center rounded-medium px-3 py-1.5 text-sm font-medium text-subtle disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-accent data-[state=active]:text-default data-[state=active]:shadow-default outline-none focus-visible:ring-2 focus:ring-subtle',
    content:
      'mt-2.5 outline-none focus-visible:ring-2 focus:ring-subtle rounded-default ',
  },
})

const Root = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> &
    VariantProps<typeof tabStyles>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Root
    ref={ref}
    className={cn(className)({
      twMerge: true,
    })}
    {...props}
  >
    {children}
  </TabsPrimitive.Root>
))

Root.displayName = TabsPrimitive.Root.displayName

const List = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  return <TabsPrimitive.List ref={ref} className={tabStyles.slots.list} {...props} />
})

List.displayName = TabsPrimitive.List.displayName

const Trigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger className={tabStyles.slots.trigger} {...props} ref={ref} />
  )
})
Trigger.displayName = TabsPrimitive.Trigger.displayName

const Content = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content className={tabStyles.slots.content} {...props} ref={ref} />
  )
})

Content.displayName = TabsPrimitive.Content.displayName

export { Root, List, Trigger, Content }
