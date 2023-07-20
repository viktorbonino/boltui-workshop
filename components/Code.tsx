'use client'

import Prism from 'prismjs'
import { useEffect, useState } from 'react'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import Button from '@/ui/Button'
import { Check, Clipboard } from 'lucide-react'

export default function Code({
  children,
  language = 'tsx',
  mdx,
  className,
}: {
  children: string
  language?: string
  mdx?: boolean
  className?: string
}) {
  useEffect(() => Prism.highlightAll(), [children])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1500)

      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <div className="relative">
      <Button
        className="absolute right-4 top-2 z-10 w-min self-center"
        variant="secondary"
        size="xs"
        onClick={() => {
          navigator.clipboard.writeText(children)
          setCopied(true)
        }}
      >
        {copied ? <Check className="h-4 text-success" /> : <Clipboard className="h-4" />}
      </Button>
      <pre
        className={`${
          language ? `language-${language}` : null
        } group rounded-default border border-base text-sm shadow-default outline-none ${className}`}
      >
        {mdx ? children : <code className={`language-${language}`}>{children}</code>}
      </pre>
    </div>
  )
}
