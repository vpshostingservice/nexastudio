# NexaStudio · Landing page

Landing page de una sola página, construida con **HTML5, CSS3 y JavaScript vanilla** (sin frameworks), optimizada para rendimiento, accesibilidad y SEO.

> _"Webs que convierten visitantes en clientes."_

---

## Estructura del proyecto

```
nexastudio/
├── index.html                  # HTML semántico + critical CSS inline + JSON-LD
├── assets/
│   ├── css/
│   │   ├── main.css            # Globals, utilidades, focus-visible, a11y
│   │   ├── components.css      # Navbar, cards, carrusel, formulario, etc.
│   │   ├── sections.css        # Layout por sección + media queries mobile-first
│   │   └── animations.css      # Keyframes y clases reveal--d1/2/3
│   ├── js/
│   │   ├── main.js             # Entry point (ES modules)
│   │   ├── navbar.js           # Sticky + active link (IntersectionObserver)
│   │   ├── animations.js       # Scroll reveal + partículas
│   │   ├── carousel.js         # Carrusel testimonios (a11y, swipe, autoplay)
│   │   └── form.js             # Validación + envío simulado
│   ├── images/
│   │   ├── logo.svg            # Logo oficial SVG
│   │   └── README.md           # Guía de assets
│   └── fonts/
│       └── README.md           # Instrucciones para self-hosting de Inter
└── README.md                   # Este archivo
```

### Convenciones

- **Módulos ES6** con `import`/`export`. El HTML carga `main.js` como `type="module"`, que ya implica `defer`.
- Clases de estado con prefijo `is-*` (`is-active`, `is-scrolled`, `is-open`, `is-invalid`, `is-loading`, `is-visible`).
- Modificadores BEM-lite con `--` (`plan--featured`, `reveal--d1`, `avatar--1`).
- Data-attributes para JS hooks: `data-carousel`, `data-carousel-track`, etc. — **nunca** se usan clases como selectores JS.

---

## Desarrollo local

No hay build step. Basta con servir la carpeta con cualquier servidor estático:

```bash
# Con Python 3
python -m http.server 5173

# Con Node (sin dependencias)
npx serve .

# Con PHP
php -S localhost:5173
```

Luego abre `http://localhost:5173`.

> ⚠️ `file://` no funciona porque los módulos ES6 requieren CORS.

---

## Despliegue

### Netlify

