# Imágenes

Todos los iconos de la landing están incrustados como SVG inline en el HTML (sin requests HTTP extra).
Este directorio se reserva para:

- `logo.svg` — logotipo oficial (incluido)
- `og-cover.png` — imagen Open Graph / Twitter Card (recomendado 1200×630 px)
- Capturas de proyectos del portfolio (si se reemplazan los placeholders CSS por imágenes reales)

Recomendaciones:

- Usa formatos modernos: **AVIF** o **WebP** con fallback a JPG/PNG via `<picture>`.
- Define `width` y `height` para evitar CLS.
- Añade `loading="lazy"` y `decoding="async"` a imágenes fuera del viewport.
- Optimiza con [Squoosh](https://squoosh.app) o `sharp` antes de desplegar.
