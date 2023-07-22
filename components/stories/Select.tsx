import * as Select from '@/ui/Select'
import { useSlot, createArgs, Slot } from '@/lib/useArgsWithSlots'
import ComponentPreview from '@/components/ComponentPreview'
import { SlotsPropsTable } from '@/components/PropsTable'

const selectArgs = {
  value: {
    args: {
      placeholder: {
        label: 'Placeholder',
        value: 'Select a value',
        inputType: 'text',
        description: 'The placeholder of the select',
        type: 'string',
      },
    },
  },
  content: {
    args: {
      position: {
        label: 'Position',
        value: 'item-aligned',
        inputType: 'autocomplete',
        description: 'The positioning of the select content',
        type: '"item-aligned" | "popper"',
        defaultValue: 'item-aligned',
        options: [
          {
            label: 'Item Aligned',
            value: 'item-aligned',
          },
          {
            label: 'Popper',
            value: 'popper',
          },
        ],
      },
      side: {
        label: 'Side',
        value: 'bottom',
        inputType: 'autocomplete',
        description: 'The side of the select',
        type: '"top" | "bottom"',
        defaultValue: 'bottom',
        options: [
          {
            label: 'Top',
            value: 'top',
          },
          {
            label: 'Bottom',
            value: 'bottom',
          },
        ],
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
  item: {
    args: {
      value: {
        label: 'Value',
        value: '2',
        inputType: 'text',
        description: 'Disable the select item',
        type: 'string',
        hideInPropsPanel: true,
      },
      disabled: {
        label: 'Disabled',
        value: false,
        inputType: 'switch',
        description: 'Disable the select item',
        type: 'boolean',
      },
    },
  },
} satisfies {
  value: Slot<typeof Select.Value>
  content: Slot<typeof Select.Content>
  trigger: Slot<typeof Select.Trigger>
  item: Slot<typeof Select.Item>
}

const id = createArgs(selectArgs)

function Playground() {
  const content = useSlot<typeof selectArgs>(id, 'content')
  const trigger = useSlot<typeof selectArgs>(id, 'trigger')
  const item = useSlot<typeof selectArgs>(id, 'item')
  const value = useSlot<typeof selectArgs>(id, 'value')

  const playgroundCode = `<Select.Root>
  <Select.Trigger${trigger.propsString}>
    <Select.Value${value.propsString} />
  </Select.Trigger>
  <Select.Content${content.propsString}>
    <Select.Item value="1">Option 1</Select.Item>
    <Select.Item${item.propsString}>Option 2</Select.Item>
    <Select.Item value="3">Option 3</Select.Item>
  </Select.Content>
</Select.Root>
`

  return (
    <ComponentPreview code={playgroundCode} id={id} title="Playground" hasSlots>
      <div className="py-8">
        <Select.Root>
          <Select.Trigger {...trigger.props} aria-label="playground select">
            <Select.Value {...value.props} />
          </Select.Trigger>
          <Select.Content {...content.props}>
            <Select.Item value="1">Option 1</Select.Item>
            <Select.Item {...item.props} value="2">
              Option 2
            </Select.Item>
            <Select.Item value="3">Option 3</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    </ComponentPreview>
  )
}

function PropsTable() {
  return <SlotsPropsTable slots={selectArgs} />
}

export { Playground, PropsTable }
