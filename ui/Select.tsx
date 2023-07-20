'use client'

import Button, { ButtonProps } from './Button'
import * as RadixSelect from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { forwardRef } from 'react'
import { tv } from 'tailwind-variants'

const selectStyles = tv({
  slots: {
    content:
      'bg-base relative z-50 mt-1 w-[var(--radix-select-trigger-width)] min-w-[8rem] overflow-hidden rounded-default border border-base text-xs shadow-default',
    label: 'py-1.5 pr-2 pl-8 font-semibold text-xs',
    item: 'relative flex cursor-default select-none items-center rounded-default py-1.5 pr-2 pl-8 outline-none focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    separator: 'bg-accent -mx-1 my-1 h-px',
  },
})

const Root = RadixSelect.Root

const Group = RadixSelect.Group

const Value = RadixSelect.Value

const Trigger = forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  RadixSelect.SelectTriggerProps &
    Pick<ButtonProps, 'size'> & {
      showChevron?: boolean
    }
>(({ className, children, size, showChevron = true, ...props }, ref) => (
  <RadixSelect.Trigger ref={ref} {...props} asChild>
    <Button variant="secondary" size={size}>
      {children}
      {showChevron ? <ChevronDown className="ml-1 h-3.5 w-3.5" /> : null}
    </Button>
  </RadixSelect.Trigger>
))
Trigger.displayName = RadixSelect.Trigger.displayName

const Content = forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      position="popper"
      ref={ref}
      className={selectStyles().content({
        className,
      })}
      {...props}
    >
      <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
))
Content.displayName = RadixSelect.Content.displayName

const Label = forwardRef<
  React.ElementRef<typeof RadixSelect.Label>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Label>
>(({ className, ...props }, ref) => (
  <RadixSelect.Label
    ref={ref}
    className={selectStyles().label({
      className,
    })}
    {...props}
  />
))

Label.displayName = RadixSelect.Label.displayName

const Item = forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={selectStyles().item({
      className,
    })}
    {...props}
  >
    <RadixSelect.ItemIndicator className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </RadixSelect.ItemIndicator>

    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
))

Item.displayName = RadixSelect.Item.displayName

const Separator = forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(({ className, ...props }, ref) => (
  <RadixSelect.Separator
    ref={ref}
    className={selectStyles().separator({
      className,
    })}
    {...props}
  />
))

Separator.displayName = RadixSelect.Separator.displayName

export { Root, Group, Value, Trigger, Content, Label, Item, Separator, selectStyles }
