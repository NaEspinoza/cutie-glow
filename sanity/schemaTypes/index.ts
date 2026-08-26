import { type SchemaTypeDefinition } from 'sanity'
import { producto } from './producto'
import { configuracionSitio } from './configuracionSitio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [producto, configuracionSitio],
}
