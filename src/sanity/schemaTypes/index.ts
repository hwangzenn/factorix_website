import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { referenceMaterial } from './referenceMaterial'
import { caseStudy } from './caseStudy'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, referenceMaterial, caseStudy],
}
