import { DM_Sans, Fraunces } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const SITE_URL = 'https://cutieglow.aitria.ai'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Cutie Glow | Perfumería y maquillaje en Mendoza',
    template: '%s | Cutie Glow',
  },
  description:
    'Perfumería, maquillaje y skincare. Comprá por menor o pedí la lista mayorista. Estamos en el centro de Mendoza.',
  openGraph: {
    title: 'Cutie Glow | Perfumería y maquillaje en Mendoza',
    description:
      'Perfumería, maquillaje y skincare. Comprá por menor o pedí la lista mayorista.',
    url: SITE_URL,
    siteName: 'Cutie Glow',
    locale: 'es_AR',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#df0d73',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${dmSans.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
