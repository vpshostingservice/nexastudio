/**
 * main.js — Entry point.
 * Orchestrates module initialization after DOM is ready.
 */

const init = () => {
  initNavbar();
  initAnimations();
  initParticles();
  initCarousel('[data-carousel]');
  initForm('#contactForm');

  // Current year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
