import { defineField, defineType } from 'sanity'
import { MANUFACTURING_INDUSTRIES } from '../../lib/industries'

// caseStudy.ts/blogPost.ts/product.ts 의 산업군 태그와 동일한 5개 카테고리 체계를 사용한다.
const INDUSTRY_CATEGORIES = MANUFACTURING_INDUSTRIES.map((i) => ({ title: i.label, value: i.key }))

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
