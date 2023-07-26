This is a template for showcasing and documenting your ui components for your design system or ui kit.
It uses Next.js 13 app dir, Typescript, Radix ui and colors, TailwindCSS, Jotai, Framer Motion and Contentlayer.

## Getting Started
### Create a New Story
To create a new UI component "story" you need to create a TypeScript file (.tsx) inside the `components/stories` directory. 

For example, if you want to create a story for the Input component, you can create a file at `components/stories/Input.tsx`.

The `Input.tsx` file should contain the following structure:
```tsx
'use client'
import { Input } from '@/ui/Input'
import ComponentPreview from '../ComponentPreview'
import { createArgs, useArgs, type Args } from '@/lib/useArgs'
import CPropsTable from '@/components/PropsTable'

// Define the arguments for the Input component
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

// Create a unique ID for the arguments using the createArgs function and add the args to the map
const id = createArgs(inputArgs)

// Playground component to render the Input component with dynamic props, but you can also use it for showcasing multiple variants without the dynamic props.
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

// PropsTable component to display the props of the Input component
function PropsTable() {
  return <CPropsTable title="Props" args={inputArgs} />
}

export { Playground, PropsTable }
```

After creating the Input.tsx story file, you need to import it inside the `components/stories/index.tsx` file and add it to the exports using the `import * as` format. This allows the story to be included in the documentation later.

```tsx
import * as ButtonStories from './Button'
import * as SelectStories from './Select'
import * as TabsStories from './Tabs'
import * as TextStories from './Text'
import * as SwitchStories from './Switch'
import * as InputStories from './Input'

export {
  ButtonStories,
  SelectStories,
  TabsStories,
  TextStories,
  SwitchStories,
  InputStories,
}
```
### Create an MDX File for Documentation
Next, you can create an MDX file inside the `/mdx/stories` directory. This file will be used to document the Input component and showcase its stories. You can organize the content and include the `InputStories` components as needed within the MDX file.

```mdx
---
title: Input
description: Displays a form input field or a component that looks like an input field.
---

<InputStories.Playground />
/* you can put text or other components between the story components, change order etc */
<InputStories.PropsTable />
```

### Create a Story with "slots"
You can also create stories for more complex components using slots.
For example, here's the tabs story implementation:
```tsx
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
    hideInPropsPanel: true, // you can hide an arg/prop from the panel/sheet and use it only for documentation
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
```
To understand more how the args and stories works see `/lib/useArgs.tsx` and `/lib/useArgsWithSlots.tsx`.
