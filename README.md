# Maquetación Web – Base de proyecto

Este repositorio contiene una maquetación frontend moderna, accesible y responsive sin backend.

## Estructura
```
index.html
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
- Abre `index.html` en tu navegador.
- Modo oscuro: botón 🌗 en el header. Se guarda en `localStorage`.
- Menú móvil: botón ☰ abre/cierra la navegación en pantallas pequeñas.

## Buenas prácticas incluidas
- HTML semántico con headers, sections, main, footer y navegación accesible.
- Accesibilidad: `skip-link`, `aria-*`, `:focus-visible`, contraste y orden de foco.
- CSS con design tokens (variables), separación por capas y utilidades.
- Responsive-first con `grid`, breakpoints mínimos y layouts fluidos.
- Modo oscuro respetando `prefers-color-scheme` y preferencia persistida.
- Configuración de editor: `.editorconfig`, `.prettierrc`.

## Personalización rápida
- Cambia paleta en `assets/css/tokens.css`.
- Añade nuevas secciones duplicando bloques `.section` en `index.html`.
- Agrega componentes y utilidades en `components.css` y `utils.css`.

## Licencia
Uso educativo.
