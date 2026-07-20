import { defineField, defineType } from 'sanity'

export const product = defineType({
  name: 'product',
  title: '제품',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제품명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리 (노출 페이지)',
      type: 'string',
      options: {
        list: [
          { title: '교반기', value: 'mixer' },
          { title: '탈포기', value: 'defoamer' },
          { title: '쓰리롤밀', value: 'three-roll-mill' },
          { title: '충진기', value: 'standalone-filling' },
          { title: '디스펜서', value: 'standalone-dispenser' },
          { title: '3축로봇', value: 'standalone-robot' },
          { title: '경화기', value: 'standalone-curing' },
          { title: '소모품', value: 'consumables' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: '슬러그 (URL)',
      description: '제품명에서 자동 생성됩니다.',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: '대표 이미지',
      description: '권장 크기 1200×630px (카드/OG 이미지 겸용)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'summary',
      title: '한 줄 요약',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: '카드 설명 (OG 겸용)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'specs',
      title: '스펙',
      description: '"+ Add item"으로 행을 추가하세요. Attribute(항목) / Property(값) 2열로 표시됩니다.',
      type: 'array',
      options: { modal: { type: 'popover' } },
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Attribute', type: 'string' },
            { name: 'value', title: 'Property', type: 'string' },
          ],
          preview: {
            select: { title: 'key', subtitle: 'value' },
            prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
              return { title: title || 'Attribute', subtitle: subtitle || 'Property' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: '제품 이미지',
      description: '권장 비율 1:1(정사각형)',
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
      title: '상세 설명',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: '본문', value: 'normal' },
            { title: '소제목 (H2)', value: 'h2' },
            { title: '소제목 (H3)', value: 'h3' },
            { title: '소제목 (H4)', value: 'h4' },
          ],
        },
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
      name: 'seo',
      title: 'SEO / 메타데이터',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
})
