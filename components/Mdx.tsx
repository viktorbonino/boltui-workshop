'use client'
import { useMDXComponent } from 'next-contentlayer/hooks'
import * as Stories from '@/components/stories'
import Text from '@/ui/Text'
import Code from '@/components/Code'
import Link, { LinkProps } from '@/ui/Link'
import ColorCard from '@/ui/ColorCard'

const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
    props.id ? (
      <Text variant="h1" asJumpLink href={`#${props.id}`} {...props} mdx>
        {props.children}
      </Text>
    ) : (
      <Text variant="h1" {...props} mdx>
        {props.children}
      </Text>
    ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
    props.id ? (
      <Text variant="h2" asJumpLink href={`#${props.id}`} {...props} mdx>
        {props.children}
      </Text>
    ) : (
      <Text variant="h2" {...props} mdx>
        {props.children}
      </Text>
    ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
    props.id ? (
      <Text variant="h3" asJumpLink href={`#${props.id}`} {...props} mdx>
        {props.children}
      </Text>
    ) : (
      <Text variant="h3" {...props} mdx>
        {props.children}
      </Text>
    ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
    props.id ? (
      <Text variant="h4" asJumpLink href={`#${props.id}`} {...props} mdx>
        {props.children}
      </Text>
    ) : (
      <Text variant="h4" {...props} mdx>
        {props.children}
      </Text>
    ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
    props.id ? (
      <Text variant="h5" asJumpLink href={`#${props.id}`} {...props} mdx>
        {props.children}
      </Text>
    ) : (
      <Text variant="h5" {...props} mdx>
        {props.children}
      </Text>
    ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
    props.id ? (
      <Text variant="h6" asJumpLink href={`#${props.id}`} {...props} mdx>
        {props.children}
      </Text>
    ) : (
      <Text variant="h6" {...props} mdx>
        {props.children}
      </Text>
    ),
  p: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
    props.id ? (
      <Text variant="p" asJumpLink href={`#${props.id}`} {...props} mdx>
        {props.children}
      </Text>
    ) : (
      <Text variant="p" {...props} mdx>
        {props.children}
      </Text>
    ),
  code: (props: { className: string; children: string }) => (
    <Code className={props.className}>{props.children}</Code>
  ),
  a: (
    props: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
      href: string
      children: React.ReactNode
    }
  ) => <Link {...props}>{props.children}</Link>,
  ColorCard,
  ...Stories,
}

export default function MDX({ code }: { code: string }) {
  const MDXComponent = useMDXComponent(code)
  return <MDXComponent components={components} />
}
