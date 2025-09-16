(function () {
  const doc = document.documentElement;
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  const themeToggle = document.getElementById('themeToggle');
  const yearEl = document.getElementById('year');

  // Año dinámico en el footer
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Navegación móvil accesible
  if (navToggle && siteNav) {
    function setNav(open) {
      siteNav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.querySelector('.sr-only')?.replaceChildren(document.createTextNode(open ? 'Cerrar menú' : 'Abrir menú'));
    }

    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.contains('open');
      setNav(!isOpen);
    });

    // Cerrar al navegar en móvil
    siteNav.addEventListener('click', (e) => {
      const target = e.target;
      if (target instanceof HTMLElement && target.tagName === 'A') {
        setNav(false);
      }
    });
  }

  // Toggle de tema claro/oscuro con persistencia
  if (themeToggle) {
    function applyTheme(theme) {
      doc.dataset.theme = theme;
      try { localStorage.setItem('theme', theme); } catch (_) {}
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }

    // Respeta preferencia del sistema si no hay guardado
    if (!doc.dataset.theme) {
      const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    } else {
      themeToggle.setAttribute('aria-pressed', String(doc.dataset.theme === 'dark'));
    }

    themeToggle.addEventListener('click', () => {
      const next = doc.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
})();
