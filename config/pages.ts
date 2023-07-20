import { allComponents, allFoundations } from '@/.contentlayer/generated'

export type PageConf = Array<{
  sectionName?: string
  pages: Array<{
    path: string
    name: string
  }>
}>

export const pages = [
  {
    sectionName: 'Foundations',
    pages: [
      ...allFoundations.map((foundation) => ({
        path: `/foundation/${foundation.slug}`,
        name: foundation.title,
      })),
    ],
  },
  {
    sectionName: 'Components',
    pages: allComponents.map((component) => ({
      path: `/component/${component.slug}`,
      name: component.title,
    })),
  },
] satisfies PageConf

export const flattenedPages = pages.reduce(
  (acc, curr) =>
    acc.concat(curr.pages.map((page) => ({ ...page, sectionName: curr.sectionName }))),
  [] as Array<{ path: string; name: string; sectionName: string }>
)
