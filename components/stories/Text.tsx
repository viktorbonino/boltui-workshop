'use client'
import Text, { TextProps } from '@/ui/Text'
import ComponentPreview from '../ComponentPreview'
import { createArgs, useArgs, type Args } from '@/lib/useArgs'
import CPropsTable from '@/components/PropsTable'

const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as TextProps['variant'][]

const textArgs = {
  children: {
    label: 'Children',
    value: 'Wise? No, I’ve just learned how to think.',
    inputType: 'text',
    description: 'The content of the text',
    type: 'React.ReactNode',
  },
  variant: {
    label: 'Variant',
    value: 'p',
    inputType: 'autocomplete',
    description: 'The tag of the text',
    type: 'h1 | h2 | h3 | h4 | h5 | h6 | p',
    options: [
      {
        label: 'h1',
        value: 'h1',
      },
      {
        label: 'h2',
        value: 'h2',
      },
      {
        label: 'h3',
        value: 'h3',
      },
      {
        label: 'h4',
        value: 'h4',
      },
      {
        label: 'h5',
        value: 'h5',
      },
      {
        label: 'h6',
        value: 'h6',
      },
      {
        label: 'p',
        value: 'p',
      },
    ],
    defaultValue: 'p',
  },
  as: {
    label: 'As',
    value: 'p',
    inputType: 'autocomplete',
    description: 'The tag of the text',
    type: 'h1 | h2 | h3 | h4 | h5 | h6 | p',
    options: [
      {
        label: 'h1',
        value: 'h1',
      },
      {
        label: 'h2',
        value: 'h2',
      },
      {
        label: 'h3',
        value: 'h3',
      },
      {
        label: 'h4',
        value: 'h4',
      },
      {
        label: 'h5',
        value: 'h5',
      },
      {
        label: 'h6',
        value: 'h6',
      },
      {
        label: 'p',
        value: 'p',
      },
    ],
    defaultValue: 'p',
  },
  className: {
    label: 'Classname',
    value: '',
    inputType: 'text',
    description: 'The classes of the text',
    type: 'string',
  },
} satisfies Args<typeof Text>

const id = createArgs(textArgs)

function Playground() {
  const { args, props, propsString } = useArgs(id)

  return (
    <ComponentPreview
      code={`<Text${propsString}>${args.children.value}</Text>`}
      title="Playground"
      id={id}
    >
      <div className="px-8 py-8">
        <Text {...props}>{args.children.value}</Text>
      </div>
    </ComponentPreview>
  )
}

function Size() {
  return (
    <ComponentPreview
      code={variants
        .map(
          (variant) =>
            `<Text as={${variant}}>Wise? No, I’ve just learned how to think.</Text>\n`
        )
        .join('')}
      title="Variants"
    >
      <div className="space-y-4 px-8 py-8">
        {variants.map((variant) => (
          <Text key={variant} variant={variant}>
            Wise? No, I’ve just learned how to think.
          </Text>
        ))}
      </div>
    </ComponentPreview>
  )
}

function PropsTable() {
  return <CPropsTable title="Props" args={textArgs} />
}

export { Playground, PropsTable, Size }
