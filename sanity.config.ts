import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

const SINGLETON_TYPES = new Set(['configuracionSitio'])

export default defineConfig({
  name: 'default',
  title: 'Cutie Glow',

  // El Studio se bundlea con el compilador propio de Sanity (Vite), que solo
  // inyecta env vars con prefijo SANITY_STUDIO_ — no NEXT_PUBLIC_ (eso es
  // exclusivo del bundler de Next.js). projectId/dataset no son secretos
  // (son identificadores públicos), así que van hardcodeados acá.
  projectId: 's2trabv5',
  dataset: 'production',

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
