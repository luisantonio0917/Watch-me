const slides = [...document.querySelectorAll('.slide')];
const track = document.getElementById('slides');
const dots = document.getElementById('dots');
const current = document.getElementById('slide-current');
let index = 0;
let timer;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Mostrar foto ${i + 1}`);
  dot.addEventListener('click', () => show(i, true));
  dots.append(dot);
});
const dotButtons = [...dots.children];

function show(next, resetTimer = false) {
  index = (next + slides.length) % slides.length;
  track.style.transform = `translateX(-${index * 100}%)`;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    slide.setAttribute('aria-hidden', i !== index);
  });
  dotButtons.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
  current.textContent = String(index + 1).padStart(2, '0');
  if (resetTimer) startTimer();
}
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => show(index + 1), 5000);
}
document.getElementById('prev').addEventListener('click', () => show(index - 1, true));
document.getElementById('next').addEventListener('click', () => show(index + 1, true));
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', startTimer);
carousel.addEventListener('focusin', () => clearInterval(timer));
carousel.addEventListener('focusout', startTimer);
show(0);
startTimer();
