import { defineField, defineType } from 'sanity'
import { INDUSTRIES, PROCESSES } from '../../lib/blogFilters'
import { FeaturedToggleInput } from '../components/FeaturedToggleInput'
import { defaultDecorators, linkAnnotation } from './linkAnnotation'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: '고객 적용사례',
  type: 'document',
  fieldsets: [
    { name: 'tagsRow', title: '분류 태그', options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industries',
      title: '산업군',
      description: '블로그 > 적용사례(/blog/cases)의 필터로 사용됩니다.',
      type: 'string',
      fieldset: 'tagsRow',
      options: {
        layout: 'dropdown',
        list: INDUSTRIES.map((i) => ({ title: i.label, value: i.key })),
      },
    }),
    defineField({
      name: 'processes',
      title: '해당 공정',
      type: 'string',
      fieldset: 'tagsRow',
      options: {
        layout: 'dropdown',
        list: PROCESSES.map((p) => ({ title: p.label, value: p.key })),
      },
    }),
    defineField({
      name: 'slug',
      title: '슬러그 (URL)',
      description: '제목 + 산업군/공정 태그에서 자동 생성됩니다.',
      type: 'slug',
      options: {
        source: (doc: Record<string, unknown>) =>
          [doc.industries, doc.processes, doc.title].filter(Boolean).join(' '),
        maxLength: 96,
      },
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
      name: 'description',
      title: '한줄 설명 (OG 겸용)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'publishedAt',
      title: '발행일',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: '상세 내용',
      description: '소제목(H2)으로 구분해서 작성하면 상세페이지 좌측에 목차가 자동 생성됩니다.',
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
          marks: {
            decorators: defaultDecorators,
            annotations: [linkAnnotation],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: '이미지 설명 (alt)', type: 'string' }),
            defineField({ name: 'caption', title: '캡션', type: 'string' }),
          ],
        },
        { type: 'videoEmbed' },
        { type: 'table' },
      ],
    }),
    defineField({
      name: 'isPublic',
      title: '공개 여부',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featuredOnMain',
      title: '대표콘텐츠 (메인페이지 노출)',
      description: '메인페이지 산업군별 적용사례 카드에 노출할 대표콘텐츠. 산업군당 1개만 켤 수 있으며, 켜면 같은 산업군의 이전 대표콘텐츠는 자동으로 꺼집니다.',
      type: 'boolean',
      initialValue: false,
      components: { input: FeaturedToggleInput },
    }),
    defineField({
      name: 'seo',
      title: 'SEO / 메타데이터',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'industries', media: 'thumbnail' },
  },
})
