import { atom, useAtomValue, PrimitiveAtom, useAtom } from 'jotai'
import { nanoid } from 'nanoid'
import { focusAtom } from 'jotai-optics'
import { useMemo } from 'react'

export type Args<T extends React.ElementType> = {
  [key in keyof Partial<React.ComponentPropsWithoutRef<T>>]: {
    value: React.ComponentPropsWithoutRef<T>[key]
    label: string
    description?: string
    defaultValue?: React.ComponentPropsWithoutRef<T>[key]
    type: 'string' | 'boolean' | 'number' | (string & {})
    hideInPropsPanel?: boolean
    required?: boolean
  } & (
    | {
        inputType: 'text' | 'switch' | 'number'
      }
    | {
        inputType: 'autocomplete'
        options: Array<{
          value: React.ComponentPropsWithoutRef<T>[key]
          label: string
        }>
      }
  )
}

const map = new Map<string, PrimitiveAtom<Args<React.ElementType>>>()

export function createArgs<T extends Args<React.ElementType>>(args: T) {
  const argsAtom = atom(args)

  const id = nanoid()

  map.set(id, argsAtom)

  return id
}

export function useArgs<T extends Args<React.ElementType>>(id: string) {
  const argsAtom = map.get(id)

  const args = useAtomValue(argsAtom) as T

  const props = useMemo(
    () =>
      Object.keys(args).reduce(
        (
          acc: {
            [key: string]: string | number | boolean
          },
          key
        ) => {
          if (key === 'children') return acc

          acc[key] = args[key].value

          return acc
        },
        {}
      ),
    [args]
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
    args,
    argsAtom,
    props,
    propsString,
  }
}

export function useArgValue<T extends Args<React.ElementType>>(
  argsAtom: PrimitiveAtom<T>,
  arg: keyof T
) {
  const valueAtom = useMemo(
    () => focusAtom(argsAtom, (optic) => optic.prop(arg).prop('value')),
    [arg, argsAtom]
  )

  const [value, setValue] = useAtom(valueAtom)

  return { value, setValue }
}
