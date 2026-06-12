# Login reusable de Cocofany

Este paquete contiene exactamente el login con contraseña que estas usando, separado para reutilizarlo en otra web.

## Archivos

- `login-overlay.html`: bloque del login para pegar en tu HTML.
- `login-overlay.css`: estilos del login.
- `login-overlay.js`: logica del login y bloqueo por `sessionStorage`.

## Como integrarlo en otra web

1. Copia el contenido de `login-overlay.html` justo despues de abrir `<body>`.
2. En el `<head>`, añade las fuentes si no las tienes:

```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&family=Pacifico&display=swap" rel="stylesheet">
```

3. Carga los estilos en tu CSS principal o enlaza `login-overlay.css`.
4. Incluye `login-overlay.js` en tu pagina, preferiblemente antes de `</body>`:

```html
<script src="ruta/login-overlay.js"></script>
```

## Credenciales actuales

- Usuario: `laura-ag-syndicate`
- Contraseña: `ag-syndicate`

## Personalizacion rapida

En `login-overlay.js` puedes cambiar:

- `LOGIN_STORAGE_KEY` para usar otra clave de sesion.
- `LOGIN_VALID_USER` y `LOGIN_VALID_PASS` para nuevas credenciales.

En `login-overlay.html` puedes cambiar:

- Texto de marca (`Cocofany`).
- Mensajes.
- Enlace del bloque AG.

En `login-overlay.css` puedes cambiar:

- Colores del boton y resaltado.
- Tamaños y espaciados del modal.

## Importante

Este login es visual y de cliente (frontend). No protege datos sensibles por si solo. Si la otra web necesita seguridad real, valida usuario y contraseña en backend.
