import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Cutie Glow',
  
  // PON AQUÍ TU ID REAL DE SANITY ENTRE COMILLAS
  projectId: 's2trabv5', 
  
  dataset: 'production',
  
  plugins: [
    structureTool(), 
  ],
  
  schema: schema,
})
