import './globals.css'
import './prism.css'
import { Inter } from 'next/font/google'
import { cnBase } from 'tailwind-variants'

const font = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={cnBase(
          'min-h-screen bg-white antialiased dark:bg-foreground',
          font.className
        )}
      >
        {children}
      </body>
    </html>
  )
}
