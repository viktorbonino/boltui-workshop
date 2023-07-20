import * as Tabs from '@/ui/Tabs'
import { useSlot, createArgs, Slot } from '@/lib/useArgsWithSlots'
import ComponentPreview from '@/components/ComponentPreview'
import { SlotsPropsTable } from '@/components/PropsTable'

const tabsArgs = {
  root: {
    args: {
      value: {
        label: 'Value',
        value: '',
        inputType: 'text',
        description:
          'The controlled value of the tab to activate. Should be used in conjunction with onValueChange.',
        type: 'string',
      },
      onValueChange: {
        label: 'On value change',
        value: () => {},
        inputType: 'text',
        description: 'Callback invoked when the value changes.',
        type: '(value: string) => void',
      },
    },
    hideInPropsPanel: true,
  },
  list: {
    args: {
      loop: {
        label: 'Loop',
        value: true,
        inputType: 'switch',
        description:
          'When true, keyboard navigation will loop from last tab to first, and vice versa',
        type: 'boolean',
      },
    },
  },
  trigger: {
    args: {
      disabled: {
        label: 'Disabled',
        value: false,
        inputType: 'switch',
        description: 'Disable the select',
        type: 'boolean',
      },
    },
  },
} satisfies {
  root: Slot<typeof Tabs.Root>
  list: Slot<typeof Tabs.List>
  trigger: Slot<typeof Tabs.Trigger>
}

const id = createArgs(tabsArgs)

function Playground() {
  const trigger = useSlot<typeof tabsArgs>(id, 'trigger')
  const list = useSlot<typeof tabsArgs>(id, 'list')

  const tabsCode = `<Tabs.Root>
  <Tabs.List${list.propsString}>
    <Tabs.Trigger value="tab1"${trigger.propsString}>
      Tab 1
    </Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Test</Tabs.Content>
  <Tabs.Content value="tab2">Test</Tabs.Content>
</Tabs.Root>`

  return (
    <ComponentPreview code={tabsCode} id={id} title="Playground" hasSlots>
      <div className="py-8">
        <Tabs.Root>
          <Tabs.List {...list.props}>
            <Tabs.Trigger value="tab1" {...trigger.props}>
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">Test</Tabs.Content>
          <Tabs.Content value="tab2">Test 2</Tabs.Content>
        </Tabs.Root>
      </div>
    </ComponentPreview>
  )
}

function PropsTable() {
  return <SlotsPropsTable slots={tabsArgs} />
}

export { Playground, PropsTable }
