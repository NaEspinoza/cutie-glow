import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // false: siempre trae el dato recién publicado en cada build (los builds
  // son infrecuentes, disparados por el webhook de Sanity al publicar).
  useCdn: false,
})
