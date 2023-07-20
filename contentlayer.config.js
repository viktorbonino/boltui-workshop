import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'

const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  },
}

const Components = defineDocumentType(() => ({
  name: 'Components',
  filePathPattern: 'stories/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields,
}))

const Foundations = defineDocumentType(() => ({
  name: 'Foundations',
  filePathPattern: 'foundations/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields,
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'mdx',
  documentTypes: [Components, Foundations],
  disableImportAliasWarning: true,

  mdx: {
    rehypePlugins: [rehypeSlug],
  },
})

export default contentLayerConfig
