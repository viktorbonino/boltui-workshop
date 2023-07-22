import * as React from 'react'
import { tv } from 'tailwind-variants'

const TableStyles = tv({
  slots: {
    root: 'w-full text-sm caption-bottom table-auto md:table-fixed border-collapse rounded-default',
    header: 'bg-subtle',
    body: '[&_tr:last-child]:border-0',
    footer: 'text-subtle bg-base font-medium',
    row: 'border-base border-b transition-colors even:bg-base/50',
    head: 'h-10 px-4 text-left align-middle font-medium text-subtle',
    cell: 'py-4 px-4 align-middle',
    caption: 'mt-4 text-xs text-default',
  },
})

const Root = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-auto rounded-default border border-base shadow-default">
      <table ref={ref} className={TableStyles().root({ className })} {...props} />
    </div>
  )
)

Root.displayName = 'Table'

const Header = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={TableStyles().header({ className })} {...props} />
))

Header.displayName = 'Header'

const Body = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={TableStyles().body({ className })} {...props} />
))

Body.displayName = 'Body'

const Footer = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={TableStyles().footer({ className })} {...props} />
))

Footer.displayName = 'Footer'

const Row = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={TableStyles().row({ className })} {...props} />
))

Row.displayName = 'Row'

const Head = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={TableStyles().head({ className })} {...props} />
))

Head.displayName = 'Head'

const Cell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={TableStyles().cell({ className })} {...props} />
))

Cell.displayName = 'Cell'

const Caption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={TableStyles().caption({ className })} {...props} />
))

Caption.displayName = 'Caption'

export { Root, Header, Body, Footer, Head, Row, Cell, Caption }
