import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

const activeComponentAtom = atom<{
  id: string
  hasSlots: boolean
}>({
  id: '',
  hasSlots: false,
})

const hasSlotsAtom = atom(
  (get) => get(activeComponentAtom).hasSlots,
  (get, set, show: boolean) => {
    set(activeComponentAtom, {
      ...get(activeComponentAtom),
      hasSlots: show,
    })
  }
)

const componentIdAtom = atom(
  (get) => get(activeComponentAtom).id,
  (get, set, id: string) => {
    set(activeComponentAtom, {
      ...get(activeComponentAtom),
      id,
    })
  }
)

export function usePropsPanel(options?: { hasSlots: boolean }) {
  const [activeComponent, setActiveComponent] = useAtom(activeComponentAtom)
  const [__, setHasSlots] = useAtom(hasSlotsAtom)
  const [activeComponentId, setActiveComponentId] = useAtom(componentIdAtom)

  useEffect(() => {
    if (options?.hasSlots) setHasSlots(true)
  }, [options?.hasSlots, setHasSlots])

  return {
    activeComponent,
    setActiveComponent,
    activeComponentId,
    setActiveComponentId,
    setHasSlots,
  }
}
