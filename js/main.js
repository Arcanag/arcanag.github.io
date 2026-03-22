(function () {
  'use strict';

  // Nav scroll state
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile nav toggle
  var hamburger = document.querySelector('.nav__hamburger');
  var navEl = document.querySelector('.nav');
  if (hamburger && navEl) {
    hamburger.addEventListener('click', function () {
      var open = navEl.classList.toggle('nav--open');
      hamburger.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navEl.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navEl.classList.contains('nav--open')) {
        navEl.classList.remove('nav--open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  // TOC active link (case study pages)
  var tocLinks = document.querySelectorAll('.case-study-toc__link');
  if ('IntersectionObserver' in window && tocLinks.length) {
    var headings = document.querySelectorAll('.case-study-content h2[id]');
    var tocObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute('id');
        var link = document.querySelector('.case-study-toc__link[href="#' + id + '"]');
        if (link && entry.isIntersecting) {
          tocLinks.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    headings.forEach(function (h) { tocObs.observe(h); });
  }
})();
