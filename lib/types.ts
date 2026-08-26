export type Product = {
  _id: string
  nombre: string
  categoria: 'perfumeria' | 'maquillaje' | 'skincare'
  precio: number
  imagenUrl: string
  descripcion?: string
}

export type ConfiguracionSitio = {
  nombreNegocio: string
  textoHero: string
  heroImagenUrl: string | null
  whatsapp: string
  instagram: string | null
  email: string
  direccion: string | null
}
