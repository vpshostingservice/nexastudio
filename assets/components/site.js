const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = docHeight > 0 ? (scrollTop / docHeight) * 100 + '%' : '0%';
});

const nav = document.querySelector('nav');
const navLinks = nav ? nav.querySelector('.nav-links') : null;

if (nav && navLinks) {
  const navToggle = document.createElement('button');
  navToggle.className = 'nav-toggle';
  navToggle.type = 'button';
  navToggle.setAttribute('aria-label', 'Abrir menu');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-controls', 'mobile-nav-links');
  navToggle.innerHTML = '<span class="nav-toggle-bars" aria-hidden="true"></span>';

  navLinks.id = 'mobile-nav-links';
  nav.appendChild(navToggle);

  const closeNavMenu = () => {
    nav.classList.remove('mobile-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = !nav.classList.contains('mobile-open');
    nav.classList.toggle('mobile-open', willOpen);
    navToggle.setAttribute('aria-expanded', String(willOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNavMenu);
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) {
      closeNavMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) {
      closeNavMenu();
    }
  });
}

if (nav && document.body.dataset.hideNav === 'true') {
  window.addEventListener('scroll', () => {
    const isMenuOpen = nav.classList.contains('mobile-open');
    if (!isMenuOpen && window.scrollY > 60) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: Number(document.body.dataset.revealThreshold || 0.12) });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
