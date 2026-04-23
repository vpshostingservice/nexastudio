/**
 * navbar.js — Sticky navbar effects + active link tracking.
 * - Toggles `.is-scrolled` via requestAnimationFrame (no scroll listener hot loop).
 * - Tracks current section with IntersectionObserver (no scroll math).
 * - Mobile menu toggle with correct aria state.
 * - Event delegation for closing menu on link click.
 */
function initNavbar() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const burger = nav.querySelector('#burger');
  const linksContainer = nav.querySelector('#navLinks');
  const links = nav.querySelectorAll('a[href^="#"]');

  /* ---------- Sticky state via rAF ---------- */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-scrolled', window.scrollY > 20);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu toggle ---------- */
  if (burger) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  /* ---------- Close mobile menu on link click (event delegation) ---------- */
  if (linksContainer) {
    linksContainer.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        if (burger) {
          burger.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-label', 'Abrir menú');
        }
      }
    });
  }

  /* ---------- Close on Escape ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }
  });

  /* ---------- Active section (IntersectionObserver) ---------- */
  const linkMap = new Map();
  links.forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    if (id) linkMap.set(id, a);
  });

  const sections = document.querySelectorAll('section[id], header[id]');
  if (!sections.length || !linkMap.size) return;

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = linkMap.get(id);
        if (!link) return;
        if (entry.isIntersecting) {
          linkMap.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach((s) => sectionObserver.observe(s));
}
