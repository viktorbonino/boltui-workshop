const tailwindcss = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './mdx/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
      colors: {
        foreground: 'hsl(var(--bg-foreground))',
        primary: 'hsl(var(--bg-primary))',
      },
      backgroundColor: {
        base: 'hsl(var(--bg-base))',
        foreground: 'hsl(var(--bg-foreground))',
        primary: 'hsl(var(--bg-primary))',
        'primary-active': 'hsl(var(--bg-primary-active))',
        accent: 'hsl(var(--bg-accent))',
        subtle: 'hsl(var(--bg-subtle))',
        muted: 'hsl(var(--bg-muted))',
        danger: 'hsl(var(--bg-danger))',
        'danger-active': 'hsl(var(--bg-danger-active))',
        'danger-accent': 'hsl(var(--bg-danger-accent))',
        'danger-subtle': 'hsl(var(--bg-danger-subtle))',
      },
      borderColor: {
        base: 'hsl(var(--border-base))',
        primary: 'hsl(var(--border-primary))',
        emphasis: 'hsl(var(--border-emphasis))',
        subtle: 'hsl(var(--border-subtle))',
        danger: 'hsl(var(--border-danger))',
      },
      divideColor: {
        base: 'hsl(var(--border-base))',
      },
      textColor: {
        default: 'hsl(var(--text-default))',
        subtle: 'hsl(var(--text-subtle))',
        inverted: 'hsl(var(--text-inverted))',
        muted: 'hsl(var(--text-muted))',
        danger: 'hsl(var(--text-danger))',
        'danger-inverted': 'hsl(var(--text-danger-inverted))',
        success: 'hsl(var(--text-success))',
        blue: 'hsl(var(--text-blue))',
      },
      ringColor: {
        default: 'hsl(var(--ring-default))',
        subtle: 'hsl(var(--ring-subtle))',
        danger: 'hsl(var(--ring-danger))',
      },
      ringOffsetColor: {
        default: 'hsl(var(--ring-offset))',
        subtle: 'hsl(var(--ring-offset-subtle))',
      },
      borderRadius: {
        medium: tailwindcss.borderRadius.md,
        default: tailwindcss.borderRadius.lg,
      },
      boxShadow: {
        default: 'var(--shadow-default)',
        large: 'var(--shadow-large)',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-radix')()],
}
