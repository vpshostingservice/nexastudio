/**
 * carousel.js — Accessible, dependency-free testimonials carousel.
 * Features:
 *  - Prev/next buttons, pagination dots
 *  - Keyboard (← →) and touch/swipe support
 *  - Autoplay paused on hover, focus, tab-hidden, reduced-motion
 *  - Responsive: re-measures on resize (debounced)
 *  - Clean teardown via AbortController (no memory leaks)
 */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initCarousel(selector) {
  const roots = document.querySelectorAll(selector);
  roots.forEach(setupCarousel);
}

function setupCarousel(root) {
  const track = root.querySelector('[data-carousel-track]');
  const slides = track ? track.querySelectorAll('.carousel-slide') : [];
  const prevBtn = root.querySelector('[data-carousel-prev]');
  const nextBtn = root.querySelector('[data-carousel-next]');
  const dots = root.querySelectorAll('[data-carousel-dot]');
  if (!track || !slides.length) return;

  const ac = new AbortController();
  const { signal } = ac;
  const total = slides.length;
  let index = 0;
  let autoplayId = null;
  const AUTOPLAY_MS = 6000;

  const goTo = (i) => {
    index = (i + total) % total;
    track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
    dots.forEach((d, di) => {
      const active = di === index;
      d.classList.toggle('is-active', active);
      d.setAttribute('aria-selected', String(active));
    });
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  /* ---------- Buttons ---------- */
  if (prevBtn) prevBtn.addEventListener('click', prev, { signal });
  if (nextBtn) nextBtn.addEventListener('click', next, { signal });

  /* ---------- Dots (event delegation) ---------- */
  const dotsContainer = root.querySelector('[data-carousel-dots]');
  if (dotsContainer) {
    dotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('[data-carousel-dot]');
      if (!dot) return;
      goTo(parseInt(dot.dataset.carouselDot, 10));
    }, { signal });
  }

  /* ---------- Keyboard ---------- */
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  }, { signal });
  root.setAttribute('tabindex', '0');

  /* ---------- Touch / swipe ---------- */
  let touchStartX = 0;
  let touchDeltaX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
    track.style.transition = 'none';
  }, { signal, passive: true });
  track.addEventListener('touchmove', (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
    const base = -index * 100;
    const pct = (touchDeltaX / track.offsetWidth) * 100;
    track.style.transform = `translate3d(${base + pct}%, 0, 0)`;
  }, { signal, passive: true });
  track.addEventListener('touchend', () => {
    track.style.transition = '';
    if (Math.abs(touchDeltaX) > 50) {
      touchDeltaX < 0 ? next() : prev();
    } else {
      goTo(index);
    }
  }, { signal });

  /* ---------- Autoplay ---------- */
  const startAutoplay = () => {
    if (REDUCED_MOTION || document.hidden || autoplayId) return;
    autoplayId = window.setInterval(next, AUTOPLAY_MS);
  };
  const stopAutoplay = () => {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  };
  root.addEventListener('mouseenter', stopAutoplay, { signal });
  root.addEventListener('mouseleave', startAutoplay, { signal });
  root.addEventListener('focusin', stopAutoplay, { signal });
  root.addEventListener('focusout', startAutoplay, { signal });
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAutoplay() : startAutoplay();
  }, { signal });

  /* ---------- Debounced resize re-sync ---------- */
  const debounce = (fn, ms) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };
  window.addEventListener('resize', debounce(() => goTo(index), 150), { signal });

  /* ---------- Kickoff ---------- */
  goTo(0);
  startAutoplay();

  /* ---------- Teardown hook (e.g. for SPA removal) ---------- */
  root._destroy = () => {
    stopAutoplay();
    ac.abort();
  };
}
