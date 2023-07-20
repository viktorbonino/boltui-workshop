'use client'

import { ThemeProvider } from 'next-themes'
import Navbar from '@/ui/Navbar'
import { store } from '@/utils/jotai'
import { Provider } from 'jotai'
import { useEffect, useState } from 'react'
import Sidebar from '@/ui/Sidebar'
import PropsPanel from '@/components/PropsPanel'
import Pager from '@/components/Pager'

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return mounted ? (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />

        <div className="flex">
          <aside className="hidden lg:flex">
            <Sidebar />
          </aside>

          <main className="relative w-full px-8 pb-4 pt-10 md:px-20 lg:ml-72 rtl:lg:ml-0 rtl:lg:mr-72 xl:px-32">
            <div className="mx-auto max-w-5xl">
              {children} <Pager />
            </div>
          </main>
          <PropsPanel />
        </div>
      </ThemeProvider>
    </Provider>
  ) : null
}
