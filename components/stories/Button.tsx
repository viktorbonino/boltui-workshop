'use client'
import Button from '@/ui/Button'
import ComponentPreview from '../ComponentPreview'
import CPropsTable from '@/components/PropsTable'
import { createArgs, useArgs, Args } from '@/lib/useArgs'

const sizes: Array<React.ComponentProps<typeof Button>['size']> = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
]

const buttonArgs = {
  children: {
    label: 'Children',
    value: 'Button',
    inputType: 'text',
    description: 'The content of the button',
    type: 'React.ReactNode',
    required: true,
  },

  variant: {
    label: 'Variant',
    value: 'primary',
    inputType: 'autocomplete',
    type: 'primary | secondary | ghost | danger',
    options: [
      {
        label: 'primary',
        value: 'primary',
      },
      {
        label: 'secondary',
        value: 'secondary',
      },
      {
        label: 'ghost',
        value: 'ghost',
      },
      {
        label: 'danger',
        value: 'danger',
      },
    ],
    defaultValue: 'primary',
    description: 'The variant of the button',
  },
  size: {
    label: 'Size',
    value: 'md',
    type: sizes.join(' | '),
    options: [
      {
        label: 'xs',
        value: 'xs',
      },
      {
        label: 'sm',
        value: 'sm',
      },
      {
        label: 'md',
        value: 'md',
      },
      {
        label: 'lg',
        value: 'lg',
      },
      {
        label: 'xl',
        value: 'xl',
      },
    ],
    inputType: 'autocomplete',
    defaultValue: 'md',
  },
  disabled: {
    label: 'Disabled',
    value: false,
    type: 'boolean',
    inputType: 'switch',
    description: 'Whether the button is disabled',
  },
} satisfies Args<typeof Button>

const id = createArgs(buttonArgs)

function Playground() {
  const { args, props, propsString } = useArgs(id)

  return (
    <ComponentPreview
      code={`<Button${propsString}>${args.children.value}</Button>`}
      title="Playground"
      id={id}
    >
      <div className="py-6">
        <Button {...props}>{args.children.value}</Button>
      </div>
    </ComponentPreview>
  )
}

function Primary() {
  return (
    <ComponentPreview
      code={sizes
        .map((size) => `<Button variant="primary" size="${size}">Button</Button>\n`)
        .join('')}
      title="Primary"
    >
      <div className="space-x-6 space-y-3 px-6 pb-6 pt-4 rtl:space-x-reverse">
        {sizes.map((size) => (
          <Button key={size} size={size} variant="primary">
            Button
          </Button>
        ))}
      </div>
    </ComponentPreview>
  )
}

function Secondary() {
  return (
    <ComponentPreview
      code={sizes
        .map((size) => `<Button variant="secondary" size="${size}">Button</Button>\n`)
        .join('')}
      title="Secondary"
    >
      <div className="space-x-6 space-y-2 px-6 pb-6 pt-4 rtl:space-x-reverse">
        {sizes.map((size) => (
          <Button key={size} size={size} variant="secondary">
            Button
          </Button>
        ))}
      </div>
    </ComponentPreview>
  )
}

function Ghost() {
  return (
    <ComponentPreview
      code={sizes
        .map((size) => `<Button variant="ghost" size="${size}">Button</Button>\n`)
        .join('')}
      title="Ghost"
    >
      <div className="space-x-6 space-y-2 px-6 pb-6 pt-4 rtl:space-x-reverse">
        {sizes.map((size) => (
          <Button key={size} size={size} variant="ghost">
            Button
          </Button>
        ))}
      </div>
    </ComponentPreview>
  )
}

function Danger() {
  return (
    <ComponentPreview
      code={sizes
        .map((size) => `<Button variant="danger" size="${size}">Button</Button>\n`)
        .join('')}
      title="Danger"
    >
      <div className="space-x-6 space-y-2 px-6 pb-6 pt-4 rtl:space-x-reverse">
        {sizes.map((size) => (
          <Button key={size} size={size} variant="danger">
            Button
          </Button>
        ))}
      </div>
    </ComponentPreview>
  )
}

function PropsTable() {
  return <CPropsTable title="Props" args={buttonArgs} />
}

export { Playground, Primary, Secondary, Ghost, Danger, PropsTable }
