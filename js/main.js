// Progressive enhancement only: every page is complete without this file.
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  // Scroll reveal: sections and tiles fade up once (600ms, see _motion.scss).
  // Skipped on deep links: hidden sections would otherwise be the scroll target.
  if (hasIO && !reduceMotion && !window.location.hash) {
    var targets = document.querySelectorAll('main .section, .tiles > li, .cases > li');
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal');
        revealer.observe(el);
      }
    });
  }

  // Reading bar on long pages: progress, current section, contents.
  var bar = document.querySelector('[data-readbar]');
  if (!bar) return;
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[data-toc][id]'));
  var hero = document.querySelector('.hero');
  var article = document.querySelector('main article') || document.querySelector('main');
  var list = bar.querySelector('[data-readbar-list]');
  var toggle = bar.querySelector('[data-readbar-toggle]');
  var panel = bar.querySelector('#readbar-toc');
  var current = bar.querySelector('[data-readbar-current]');
  var progress = bar.querySelector('.readbar__progress');
  var links = [];

  bar.hidden = false;
  if (!sections.length) { toggle.hidden = true; }

  sections.forEach(function (section, i) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + section.id;
    a.innerHTML = '<span class="n">' + String(i + 1).padStart(2, '0') + '</span>';
    a.appendChild(document.createTextNode(section.getAttribute('data-toc')));
    a.addEventListener('click', function () { setOpen(false); });
    li.appendChild(a);
    list.appendChild(li);
    links.push(a);
  });

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
  }
  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { setOpen(false); toggle.focus(); }
  });

  function update() {
    var heroBottom = hero ? hero.getBoundingClientRect().bottom : 0;
    bar.classList.toggle('is-visible', heroBottom < 0);
    if (heroBottom >= 0 && !panel.hidden) setOpen(false);

    var rect = article.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    var p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    progress.style.setProperty('--p', p.toFixed(4));

    var active = -1;
    sections.forEach(function (s, i) { if (s.getBoundingClientRect().top < 120) active = i; });
    links.forEach(function (a, i) {
      if (i === active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    });
    current.textContent = active >= 0 ? '· ' + sections[active].getAttribute('data-toc') : '';
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(function () { update(); ticking = false; }); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
