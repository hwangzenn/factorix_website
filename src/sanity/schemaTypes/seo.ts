import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO / 메타데이터',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'metaTitle',
      title: '메타 타이틀',
      type: 'string',
      description: '비워두면 문서 제목을 사용합니다. 60자 이내 권장.',
    }),
    defineField({
      name: 'metaDescription',
      title: '메타 설명',
      type: 'text',
      rows: 2,
      description: '비워두면 기본 설명을 사용합니다. 155자 이내 권장.',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG 이미지',
      type: 'image',
      options: { hotspot: true },
      description: '비워두면 대표 이미지를 사용합니다.',
    }),
    defineField({
      name: 'ogImageAlt',
      title: 'OG 이미지 설명 (alt)',
      type: 'string',
    }),
  ],
})
