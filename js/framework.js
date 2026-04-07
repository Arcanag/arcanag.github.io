// Framework tab switching
document.querySelectorAll('.fw-tab').forEach(function(tab) {
  tab.addEventListener('click', function() {
    document.querySelectorAll('.fw-tab').forEach(function(t) { t.classList.remove('active'); });
    document.querySelectorAll('.fw-tab-content').forEach(function(c) { c.classList.remove('active'); });
    tab.classList.add('active');
    document.getElementById('fw-' + tab.dataset.tab).classList.add('active');
  });
});

// Node expand/collapse on click
document.querySelectorAll('[data-fw-node]').forEach(function(node) {
  var bar = node.querySelector('.fw-node__bar');
  bar.addEventListener('click', function() {
    var wasExpanded = node.classList.contains('expanded');
    document.querySelectorAll('[data-fw-node].expanded').forEach(function(n) {
      if (n !== node) n.classList.remove('expanded');
    });
    node.classList.toggle('expanded', !wasExpanded);
  });
  bar.setAttribute('tabindex', '0');
  bar.setAttribute('role', 'button');
  bar.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      bar.click();
    }
  });
});
