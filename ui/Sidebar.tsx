'use client'

import { pages, PageConf } from '@/config/pages'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { cnBase } from 'tailwind-variants'
import Searchbar from './Searchbar'
import ThemeToggle from '@/components/ThemeToggle'
import { useState } from 'react'
import { usePropsPanel } from '@/lib/usePropsPanel'

export default function Sidebar() {
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
    <div className="overflow-none fixed top-0 flex h-screen max-h-screen w-60 shrink-0 flex-col gap-6 border-r border-base bg-foreground pr-8 pt-12 text-subtle shadow-inner dark:bg-base">
      <div className=" pl-7">
        <Searchbar
          placeholder="Find components"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="dark:bg-foreground"
        />
      </div>

      <div className="flex flex-col gap-8 overflow-auto pb-10 pl-4 pr-0.5">
        <div className="flex flex-col gap-6">
          {filteredPages.map((section) => (
            <div className="flex flex-col gap-3.5" key={section.sectionName}>
              <span className="pl-4 text-sm font-medium text-default">
                {section.sectionName}
              </span>
              <div className="flex flex-col gap-1 text-xs">
                {section.pages.map((page) => (
                  <SidebarLink
                    pagePath={page.path}
                    key={page.path}
                    pathname={pathname}
                    onClick={() => {
                      setSearch('')
                      setActiveComponent({
                        id: '',
                        hasSlots: false,
                      })
                    }}
                  >
                    {page.name}
                  </SidebarLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 mt-auto self-end">
        <ThemeToggle />
      </div>
    </div>
  )
}

function SidebarLink({
  children,
  pathname,
  pagePath,
  ...rest
}: {
  children: React.ReactNode
  pathname: string
  pagePath: string
} & Omit<LinkProps, 'href'>) {
  return (
    <Link
      {...rest}
      className={cnBase(
        'transitions-colors ml-0.5 rounded-default px-4 py-2 text-sm outline-none duration-200 focus:ring-subtle focus-visible:ring-2',
        pathname === pagePath
          ? 'bg-accent text-default'
          : 'text-subtle hover:bg-subtle hover:text-default'
      )}
      href={pagePath}
    >
      {children}
    </Link>
  )
}
