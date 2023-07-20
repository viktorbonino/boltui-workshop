import * as Sheet from '@/ui/Sheet'
import { PropsInputs, PropsInputsWithSlots } from './PropsPanel'

function Root({
  children,
  activeComponent,
}: {
  children: React.ReactElement<typeof Sheet.Trigger>
  activeComponent: {
    id: string
    hasSlots: boolean
  }
}) {
  return (
    <Sheet.Root>
      {children}
      <Sheet.Content className="max-h-[66%] py-10">
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
