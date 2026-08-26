import type { StructureResolver } from 'sanity/structure'

const SINGLETON_TYPES = new Set(['configuracionSitio'])

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Cutie Glow')
    .items([
      S.listItem()
        .title('Configuración del sitio')
        .child(
          S.document()
            .schemaType('configuracionSitio')
            .documentId('configuracionSitio'),
        ),
      S.divider(),
      // Resto de tipos de documento, excluyendo el singleton para que no
      // aparezca duplicado como lista de "crear varios".
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETON_TYPES.has(item.getId() as string),
      ),
    ])
