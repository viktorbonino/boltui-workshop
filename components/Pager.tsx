'use client'
import { flattenedPages } from '@/config/pages'
import Button from '@/ui/Button'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function Pager() {
  const pathname = usePathname()

  const currentPageIndex = flattenedPages.findIndex((page) => page.path === pathname)
  const previousPage = currentPageIndex > 0 ? flattenedPages[currentPageIndex - 1] : null
  const nextPage =
    currentPageIndex < flattenedPages.length - 1
      ? flattenedPages[currentPageIndex + 1]
      : null

  return (
    <div
      className={`flex w-full ${
        previousPage !== null ? 'justify-between' : 'justify-end'
      } py-8`}
    >
      {previousPage !== null ? (
        <Button variant="ghost" className="text-subtle hover:text-default" asChild>
          <Link href={previousPage.path}>
            <ChevronLeft className="h-4 w-4" />
            {previousPage.name}
          </Link>
        </Button>
      ) : null}
      {nextPage !== null ? (
        <Button variant="ghost" className="text-subtle hover:text-default" asChild>
          <Link href={nextPage.path}>
            {nextPage.name}
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : null}
    </div>
  )
}
