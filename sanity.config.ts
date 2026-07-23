'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\sanity\[[...tool]]\page.tsx` route
 */

import {table} from '@sanity/table'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export default defineConfig({
  basePath: '/sanity',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: schema.types,
    templates: (prev) => [
      ...prev,
      // 자료실/제품 카테고리 폴더 안에서 "새로 만들기"를 누르면 해당 카테고리가 미리 선택된 채로 열림
      // (사용처: src/sanity/structure.ts의 RESOURCE_GROUPS / PRODUCT_GROUPS)
      {
        id: 'referenceMaterial-by-category',
        title: '자료실 (카테고리 지정)',
        schemaType: 'referenceMaterial',
        parameters: [{name: 'category', type: 'string'}],
        value: (params: {category: string}) => ({category: params.category}),
      },
      {
        id: 'product-by-category',
        title: '제품 (카테고리 지정)',
        schemaType: 'product',
        parameters: [{name: 'category', type: 'string'}],
        value: (params: {category: string}) => ({category: params.category}),
      },
    ],
  },
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    table(),
  ],
})
