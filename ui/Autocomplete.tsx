import Button from './Button'
import * as Popover from '@radix-ui/react-popover'
import { Command } from 'cmdk'
import { Search, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from 'tailwind-variants'

export interface AutocompleteProps {
  value: string
  setValue: (value: string) => void
  values: {
    label: string
    value: string
  }[]
  name?: string
  label?: string
  placeholder?: string
  leftElement?: (item?: { label: string; value: string }) => JSX.Element
  className?: string
}

export default function Autocomplete({
  value,
  setValue,
  values,
  placeholder,
  leftElement,
  name,
  className,
}: AutocompleteProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full">
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger className="focus:outline-none" asChild>
          <Button
            variant="secondary"
            size="md"
            className={cn(
              'w-full justify-between pr-2',
              className
            )({
              twMerge: true,
            })}
          >
            <div className="flex items-center gap-2">
              {leftElement ? leftElement(values.find((v) => v.value === value)) : null}
              <p>{value ? values.find((v) => v.value === value)?.label : placeholder}</p>
            </div>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          className="z-50 mt-1 w-[var(--radix-popover-trigger-width)] rounded-default border border-base bg-base pb-2 shadow-default"
          align="start"
        >
          <Command label="Command Menu" className="flex w-full flex-col">
            <div className="flex items-center border-b border-base px-2">
              <Search className="mr-2 h-4 w-4 shrink-0 text-subtle" />
              <Command.Input
                className="h-11 w-full bg-base text-xs  text-default outline-none placeholder:text-subtle"
                placeholder={placeholder}
                name={name}
              />
            </div>
            <Command.List className="mt-2 max-h-[200px] overflow-auto px-1.5 text-xs text-default">
              <Command.Empty className="ml-3 py-2">No results found.</Command.Empty>
              {values.map((v) => (
                <Command.Item
                  key={v.value}
                  onSelect={() => {
                    setValue(v.value)
                    setOpen(false)
                  }}
                  value={v.label}
                  className="relative flex cursor-default select-none items-center rounded-default py-1.5 pl-4 outline-none aria-selected:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <span>{v.label}</span>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}
