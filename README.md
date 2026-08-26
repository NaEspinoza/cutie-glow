# ✦ Cutie Glow — E-commerce & CMS ✦

¡Bienvenido al repositorio de **Cutie Glow**! Este es un proyecto de e-commerce moderno enfocado en la estética de perfumería, maquillaje y cuidado de la piel (*Skincare*). Está desarrollado utilizando arquitecturas modernas de renderizado web y un panel autogestionable para el control total del stock y catálogo.

---

## 🚀 Tecnologías Utilizadas

El proyecto fue construido con un Stack tecnológico de nivel profesional:

*   **Frontend:** [Next.js](https://nextjs.org) (App Router) + TypeScript, exportado como sitio 100% estático (`output: 'export'`).
*   **Gestor de Contenidos (CMS Headless):** [Sanity v3](https://sanity.io) — Studio desplegado por separado (no vive dentro de la app Next.js).
*   **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com) (CDN global, sin servidor propio).
*   **Gestor de Paquetes:** [pnpm](https://pnpm.io).
*   **Estilos y Componentes:** Tailwind CSS + Radix UI / Shadcn UI.
*   **Integración de Ventas:** Checkout e integraciones directas automatizadas con la API de WhatsApp (`wa.me`).

---

## 🛠️ Características Principales

*   **Catálogo Dinámico:** Los productos se cargan y editan desde Sanity Studio, y se traen en build-time (Server Component) hacia el sitio estático.
*   **Filtros en Tiempo Real:** Filtrado interactivo en el cliente por categorías (*Perfumes*, *Maquillaje*, *Skincare*).
*   **Carrito de Compras Integrado:** Flujo completo para añadir elementos, calcular subtotales y generar un mensaje pre-formateado automáticamente para enviar el pedido por WhatsApp.
*   **Configuración editable sin código:** nombre del negocio, texto del hero, WhatsApp, Instagram, email y dirección viven en el documento único `configuracionSitio` de Sanity — el dueño del negocio los edita sin tocar el repo.
*   **Rebuild automático:** un webhook de Sanity dispara un Deploy Hook de Cloudflare Pages cada vez que se publica un `producto` o `configuracionSitio`, reconstruyendo el sitio en 1-2 minutos.

---

## 💻 Configuración Local

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/jeremias1234-bit/cutie-glow.git
cd cutie-glow
pnpm install
```

### 2. Variables de entorno (`.env.local`)
Crea un archivo llamado `.env.local` en la raíz del proyecto y añade tus credenciales de Sanity:
```text
NEXT_PUBLIC_SANITY_PROJECT_ID="s2trabv5"
NEXT_PUBLIC_SANITY_DATASET="production"
```

### 3. Ejecutar el sitio web
```bash
pnpm dev
```
La página web principal corre en: `http://localhost:3000`

### 4. Ejecutar el Sanity Studio (local)
El Studio ya no vive dentro de la app Next.js. Para editarlo/probarlo localmente:
```bash
npx sanity dev
```
Studio local en: `http://localhost:3333`

### 5. Validar el build estático
```bash
pnpm run build     # genera la carpeta out/
pnpm run preview   # sirve out/ localmente para probarlo antes de deployar
```

---

## 🌐 Producción

*   **URL:** https://cutieglow.aitria.ai
*   **Hosting:** Cloudflare Pages, build estático (`output: 'export'`, carpeta `out/`).
*   **Studio:** desplegado con `npx sanity deploy` a `https://<hostname-elegido>.sanity.studio`.
*   **Rebuild automático:** webhook de Sanity (`manage.sanity.io` → API → Webhooks) filtrado a `_type == "producto" || _type == "configuracionSitio"`, apuntando al Deploy Hook del proyecto en Cloudflare Pages.
*   **Pendiente conocido:** el campo `whatsapp` de `configuracionSitio` tiene un número placeholder (`5492610000000`) hasta que se cargue el número real del negocio — se edita directamente en el Studio, sin necesidad de tocar código ni redeployar a mano.

---

## 📐 Estructura del Proyecto

*   `app/` — Rutas y vistas principales de Next.js (App Router). `page.tsx` es un Server Component que trae productos y configuración de Sanity en build-time.
*   `components/landing-client.tsx` — Toda la interactividad de la landing (filtros, carrito, checkout por WhatsApp).
*   `sanity/` — Configuración del cliente (`sanity/lib/client.ts`, env-driven) y lógica de esquemas.
*   `sanity/schemaTypes/` — `producto.ts` (catálogo) y `configuracionSitio.ts` (singleton de configuración del sitio).
*   `sanity.config.ts` / `sanity.cli.ts` — Configuración del Studio, desplegado de forma independiente (no dentro de la app Next.js).
