import { defineField, defineType } from 'sanity'

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: '동영상 (URL)',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: '동영상 URL',
      description: '유튜브 또는 비메오 링크를 붙여넣으세요.',
      type: 'url',
      validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'caption',
      title: '캡션',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'url' },
    prepare({ title }: { title?: string }) {
      return { title: title || '동영상', subtitle: 'videoEmbed' }
    },
  },
})
