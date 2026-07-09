import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: '적용사례',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
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
      name: 'thumbnail',
      title: '대표 이미지',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: '한줄 설명 (OG 겸용)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'tags',
      title: '태그 키워드',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'customerName',
      title: '고객사명',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '산업별 — 바이오', value: 'bio' },
          { title: '산업별 — 화장품/뷰티', value: 'cosmetics' },
          { title: '산업별 — 화학/소재', value: 'chemical' },
          { title: '산업별 — 디스플레이', value: 'display' },
          { title: '산업별 — 전기/전자', value: 'electronics' },
          { title: '산업별 — 자동차', value: 'automotive' },
          { title: '산업별 — 이차전지', value: 'battery' },
          { title: '산업별 — 연구기관/대학', value: 'research' },
          { title: '제품유형별 — 액제제조 솔루션', value: 'solutions' },
          { title: '제품유형별 — 웨어러블 디바이스', value: 'wearable' },
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
      name: 'challenge',
      title: '과제',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'solution',
      title: '해결방안',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'result',
      title: '성과',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'metrics',
      title: '데이터 (전·후)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: '항목', type: 'string' },
            { name: 'before', title: '전', type: 'string' },
            { name: 'after', title: '후', type: 'string' },
          ],
          preview: {
            select: { title: 'label', before: 'before', after: 'after' },
            prepare({ title, before, after }: { title?: string; before?: string; after?: string }) {
              return { title, subtitle: `전: ${before ?? '-'} → 후: ${after ?? '-'}` }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'body',
      title: '상세 내용',
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
