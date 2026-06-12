function animateCount(el) {
  const target = parseInt(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  if (!target) return;
  const duration = 1800;
  const start = performance.now();
  const update = now => {
    const progress = Math.min((now - start) / duration, 1);
    const current = Math.round((1 - Math.pow(1 - progress, 3)) * target);
    el.textContent = prefix + current.toLocaleString('es-ES') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num[data-target]').forEach(el => countObserver.observe(el));
