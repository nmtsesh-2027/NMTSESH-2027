document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});

// NEW: countdown timer to the conference start (7 Jan 2027, IST)
document.addEventListener('DOMContentLoaded', function () {
  var el = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    mins: document.getElementById('cd-mins'),
    secs: document.getElementById('cd-secs')
  };
  if (!el.days) return;
  var target = new Date('2027-01-07T00:00:00+05:30').getTime();

  function pad(n){ return String(n).padStart(2, '0'); }

  function tick(){
    var diff = target - Date.now();
    if (diff <= 0){
      el.days.textContent = '00'; el.hours.textContent = '00';
      el.mins.textContent = '00'; el.secs.textContent = '00';
      return;
    }
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    el.days.textContent = pad(d);
    el.hours.textContent = pad(h);
    el.mins.textContent = pad(m);
    el.secs.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
});

// NEW: scroll-reveal entrance animation for .reveal elements
document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)){
    items.forEach(function(el){ el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(function (el) { io.observe(el); });
});
