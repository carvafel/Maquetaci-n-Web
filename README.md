# Maquetación Web – Base de proyecto

Este repositorio contiene una maquetación frontend moderna, accesible y responsive sin backend.

## Estructura
```
assets/
  css/
    tokens.css      # Design tokens y temas
    base.css        # Reset, tipografía y layout global
    utils.css       # Utilidades y helpers
    components.css  # Componentes (cards, formularios, nav)
  js/
    main.js         # Interacciones: menú móvil, modo oscuro, utilidades
  img/
```

## Uso
- Inicia el servidor local: `npm run dev` (o `npm start`).
- Abre `http://localhost:3000` (redirige automáticamente a `/login.html`).
- También puedes acceder directamente a `http://localhost:3000/login.html` y `http://localhost:3000/recover.html`.
- Para detener el servidor, presiona `CTRL + C` en la terminal.

## Buenas prácticas incluidas
- HTML semántico con headers, sections, main, footer y navegación accesible.
- Accesibilidad: `skip-link`, `aria-*`, `:focus-visible`, contraste y orden de foco.
- CSS con design tokens (variables), separación por capas y utilidades.
- Responsive-first con `grid`, breakpoints mínimos y layouts fluidos.
- Modo oscuro respetando `prefers-color-scheme` y preferencia persistida.
- Configuración de editor: `.editorconfig`, `.prettierrc`.

## Personalización rápida
- Cambia paleta en `assets/css/tokens.css`.
- Agrega componentes y utilidades en `components.css` y `utils.css`.

## Licencia
Uso educativo.
