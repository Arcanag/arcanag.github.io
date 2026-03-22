(function () {
  'use strict';

  // Scroll reveal — content is visible by default.
  // Only add hide-then-animate behavior if IntersectionObserver is available.
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('reveal--visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { observer.observe(el); });
    // NOW activate the hide — observer is ready and will immediately reveal visible elements
    document.documentElement.classList.add('reveal-ready');
  }
  // If no IntersectionObserver: content stays visible, no animation. That's fine.

  // Safety net: force all reveals visible after 2s regardless
  setTimeout(function () {
    reveals.forEach(function (el) { el.classList.add('reveal--visible'); });
  }, 2000);

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
