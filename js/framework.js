// Funnel explorer — progressive enhancement. Without JS every panel and node is visible.
(function () {
  'use strict';
  var root = document.querySelector('[data-fw-explorer]');
  if (!root) return;
  root.classList.add('is-enhanced');

  // Tabs (WAI-ARIA tabs pattern, automatic activation).
  var tablist = root.querySelector('[role="tablist"]');
  var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  tablist.hidden = false;

  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });
  select(tabs[0], false);

  // Nodes: one open at a time.
  var bars = Array.prototype.slice.call(root.querySelectorAll('.fw-node__bar'));
  function setOpen(bar, open) {
    bar.setAttribute('aria-expanded', String(open));
    bar.parentNode.classList.toggle('is-open', open);
    document.getElementById(bar.getAttribute('aria-controls')).hidden = !open;
  }
  bars.forEach(function (bar) {
    setOpen(bar, false);
    bar.addEventListener('click', function () {
      var open = bar.getAttribute('aria-expanded') !== 'true';
      bars.forEach(function (b) { if (b !== bar) setOpen(b, false); });
      setOpen(bar, open);
    });
  });
})();
