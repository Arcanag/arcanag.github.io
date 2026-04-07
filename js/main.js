(function () {
  'use strict';

  // Nav scroll state + auto-hide on scroll down
  var nav = document.querySelector('.nav');
  if (nav) {
    var lastScroll = 0;
    var onScroll = function () {
      var currentScroll = window.scrollY;
      nav.classList.toggle('nav--scrolled', currentScroll > 50);
      if (currentScroll > 100) {
        nav.classList.toggle('nav--hidden', currentScroll > lastScroll);
      } else {
        nav.classList.remove('nav--hidden');
      }
      lastScroll = currentScroll;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Custom cursor
  var cursor = document.querySelector('.custom-cursor');
  if (cursor && matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function(e) {
      cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px) translate(-50%, -50%)';
    });
    var interactables = document.querySelectorAll('a, button, .work-card');
    interactables.forEach(function(el) {
      el.addEventListener('mouseenter', function() { cursor.classList.add('is-hovering'); });
      el.addEventListener('mouseleave', function() { cursor.classList.remove('is-hovering'); });
    });
  }

  // Scroll reveal
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var revealObs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          var delay = entry.target.getAttribute('data-delay') || 0;
          entry.target.style.transitionDelay = (delay * 0.1) + 's';
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    reveals.forEach(function(r) { revealObs.observe(r); });
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

  // TOC active link tracking (desktop + mobile)
  var desktopTocLinks = document.querySelectorAll('.case-study-toc__link');
  var mobileTocLinks = document.querySelectorAll('.mobile-toc__link');
  var allTocLinks = document.querySelectorAll('.case-study-toc__link, .mobile-toc__link');
  if ('IntersectionObserver' in window && allTocLinks.length) {
    var headings = document.querySelectorAll('.case-study-content h2[id]');
    var tocObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute('id');
        if (entry.isIntersecting) {
          allTocLinks.forEach(function (l) { l.classList.remove('is-active'); });
          document.querySelectorAll('.case-study-toc__link[href="#' + id + '"], .mobile-toc__link[href="#' + id + '"]').forEach(function (l) {
            l.classList.add('is-active');
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    headings.forEach(function (h) { tocObs.observe(h); });
  }

  // Mobile TOC toggle
  var mobileTocToggle = document.querySelector('.mobile-toc__toggle');
  var mobileTocPanel = document.querySelector('.mobile-toc__panel');
  if (mobileTocToggle && mobileTocPanel) {
    mobileTocToggle.addEventListener('click', function () {
      var expanded = mobileTocToggle.getAttribute('aria-expanded') === 'true';
      mobileTocToggle.setAttribute('aria-expanded', !expanded);
      mobileTocPanel.hidden = expanded;
    });
    mobileTocPanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileTocToggle.setAttribute('aria-expanded', 'false');
        mobileTocPanel.hidden = true;
      });
    });
  }

  // Reading progress bar
  var progressBar = document.querySelector('.reading-progress');
  var article = document.querySelector('.case-study-content');
  if (progressBar && article) {
    window.addEventListener('scroll', function () {
      var articleTop = article.getBoundingClientRect().top + window.scrollY;
      var articleHeight = article.offsetHeight;
      var scrolled = window.scrollY - articleTop;
      var progress = Math.max(0, Math.min(1, scrolled / (articleHeight - window.innerHeight)));
      progressBar.style.width = (progress * 100) + '%';
    }, { passive: true });
  }

  // Back to top
  var backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.hidden = window.scrollY < 600;
    }, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
