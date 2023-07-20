'use client'
import Button from '@/ui/Button'
import * as Tabs from '@/ui/Tabs'
import { FileCode, Component, Settings2, X } from 'lucide-react'
import Code from './Code'
import { cnBase } from 'tailwind-variants'
import { usePropsPanel } from '@/lib/usePropsPanel'
import * as PropsSheet from './PropsSheet'
import { useState } from 'react'
import Text from '@/ui/Text'
import { DirectionProvider } from '@radix-ui/react-direction'
export default function ComponentPreview({
  children,
  code,
  title,
  id,
  hasSlots,
}: {
  children: React.ReactNode
  code: string
  title?: string
  id?: string
  hasSlots?: boolean
}) {
  const { activeComponent, setActiveComponent } = usePropsPanel()
  const [dir, setDir] = useState<'rtl' | 'ltr'>('ltr')
  console.log('bdo', dir)
  return (
    <Tabs.Root defaultValue="preview" id={title?.toLowerCase()}>
      <div
        className={cnBase(
          'mt-11 flex flex-row items-center justify-between gap-2 pb-1.5',
          !title ? 'justify-end' : ''
        )}
      >
        {title ? (
          <Text variant="h4" as="h2" href={`#${title.toLowerCase()}`} asJumpLink>
            {title}
          </Text>
        ) : null}
        <div className="flex items-center gap-2">
          <Tabs.List>
            <Tabs.Trigger value="code">
              <FileCode className="h-4 w-4" aria-label="implementation code" />
            </Tabs.Trigger>
            <Tabs.Trigger value="preview">
              <Component className="h-4 w-4" aria-label="preview" />
            </Tabs.Trigger>
          </Tabs.List>
          <Button
            variant="secondary"
            size="xs"
            className="w-10 py-2"
            onClick={() => setDir((dir) => (dir === 'ltr' ? 'rtl' : 'ltr'))}
          >
            {dir.toUpperCase()}
          </Button>
          {id ? (
            <>
              <Button
                variant="secondary"
                className="hidden py-2 xl:block"
                size="xs"
                onClick={() => {
                  setActiveComponent({
                    id: activeComponent.id ? '' : id,
                    hasSlots,
                  })
                }}
              >
                {!activeComponent.id ? (
                  <Settings2 className="h-4 w-4" aria-label="props settings panel" />
                ) : (
                  <X className="h-4 w-4" aria-label="close props settings panel" />
                )}
              </Button>
              <PropsSheet.Root activeComponent={activeComponent}>
                <PropsSheet.Trigger className="xl:hidden" asChild>
                  <Button
                    variant="secondary"
                    size="xs"
                    className="py-2"
                    onClick={() => {
                      setActiveComponent({
                        id,
                        hasSlots,
                      })
                    }}
                  >
                    <Settings2 className="h-4 w-4" aria-label="props settings panel" />
                  </Button>
                </PropsSheet.Trigger>
              </PropsSheet.Root>
            </>
          ) : null}
        </div>
      </div>
      <Tabs.Content value="code" className="relative">
        <Code language="tsx">{code}</Code>
      </Tabs.Content>
      <Tabs.Content value="preview">
        <DirectionProvider dir={dir}>
          <bdo dir={dir}>
            <div className="flex justify-center rounded-default border border-base bg-base shadow-default">
              {children}
            </div>
          </bdo>
        </DirectionProvider>
      </Tabs.Content>
    </Tabs.Root>
  )
}
