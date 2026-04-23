/**
 * animations.js — Scroll-reveal + decorative particles.
 * - IntersectionObserver unobserves each element once revealed (no memory leak).
 * - Particles use requestAnimationFrame-free pure CSS animation (cheapest path).
 * - Respects prefers-reduced-motion.
 */
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initAnimations() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

function initParticles() {
  const container = document.getElementById('particles');
  if (!container || REDUCED_MOTION) return;

  const COUNT = 28;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      bottom:-10px;
      animation-duration:${Math.random() * 15 + 12}s;
      animation-delay:${Math.random() * 10}s;
      background:${Math.random() > 0.5 ? 'rgba(99,102,241,.5)' : 'rgba(6,182,212,.5)'};
    `;
    frag.appendChild(p);
  }

  container.appendChild(frag);
}
