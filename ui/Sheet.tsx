'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn, VariantProps, tv } from 'tailwind-variants'

const sheetVariants = tv({
  slots: {
    content:
      'fixed z-50 gap-4 bg-base dark:bg-base p-6 shadow-large inset-x-0 bottom-0 border-t border-base overflow-auto',
    overlay: 'fixed inset-0 z-50 backdrop-blur-sm',
  },
})

const { content, overlay } = sheetVariants()

const Root = SheetPrimitive.Root

const Close = SheetPrimitive.Close

const Trigger = SheetPrimitive.Trigger

function Portal({ className, ...props }: SheetPrimitive.DialogPortalProps) {
  return (
    <SheetPrimitive.Portal
      className={cn(className)({
        twMerge: true,
      })}
      {...props}
    />
  )
}
Portal.displayName = SheetPrimitive.Portal.displayName

const Overlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={overlay({
      className,
    })}
    {...props}
    ref={ref}
  />
))
Overlay.displayName = SheetPrimitive.Overlay.displayName

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const Content = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ className, children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <SheetPrimitive.Content ref={ref} className={content({ className })} {...props}>
      {children}
    </SheetPrimitive.Content>
  </Portal>
))
Content.displayName = SheetPrimitive.Content.displayName

export { Root, Trigger, Close, Content }
