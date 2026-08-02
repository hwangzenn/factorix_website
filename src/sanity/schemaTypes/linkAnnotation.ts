import { defineField } from 'sanity'

export const defaultDecorators = [
  { title: '굵게', value: 'strong' },
  { title: '기울임', value: 'em' },
]

export const linkAnnotation = {
  name: 'link',
  type: 'object',
  title: '링크',
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    }),
  ],
}
