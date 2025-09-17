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
      if (target instanceof Element && target.tagName === 'A') {
        setNav(false);
      }
    });
  }

  // Datepicker básico para dashboard
  const overlay = document.querySelector('[data-overlay]');
  const dp = document.querySelector('.datepicker');
  const openDpBtn = document.querySelector('[data-open-datepicker]');
  const grid = document.querySelector('[data-dp-grid]');
  const titleEl = document.getElementById('dp-title');
  const prevBtn = document.querySelector('[data-dp-prev]');
  const nextBtn = document.querySelector('[data-dp-next]');
  const cancelBtn = document.querySelector('[data-dp-cancel]');
  const applyBtn = document.querySelector('[data-dp-apply]');
  const selectedWeekEl = document.getElementById('selectedWeek');

  let current = new Date();
  let selected = null;

  function openDp() {
    if (!overlay || !dp) return;
    overlay.hidden = false;
    dp.hidden = false;
    renderCalendar(current);
    // Mover foco al título para accesibilidad
    setTimeout(() => { titleEl?.focus?.(); }, 0);
  }
  function closeDp() {
    if (!overlay || !dp) return;
    overlay.hidden = true;
    dp.hidden = true;
  }

  function renderCalendar(date) {
    if (!grid || !titleEl) return;
    const year = date.getFullYear();
    const month = date.getMonth();
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const today = new Date();

    titleEl.textContent = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    grid.innerHTML = '';

    const dows = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    dows.forEach(d => {
      const dow = document.createElement('div');
      dow.className = 'datepicker__dow';
      dow.textContent = d;
      grid.appendChild(dow);
    });

    const leading = (start.getDay() + 7) % 7;
    for (let i = 0; i < leading; i++) {
      const stub = document.createElement('div');
      grid.appendChild(stub);
    }

    for (let day = 1; day <= end.getDate(); day++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = String(day);

      const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
      if (isToday) btn.classList.add('is-today');
      if (selected && selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === day) {
        btn.classList.add('is-selected');
      }

      btn.addEventListener('click', () => {
        selected = new Date(year, month, day);
        renderCalendar(current);
      });
      grid.appendChild(btn);
    }
  }

  openDpBtn?.addEventListener('click', openDp);
  overlay?.addEventListener('click', closeDp);
  cancelBtn?.addEventListener('click', closeDp);
  applyBtn?.addEventListener('click', () => {
    if (selected && selectedWeekEl) {
      const start = new Date(selected);
      const day = start.getDay();
      const diffToMonday = (day + 6) % 7; // 0=domingo -> 6; 1=lunes -> 0
      start.setDate(start.getDate() - diffToMonday);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      const fmt = (d) => d.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
      selectedWeekEl.textContent = `${fmt(start)} – ${fmt(end)}`;
    }
    closeDp();
  });
  prevBtn?.addEventListener('click', () => { current.setMonth(current.getMonth() - 1); renderCalendar(current); });
  nextBtn?.addEventListener('click', () => { current.setMonth(current.getMonth() + 1); renderCalendar(current); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDp(); });

  // Modal de descarga
  const downloadBtns = document.querySelectorAll('[data-download-btn]');
  const downloadModal = document.querySelector('[data-download-modal]');
  const dlAccept = document.querySelector('[data-dl-accept]');
  function openDownloadModal() {
    if (!downloadModal) return;
    downloadModal.hidden = false;
  }
  function closeDownloadModal() {
    if (!downloadModal) return;
    downloadModal.hidden = true;
  }
  downloadBtns.forEach((b) => b.addEventListener('click', openDownloadModal));
  dlAccept?.addEventListener('click', closeDownloadModal);
  downloadModal?.addEventListener('click', (e) => { if (e.target === downloadModal) closeDownloadModal(); });

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

  // Toggle de visibilidad de contraseña genérico
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return; // admite SVGElement
    const toggleBtn = target.closest('[data-toggle-password]');
    if (!toggleBtn) return;
    const selector = toggleBtn.getAttribute('data-toggle-password');
    if (!selector) return;
    const input = document.querySelector(selector);
    if (!(input instanceof HTMLInputElement)) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggleBtn.setAttribute('aria-pressed', String(isPassword));
    toggleBtn.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
  });
})();
