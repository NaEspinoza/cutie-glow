import { createClient } from 'next-sanity'

export const client = createClient({
  // Coloca aquí exactamente el mismo ID de 8 caracteres que pusiste en tu config
  projectId: 's2trabv5', 
  dataset: 'production',
  apiVersion: '2024-03-01',
  useCdn: false, // Ponlo en false durante el desarrollo para ver los cambios al instante
})
