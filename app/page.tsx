import { client } from '@/sanity/lib/client'
import { PRODUCTOS_QUERY, CONFIGURACION_QUERY } from '@/sanity/lib/queries'
import { LandingClient } from '@/components/landing-client'
import type { Product, ConfiguracionSitio } from '@/lib/types'

// Fallback usado SOLO si el fetch a Sanity falla durante el build
// (ej. dataset momentáneamente inaccesible). No debe usarse en producción real.
const FALLBACK_CONFIG: ConfiguracionSitio = {
  nombreNegocio: 'Cutie Glow',
  textoHero:
    'Perfumería y maquillaje para todos los días, para regalar y para hacerte sentir increíble.',
  heroImagenUrl: null,
  whatsapp: '5492610000000', // PLACEHOLDER
  instagram: null,
  email: 'hola@cutieglow.com.ar',
  direccion: null,
}

export default async function Page() {
  const [productos, configuracion] = await Promise.all([
    client.fetch<Product[]>(PRODUCTOS_QUERY).catch(() => [] as Product[]),
    client
      .fetch<ConfiguracionSitio | null>(CONFIGURACION_QUERY)
      .catch(() => null),
  ])

  return (
    <LandingClient
      productos={productos}
      config={configuracion ?? FALLBACK_CONFIG}
    />
  )
}
