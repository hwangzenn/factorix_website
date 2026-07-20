import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: '블로그',
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
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '인사이트', value: 'insight' },
          { title: '팁', value: 'tips' },
          { title: '뉴스', value: 'news' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: '작성자',
      type: 'string',
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
      description: '권장 크기 1200×630px (카드/OG 이미지 겸용)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: '요약 설명 (OG 겸용)',
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
      name: 'body',
      title: '본문',
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
    defineField({
      name: 'featuredOnMain',
      title: '메인페이지 노출',
      description: '체크하면 메인페이지에 우선 노출됩니다',
      type: 'boolean',
      initialValue: false,
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
