import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { cn } from 'tailwind-variants'

export interface LinkProps extends NextLinkProps {
  children: React.ReactNode
}

export default function Link(props: LinkProps) {
  const { children, ...rest } = props
  return (
    <NextLink
      {...rest}
      className={cn('text-blue hover:underline')({
        twMerge: true,
      })}
    >
      {children}
    </NextLink>
  )
}
