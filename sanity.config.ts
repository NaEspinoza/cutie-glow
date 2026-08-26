import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { projectId, dataset } from './sanity/env'

const SINGLETON_TYPES = new Set(['configuracionSitio'])

export default defineConfig({
  name: 'default',
  title: 'Cutie Glow',

  projectId,
  dataset,

  plugins: [structureTool({ structure })],

  schema,

  document: {
    // Evita "Duplicar" y "Eliminar" sobre el singleton.
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && ['publish', 'discardChanges', 'restore'].includes(action),
          )
        : input,
    // Evita que aparezca en el buscador global "Crear nuevo".
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((item) => !SINGLETON_TYPES.has(item.templateId))
        : prev,
  },
})
