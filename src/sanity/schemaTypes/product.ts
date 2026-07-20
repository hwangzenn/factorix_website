import { defineField, defineType } from 'sanity'
import { SpecsTableInput } from '../components/SpecsTableInput'

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
          { title: '교반/탈포기', value: 'mixer-defoamer' },
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
      name: 'description',
      title: '제품 개요 (OG 겸용)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'specs',
      title: '스펙',
      description: 'Attribute(항목) / Property(값) 2열 표로 편집합니다. "+ 행 추가"로 행을 늘리세요.',
      type: 'array',
      components: { input: SpecsTableInput },
      of: [
        {
          type: 'object',
          name: 'specItem',
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
      description: '권장 비율 1:1(정사각형). 첫 번째 이미지가 카드/OG 대표 이미지로 사용됩니다.',
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
    select: { title: 'title', subtitle: 'category', media: 'images.0' },
  },
})
