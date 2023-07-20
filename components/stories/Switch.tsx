'use client'
import { Switch } from '@/ui/Switch'
import ComponentPreview from '../ComponentPreview'
import { createArgs, useArgs, type Args } from '@/lib/useArgs'
import CPropsTable from '@/components/PropsTable'

const switchArgs = {
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
} satisfies Args<typeof Switch>

const id = createArgs(switchArgs)

function Playground() {
  const { props, propsString } = useArgs(id)

  return (
    <ComponentPreview code={`<Switch${propsString} />`} title="Playground" id={id}>
      <div className="py-8">
        <Switch {...props} />
      </div>
    </ComponentPreview>
  )
}

function PropsTable() {
  return <CPropsTable title="Props" args={switchArgs} />
}

export { Playground, PropsTable }
