export const PRODUCTOS_QUERY = `
  *[_type == "producto"] | order(nombre asc) {
    _id,
    nombre,
    categoria,
    precio,
    descripcion,
    "imagenUrl": imagen.asset->url
  }
`

export const CONFIGURACION_QUERY = `
  *[_id == "configuracionSitio"][0]{
    nombreNegocio,
    textoHero,
    "heroImagenUrl": heroImagen.asset->url,
    whatsapp,
    instagram,
    email,
    direccion
  }
`
