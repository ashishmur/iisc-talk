// ============================================================
//  POLL WIDGET - Embed in your presentation slide
//
//  Usage:
//    <div id="live-poll"></div>
//    <script src="poll-config.js"></script>
//    <script src="poll-widget.js"></script>
//
//  Or call manually:
//    PollWidget.mount(document.getElementById('my-el'));
//    PollWidget.reset();   // clear votes (presenter tool)
// ============================================================

var PollWidget = (function() {
  'use strict';

  var db = null;
  var votesRef = null;
  var mounted = false;
  var containerEl = null;
  var currentVotes = {};

  // ── QR Code generator (minimal, self-contained) ──
  // Uses a lightweight QR encoding algorithm
  function generateQRSvg(text, size) {
    // We use the qr-creator approach: encode data into a canvas-like matrix
    // For simplicity and reliability, use a well-tested minimal QR library inline
    return _createQRSvg(text, size);
  }

  // Minimal QR Code implementation (QR Code Model 2, supports alphanumeric + byte mode)
  // Based on the public domain QR code generator by Project Nayuki
  function _createQRSvg(text, svgSize) {
    var qr = _generateQR(text);
    if (!qr) {
      return '<div style="color:#f87171;font-size:14px;">QR generation failed</div>';
    }
    var size = qr.size;
    var quiet = 2; // quiet zone modules
    var total = size + quiet * 2;
    var scale = svgSize / total;

    var paths = [];
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        if (qr.getModule(x, y)) {
          paths.push('M' + (x + quiet) + ',' + (y + quiet) + 'h1v1h-1z');
        }
      }
    }

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + total + ' ' + total +
           '" width="' + svgSize + '" height="' + svgSize + '" shape-rendering="crispEdges">' +
           '<rect width="100%" height="100%" fill="#ffffff" rx="4"/>' +
           '<path d="' + paths.join('') + '" fill="#000000"/></svg>';
  }

  // ── QR Core (Nayuki-style, byte mode only, ECC level L) ──
  function _generateQR(text) {
    var segs = [_makeByteSegment(text)];
    var ecl = 0; // Error correction Low
    var minVer = 1, maxVer = 40;
    var version, dataCapacity;

    // Find minimum version that fits
    for (version = minVer; version <= maxVer; version++) {
      dataCapacity = _getNumDataCodewords(version, ecl) * 8;
      var dataUsed = _getTotalBits(segs, version);
      if (dataUsed !== -1 && dataUsed <= dataCapacity) break;
    }
    if (version > maxVer) return null;

    // Build bit stream
    var bb = [];
    segs.forEach(function(seg) {
      _appendBits(bb, 4, 4); // byte mode indicator
      _appendBits(bb, seg.numChars, _numCharCountBits(version));
      seg.data.forEach(function(b) { _appendBits(bb, b, 8); });
    });

    // Add terminator
    var cap = _getNumDataCodewords(version, ecl) * 8;
    _appendBits(bb, 0, Math.min(4, cap - bb.length));
    _appendBits(bb, 0, (8 - bb.length % 8) % 8);

    // Pad bytes
    for (var pad = 0xEC; bb.length < cap; pad ^= 0xEC ^ 0x11) {
      _appendBits(bb, pad, 8);
    }

    // Convert to byte array
    var dataCodewords = [];
    for (var i = 0; i < bb.length; i += 8) {
      var byte = 0;
      for (var j = 0; j < 8; j++) byte = (byte << 1) | (bb[i + j] || 0);
      dataCodewords.push(byte);
    }

    return _constructQR(version, ecl, dataCodewords);
  }

  function _makeByteSegment(text) {
    var data = [];
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      if (c < 0x80) data.push(c);
      else if (c < 0x800) { data.push(0xC0 | (c >> 6)); data.push(0x80 | (c & 0x3F)); }
      else { data.push(0xE0 | (c >> 12)); data.push(0x80 | ((c >> 6) & 0x3F)); data.push(0x80 | (c & 0x3F)); }
    }
    return { data: data, numChars: data.length };
  }

  function _numCharCountBits(ver) {
    return ver <= 9 ? 8 : 16;
  }

  function _getTotalBits(segs, ver) {
    var total = 0;
    for (var i = 0; i < segs.length; i++) {
      var ccbits = _numCharCountBits(ver);
      if (segs[i].numChars >= (1 << ccbits)) return -1;
      total += 4 + ccbits + segs[i].data.length * 8;
    }
    return total;
  }

  function _appendBits(bb, val, len) {
    for (var i = len - 1; i >= 0; i--) {
      bb.push((val >>> i) & 1);
    }
  }

  // ECC block info [numBlocks, eccPerBlock] for ECL Low
  var ECC_TABLE_L = [
    null,
    [1,7],[1,10],[1,15],[1,20],[1,26],[2,18],[2,20],[2,24],[2,30],[2,18],
    [4,20],[4,22],[4,26],[4,30],[4,22],[4,24],[4,28],[4,30],[4,28],[4,28],
    [4,28],[4,28],[4,28],[4,28],[4,28],[4,28],[4,28],[4,28],[4,28],[4,28],
    [4,28],[4,28],[4,28],[4,28],[4,28],[4,28],[4,28],[4,28],[4,28],[4,28]
  ];

  // Total codewords per version
  var TOTAL_CODEWORDS = [
    null,
    26,44,70,100,134,172,196,242,292,346,
    404,466,532,581,655,733,815,901,991,1085,
    1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,
    2323,2465,2611,2761,2876,3034,3196,3362,3532,3706
  ];

  function _getNumDataCodewords(ver, ecl) {
    var info = ECC_TABLE_L[ver];
    return TOTAL_CODEWORDS[ver] - info[0] * info[1];
  }

  function _constructQR(version, ecl, dataCodewords) {
    var size = version * 4 + 17;
    var modules = [];
    var isFunction = [];
    for (var i = 0; i < size * size; i++) {
      modules.push(false);
      isFunction.push(false);
    }

    function set(x, y, val) {
      modules[y * size + x] = val;
      isFunction[y * size + x] = true;
    }

    function get(x, y) {
      return modules[y * size + x];
    }

    // Draw finder patterns
    function drawFinder(cx, cy) {
      for (var dy = -4; dy <= 4; dy++) {
        for (var dx = -4; dx <= 4; dx++) {
          var x = cx + dx, y = cy + dy;
          if (x >= 0 && x < size && y >= 0 && y < size) {
            var dist = Math.max(Math.abs(dx), Math.abs(dy));
            set(x, y, dist !== 2 && dist !== 4);
          }
        }
      }
    }

    drawFinder(3, 3);
    drawFinder(size - 4, 3);
    drawFinder(3, size - 4);

    // Alignment patterns
    var alignPos = _getAlignmentPositions(version);
    for (var ai = 0; ai < alignPos.length; ai++) {
      for (var aj = 0; aj < alignPos.length; aj++) {
        var ax = alignPos[ai], ay = alignPos[aj];
        if ((ax <= 8 && ay <= 8) || (ax <= 8 && ay >= size - 9) || (ax >= size - 9 && ay <= 8)) continue;
        for (var dy = -2; dy <= 2; dy++) {
          for (var dx = -2; dx <= 2; dx++) {
            set(ax + dx, ay + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
          }
        }
      }
    }

    // Timing patterns
    for (var ti = 8; ti < size - 8; ti++) {
      if (!isFunction[6 * size + ti]) set(ti, 6, ti % 2 === 0);
      if (!isFunction[ti * size + 6]) set(6, ti, ti % 2 === 0);
    }

    // Dark module
    set(8, size - 8, true);

    // Reserve format/version areas
    for (var fi = 0; fi < 15; fi++) {
      if (fi < 6) { isFunction[8 * size + fi] = true; isFunction[fi * size + 8] = true; }
      else if (fi < 8) { isFunction[8 * size + fi + 1] = true; isFunction[(fi + 1) * size + 8] = true; }
      else if (fi < 9) { isFunction[8 * size + (size - 15 + fi)] = true; isFunction[(size - 8) * size + 8] = true; }
      else { isFunction[8 * size + (size - 15 + fi)] = true; isFunction[(size - 15 + fi) * size + 8] = true; }
    }

    if (version >= 7) {
      for (var vi = 0; vi < 6; vi++) {
        for (var vj = 0; vj < 3; vj++) {
          isFunction[(size - 11 + vj) * size + vi] = true;
          isFunction[vi * size + (size - 11 + vj)] = true;
        }
      }
    }

    // ECC and interleave
    var eccInfo = ECC_TABLE_L[version];
    var numBlocks = eccInfo[0];
    var eccLen = eccInfo[1];
    var totalData = _getNumDataCodewords(version, ecl);
    var shortBlockLen = Math.floor(totalData / numBlocks);
    var numLong = totalData % numBlocks;

    // Split into blocks
    var blocks = [];
    var eccBlocks = [];
    var offset = 0;
    for (var bi = 0; bi < numBlocks; bi++) {
      var bLen = shortBlockLen + (bi < numBlocks - numLong ? 0 : 1);
      var block = dataCodewords.slice(offset, offset + bLen);
      blocks.push(block);
      eccBlocks.push(_reedSolomonCalc(block, eccLen));
      offset += bLen;
    }

    // Interleave
    var result = [];
    var maxBlockLen = shortBlockLen + 1;
    for (var ci = 0; ci < maxBlockLen; ci++) {
      for (var bi = 0; bi < numBlocks; bi++) {
        if (ci < blocks[bi].length) result.push(blocks[bi][ci]);
      }
    }
    for (var ci = 0; ci < eccLen; ci++) {
      for (var bi = 0; bi < numBlocks; bi++) {
        result.push(eccBlocks[bi][ci]);
      }
    }

    // Place data bits
    var bitIdx = 0;
    for (var right = size - 1; right >= 1; right -= 2) {
      if (right === 6) right = 5;
      for (var vert = 0; vert < size; vert++) {
        for (var j = 0; j < 2; j++) {
          var x = right - j;
          var upward = ((right + 1) & 2) === 0;
          var y = upward ? size - 1 - vert : vert;
          if (!isFunction[y * size + x] && bitIdx < result.length * 8) {
            modules[y * size + x] = ((result[bitIdx >>> 3] >>> (7 - (bitIdx & 7))) & 1) !== 0;
            bitIdx++;
          }
        }
      }
    }

    // Apply mask (mask 0: (x+y)%2==0) and format bits
    var bestMask = 0;
    var bestPenalty = Infinity;

    for (var mask = 0; mask < 8; mask++) {
      var tempModules = modules.slice();

      // Apply mask
      for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {
          if (!isFunction[y * size + x]) {
            var invert = false;
            switch(mask) {
              case 0: invert = (x + y) % 2 === 0; break;
              case 1: invert = y % 2 === 0; break;
              case 2: invert = x % 3 === 0; break;
              case 3: invert = (x + y) % 3 === 0; break;
              case 4: invert = (Math.floor(x/3) + Math.floor(y/2)) % 2 === 0; break;
              case 5: invert = (x*y)%2 + (x*y)%3 === 0; break;
              case 6: invert = ((x*y)%2 + (x*y)%3) % 2 === 0; break;
              case 7: invert = ((x+y)%2 + (x*y)%3) % 2 === 0; break;
            }
            if (invert) tempModules[y * size + x] = !tempModules[y * size + x];
          }
        }
      }

      // Simple penalty estimate
      var penalty = 0;
      for (var y = 0; y < size; y++) {
        var run = 1;
        for (var x = 1; x < size; x++) {
          if (tempModules[y*size+x] === tempModules[y*size+x-1]) { run++; }
          else { if (run >= 5) penalty += run - 2; run = 1; }
        }
        if (run >= 5) penalty += run - 2;
      }
      for (var x = 0; x < size; x++) {
        var run = 1;
        for (var y = 1; y < size; y++) {
          if (tempModules[y*size+x] === tempModules[(y-1)*size+x]) { run++; }
          else { if (run >= 5) penalty += run - 2; run = 1; }
        }
        if (run >= 5) penalty += run - 2;
      }

      if (penalty < bestPenalty) {
        bestPenalty = penalty;
        bestMask = mask;
      }
    }

    // Apply best mask
    for (var y = 0; y < size; y++) {
      for (var x = 0; x < size; x++) {
        if (!isFunction[y * size + x]) {
          var invert = false;
          switch(bestMask) {
            case 0: invert = (x + y) % 2 === 0; break;
            case 1: invert = y % 2 === 0; break;
            case 2: invert = x % 3 === 0; break;
            case 3: invert = (x + y) % 3 === 0; break;
            case 4: invert = (Math.floor(x/3) + Math.floor(y/2)) % 2 === 0; break;
            case 5: invert = (x*y)%2 + (x*y)%3 === 0; break;
            case 6: invert = ((x*y)%2 + (x*y)%3) % 2 === 0; break;
            case 7: invert = ((x+y)%2 + (x*y)%3) % 2 === 0; break;
          }
          if (invert) modules[y * size + x] = !modules[y * size + x];
        }
      }
    }

    // Write format info
    var FORMAT_BITS = [0x77c4,0x72f3,0x7daa,0x789d,0x662f,0x6318,0x6c41,0x6976,
                       0x5412,0x5125,0x5e7c,0x5b4b,0x45f9,0x40ce,0x4f97,0x4aa0];
    var formatBits = FORMAT_BITS[bestMask]; // ECL L = 01, mask

    for (var fi = 0; fi < 15; fi++) {
      var bit = ((formatBits >>> fi) & 1) !== 0;
      // Around top-left finder
      if (fi < 6) modules[8 * size + fi] = bit;
      else if (fi < 8) modules[8 * size + fi + 1] = bit;
      else modules[(14 - fi) * size + 8] = bit;

      // Around bottom-left and top-right finders
      if (fi < 8) modules[(size - 1 - fi) * size + 8] = bit;
      else modules[8 * size + (size - 15 + fi)] = bit;
    }

    // Version info
    if (version >= 7) {
      var verBits = version;
      var rem = version;
      for (var vi = 0; vi < 12; vi++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
      verBits = (version << 12) | rem;
      for (var vi = 0; vi < 18; vi++) {
        var bit = ((verBits >>> vi) & 1) !== 0;
        var a = Math.floor(vi / 3), b = vi % 3;
        modules[(size - 11 + b) * size + a] = bit;
        modules[a * size + (size - 11 + b)] = bit;
      }
    }

    return {
      size: size,
      getModule: function(x, y) {
        return (x >= 0 && x < size && y >= 0 && y < size) ? modules[y * size + x] : false;
      }
    };
  }

  function _getAlignmentPositions(ver) {
    if (ver === 1) return [];
    var numAlign = Math.floor(ver / 7) + 2;
    var step = ver === 32 ? 26 :
      Math.ceil((ver * 4 + 4) / (numAlign * 2 - 2)) * 2;
    var result = [6];
    for (var pos = ver * 4 + 10; result.length < numAlign; pos -= step) {
      result.splice(1, 0, pos);
    }
    return result;
  }

  // Reed-Solomon ECC calculation over GF(2^8)
  var GF_EXP = new Array(256);
  var GF_LOG = new Array(256);
  (function() {
    var val = 1;
    for (var i = 0; i < 255; i++) {
      GF_EXP[i] = val;
      GF_LOG[val] = i;
      val = (val << 1) ^ (val >= 128 ? 0x11d : 0);
    }
    GF_EXP[255] = GF_EXP[0];
  })();

  function _gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return GF_EXP[(GF_LOG[a] + GF_LOG[b]) % 255];
  }

  function _reedSolomonCalc(data, numEcc) {
    var gen = [1];
    for (var i = 0; i < numEcc; i++) {
      var newGen = new Array(gen.length + 1).fill(0);
      for (var j = 0; j < gen.length; j++) {
        newGen[j] ^= gen[j];
        newGen[j + 1] ^= _gfMul(gen[j], GF_EXP[i]);
      }
      gen = newGen;
    }

    var result = new Array(numEcc).fill(0);
    for (var i = 0; i < data.length; i++) {
      var factor = data[i] ^ result[0];
      result.shift();
      result.push(0);
      for (var j = 0; j < numEcc; j++) {
        result[j] ^= _gfMul(factor, gen[j + 1]);
      }
    }
    return result;
  }

  // ── Chart rendering ──
  function renderChart(el, votes) {
    var total = 0;
    POLL_CONFIG.options.forEach(function(opt) {
      total += (votes[opt.key] || 0);
    });

    var html = '<div class="poll-widget-chart">';

    POLL_CONFIG.options.forEach(function(opt) {
      var count = votes[opt.key] || 0;
      var pct = total > 0 ? Math.round((count / total) * 100) : 0;

      html += '<div class="pw-row">';
      html += '  <div class="pw-label">' + opt.emoji + ' ' + opt.label + '</div>';
      html += '  <div class="pw-bar-wrap">';
      html += '    <div class="pw-bar" style="width:' + pct + '%;background:' + opt.color + '"></div>';
      html += '  </div>';
      html += '  <div class="pw-value">' + count + '<span class="pw-pct"> (' + pct + '%)</span></div>';
      html += '</div>';
    });

    html += '<div class="pw-total">Total responses: ' + total + '</div>';
    html += '</div>';

    el.innerHTML = html;
  }

  // ── Public API ──
  function mount(el) {
    if (!el) {
      el = document.getElementById('live-poll');
    }
    if (!el) {
      console.error('PollWidget: No mount element found');
      return;
    }
    containerEl = el;

    // Inject styles
    if (!document.getElementById('poll-widget-styles')) {
      var style = document.createElement('style');
      style.id = 'poll-widget-styles';
      style.textContent = '\
        .poll-widget-wrap { display: flex; gap: 48px; align-items: flex-start; }\
        .poll-widget-qr { flex-shrink: 0; text-align: center; }\
        .poll-widget-qr svg { border-radius: 12px; }\
        .poll-widget-qr-label { margin-top: 12px; font-size: 18px; color: #aaa; font-family: -apple-system, sans-serif; }\
        .poll-widget-results { flex: 1; min-width: 0; }\
        .poll-widget-chart { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }\
        .pw-row { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }\
        .pw-label { width: 180px; font-size: 20px; color: #e0e0e0; white-space: nowrap; text-align: right; }\
        .pw-bar-wrap { flex: 1; height: 40px; background: #1a1a2e; border-radius: 8px; overflow: hidden; }\
        .pw-bar { height: 100%; border-radius: 8px; transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); min-width: 0; }\
        .pw-value { width: 100px; font-size: 22px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }\
        .pw-pct { font-size: 16px; font-weight: 400; color: #888; }\
        .pw-total { text-align: center; margin-top: 20px; font-size: 18px; color: #666; }\
        .pw-live-dot { display: inline-block; width: 8px; height: 8px; background: #4ade80; border-radius: 50%; margin-right: 8px; animation: pw-pulse 1.5s infinite; }\
        @keyframes pw-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }\
        .pw-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }\
        .pw-title { font-size: 28px; font-weight: 700; color: #fff; font-family: -apple-system, sans-serif; }\
        .pw-live-badge { font-size: 14px; color: #4ade80; font-family: -apple-system, sans-serif; }\
      ';
      document.head.appendChild(style);
    }

    // Build layout: QR on left, chart on right
    var qrHtml = generateQRSvg(POLL_CONFIG.voteUrl, 200);

    el.innerHTML = '<div class="poll-widget-wrap">' +
      '<div class="poll-widget-qr">' + qrHtml +
      '<div class="poll-widget-qr-label">Scan to vote</div></div>' +
      '<div class="poll-widget-results">' +
      '<div class="pw-header"><div class="pw-title">' + POLL_CONFIG.question + '</div>' +
      '<div class="pw-live-badge"><span class="pw-live-dot"></span>Live</div></div>' +
      '<div id="pw-chart-area"></div></div></div>';

    // Connect to Firebase
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(POLL_CONFIG.firebase);
      }
      db = firebase.database();
      votesRef = db.ref('polls/' + POLL_CONFIG.pollId + '/votes');

      // Listen for real-time updates
      votesRef.on('value', function(snapshot) {
        currentVotes = snapshot.val() || {};
        var chartEl = document.getElementById('pw-chart-area');
        if (chartEl) renderChart(chartEl, currentVotes);
      });

      mounted = true;
    } catch (err) {
      console.error('PollWidget Firebase error:', err);
      var chartEl = document.getElementById('pw-chart-area');
      if (chartEl) {
        chartEl.innerHTML = '<div style="color:#f87171;padding:20px;">Could not connect to Firebase. Check poll-config.js</div>';
      }
    }
  }

  function reset() {
    if (!db) {
      console.error('PollWidget: Not connected to Firebase');
      return;
    }
    if (!confirm('Reset all votes to zero? This cannot be undone.')) return;

    var updates = {};
    POLL_CONFIG.options.forEach(function(opt) {
      updates[opt.key] = 0;
    });
    votesRef.set(updates);
  }

  function destroy() {
    if (votesRef) votesRef.off();
    if (containerEl) containerEl.innerHTML = '';
    mounted = false;
  }

  return {
    mount: mount,
    reset: reset,
    destroy: destroy,
    generateQRSvg: generateQRSvg
  };

})();

// Auto-mount if #live-poll element exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('live-poll')) PollWidget.mount();
  });
} else {
  if (document.getElementById('live-poll')) PollWidget.mount();
}
