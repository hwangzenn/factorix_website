import { defineField, defineType } from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: '자주 묻는 질문',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: '질문',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: '답변',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: 'FactoriX 솔루션', value: 'solution' },
          { title: '액상 제조공정', value: 'process' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: '정렬 순서',
      description: '숫자가 작을수록 먼저 노출됩니다.',
      type: 'number',
    }),
    defineField({
      name: 'isPublic',
      title: '공개 여부',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featuredOnMain',
      title: '메인페이지 노출',
      description: '체크하면 메인페이지 자주 묻는 질문 탭에 노출됩니다.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: '카테고리순 · 정렬순서순',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category' },
  },
})
