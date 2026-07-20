import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { referenceMaterial } from './referenceMaterial'
import { caseStudy } from './caseStudy'
import { seo } from './seo'
import { industryLogo } from './industryLogo'
import { blogPost } from './blogPost'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, referenceMaterial, caseStudy, industryLogo, blogPost, seo],
}
