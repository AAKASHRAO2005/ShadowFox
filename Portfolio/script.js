document.addEventListener('DOMContentLoaded', () => {

  /* =====================
     DEVICE CHECK
  ===================== */
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  /* =====================
     MOUSE-REACTIVE FOG
  ===================== */
  document.addEventListener('mousemove', (e) => {
    if (isTouch) return;
    if (!document.body.classList.contains('upside')) return;

    const x = e.clientX - window.innerWidth / 2;
    const y = e.clientY - window.innerHeight / 2;

    document.body.style.setProperty('--fog-x', x + 'px');
    document.body.style.setProperty('--fog-y', y + 'px');
  });

  /* =====================
     SCROLL-BASED FOG DENSITY
  ===================== */
  window.addEventListener('scroll', () => {
    if (!document.body.classList.contains('upside')) return;

    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollRatio = Math.min(scrollTop / docHeight, 1);

    document.body.style.setProperty(
      '--fog-opacity',
      0.2 + scrollRatio * 0.6
    );
  });

  /* =====================
     FLICKER EFFECT
  ===================== */
  const title = document.querySelector('.title');
  if (title) {
    setInterval(() => {
      title.style.opacity = Math.random() > 0.9 ? '0.6' : '1';
    }, 120);
  }

  /* =====================
     SCROLL REVEAL
  ===================== */
  const reveals = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  /* =====================
     UPSIDE DOWN TOGGLE
  ===================== */
  const toggle = document.getElementById('toggle');
  const flash = document.querySelector('.flash');

  if (toggle) {
    toggle.addEventListener('click', () => {

      toggle.classList.add('glitch');
      document.body.classList.add('shake');

      if (flash) {
        flash.classList.remove('lightning');
        void flash.offsetWidth; // force reflow
        flash.classList.add('lightning');
      }

      setTimeout(() => {
        document.body.classList.toggle('upside');

        toggle.textContent = document.body.classList.contains('upside')
          ? 'EXIT UPSIDE DOWN'
          : 'ENTER UPSIDE DOWN';

        toggle.classList.remove('glitch');
        document.body.classList.remove('shake');
      }, 400);
    });
  }

});
