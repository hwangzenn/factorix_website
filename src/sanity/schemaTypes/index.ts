import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { referenceMaterial } from './referenceMaterial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, referenceMaterial],
}
