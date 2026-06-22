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
          { title: '단독설비 — 교반/탈포/쓰리롤밀', value: 'standalone-mixer' },
          { title: '단독설비 — 액상충진기', value: 'standalone-filling' },
          { title: '단독설비 — AI 디스펜서', value: 'standalone-dispenser' },
          { title: '단독설비 — 협동/직교/3축로봇', value: 'standalone-robot' },
          { title: '단독설비 — UV/IR 경화기', value: 'standalone-curing' },
          { title: 'AI 시스템 — AI 자동보정 토출', value: 'ai-auto-calibration' },
          { title: 'AI 시스템 — 자동화 시스템', value: 'ai-smart-factory' },
          { title: '웨어러블 — 소개', value: 'wearable-intro' },
          { title: '웨어러블 — B2C', value: 'wearable-b2c' },
          { title: '웨어러블 — B2B', value: 'wearable-b2b' },
          { title: '웨어러블 — B2G', value: 'wearable-b2g' },
        ],
      },
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
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: '항목', type: 'string' },
            { name: 'value', title: '값', type: 'string' },
          ],
          preview: { select: { title: 'key', subtitle: 'value' } },
        },
      ],
    }),
    defineField({
      name: 'images',
      title: '제품 이미지',
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
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail' },
  },
})
