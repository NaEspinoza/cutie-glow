'use client'
import ig from '../images/instagra-icon.png'
import tiktok from '../images/icon-tiktok.png'
import whatsapp from '../images/whatsapp.png'
import mail from '../images/email.png'

// 1. Añadimos useEffect para poder traer los datos en el cliente
import { useMemo, useState, useEffect } from 'react'

// 2. Importamos el cliente de Sanity que creaste antes
import { client } from '@/sanity/sanity' 

// 3. Ajustamos el tipo de Producto a los nombres que pusimos en español en Sanity
type Product = {
  _id: string
  nombre: string
  categoria: 'perfumeria' | 'maquillaje' | 'skincare' // Asegúrate de que diga 'categoria' y no 'category'
  precio: number
  imagenUrl: string
  descripcion?: string
}


const money = (value: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)

export default function Page() {
  const [category, setCategory] = useState('Todos')
  const [cart, setCart] = useState<Product[]>([])
  const [openCart, setOpenCart] = useState(false)
  
  // 4. Creamos un estado para guardar los productos de Sanity (empieza vacío)
  const [products, setProducts] = useState<Product[]>([])

  // 5. Este bloque consulta a Sanity ni bien el usuario entra a la web
  useEffect(() => {
    async function fetchSanityProducts() {
      try {
        const data = await client.fetch(`
          *[_type == "producto"] {
            _id,
            nombre,
            categoria, // Traemos el valor directo ('perfumeria', 'maquillaje' o 'skincare')
            precio,
            descripcion,
            "imagenUrl": imagen.asset->url
          }
        `)
        
        // Guardamos los productos puros tal cual vienen de Sanity
        setProducts(data)
      } catch (error) {
        console.error("Error al traer productos de Sanity:", error)
      }
    }

    fetchSanityProducts()
  }, [])

  // Los filtros leen en vivo el valor de Sanity y lo comparan con tu botón de la interfaz
  const filtered =
    category === 'Todos'
      ? products
      : products.filter((p) => {
          if (category === 'Perfumes' && p.categoria === 'perfumeria') return true
          if (category === 'Maquillaje' && p.categoria === 'maquillaje') return true
          if (category === 'Skincare' && p.categoria === 'skincare') return true
          return false
        })

  
      const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.precio, 0),
    [cart]
  )


  function addProduct(product: Product) {
    setCart((current) => [...current, product])
    setOpenCart(true)
  }
  
  function checkout() {
    // Ajustamos p.name por p.nombre porque así viene de Sanity
    const message = `Hola Cutie Glow, quiero consultar por:%0A${cart
      .map((p) => `• ${p.nombre} — ${money(p.precio)}`)
      .join('%0A')}%0A%0ATotal estimado: ${money(total)}`

    window.open(
      `https://wa.me/5492610000000?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <main>
      <div className="announcement">
        Envíos a todo el país · Retiro gratis en el centro de Mendoza
      </div>

      <header className="site-header">
        <a className="logo" href="#inicio" aria-label="Cutie Glow inicio">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/491494290_1095254185954651_3550913173250088619_n-ShKfvT0u5IO0DWtzj7rK91SbQl5ZmL.jpg"
            alt="Cutie Glow"
          />
        </a>
        <nav aria-label="Navegación principal">
          <a href="#catalogo">Catálogo</a>
          <a href="#mayorista">Mayorista</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <button
          className="cart-button"
          onClick={() => setOpenCart(true)}
          aria-label={`Abrir carrito, ${cart.length} productos`}
        >
          <span className="cart-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>
          </span>
          <b>{cart.length}</b>
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Belleza que se siente</p>
          <h1>
            Tu ritual.<br />
            <em>Tu glow.</em>
          </h1>
          <p className="hero-text">
            Perfumería y maquillaje para todos los días, para regalar and para
            hacerte sentir increíble.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#catalogo">
              Ver catálogo <span>↘</span>
            </a>
            <a className="text-link" href="#mayorista">
              Soy mayorista →
            </a>
          </div>
        </div>
        <div className="hero-product">
          <div className="sunburst"></div>
          <div className="hero-bottle">

          </div>
          <p>
            Una fragancia para<br />
            <strong>brillar a tu manera.</strong>
          </p>
        </div>
      </section>
      <section className="benefits" aria-label="Beneficios">
        <div>
          <span>01</span>
          <strong>Compra simple</strong>
          <p>Elegís, agregás y consultás por WhatsApp.</p>
        </div>
        <div>
          <span>02</span>
          <strong>Precios reales</strong>
          <p>Opciones minoristas y listas mayoristas.</p>
        </div>
        <div>
          <span>03</span>
          <strong>Atención cercana</strong>
          <p>Estamos en el centro de Mendoza para ayudarte.</p>
        </div>
      </section>

      <section className="catalog-section" id="catalogo">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Encontrá tu favorito</p>
            <h2>
              El catálogo <em>Cutie</em>
            </h2>
          </div>
          <p className="section-note">
            Productos seleccionados para elevar tu rutina, con novedades todas
            las semanas.
          </p>
        </div>

        <div className="filters" role="tablist">
          {['Todos', 'Perfumes', 'Maquillaje', 'Skincare'].map((item) => (
            <button
              key={item}
              className={category === item ? 'active' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((product) => (
            <article className="product-card" key={product._id}>
              <div className="product-image">
                {/* Nota: si en el futuro agregas etiquetas en Sanity, las leemos aquí */}
                <img src={product.imagenUrl} alt={product.nombre} />
              </div>
              <div className="product-info">
                <p>{product.categoria}</p>
                <h3>{product.nombre}</h3>
                <div className="product-bottom">
                  <strong>{money(product.precio)}</strong>
                  <button
                    onClick={() => addProduct(product)}
                    aria-label={`Agregar ${product.nombre}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="wholesale" id="mayorista">
        <div>
          <p className="eyebrow">Para tu negocio</p>
          <h2>
            Crezcamos<br />
            <em>juntas.</em>
          </h2>
        </div>
        <div className="wholesale-copy">
          <p>
            ¿Tenés un local, emprendimiento o vendés online? Accedé a precios
            mayoristas, surtido flexible y asesoramiento personalizado.
          </p>
          <a
            className="button button-light"
            href="https://wa.me/5492610000000?text=Hola%20Cutie%20Glow%2C%20quiero%20conocer%20la%20lista%20mayorista"
            target="_blank"
            rel="noreferrer"
          >
            Quiero la lista mayorista ↗
          </a>
        </div>
      </section>

      <section className="about" id="nosotros">
        <div className="about-card">
          <p className="eyebrow">Somos Cutie Glow</p>
          <h2>
            Belleza sin reglas,<br />
            <em>con mucho glow.</em>
          </h2>
          <p>
            Somos una perfumería mendocina que cree que sentirse bien no tiene
            una sola forma. Elegimos productos lindos, accesibles y de calidad
            para acompañarte en cada versión de vos.
          </p>
        </div>
        <div className="about-stamp">
          MENDOZA<br />
          <strong>✦</strong><br />
          DESDE 2024
        </div>
      </section>

      <footer id="contacto">
        <div className="footer-newsletter">
          <p className="footer-title">
            ¡Recibí nuestras ofertas<br />
            y novedades por mail!
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter">
              Tu email
            </label>
            <input
              id="newsletter"
              type="email"
              placeholder="tu@email.com"
            />
            <button aria-label="Suscribirme">→</button>
          </form>
          <div className="footer-brand">
            <a className="logo" href="#inicio">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/491494290_1095254185954651_3550913173250088619_n-ShKfvT0u5IO0DWtzj7rK91SbQl5ZmL.jpg"
                alt="Cutie Glow"
              />
            </a>
            <p>
              Perfumería y maquillaje<br />
              en el centro de Mendoza.
            </p>
          </div>
        </div>

        <div className="footer-links">
          <p className="footer-label">Acerca de nosotros</p>
          <a href="#nosotros">Nosotros</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#contacto">Locales</a>
          <a href="#mayorista">Hot sale</a>
        </div>

        <div className="footer-contact">
          <p className="footer-label">Contacto</p>
          <a href="https://wa.me/5492610000000">WhatsApp</a>
          <a href="mailto:hola@cutieglow.com.ar">hola@cutieglow.com.ar</a>
          <p>
            Gral. Paz 67<br />
            Ciudad de Mendoza
          </p>
        </div>

        <div className="footer-social">
          <a href="#contacto" aria-label="Instagram"><img src={ig.src} alt="insta" /></a>
          <a href="#contacto" aria-label="TikTok"><img src={tiktok.src} alt="" /></a>
          <a href="mailto:hola@cutieglow.com.ar" aria-label="Whatsapp"><img src={whatsapp.src} alt="" /></a>
          <a href="mailto:hola@cutieglow.com.ar" aria-label="Email"><img src={mail.src} alt="" /></a>
        </div>

        <div className="footer-bottom">
          © 2024 Cutie Glow · Todos los derechos reservados.{' '}
          <a href="#contacto">Políticas de Privacidad y Términos de Servicio</a>
        </div>
      </footer>

      {openCart && (
        <div className="cart-overlay" onClick={() => setOpenCart(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-head">
              <div>
                <p className="eyebrow">Tu selección</p>
                <h2>Mi carrito</h2>
              </div>
              <button onClick={() => setOpenCart(false)} aria-label="Cerrar carrito">
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>✦</span>
                <p>
                  Tu carrito está esperando<br />
                  algo lindo.
                </p>
                <a href="#catalogo" onClick={() => setOpenCart(false)}>
                  Explorar catálogo →
                </a>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div className="cart-item" key={`${item._id}-${index}`}>
                      <img src={item.imagenUrl} alt="" />
                      <div>
                        <h3>{item.nombre}</h3>
                        <p>{money(item.precio)}</p>
                      </div>
                      <button
                        onClick={() =>
                          setCart((current) =>
                            current.filter((_, i) => i !== index)
                          )
                        }
                        aria-label={`Quitar ${item.nombre}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>{money(total)}</strong>
                  </div>
                  <p>El envío y la disponibilidad se confirman por WhatsApp.</p>
                  <button className="button button-dark full" onClick={checkout}>
                    Consultar por WhatsApp ↗
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  )
}