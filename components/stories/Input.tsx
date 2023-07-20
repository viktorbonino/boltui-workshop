'use client'
import { Input } from '@/ui/Input'
import ComponentPreview from '../ComponentPreview'
import { createArgs, useArgs, type Args } from '@/lib/useArgs'
import CPropsTable from '@/components/PropsTable'

const inputArgs = {
  label: {
    label: 'Label',
    value: 'Label',
    inputType: 'text',
    description: 'The label of the input',
    type: 'string',
  },
  description: {
    label: 'Description',
    value: 'The description of the input',
    inputType: 'text',
    description: 'The description of the input',
    type: 'string',
  },
  disabled: {
    label: 'Disabled',
    value: false,
    inputType: 'switch',
    description: 'Disable the input',
    type: 'boolean',
  },
  required: {
    label: 'Required',
    value: false,
    inputType: 'switch',
    description: 'The input is required',
    type: 'boolean',
  },
} satisfies Args<typeof Input>

const id = createArgs(inputArgs)

function Playground() {
  const { props, propsString } = useArgs(id)

  return (
    <ComponentPreview code={`<Input${propsString} />`} title="Playground" id={id}>
      <div className="py-8">
        <Input {...props} />
      </div>
    </ComponentPreview>
  )
}

function PropsTable() {
  return <CPropsTable title="Props" args={inputArgs} />
}

export { Playground, PropsTable }
