// PROJECT NEBULA DECK – Navigation & scaling
(function() {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const total = slides.length;
  let currentIdx = 0;
  let dir = 'next';

  const progress = document.getElementById('progress-bar');
  const slideNum = document.getElementById('slide-number');
  const stage = document.getElementById('deck-stage');

  // Initial slide from hash
  function initFromHash() {
    const m = location.hash.match(/^#s?(\d+)$/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (n >= 1 && n <= total) currentIdx = n - 1;
    }
  }

  function setSlide(idx, direction) {
    if (idx < 0) idx = 0;
    if (idx >= total) idx = total - 1;
    if (idx === currentIdx) return;
    dir = direction || (idx > currentIdx ? 'next' : 'prev');

    slides[currentIdx].classList.remove('active');
    slides[idx].classList.add('active');
    currentIdx = idx;
    updateUI();
    history.replaceState(null, '', '#s' + (idx + 1));
  }

  function updateUI() {
    const pct = ((currentIdx + 1) / total) * 100;
    if (progress) progress.style.width = pct + '%';
    if (slideNum) {
      slideNum.innerHTML = '<span class="curr">' + String(currentIdx + 1).padStart(2, '0') +
        '</span><span class="sep">/</span><span class="total">' + String(total).padStart(2, '0') + '</span>';
    }
  }

  function next() { setSlide(currentIdx + 1, 'next'); }
  function prev() { setSlide(currentIdx - 1, 'prev'); }
  function first() { setSlide(0); }
  function last() { setSlide(total - 1); }

  // Keyboard
  document.addEventListener('keydown', function(e) {
    // ignore when typing in inputs
    if (e.target.matches('input, textarea')) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':
        e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home':
        e.preventDefault(); first(); break;
      case 'End':
        e.preventDefault(); last(); break;
      case 'f':
      case 'F':
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen();
        }
        break;
    }
  });

  // Click navigation: left half = prev, right half = next
  document.addEventListener('click', function(e) {
    if (e.target.closest('a, button, input, textarea, .no-nav')) return;
    const w = window.innerWidth;
    if (e.clientX < w * 0.4) prev();
    else if (e.clientX > w * 0.6) next();
  });

  // Touch / swipe
  let touchStartX = null;
  document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener('touchend', function(e) {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next(); else prev();
    }
    touchStartX = null;
  });

  // Scale slide to viewport
  function scaleStage() {
    if (!stage) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const SW = 1280;
    const SH = 720;
    const scale = Math.min(W / SW, H / SH);
    stage.style.transform = 'scale(' + scale + ')';
  }
  window.addEventListener('resize', scaleStage);
  scaleStage();

  // Hash change
  window.addEventListener('hashchange', function() {
    const m = location.hash.match(/^#s?(\d+)$/);
    if (m) {
      const n = parseInt(m[1], 10) - 1;
      if (n >= 0 && n < total && n !== currentIdx) {
        slides[currentIdx].classList.remove('active');
        slides[n].classList.add('active');
        currentIdx = n;
        updateUI();
      }
    }
  });

  // Init
  initFromHash();
  slides.forEach((s, i) => s.classList.toggle('active', i === currentIdx));
  updateUI();

  // Expose for console
  window.deck = { next, prev, first, last, setSlide, total };
})();
