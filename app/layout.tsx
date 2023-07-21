import './globals.css'
import './prism.css'
import { Inter } from 'next/font/google'
import { cnBase } from 'tailwind-variants'

const font = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={cnBase(
          'min-h-screen bg-base font-sans antialiased dark:bg-foreground',
          font.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}
