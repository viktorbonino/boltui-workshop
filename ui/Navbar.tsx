'use client'

import ThemeToggle from '@/components/ThemeToggle'
import { pages, PageConf } from '@/config/pages'
import Button from './Button'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Searchbar from './Searchbar'
import { usePathname } from 'next/navigation'
import { cnBase } from 'tailwind-variants'
import { usePropsPanel } from '@/lib/usePropsPanel'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-base px-4 shadow-default backdrop-blur-xl lg:hidden">
      <MobileMenu />
      <ThemeToggle />
    </nav>
  )
}

function MobileMenu() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const pathname = usePathname()
  const { setActiveComponent } = usePropsPanel()

  const filteredPages = search
    ? pages.reduce((acc, section) => {
        const filteredPages = section.pages.filter((page) =>
          page.name.toLowerCase().includes(search.toLowerCase())
        )

        if (filteredPages.length > 0) {
          return acc.concat({
            ...section,
            pages: filteredPages,
          })
        } else {
          return acc
        }
      }, [] as PageConf)
    : pages

  return (
    <Dialog.Root open={isMenuOpen} onOpenChange={setMenuOpen}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-transparent dark:hover:bg-transparent lg:hidden"
          size="sm"
          aria-label="Open navbar menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal className="h-screen">
        <Dialog.Overlay className="fixed inset-0 z-10 bg-foreground" />
        <Dialog.Content className="fixed inset-0 top-16 z-50 flex flex-col py-8 text-lg text-subtle">
          <div className="px-4">
            <Searchbar
              placeholder="Find components"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="mt-10 flex flex-col gap-8 overflow-auto">
            <div className="flex flex-col gap-6">
              {filteredPages.map((section) => (
                <div className="flex flex-col gap-3.5" key={section.sectionName}>
                  <span className="pl-4 font-medium text-default">
                    {section.sectionName}
                  </span>
                  <div className="flex flex-col gap-0.5 pl-1 pr-4">
                    {section.pages.map((page) => (
                      <Dialog.Close key={page.path} asChild>
                        <Link
                          className={cnBase(
                            'transitions-colors ml-0.5 rounded-default px-4 py-2 text-[0.9rem] outline-none duration-200 focus:ring-subtle focus-visible:ring-2',
                            pathname === page.path
                              ? 'bg-accent text-default'
                              : 'text-subtle hover:bg-subtle hover:text-default'
                          )}
                          href={page.path}
                          onClick={() => {
                            setSearch('')
                            setActiveComponent({
                              id: '',
                              hasSlots: false,
                            })
                          }}
                        >
                          {page.name}
                        </Link>
                      </Dialog.Close>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
