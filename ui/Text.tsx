import { tv, VariantProps, cn } from 'tailwind-variants'
import Link from 'next/link'
import { Link as LinkIcon } from 'lucide-react'

const textStyles = tv({
  slots: {
    text: 'tracking-tight text-default scroll-m-20',
    icon: 'ml-0.5 hidden group-hover:block text-subtle',
    wrapper: '',
  },
  variants: {
    variant: {
      h1: {
        text: 'text-5xl font-bold',
        icon: 'w-6 h-6',
      },
      h2: {
        text: 'text-4xl font-bold',
        icon: 'w-5 h-5',
      },
      h3: {
        text: 'text-2xl font-semibold',
        icon: 'w-4 h-4',
      },
      h4: {
        text: 'text-xl font-semibold',
        icon: 'w-3.5 h-3.5',
      },
      h5: {
        text: 'text-lg font-semibold',
        icon: 'w-3 h-3',
      },
      h6: {
        text: 'font-semibold',
        icon: 'w-2.5 h-2.5',
      },
      p: {
        text: 'text-base leading-7',
        icon: 'w-4 h-4',
      },
    },
    mdx: {
      true: '',
    },
  },
  /*compoundSlots: [
    {
      slots: ['text', 'icon'],
      mdx: true,
      variant: ['h1', 'h2'],
      className: 'mt-10',
    },
    {
      slots: ['text', 'icon'],
      mdx: true,
      variant: ['h3', 'h4', 'h5', 'h6'],
      className: 'mt-8',
    },
    {
      slots: ['text', 'icon'],
      mdx: true,
      variant: 'p',
      className: 'mt-6',
    },
  ],*/
  defaultVariants: {
    as: 'p',
    mdx: false,
  },
})

// Workaround until tailwind-variants compound slots are fixed
const wrapperStyles = tv({
  base: '',
  variants: {
    variant: {
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      h5: '',
      h6: '',
      p: '',
    },
    mdx: {
      true: '',
    },
  },
  compoundVariants: [
    {
      mdx: true,
      variant: ['h1', 'h2'],
      className: 'mt-10',
    },
    {
      mdx: true,
      variant: ['h3', 'h4', 'h5', 'h6'],
      className: 'mt-8',
    },
    {
      mdx: true,
      variant: 'p',
      className: 'mt-6',
    },
  ],
  defaultVariants: {
    variant: 'p',
    mdx: false,
  },
})

export type TextProps = React.HTMLAttributes<
  HTMLHeadingElement | HTMLParagraphElement
> & {
  asJumpLink?: boolean
  href?: string
  as?: VariantProps<typeof textStyles>['variant']
} & VariantProps<typeof textStyles>

export default function Text(props: TextProps) {
  const { variant = 'p', as = 'p', children, asJumpLink, className, mdx, ...rest } = props

  const { text, icon } = textStyles({
    variant: props.variant,
    mdx,
  })

  const Comp = as

  if (asJumpLink) {
    return (
      <Link href={props.href}>
        <div
          className={wrapperStyles({
            variant,
            mdx,
            className: 'group flex flex-row items-center gap-2',
          })}
        >
          <Comp
            {...rest}
            className={text({
              className,
            })}
          >
            {children}
          </Comp>
          <LinkIcon className={icon()} />
        </div>
      </Link>
    )
  } else
    return (
      <Comp
        {...rest}
        className={text({
          className: cn(
            wrapperStyles({
              variant,
              mdx,
            }),
            className
          )({
            twMerge: true,
          }),
        })}
      >
        {children}
      </Comp>
    )
}
