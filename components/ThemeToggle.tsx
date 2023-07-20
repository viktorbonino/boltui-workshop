'use client'

import * as Select from '@/ui/Select'
import { Moon, Monitor, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  return (
    <div className={className}>
      <Select.Root value={theme} onValueChange={(value: string) => setTheme(value)}>
        <Select.Trigger aria-label="theme toggle" size="lg" showChevron={false}>
          <div className="flex flex-row items-center">
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : null}
            {theme === 'system' ? <Monitor className="h-4 w-4" /> : null}
            {theme === 'light' ? <Sun className="h-4 w-4" /> : null}
          </div>
        </Select.Trigger>
        <Select.Content className="text-xs">
          <Select.Item value="system">System</Select.Item>
          <Select.Item value="dark">Dark</Select.Item>
          <Select.Item value="light">Light</Select.Item>
        </Select.Content>
      </Select.Root>
    </div>
  )
}
