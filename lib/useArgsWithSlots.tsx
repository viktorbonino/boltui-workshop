import { Args } from '@/lib/useArgs'
import { nanoid } from 'nanoid'
import { atom, useAtomValue, PrimitiveAtom } from 'jotai'
import { useMemo } from 'react'
import { focusAtom } from 'jotai-optics'

export type Slot<T extends React.ElementType> = {
  args: Args<T>
  hideInPropsPanel?: boolean
}

const map = new Map<
  string,
  PrimitiveAtom<{
    [key: string]: Slot<React.ElementType>
  }>
>()

export function createArgs<
  T extends {
    [key: string]: Slot<React.ElementType>
  }
>(slots: T) {
  const slotsForAtom = Object.keys(slots).reduce((acc, curr) => {
    if (slots[curr].hideInPropsPanel) return acc

    acc[curr] = slots[curr]

    return acc
  }, {})

  const slotsAtom = atom(slotsForAtom)

  const id = nanoid()

  map.set(id, slotsAtom)

  return id
}

export function useSlots(id: string) {
  const slotsAtom = map.get(id)

  const slots = useAtomValue(slotsAtom)

  return {
    slots,
  }
}

export function useSlot<T extends Record<string, Slot<React.ElementType>>>(
  id: string,
  slotName: keyof T
) {
  const slotsAtom = map.get(id)

  const slots = useAtomValue(slotsAtom)

  const slot = slots[slotName as string]

  const argsAtom = useMemo(
    () =>
      focusAtom(slotsAtom, (optic) =>
        optic.prop(slotName as string | number).prop('args')
      ),
    [slotName, slotsAtom]
  )

  const props = useMemo(
    () =>
      Object.keys(slot.args).reduce(
        (
          acc: {
            [key: string]: string | number | boolean
          },
          key
        ) => {
          if (key === 'children') return acc

          acc[key] = slot.args[key].value

          return acc
        },
        {}
      ),
    [slot.args]
  )

  const propsString = useMemo(
    () =>
      Object.keys(props)
        .map((key) => {
          const value = props[key]
          if (typeof value === 'string' && typeof value !== 'number' && value !== '') {
            return ` ${key}="${value}"`
          }
          if (typeof value === 'number') {
            return ` ${key}={${value}}`
          }
          if (typeof value === 'boolean' && value) {
            return ` ${key}`
          }
        })
        .join(''),
    [props]
  )

  return {
    props,
    propsString,
    slot,
    argsAtom,
  }
}
