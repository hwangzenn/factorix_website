import { defineField, defineType } from 'sanity'

// caseStudy.ts 의 산업별 카테고리 값과 동일 문자열을 사용한다.
const INDUSTRY_CATEGORIES = [
  { title: '바이오', value: 'bio' },
  { title: '화장품/뷰티', value: 'cosmetics' },
  { title: '화학/소재', value: 'chemical' },
  { title: '전기/전자', value: 'electronics' },
  { title: '자동차', value: 'automotive' },
  { title: '연구기관/대학', value: 'research' },
]

export const industryLogo = defineType({
  name: 'industryLogo',
  title: '산업군 로고 (메인페이지)',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: '산업군',
      type: 'string',
      options: { list: INDUSTRY_CATEGORIES },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logos',
      title: '고객사 로고',
      description: '이 산업군 카드에 노출할 고객사 로고 (2열 2행, 최대 4개, 투명 배경 권장)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'logoItem',
          fields: [
            defineField({
              name: 'image',
              title: '로고 이미지',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: '이미지 설명 (alt)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'alt', media: 'image' },
          },
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
  ],
  preview: {
    select: { title: 'category', media: 'logos.0.image' },
  },
})
