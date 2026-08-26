import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const configuracionSitio = defineType({
  name: 'configuracionSitio',
  title: 'Configuración del sitio',
  type: 'document',
  icon: CogIcon,
  // Documento único (singleton): no debe aparecer en el menú "Crear nuevo".
  // El singleton se fuerza en sanity/structure.ts + sanity.config.ts (document.actions).
  fields: [
    defineField({
      name: 'nombreNegocio',
      title: 'Nombre del negocio',
      type: 'string',
      initialValue: 'Cutie Glow',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'textoHero',
      title: 'Texto del hero (portada)',
      description: 'Frase principal que se ve arriba de todo en la home.',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImagen',
      title: 'Foto del hero (opcional, a futuro)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'whatsapp',
      title: 'Número de WhatsApp',
      description:
        '⚠️ Solo dígitos, con código de país y área, sin "+" ni espacios ' +
        '(ej: 5492610000000). VALOR PLACEHOLDER: reemplazar por el número ' +
        'real del negocio antes de anunciar el sitio.',
      type: 'string',
      initialValue: '5492610000000',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[0-9]{10,15}$/, {
            name: 'solo-digitos',
            invert: false,
          })
          .error('Usá solo números, con código de país y área (10 a 15 dígitos).'),
    }),
    defineField({
      name: 'instagram',
      title: 'URL de Instagram',
      description: 'URL completa del perfil, ej: https://instagram.com/cutieglow',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'email',
      title: 'Email de contacto',
      type: 'string',
      initialValue: 'hola@cutieglow.com.ar',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'nombreNegocio', subtitle: 'whatsapp' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'Configuración del sitio',
      subtitle: subtitle ? `WhatsApp: ${subtitle}` : undefined,
    }),
  },
})
