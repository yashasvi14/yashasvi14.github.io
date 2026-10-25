(function () {

  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // COLOR MODE (dark by default, choice is remembered)
  var themeToggle = document.querySelector('[data-theme-toggle]');
  function syncThemeLabel() {
    var dark = document.documentElement.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.title = themeToggle.getAttribute('aria-label');
  }
  syncThemeLabel();
  themeToggle.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncThemeLabel();
  });

  // ROTATING ROLE
  var role = document.querySelector('[data-rotate]');
  if (role) {
    var roles = role.dataset.rotate.split('|');
    var i = 0;
    setInterval(function () {
      role.style.opacity = 0;
      if (!reduceMotion) role.style.transform = 'translateY(-0.25em)';
      setTimeout(function () {
        i = (i + 1) % roles.length;
        role.textContent = roles[i];
        if (!reduceMotion) role.style.transform = 'translateY(0.25em)';
        requestAnimationFrame(function () {
          role.style.opacity = 1;
          role.style.transform = 'none';
        });
      }, 350);
    }, 2600);
  }

  // HEADER: hide on scroll down, show on scroll up
  var nav = document.querySelector('[data-headroom]');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    nav.classList.toggle('nav-hidden', y > lastY && y > 120);
    lastY = y;
  }, { passive: true });

  // EARLIER ROLES
  var earlierToggle = document.querySelector('[data-earlier-toggle]');
  if (earlierToggle) {
    var timeline = earlierToggle.closest('[data-exp]');
    var count = timeline.querySelectorAll('.job.earlier').length;
    var label = function (open) { return open ? 'Hide earlier roles' : 'Show ' + count + ' earlier roles (2019–2022)'; };
    earlierToggle.textContent = label(false);
    earlierToggle.addEventListener('click', function () {
      var open = timeline.classList.toggle('show-earlier');
      earlierToggle.textContent = label(open);
      earlierToggle.setAttribute('aria-expanded', open);
    });
  }

  // CHATBOT WIDGET (the bot only loads when first opened)
  var chatToggle = document.getElementById('chatToggle');
  var chatClose = document.getElementById('chatClose');
  var chatPopup = document.getElementById('chatPopup');
  var chatFrame = chatPopup.querySelector('iframe');
  function setChat(open) {
    if (open && !chatFrame.src) chatFrame.src = chatFrame.dataset.src;
    chatPopup.classList.toggle('show', open);
    chatToggle.setAttribute('aria-expanded', open);
  }
  chatToggle.addEventListener('click', function (event) {
    event.stopPropagation();
    setChat(!chatPopup.classList.contains('show'));
  });
  chatClose.addEventListener('click', function (event) {
    event.stopPropagation();
    setChat(false);
  });
  document.addEventListener('click', function (event) {
    if (!chatPopup.contains(event.target) && !chatToggle.contains(event.target)) setChat(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setChat(false);
  });

  // FOOTER YEAR
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // 3D SKILLS CLOUD
  window.addEventListener('load', function () {
    try {
      TagCanvas.Start('skillsCanvas', 'iconSkills', {
        textColour: null,
        outlineColour: '#4d7c0f',
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05,
        wheelZoom: false,
        imageMode: 'image',
        imageScale: 1.1,
        fadeIn: 1000,
        shuffleTags: true,
        initial: [0.1, -0.1]
      });
    } catch (e) {
      console.log('Canvas error: ', e);
    }
  });

})();
