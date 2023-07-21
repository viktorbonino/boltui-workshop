import * as Sheet from '@/ui/Sheet'
import { PropsInputs, PropsInputsWithSlots } from './PropsPanel'

function Root({
  children,
  activeComponent,
  open,
  setOpen,
}: {
  children: React.ReactElement<typeof Sheet.Trigger>
  activeComponent: {
    id: string
    hasSlots: boolean
  }
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <Sheet.Root open={open} onOpenChange={(open) => setOpen(open)}>
      {children}
      <Sheet.Content open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-12 overflow-auto px-4">
          {activeComponent.id ? (
            activeComponent.hasSlots ? (
              <PropsInputsWithSlots id={activeComponent.id} />
            ) : (
              <PropsInputs id={activeComponent.id} />
            )
          ) : null}
        </div>
      </Sheet.Content>
    </Sheet.Root>
  )
}

const Trigger = Sheet.Trigger

export { Root, Trigger }
