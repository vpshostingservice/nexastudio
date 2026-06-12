function carouselNav(id, dir) {
  const carousel = document.getElementById(id);
  const images = carousel.querySelectorAll('.carousel-img');
  const dots = carousel.querySelectorAll('.carousel-dot');
  let current = [...images].findIndex(image => image.classList.contains('active'));
  images[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (current + dir + images.length) % images.length;
  images[current].classList.add('active');
  dots[current].classList.add('active');
}
function carouselPrev(id) { carouselNav(id, -1); }
function carouselNext(id) { carouselNav(id, 1); }
function carouselGo(id, index) {
  const carousel = document.getElementById(id);
  const images = carousel.querySelectorAll('.carousel-img');
  const dots = carousel.querySelectorAll('.carousel-dot');
  images.forEach(image => image.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  images[index].classList.add('active');
  dots[index].classList.add('active');
}
function carC(id, dir) { carouselNav(id, dir); }
function carCGo(id, index) { carouselGo(id, index); }
