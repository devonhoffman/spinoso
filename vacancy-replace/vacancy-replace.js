/* Vacancy → Occupied: plays each [data-vr] reveal once it scrolls into view. */
(function () {
  var DONE_AFTER_MS = 2800; // matches the longest CSS delay + duration at --vr-duration: 1

  function durationScale(el) {
    var v = parseFloat(getComputedStyle(el).getPropertyValue('--vr-duration'));
    return isNaN(v) ? 1 : v;
  }

  function play(el) {
    el.classList.remove('is-occupied', 'is-done');
    void el.offsetWidth; // restart CSS animations
    el.classList.add('is-occupied');
    clearTimeout(el._vrTimer);
    el._vrTimer = setTimeout(function () {
      el.classList.add('is-done');
    }, DONE_AFTER_MS * durationScale(el));
  }

  function init() {
    var items = document.querySelectorAll('[data-vr]');
    if (!items.length) return;

    items.forEach(function (el) {
      var btn = el.querySelector('.vr__replay');
      if (btn) btn.addEventListener('click', function () { play(el); });
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach(play);
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        var delay = parseInt(entry.target.getAttribute('data-vr-delay'), 10) || 250;
        setTimeout(function () { play(entry.target); }, delay);
      });
    }, { threshold: 0.55 });

    items.forEach(function (el) { io.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