1. **Drag & drop** la carpeta `nexastudio/` en [app.netlify.com/drop](https://app.netlify.com/drop), o
2. Conecta el repo en Netlify:
   - **Build command**: _(vacío)_
   - **Publish directory**: `nexastudio` (o `.` si el proyecto está en la raíz)
3. Añade un `_headers` (opcional) para caché inmutable en `/assets/*`:

```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

### Vercel

1. `vercel` CLI → `vercel deploy` desde la carpeta del proyecto, o
2. Conecta el repo de GitHub/GitLab/Bitbucket.
   - **Framework preset**: Other
   - **Output directory**: (raíz del proyecto)
3. Añade un `vercel.json` (opcional):

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### GitHub Pages

```bash
# Desde la raíz del repo
git checkout -b gh-pages
git add nexastudio
git commit -m "Deploy NexaStudio"
git push origin gh-pages
```

Luego en **Settings → Pages** elige rama `gh-pages` y carpeta `/nexastudio`. Disponible en `https://<user>.github.io/<repo>/nexastudio/`.

### Cloudflare Pages

- **Framework preset**: None
- **Build command**: _(vacío)_
- **Build output directory**: raíz del proyecto

---

## Personalización

### Paleta de colores

Edita las variables CSS en `index.html` (critical CSS inline):

```css
:root {
  --bg: #0a0a0f;
  --brand-1: #6366f1;
  --brand-2: #06b6d4;
  --brand-grad: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
  /* … */
}
```

### Cambiar el endpoint del formulario

En `assets/js/form.js`, sustituye el `setTimeout` simulado:

```js
await fetch('/api/contact', {
  method: 'POST',
  body: new FormData(form)
});
```

O integra con Formspree / Netlify Forms añadiendo el atributo `netlify` al `<form>`.

---

## Checklist de optimizaciones aplicadas

### HTML
- [x] `<!DOCTYPE html>`, `lang="es"`, `charset UTF-8`
- [x] Estructura semántica: `header`, `main`, `section`, `article`, `nav`, `footer`, `aside`, `figcaption`, `blockquote`
- [x] Meta description, author, robots, canonical, theme-color, color-scheme
- [x] Open Graph + Twitter Card completos
- [x] Favicon inline SVG (0 requests extra)
- [x] JSON-LD (`Organization`) para SEO
- [x] `aria-label`, `aria-expanded`, `aria-selected`, `aria-live`, `role="banner/contentinfo/status"`
- [x] Skip link preparado, focus-visible styling
- [x] Formulario con `autocomplete`, `minlength`, tipos correctos, mensajes inline
- [x] `focusable="false"` y `aria-hidden` en SVGs decorativos
- [x] Scripts con `type="module"` (defer implícito)
- [x] Sin scripts bloqueantes en `<head>`

### CSS
- [x] **Critical CSS inline** en `<head>` (above-the-fold: navbar + hero)
- [x] **Deferred CSS** con `rel="preload"` + `media="print" onload` + `<noscript>` fallback
- [x] Variables CSS para paleta completa, tipografía, radios, sombras y easing
- [x] Selectores eficientes (sin `!important` excesivo, sin overspecificity)
- [x] Sin estilos duplicados (reset y variables sólo en critical CSS)
- [x] Media queries **mobile-first** (min-width progresivas)
- [x] Animaciones exclusivamente con `transform` y `opacity`
- [x] `will-change` aplicado **sólo** en elementos con animación constante (orbs, devices, partículas, mini-site, track del carrusel)
- [x] `prefers-reduced-motion` respetado en crítico y en JS
- [x] `prefers-color-scheme` declarado via `color-scheme`
- [x] Glassmorphism con `backdrop-filter` + prefijo `-webkit-`

### JavaScript
- [x] **Vanilla JS** — cero dependencias
- [x] Módulos ES6 (`import`/`export`)
- [x] **Zero scroll event handlers en bucle caliente** (rAF throttling para navbar; IntersectionObserver para active link y reveals)
- [x] **Event delegation** en nav, carrusel (dots) y formulario (blur/input)
- [x] **Debounce** en el `resize` del carrusel
- [x] `AbortController` en el carrusel para limpieza de listeners → sin memory leaks
- [x] `Observer.unobserve()` tras revelar cada elemento
- [x] Autoplay del carrusel pausado en hover, focus y `visibilitychange`
- [x] Teclado en el carrusel (← →) y soporte touch/swipe
- [x] Form: validación custom en español, `aria-invalid`, `aria-busy`, honeypot-ready

### Imágenes y assets
- [x] Todos los iconos como **SVG inline** (redes, servicios, UI)
- [x] Favicon como `data:image/svg+xml` inline
- [x] Fondos con gradientes CSS puros (sin imágenes)
- [x] Placeholders de portfolio en **CSS puro** (mini-site artificial con gradientes)
- [x] `font-display: swap` en Google Fonts
- [x] Preconnect + preload de la hoja de fuentes
- [x] Guía para self-hosting de Inter incluida

### Objetivos Lighthouse

| Métrica          | Objetivo | Por qué se cumple |
|------------------|:--------:|-------------------|
| Performance      |  95+     | Critical CSS inline, fuentes swap, CSS deferido, 0 JS bloqueante, transforms/opacity sólo, IO en lugar de scroll, sin imágenes pesadas |
| Accessibility    |  100     | Landmarks, labels, aria, contraste AA sobre fondo oscuro, focus-visible, reduced-motion |
| Best Practices   |  100     | HTTPS-ready, sin errores de consola, meta viewport correcto, `charset` temprano |
| SEO              |  100     | Meta description, canonical, robots, OG/Twitter, JSON-LD, `lang`, enlaces descriptivos |

---

## Mejoras futuras sugeridas

- Reemplazar placeholders del portfolio por screenshots reales (AVIF/WebP).
- Añadir un endpoint real para el formulario (Formspree, Basin, Netlify Forms o backend propio).
- Integrar Plausible o Umami para analítica privada.
- Añadir una página `404.html` con la misma estética.
- Añadir `sitemap.xml` y `robots.txt` antes del despliegue a producción.
- Auditar con Lighthouse CI en la pipeline de despliegue.

---

## Licencia

MIT — úsalo, modifícalo y adáptalo libremente.
