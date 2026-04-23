# Fuentes

Por defecto la landing carga **Inter** desde Google Fonts con `font-display: swap`
usando la técnica non-blocking (preload + `media="print"` onload swap).

## Self-hosting (recomendado para mejor LCP)

Si prefieres alojar las fuentes localmente:

1. Descarga los WOFF2 de Inter desde:
   - https://rsms.me/inter/ (paquete oficial)
   - o https://fonts.google.com/specimen/Inter
2. Coloca los `.woff2` en este directorio (`assets/fonts/`).
3. Reemplaza la carga remota de Google Fonts en `index.html` por:

```html
<link rel="preload" as="font" type="font/woff2"
      href="assets/fonts/Inter-Regular.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2"
      href="assets/fonts/Inter-Bold.woff2" crossorigin>
<style>
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('assets/fonts/Inter-Regular.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('assets/fonts/Inter-Bold.woff2') format('woff2');
  }
  /* …repite para 500/600/800 según necesites */
</style>
```

Sólo carga los pesos que uses (400, 600, 700, 800 son los usados aquí).
Cada peso extra son ~25 KB adicionales.
