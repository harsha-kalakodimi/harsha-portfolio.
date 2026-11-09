(() => {
  const mascot = document.getElementById('starMascot');
  const nav = document.querySelector('.cosmic-nav');
  const menuButton = document.querySelector('.cosmic-menu-toggle');
  const targets = [...document.querySelectorAll('[data-target]')];

  document.getElementById('year').textContent = new Date().getFullYear();

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  function moveStar(fromElement, targetElement) {
    if (!mascot || !targetElement) return;
    const from = fromElement?.getBoundingClientRect();
    const startX = from ? from.left + from.width / 2 : window.innerWidth / 2;
    const startY = from ? from.top + from.height / 2 : 100;

    mascot.style.transition = 'none';
    mascot.style.left = `${startX}px`;
    mascot.style.top = `${startY}px`;
    mascot.classList.add('visible');

    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const wait = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 50 : 650;

    window.setTimeout(() => {
      const rect = targetElement.getBoundingClientRect();
      const endX = Math.min(window.innerWidth - 38, Math.max(38, rect.right - 36));
      const endY = Math.max(45, rect.top + 24);

      mascot.animate([
        { left: `${startX}px`, top: `${startY}px`, transform: 'translate(-50%,-50%) scale(.7) rotate(-15deg)' },
        { left: `${(startX + endX) / 2}px`, top: `${Math.min(startY, endY) - 95}px`, transform: 'translate(-50%,-50%) scale(1.15) rotate(180deg)' },
        { left: `${endX}px`, top: `${endY}px`, transform: 'translate(-50%,-50%) scale(1) rotate(360deg)' }
      ], { duration: 1050, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });

      document.querySelectorAll('.cosmic-nav a').forEach(a => {
        a.classList.toggle('is-active', a.dataset.target === targetElement.id);
      });
      document.querySelectorAll('.universe-card').forEach(card => {
        card.classList.toggle('is-selected', card.dataset.target === targetElement.id);
      });
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    }, wait);
  }

  targets.forEach(link => {
    link.addEventListener('click', event => {
      const id = link.dataset.target;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      history.replaceState(null, '', `#${id}`);
      moveStar(link, target);
    });
  });

  // Position the guide star on the current section when arriving via a direct URL hash.
  if (location.hash) {
    const initial = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (initial) window.setTimeout(() => moveStar(null, initial), 250);
  }
})();