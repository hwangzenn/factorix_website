import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { referenceMaterial } from './referenceMaterial'
import { caseStudy } from './caseStudy'
import { seo } from './seo'
import { industryLogo } from './industryLogo'
import { blogPost } from './blogPost'
import { videoEmbed } from './videoEmbed'
import { faq } from './faq'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, referenceMaterial, caseStudy, industryLogo, blogPost, seo, videoEmbed, faq],
}
