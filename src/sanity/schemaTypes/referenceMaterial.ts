import { defineField, defineType } from 'sanity'

export const referenceMaterial = defineType({
  name: 'referenceMaterial',
  title: '자료실',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '자료명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '슬러그 (URL)',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '공지사항', value: 'notice' },
          { title: '기술 문서', value: 'tech-docs' },
          { title: 'IR 자료', value: 'ir' },
          { title: '특허/수상', value: 'patents' },
          { title: '언론 보도', value: 'press' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: '발행일',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: '대표 이미지',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'images',
      title: '추가 이미지',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: '이미지 설명 (alt)', type: 'string' }),
            defineField({ name: 'caption', title: '캡션', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: '본문',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: '이미지 설명 (alt)', type: 'string' }),
            defineField({ name: 'caption', title: '캡션', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'file',
      title: '첨부 파일',
      type: 'file',
    }),
    defineField({
      name: 'externalUrl',
      title: '외부 링크',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: '요약 설명',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'isPublic',
      title: '공개 여부',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
})
