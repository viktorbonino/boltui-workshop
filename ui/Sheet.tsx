'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cn, VariantProps, tv } from 'tailwind-variants'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'

const sheetVariants = tv({
  slots: {
    content:
      'group fixed z-50 gap-4 bg-base dark:bg-base max-h-[80%] shadow-large inset-x-0 bottom-0 border-t border-base overflow-auto',
    overlay: 'fixed inset-0 z-40 backdrop-blur-sm',
  },
})

const { content, overlay } = sheetVariants()

const Root = SheetPrimitive.Root

const Close = SheetPrimitive.Close

const Trigger = SheetPrimitive.Trigger

function Portal({ className, ...props }: SheetPrimitive.DialogPortalProps) {
  return (
    <SheetPrimitive.Portal
      className={cn(className)({
        twMerge: true,
      })}
      {...props}
    />
  )
}
Portal.displayName = SheetPrimitive.Portal.displayName

const Overlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>((props, ref) => <SheetPrimitive.Overlay {...props} ref={ref} />)
Overlay.displayName = SheetPrimitive.Overlay.displayName

interface SheetContentProps extends VariantProps<typeof sheetVariants> {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
  children: React.ReactNode
}

const Content = ({ className, children, setOpen, open, ...props }: SheetContentProps) => {
  const leafletRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const transitionProps = { type: 'spring', stiffness: 500, damping: 30 }

  useEffect(() => {
    open &&
      controls.start({
        y: 20,
        transition: transitionProps,
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  async function handleDragEnd(_: any, info: any) {
    const offset = info.offset.y
    const velocity = info.velocity.y
    const height = leafletRef.current?.getBoundingClientRect().height || 0
    console.log(offset, height / 2, leafletRef.current?.getBoundingClientRect().height)
    if (offset > height / 2 || velocity > 800) {
      await controls.start({ y: '100%', transition: transitionProps })
      setOpen(false)
    } else {
      controls.start({ y: 0, transition: transitionProps })
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <Portal forceMount>
          <Overlay asChild>
            <motion.div
              key="leaflet-backdrop"
              className={overlay()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
          </Overlay>

          <SheetPrimitive.Content {...props} asChild>
            <motion.div
              ref={leafletRef}
              key="leaflet"
              className={content({ className })}
              initial={{ y: '100%' }}
              animate={controls}
              exit={{ y: '100%' }}
              transition={transitionProps}
              drag="y"
              dragDirectionLock
              onDragEnd={handleDragEnd}
              dragElastic={{ top: 0, bottom: 1 }}
              dragConstraints={{ top: 0, bottom: 0 }}
            >
              <div className="rounded-t-4xl -mb-1 mt-2 flex h-7 w-full items-center justify-center">
                <div className="-mr-1 h-1 w-6 rounded-full bg-accent transition-all group-active:rotate-12" />
                <div className="h-1 w-6 rounded-full bg-accent transition-all group-active:-rotate-12" />
              </div>
              <div className="p-6">{children}</div>
            </motion.div>
          </SheetPrimitive.Content>
        </Portal>
      )}
    </AnimatePresence>
  )
}

export { Root, Trigger, Close, Content }
