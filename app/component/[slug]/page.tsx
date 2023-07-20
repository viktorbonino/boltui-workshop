import { allComponents } from '@/.contentlayer/generated'
import MDX from '@/components/Mdx'
import { Metadata } from 'next'
import Text from '@/ui/Text'

export async function generateStaticParams() {
  return allComponents.map((component) => ({
    slug: component.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string
  }
}): Promise<Metadata> {
  const doc = allComponents.find((c) => c.slug === params.slug)

  if (!doc) {
    return {}
  }

  return {
    title: doc.title,
    description: doc.description,
  }
}

export default function Page({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const component = allComponents.find((c) => c.slug === params.slug)

  if (!component) return null

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-base pb-8">
        <div>
          <Text
            as="h1"
            className="scroll-m-20 text-5xl font-bold tracking-tight text-default"
          >
            {component.title}
          </Text>
          <Text as="h2" className="mt-4 scroll-m-20 text-xl text-subtle">
            {component.description}
          </Text>
        </div>
        <div className="flex w-fit self-center"></div>
      </div>

      <div className="mt-4">
        <MDX code={component.body.code} />
      </div>
    </div>
  )
}
