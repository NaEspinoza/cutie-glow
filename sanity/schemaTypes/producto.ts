import { defineType } from 'sanity'

export const producto = defineType({
  name: 'producto',
  title: 'Productos de Cosmética',
  type: 'document',
  fields: [
    {
      name: 'nombre',
      title: 'Nombre del Producto',
      type: 'string',
    },
    {
      name: 'imagen',
      title: 'Imagen del Producto',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'precio',
      title: 'Precio ($)',
      type: 'number',
    },
    {
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
    },
    
    {
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Perfumes', value: 'perfumeria' },
          { title: 'Maquillaje', value: 'maquillaje' },
          { title: 'Skincare', value: 'skincare' },
        ],
        layout: 'dropdown', // Esto fuerza a que se vea como un menú desplegable
      },
    },
  ],
})
