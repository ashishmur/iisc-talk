/* ============================================
   DECK ENGINE
   Shared presentation engine - reads config from window.DECK
   ============================================ */
(function() {
  'use strict';

  var DECK = window.DECK || {};
  var TOTAL = DECK.total || 1;
  var current = 1;
  var isAnimating = false;
  var slides = document.querySelectorAll('.slide');

  // ---- Navigation ----
  function goTo(n) {
    if (n < 1 || n > TOTAL || n === current || isAnimating) return;
    isAnimating = true;

    var prev = document.querySelector('.slide.active');
    var next = document.querySelector('[data-slide="' + n + '"]');

    if (prev) {
      prev.classList.remove('active');
      resetSlideAnimations(prev);
    }

    current = n;
    next.classList.add('active');
    updateUI();
    triggerSlideAnimations(next);

    setTimeout(function() { isAnimating = false; }, 650);
  }

  function next() {
    if (DECK.onNext && DECK.onNext(current)) return;
    goTo(current + 1);
  }

  function prev() {
    if (DECK.onPrev && DECK.onPrev(current)) return;
    goTo(current - 1);
  }

  function updateUI() {
    var input = document.getElementById('slide-num-input');
    if (input && document.activeElement !== input) {
      input.value = String(current).padStart(2, '0');
    }
    document.getElementById('progress-bar').style.width = (current / TOTAL) * 100 + '%';
  }

  // Editable slide number
  (function() {
    var input = document.getElementById('slide-num-input');
    if (!input) return;

    input.addEventListener('focus', function() {
      input.value = current;
      input.select();
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var n = parseInt(input.value, 10);
        if (n >= 1 && n <= TOTAL) {
          isAnimating = false;
          goTo(n);
        }
        input.blur();
      } else if (e.key === 'Escape') {
        input.value = String(current).padStart(2, '0');
        input.blur();
      }
      e.stopPropagation();
    });

    input.addEventListener('blur', function() {
      input.value = String(current).padStart(2, '0');
    });
  })();

  // ---- Keyboard ----
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
    if (e.key === 'Home') { e.preventDefault(); goTo(1); }
    if (e.key === 'End') { e.preventDefault(); goTo(TOTAL); }
  });

  // ---- Click navigation ----
  document.addEventListener('click', function(e) {
    if (e.target.closest('button, a, input, select, textarea, [onclick]')) return;
    if (e.clientX > window.innerWidth * 0.65) next();
    else if (e.clientX < window.innerWidth * 0.35) prev();
  });

  // ---- Touch ----
  var touchStartX = 0;
  document.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend', function(e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
  });

  // ============================================
  // TYPEWRITER
  // ============================================
  var headlines = DECK.headlines || {};
  var activeTypewriters = [];

  function typewrite(elementId, text, glowWord, callback) {
    var el = document.getElementById(elementId);
    if (!el) return;
    el.innerHTML = '';
    el.classList.add('typewriter');
    el.classList.remove('done');

    var i = 0;
    var speed = 25;

    function type() {
      if (i < text.length) {
        var currentText = text.substring(0, i + 1);
        if (glowWord) {
          var idx = currentText.indexOf(glowWord);
          if (idx !== -1) {
            var before = currentText.substring(0, idx);
            var glowPart = currentText.substring(idx, idx + glowWord.length);
            var after = currentText.substring(idx + glowWord.length);
            el.innerHTML = before + '<span class="neon-blue">' + glowPart + '</span>' + after;
          } else {
            el.textContent = currentText;
          }
        } else {
          el.textContent = currentText;
        }
        i++;
        var tid = setTimeout(type, speed);
        activeTypewriters.push(tid);
      } else {
        el.classList.add('done');
        if (callback) callback();
      }
    }
    type();
  }

  // ============================================
  // REVEAL ITEMS
  // ============================================
  function revealItems(slide) {
    var items = slide.querySelectorAll('.reveal-item');
    items.forEach(function(item, idx) {
      setTimeout(function() { item.classList.add('visible'); }, 300 + idx * 100);
    });
  }

  function resetRevealItems(slide) {
    var items = slide.querySelectorAll('.reveal-item');
    items.forEach(function(item) { item.classList.remove('visible'); });
  }

  // ============================================
  // SLIDE ANIMATIONS (engine core)
  // ============================================
  function triggerSlideAnimations(slide) {
    var num = parseInt(slide.dataset.slide);

    // Typewriter
    var twId = num === 1 ? 'title-typewriter' : 'tw-' + num;
    if (headlines[twId]) {
      var d = headlines[twId];
      setTimeout(function() { typewrite(twId, d.text, d.glowWord); }, 100);
    }

    // Reveal items
    revealItems(slide);

    // Content-specific animations
    if (DECK.onSlideEnter) DECK.onSlideEnter(num);
  }

  function resetSlideAnimations(slide) {
    // Clear typewriters
    activeTypewriters.forEach(function(t) { clearTimeout(t); });
    activeTypewriters = [];

    resetRevealItems(slide);

    var num = parseInt(slide.dataset.slide);

    // Reset typewriter elements
    var twId = num === 1 ? 'title-typewriter' : 'tw-' + num;
    var twEl = document.getElementById(twId);
    if (twEl) {
      twEl.innerHTML = '';
      twEl.classList.remove('typewriter', 'done');
    }

    // Content-specific resets
    if (DECK.onSlideReset) DECK.onSlideReset(num);
  }

  // ---- Disruption animation ----
  function animateDisruption() {
    var nodes = document.querySelectorAll('#disruption-viz .disruption-node');
    var connectors = document.querySelectorAll('#disruption-viz .disruption-connector');
    nodes.forEach(function(node, i) {
      setTimeout(function() {
        node.classList.add('active');
        if (i > 0 && connectors[i - 1]) {
          connectors[i - 1].classList.add('active');
        }
      }, 600 + i * 500);
    });
  }

  function resetDisruption() {
    document.querySelectorAll('#disruption-viz .disruption-node').forEach(function(n) { n.classList.remove('active'); });
    document.querySelectorAll('#disruption-viz .disruption-connector').forEach(function(c) { c.classList.remove('active'); });
  }

  // ---- Stack animation ----
  function animateStack() {
    var items = document.querySelectorAll('#stack-viz .stack-item');
    items.forEach(function(item, i) {
      setTimeout(function() { item.classList.add('animate'); }, 500 + i * 300);
    });
  }

  function resetStack() {
    document.querySelectorAll('#stack-viz .stack-item').forEach(function(i) { i.classList.remove('animate'); });
  }

  // ---- Bars animation ----
  function animateBars() {
    var fills = document.querySelectorAll('#bar-viz .neon-bar-fill');
    fills.forEach(function(fill, i) {
      var w = fill.dataset.width;
      fill.style.width = w + '%';
      setTimeout(function() { fill.classList.add('animate'); }, 500 + i * 300);
    });
  }

  function resetBars() {
    document.querySelectorAll('#bar-viz .neon-bar-fill').forEach(function(f) { f.classList.remove('animate'); });
  }

  // ---- AGI animation ----
  function animateAGI() {
    var levels = document.querySelectorAll('#agi-viz .agi-level');
    levels.forEach(function(level, i) {
      setTimeout(function() { level.classList.add('animate'); }, 400 + i * 250);
    });
  }

  function resetAGI() {
    document.querySelectorAll('#agi-viz .agi-level').forEach(function(l) { l.classList.remove('animate'); });
  }

  // ---- Agent animation ----
  function animateAgent() {
    var nodes = document.querySelectorAll('#agent-viz .agent-node');
    var lines = document.querySelectorAll('#agent-viz .draw-line');

    nodes.forEach(function(node, i) {
      setTimeout(function() { node.classList.add('animate'); }, 400 + i * 300);
    });

    lines.forEach(function(line, i) {
      var len = line.getTotalLength ? line.getTotalLength() : 200;
      line.style.strokeDasharray = len;
      line.style.strokeDashoffset = len;
      setTimeout(function() { line.style.strokeDashoffset = '0'; }, 1600 + i * 300);
    });
  }

  function resetAgent() {
    document.querySelectorAll('#agent-viz .agent-node').forEach(function(n) { n.classList.remove('animate'); });
    document.querySelectorAll('#agent-viz .draw-line').forEach(function(l) {
      var len = l.getTotalLength ? l.getTotalLength() : 200;
      l.style.strokeDasharray = len;
      l.style.strokeDashoffset = len;
    });
  }

  // ---- Pipeline animation ----
  function animatePipeline() {
    var items = document.querySelectorAll('#pipeline-viz .pipeline-item');
    items.forEach(function(item, i) {
      setTimeout(function() { item.classList.add('animate'); }, 300 + i * 200);
    });
  }

  function resetPipeline() {
    document.querySelectorAll('#pipeline-viz .pipeline-item').forEach(function(i) { i.classList.remove('animate'); });
  }

  // ---- Hexagons animation ----
  function animateHexagons() {
    var hexes = document.querySelectorAll('#hex-viz .draw-hex');
    var labels = document.querySelectorAll('#hex-viz .hex-sublabel');

    hexes.forEach(function(hex, i) {
      var len = hex.getTotalLength ? hex.getTotalLength() : 600;
      hex.style.strokeDasharray = len;
      hex.style.strokeDashoffset = len;
      setTimeout(function() { hex.style.strokeDashoffset = '0'; }, 400 + i * 400);
    });

    labels.forEach(function(label, i) {
      setTimeout(function() { label.classList.add('animate'); }, 1200 + i * 200);
    });
  }

  function resetHexagons() {
    document.querySelectorAll('#hex-viz .draw-hex').forEach(function(h) {
      var len = h.getTotalLength ? h.getTotalLength() : 600;
      h.style.strokeDasharray = len;
      h.style.strokeDashoffset = len;
    });
    document.querySelectorAll('#hex-viz .hex-sublabel').forEach(function(l) { l.classList.remove('animate'); });
  }

  // ---- Actions animation ----
  function animateActions() {
    var cards = document.querySelectorAll('#action-viz .action-card');
    cards.forEach(function(card, i) {
      setTimeout(function() { card.classList.add('animate'); }, 400 + i * 200);
    });
  }

  function resetActions() {
    document.querySelectorAll('#action-viz .action-card').forEach(function(c) { c.classList.remove('animate'); });
  }

  // Expose animation functions globally for content hooks
  window.animateDisruption = animateDisruption;
  window.resetDisruption = resetDisruption;
  window.animateStack = animateStack;
  window.resetStack = resetStack;
  window.animateBars = animateBars;
  window.resetBars = resetBars;
  window.animateAGI = animateAGI;
  window.resetAGI = resetAGI;
  window.animateAgent = animateAgent;
  window.resetAgent = resetAgent;
  window.animatePipeline = animatePipeline;
  window.resetPipeline = resetPipeline;
  window.animateHexagons = animateHexagons;
  window.resetHexagons = resetHexagons;
  window.animateActions = animateActions;
  window.resetActions = resetActions;

  // ============================================
  // INIT
  // ============================================

  // Hash-based navigation: #5 goes to slide 5
  function checkHash() {
    var hash = window.location.hash.replace('#', '');
    var n = parseInt(hash);
    if (n >= 1 && n <= TOTAL) {
      isAnimating = false;
      goTo(n);
    }
  }
  window.addEventListener('hashchange', checkHash);

  // Expose goTo globally for debugging
  window.goToSlide = function(n) { isAnimating = false; goTo(n); };

  updateUI();
  checkHash();
  triggerSlideAnimations(document.querySelector('.slide.active'));

  // ---- Act 1 Geometric Background ----
  (function() {
    var canvas = document.getElementById('act1-geo');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w, h, nodes = [], animFrame;

    function resize() {
      w = canvas.width = canvas.offsetWidth * 2;
      h = canvas.height = canvas.offsetHeight * 2;
      ctx.scale(1, 1);
    }

    function init() {
      resize();
      nodes = [];
      var count = 40;
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          r: 3 + Math.random() * 4
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      nodes.forEach(function(n) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      ctx.strokeStyle = 'rgba(59,130,246,0.3)';
      ctx.lineWidth = 1;
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.globalAlpha = 1 - dist / 200;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach(function(n) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#3B82F6';
        ctx.shadowColor = '#3B82F6';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;
      animFrame = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', function() { resize(); });
  })();

  // ---- Animated Economic Cycle Graph ----
  (function() {
    var _cgAnimId = null;
    var _cgPulseId = null;
    var _cgTimeouts = [];
    var _cgFadeFrames = [];

    var CG_X_MIN = 83;
    var CG_X_MAX = 1060;
    var CG_YEAR_MIN = 1770;
    var CG_YEAR_MAX = 2030;
    var CG_LINE_WIDTH = CG_X_MAX - CG_X_MIN;

    function yearToX(year) {
      return CG_X_MIN + ((year - CG_YEAR_MIN) / (CG_YEAR_MAX - CG_YEAR_MIN)) * CG_LINE_WIDTH;
    }

    var waveData = [
      { id: 'cg-wave-1', triggerYear: 1771 },
      { id: 'cg-wave-2', triggerYear: 1829 },
      { id: 'cg-wave-3', triggerYear: 1875 },
      { id: 'cg-wave-4', triggerYear: 1908 },
      { id: 'cg-wave-5', triggerYear: 1971 },
      { id: 'cg-wave-6', triggerYear: 2022 }
    ];

    var crashData = [
      { id: 'cg-crash-1', year: 1793 },
      { id: 'cg-crash-2', year: 1847 },
      { id: 'cg-crash-3', year: 1893 },
      { id: 'cg-crash-4', year: 1929 },
      { id: 'cg-crash-5', year: 2000 },
      { id: 'cg-crash-6', year: 2025 }
    ];

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function fadeIn(el, duration, delay, targetOpacity) {
      targetOpacity = targetOpacity || 1;
      var tid = setTimeout(function() {
        var start = performance.now();
        function step(now) {
          var t = Math.min((now - start) / duration, 1);
          el.setAttribute('opacity', String(easeOutCubic(t) * targetOpacity));
          if (t < 1) {
            var fid = requestAnimationFrame(step);
            _cgFadeFrames.push(fid);
          }
        }
        var fid = requestAnimationFrame(step);
        _cgFadeFrames.push(fid);
      }, delay);
      _cgTimeouts.push(tid);
    }

    function popInCrash(el, delay) {
      var tid = setTimeout(function() {
        var start = performance.now();
        var duration = 500;
        function step(now) {
          var t = Math.min((now - start) / duration, 1);
          var scale, opacity;
          if (t < 0.4) {
            var s = t / 0.4;
            scale = easeOutCubic(s) * 1.3;
            opacity = easeOutCubic(s);
          } else if (t < 0.7) {
            var s = (t - 0.4) / 0.3;
            scale = 1.3 - 0.3 * easeInOutCubic(s);
            opacity = 1;
          } else {
            var s = (t - 0.7) / 0.3;
            scale = 1.0 + 0.05 * Math.sin(s * Math.PI);
            opacity = 1;
          }
          el.style.opacity = opacity;
          el.style.transform = 'scale(' + scale + ')';
          el.style.transformOrigin = 'center center';
          if (t < 1) {
            var fid = requestAnimationFrame(step);
            _cgFadeFrames.push(fid);
          } else {
            el.style.transform = 'scale(1)';
          }
        }
        var fid = requestAnimationFrame(step);
        _cgFadeFrames.push(fid);
      }, delay);
      _cgTimeouts.push(tid);
    }

    function startAIPulse() {
      var pulseRect = document.getElementById('cg-ai-pulse');
      if (!pulseRect) return;
      var pulseStart = performance.now();
      function pulseTick(now) {
        var elapsed = (now - pulseStart) % 2400;
        var t = elapsed / 2400;
        var opacity = Math.sin(t * Math.PI) * 0.14;
        pulseRect.setAttribute('opacity', String(Math.max(0, opacity)));
        _cgPulseId = requestAnimationFrame(pulseTick);
      }
      _cgPulseId = requestAnimationFrame(pulseTick);
    }

    window.animateCycleGraph = function() {
      window.resetCycleGraph();

      var clipRect = document.getElementById('cg-line-clip-rect');
      if (!clipRect) return;

      var LINE_DURATION = 3000;
      var WAVE_FADE_MS = 600;
      var lineStart = performance.now();

      var waveTriggers = [];
      for (var i = 0; i < waveData.length; i++) {
        waveTriggers.push({
          el: document.getElementById(waveData[i].id),
          x: yearToX(waveData[i].triggerYear),
          fired: false
        });
      }

      var crashTriggers = [];
      for (var j = 0; j < crashData.length; j++) {
        crashTriggers.push({
          el: document.getElementById(crashData[j].id),
          x: yearToX(crashData[j].year),
          fired: false
        });
      }

      function tick(now) {
        var elapsed = now - lineStart;
        var rawProgress = Math.min(elapsed / LINE_DURATION, 1);
        var easedProgress = easeInOutCubic(rawProgress);
        var currentWidth = Math.max(0, easedProgress * CG_LINE_WIDTH);
        clipRect.setAttribute('width', String(currentWidth));

        var currentX = CG_X_MIN + currentWidth;

        for (var i = 0; i < waveTriggers.length; i++) {
          if (!waveTriggers[i].fired && currentX >= waveTriggers[i].x) {
            waveTriggers[i].fired = true;
            fadeIn(waveTriggers[i].el, WAVE_FADE_MS, 0);
          }
        }

        for (var j = 0; j < crashTriggers.length; j++) {
          if (!crashTriggers[j].fired && currentX >= crashTriggers[j].x) {
            crashTriggers[j].fired = true;
            popInCrash(crashTriggers[j].el, 50);
          }
        }

        if (rawProgress < 1) {
          _cgAnimId = requestAnimationFrame(tick);
        } else {
          var projGroup = document.getElementById('cg-projection');
          if (projGroup) fadeIn(projGroup, 700, 150);

          var pulseTid = setTimeout(startAIPulse, 500);
          _cgTimeouts.push(pulseTid);
        }
      }

      _cgAnimId = requestAnimationFrame(tick);
    };

    window.resetCycleGraph = function() {
      if (_cgAnimId) { cancelAnimationFrame(_cgAnimId); _cgAnimId = null; }
      if (_cgPulseId) { cancelAnimationFrame(_cgPulseId); _cgPulseId = null; }
      for (var i = 0; i < _cgTimeouts.length; i++) clearTimeout(_cgTimeouts[i]);
      for (var j = 0; j < _cgFadeFrames.length; j++) cancelAnimationFrame(_cgFadeFrames[j]);
      _cgTimeouts = [];
      _cgFadeFrames = [];

      var clipRect = document.getElementById('cg-line-clip-rect');
      if (clipRect) clipRect.setAttribute('width', '0');

      for (var w = 0; w < waveData.length; w++) {
        var wEl = document.getElementById(waveData[w].id);
        if (wEl) wEl.setAttribute('opacity', '0');
      }

      for (var c = 0; c < crashData.length; c++) {
        var cEl = document.getElementById(crashData[c].id);
        if (cEl) {
          cEl.setAttribute('opacity', '0');
          cEl.style.opacity = '';
          cEl.style.transform = '';
          cEl.style.transformOrigin = '';
        }
      }

      var proj = document.getElementById('cg-projection');
      if (proj) proj.setAttribute('opacity', '0');

      var pulse = document.getElementById('cg-ai-pulse');
      if (pulse) pulse.setAttribute('opacity', '0');
    };
  })();

})();

  // ---- Historical Headlines Carousel ----
  (function() {
    var cards = document.querySelectorAll('.headline-card');
    var total = cards.length;
    var current = 0;

    var dotsEl = document.getElementById('hc-dots');
    if (dotsEl && total > 0) {
      for (var i = 0; i < total; i++) {
        var dot = document.createElement('div');
        dot.style.cssText = 'width:6px;height:6px;border-radius:50%;background:' + (i === 0 ? 'var(--primary)' : 'var(--border)') + ';transition:background 0.3s;';
        dot.setAttribute('data-dot', i);
        dotsEl.appendChild(dot);
      }
    }

    function showCard(idx) {
      cards.forEach(function(c) { c.style.opacity = '0'; });
      cards[idx].style.opacity = '1';
      var dots = dotsEl ? dotsEl.children : [];
      for (var d = 0; d < dots.length; d++) {
        dots[d].style.background = d === idx ? 'var(--primary)' : 'var(--border)';
      }
    }

    window.cycleHeadline = function(dir) {
      current = (current + dir + total) % total;
      showCard(current);
    };
  })();

  // ---- AI Intelligence Slide Scroll Pages ----
  (function() {
    var container = document.getElementById('ai-scroll-inner');
    var indicator = document.getElementById('ai-scroll-indicator');
    var pages = document.querySelectorAll('.ai-scroll-page');
    var currentPage = 0;
    var totalPages = pages.length || 3;

    window.scrollAISlide = function(dir, absolutePage) {
      if (typeof absolutePage === 'number') {
        currentPage = Math.max(0, Math.min(totalPages - 1, absolutePage));
      } else {
        currentPage = Math.max(0, Math.min(totalPages - 1, currentPage + dir));
      }
      if (container) {
        var offset = 0;
        for (var i = 0; i < currentPage; i++) {
          offset += pages[i].offsetHeight + 24;
        }
        container.style.transform = 'translateY(-' + offset + 'px)';
      }
      if (indicator) indicator.textContent = 'PAGE ' + (currentPage + 1) + ' / ' + totalPages;
    };
    window.resetAIScroll = function() {
      currentPage = 0;
      if (container) container.style.transform = 'translateY(0)';
      if (indicator) indicator.textContent = 'PAGE 1 / ' + totalPages;
    };
  })();

  // ---- Live Poll System ----
  (function() {
    var optionKeys = ['very_anxious', 'somewhat_anxious', 'not_anxious', 'excited'];
    var neonColors = ['#3B82F6','#EC4899','#8B5CF6','#06B6D4','#10B981','#F59E0B','#EF4444','#6366F1'];
    var pollInterval = null;
    var knownWords = {};

    function updateBars(votes, total) {
      for (var i = 0; i < 4; i++) {
        var bar = document.getElementById('poll-bar-' + (i+1));
        var pct = document.getElementById('poll-pct-' + (i+1));
        if (bar && pct) {
          var count = votes[optionKeys[i]] || 0;
          var p = total > 0 ? Math.round(count / total * 100) : 0;
          bar.style.width = p + '%';
          pct.textContent = p + '%';
        }
      }
      var countEl = document.getElementById('poll-count');
      if (countEl) countEl.textContent = total + ' responses';
    }

    function renderWordCloud(words) {
      var section = document.getElementById('word-cloud-section');
      var container = document.getElementById('word-cloud');
      if (!section || !container) return;

      var entries = Object.entries(words || {});
      if (entries.length === 0) { section.style.display = 'none'; return; }
      section.style.display = 'block';

      entries.sort(function(a, b) { return b[1] - a[1]; });
      entries = entries.slice(0, 30);

      var maxFreq = entries[0][1];
      var minFreq = entries[entries.length - 1][1];

      var currentWords = {};
      entries.forEach(function(e) { currentWords[e[0]] = e[1]; });

      var existing = container.querySelectorAll('[data-word]');
      existing.forEach(function(el) {
        if (!currentWords[el.getAttribute('data-word')]) {
          el.style.opacity = '0';
          el.style.transform = 'scale(0.5)';
          setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
        }
      });

      entries.forEach(function(entry, idx) {
        var word = entry[0];
        var freq = entry[1];
        var size = minFreq === maxFreq ? 28 : 14 + (freq - minFreq) / (maxFreq - minFreq) * 28;
        var color = neonColors[idx % neonColors.length];
        var glowColor = color + '66';

        var el = container.querySelector('[data-word="' + word + '"]');
        if (el) {
          el.style.fontSize = size + 'px';
          el.style.color = color;
          el.style.textShadow = '0 0 8px ' + glowColor;
        } else {
          el = document.createElement('span');
          el.setAttribute('data-word', word);
          el.textContent = word;
          el.style.cssText = 'font-family:var(--font-headline);font-weight:700;display:inline-block;' +
            'font-size:' + size + 'px;color:' + color + ';text-shadow:0 0 8px ' + glowColor + ';' +
            'opacity:0;transform:scale(0.6);transition:all 0.5s cubic-bezier(0.175,0.885,0.32,1.275);';
          container.appendChild(el);
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              el.style.opacity = '1';
              el.style.transform = 'scale(1)';
            });
          });
        }
      });

      knownWords = currentWords;
    }

    function fetchResults() {
      fetch('/api/results')
        .then(function(r) { return r.json(); })
        .then(function(data) {
          updateBars(data.votes, data.total);
          renderWordCloud(data.words);
        })
        .catch(function() {});
    }

    var observer = new MutationObserver(function() {
      var slide2 = document.querySelector('[data-slide="2"]');
      if (slide2 && slide2.classList.contains('active')) {
        if (!pollInterval) {
          fetchResults();
          pollInterval = setInterval(fetchResults, 2000);
        }
      } else {
        if (pollInterval) { clearInterval(pollInterval); pollInterval = null; }
      }
    });
    observer.observe(document.querySelector('.deck'), { subtree: true, attributes: true, attributeFilter: ['class'] });
  })();

  // ---- YouTube Player (centered popup window) ----
  window.playYT = function(videoId, start) {
    var url = 'https://www.youtube.com/watch?v=' + videoId;
    if (start) url += '&t=' + start;
    var w = Math.min(1280, screen.width * 0.8);
    var h = Math.round(w * 9 / 16);
    var left = Math.round((screen.width - w) / 2);
    var top = Math.round((screen.height - h) / 2);
    window.open(url, 'yt_player', 'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top + ',toolbar=no,menubar=no,location=no,status=no');
  };
