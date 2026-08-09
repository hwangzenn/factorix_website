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
    defineField({
      name: 'keywords',
      title: '연관 키워드',
      description: '검색엔진 메타데이터용 키워드 (선택)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
})
