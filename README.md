# ✦ Cutie Glow — E-commerce & CMS ✦

¡Bienvenido al repositorio de **Cutie Glow**! Este es un proyecto de e-commerce moderno enfocado en la estética de perfumería, maquillaje y cuidado de la piel (*Skincare*). Está desarrollado utilizando arquitecturas modernas de renderizado web y un panel autogestionable para el control total del stock y catálogo.

---

## 🚀 Tecnologías Utilizadas

El proyecto fue construido con un Stack tecnológico de nivel profesional:

*   **Frontend:** [Next.js](https://nextjs.org) (App Router) + TypeScript.
*   **Gestor de Contenidos (CMS Headless):** [Sanity v3](https://sanity.io) (Estudio incrustado bajo la ruta `/studio`).
*   **Gestor de Paquetes:** [pnpm](https://pnpm.io) (Configurado para instalaciones ultra rápidas mediante espacios de trabajo).
*   **Estilos y Componentes:** Tailwind CSS + Radix UI / Shadcn UI.
*   **Integración de Ventas:** Checkout e integraciones directas automatizadas con la API de WhatsApp.

---

## 🛠️ Características Principales

*   **Catálogo Dinámico:** Los productos se cargan y editan desde Sanity Studio e impactan en vivo en el sitio web principal sin necesidad de modificar el código.
*   **Filtros en Tiempo Real:** Filtrado interactivo en el cliente por categorías (*Perfumes*, *Maquillaje*, *Skincare*).
*   **Carrito de Compras Integrado:** Flujo completo para añadir elementos, calcular subtotales y generar un mensaje pre-formateado automáticamente para enviar el pedido por WhatsApp.
*   **Seguridad Estricta:** Implementación de tipado estricto con TypeScript tanto en el esquema de la base de datos de Sanity como en los componentes del Frontend.

---

## 💻 Configuración Local

Si deseas clonar y correr este proyecto de forma local en tu computadora, sigue estos pasos:

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com
cd cutie-glow
pnpm install
```

### 2. Variables de entorno (`.env.local`)
Crea un archivo llamado `.env.local` en la raíz del proyecto y añade tus credenciales de Sanity:
```text
NEXT_PUBLIC_SANITY_PROJECT_ID="tu_project_id_de_8_caracteres"
NEXT_PUBLIC_SANITY_DATASET="production"
```

### 3. Ejecutar el servidor de desarrollo
```bash
pnpm dev
```
*   La página web principal correrá en: `http://localhost:3000`
*   El panel de administración (Sanity Studio) estará disponible en: `http://localhost:3000/studio`

---

## 📐 Estructura del Proyecto

El backend de datos y el diseño visual conviven de forma modular:
*   `app/` — Rutas y vistas principales de Next.js (App Router).
*   `app/studio/` — Punto de entrada para el renderizado del panel de Sanity en el cliente.
*   `sanity/` — Configuración del cliente y lógica de esquemas.
*   `sanity/schemaTypes/` — Estructura y modelos de datos (Esquema de `producto.ts` personalizado).
