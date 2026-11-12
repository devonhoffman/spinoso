# Gemini Canvas prompt: Spinoso perimeter-trace widget

Copy everything below the line into Gemini Canvas. Fill in the four lines under "THIS PROPERTY"
and attach the two images in the same message.

---

You are generating an animated aerial-photo widget for a WordPress Elementor "HTML Widget". I will give you two images of one shopping-center property and a few details. You will fill in the TEMPLATE below and return the finished code. Do not redesign or rewrite the animation: change only the placeholders listed in STEP 3.

THIS PROPERTY
- Property name and city: [e.g. Greenwood Mall in Bowling Green, KY]
- Image URL (the photo the widget displays): [paste the Media Library URL]
- Image 1 (attached): the full-color aerial photo. This is the photo at the URL above.
- Image 2 (attached): the same area with the property boundary drawn as a gold line.
- Notes (optional): [e.g. "zoom out a bit", "no color version", "there are two gold outlines", "the color photo has a blue tint we don't want"]

STEP 1: Measure Image 1
Find the exact pixel width and height of Image 1. These are __W__ and __H__. All outline coordinates must be in Image 1's pixel coordinates (x from the left edge, y from the top edge). If you can't determine the exact size, say so and ask me for it rather than guessing.

STEP 2: Trace the gold outline onto Image 1
Look at the gold line in Image 2 and find the same buildings in Image 1.
- If the two images show the same view, the gold line can be copied over directly (adjusting for any difference in crop or scale).
- If they show different angles (for example one is a tilted 3D view and the other is straight down), trace the same buildings directly in Image 1, matching the shape and level of detail of the gold line.
Write the outline as a list of corner points "x,y x,y x,y ..." going around the shape in order (clockwise), about 10 to 30 points, following the outer edge of the roofs the gold line encloses. Start at a corner near the top of the shape. This is __POINTS__.
Then check your work: describe in one or two sentences which buildings the outline includes, and list anything you were unsure about.

STEP 3: Fill in the TEMPLATE
Replace every placeholder, everywhere it appears:
- __PROPERTY__: the property name and city, e.g. "Greenwood Mall in Bowling Green, KY".
- __SLUG__: the property name in lowercase letters only, no spaces or punctuation, e.g. "greenwoodmall".
- __SFX__: a random 6-character string of lowercase letters and digits, e.g. "k4r8w2". Use a new one for every property, and use the same one everywhere in this widget.
- __URL__: the image URL.
- __W__ and __H__: from STEP 1.
- __POINTS__: from STEP 2 (same list in all three polygons).
- __ZOOM__: how far to zoom in on the property. Use 2.2 when the property is a small part of a wide shot (the usual case), 1.4 to 1.6 for a medium view or a small/low-resolution photo, and 1 when the property already fills most of the photo. The widget never zooms so far that the outline is cut off.
- The line containing __PARTS__: delete it, unless there are extra outlines (see Special cases).
Do not change anything else.

Special cases (only when the Notes or images call for them):
- Extra gold outlines (e.g. a separate outparcel building): for each one, replace the __PARTS__ line with these three lines, using that outline's own points, and start that outline's points at the corner nearest the main outline:
      <polygon class="mp-fill mp-part" points="..."/>
      <polygon class="mp-pulse mp-part" points="..."/>
      <polygon class="mp-line mp-part" points="..."/>
  The widget then makes a second dot break off from the main trace to draw it. Nothing else changes.
- No color version (both images are black and white): change the two timing lines in the script to
      const HOLD_COLOR = 300;    // short: this photo has no color version to show first
      const FADE = 500;          // short wait before the dot drops (no color fade to wait for)
- Unwanted color tint in the photo (e.g. old blue branding): add this rule right after the ".mp-img" rule in the style block:
      #ai-custom-widget-__SLUG__-__SFX__ .mp-color {
        filter: grayscale(1) sepia(0.35) brightness(1.02);
      }

STEP 4: Check against the developer's rules
The code goes into a single WordPress Elementor HTML Widget. It must follow all of these rules exactly. The template already does; make sure your edits keep it that way:
1. Single-Block Output: one unified block containing the HTML, <style> and <script>. No separate files, no instructions to enqueue scripts.
2. No Global Tags: no <html>, <head>, <body> or <!DOCTYPE>. Start directly with the outer container.
3. Mandatory CSS Namespacing: all HTML inside the single wrapper div with the unique ID; every CSS rule prefixed with that ID; no unprefixed global selectors; no CSS resets or normalize styles; no !important.
4. JavaScript Encapsulation: all JavaScript inside an IIFE; const and let only, never var; elements looked up only inside the unique wrapper; plain JavaScript (no jQuery).
5. No External Assets: no CSS frameworks or JS libraries from CDNs.
Also: @keyframes names must keep the __SFX__ suffix so several widgets can share a page. Confirm no placeholder (anything with double underscores) is left in the code.

OUTPUT
1. The finished code as one code block, ready to paste, and nothing else inside that block.
2. Below it, a short note: the image size you used, the zoom you chose and why, which buildings the outline covers, and anything I should double-check when I see it live.

TEMPLATE (fill in; do not otherwise change):

```html
<!-- __PROPERTY__ perimeter reveal: color -> black & white -> gold outline draws -> pulse.
     Image: full-color aerial photo set in data-src below. data-zoom: how far to zoom in on the mall (1 = whole photo height). -->
<div id="ai-custom-widget-__SLUG__-__SFX__" data-src="__URL__" data-min-height="360" data-zoom="__ZOOM__" role="img" aria-label="Aerial view of __PROPERTY__ with its property boundary outlined in gold">
  <div class="mp-stage">
    <div class="mp-scene">
    <img class="mp-img mp-color" alt="" decoding="async">
    <img class="mp-img mp-bw" alt="" decoding="async" aria-hidden="true">
    <svg class="mp-svg" viewBox="0 0 __W__ __H__" preserveAspectRatio="none" aria-hidden="true">
      <polygon class="mp-fill" points="__POINTS__"/>
      <polygon class="mp-pulse" points="__POINTS__"/>
      <polygon class="mp-line" points="__POINTS__"/>
      <!-- __PARTS__ -->
      <g class="mp-dot" transform="translate(693,-30)">
        <g class="mp-dot-size">
          <circle class="mp-dot-ring" r="9"/>
          <circle class="mp-dot-core" r="9"/>
        </g>
      </g>
    </svg>
    </div>
  </div>
</div>

<style>
#ai-custom-widget-__SLUG__-__SFX__ {
  --mp-gold: #e0a93b;
  --mp-fade: 1.6s;
  --mp-sw: 6;          /* line width in SVG units; JS keeps it ~6 screen px */
  position: relative;
  width: 100%;
  max-width: 100%;
  height: 100%;
  min-height: 360px;
  line-height: 0;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-stage {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #2a2a2a;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-scene {
  position: absolute;
  left: 0;
  top: 0;
  width: __W__px;
  height: __H__px;
  transform-origin: 0 0;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-img {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  object-fit: cover;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-bw {
  filter: grayscale(1) brightness(1.12) contrast(0.92);
  opacity: 0;
  transition: opacity var(--mp-fade) ease-in-out;
}
#ai-custom-widget-__SLUG__-__SFX__.mp-is-bw .mp-bw {
  opacity: 1;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-line,
#ai-custom-widget-__SLUG__-__SFX__ .mp-pulse {
  fill: none;
  stroke: var(--mp-gold);
  stroke-linejoin: round;
  stroke-linecap: round;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-line {
  stroke-width: var(--mp-sw);
  opacity: 0;
  filter: drop-shadow(0 0 3px rgba(224, 169, 59, 0.55));
}
#ai-custom-widget-__SLUG__-__SFX__.mp-is-drawing .mp-line {
  opacity: 1;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-dot {
  opacity: 0;
  transition: opacity 0.4s ease;
}
#ai-custom-widget-__SLUG__-__SFX__.mp-is-dropping .mp-dot {
  opacity: 1;
}
#ai-custom-widget-__SLUG__-__SFX__.mp-is-done .mp-dot {
  opacity: 0;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-dot-core {
  fill: var(--mp-gold);
  stroke: #fff;
  stroke-width: 2.5;
  filter: drop-shadow(0 0 6px rgba(224, 169, 59, 0.9));
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-dot-ring {
  fill: none;
  stroke: var(--mp-gold);
  stroke-width: 3;
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}
#ai-custom-widget-__SLUG__-__SFX__.mp-is-landed .mp-dot-ring {
  animation: mp-land-__SFX__ 0.9s ease-out 1;
}
@keyframes mp-land-__SFX__ {
  0%   { opacity: 0.95; transform: scale(1); }
  100% { opacity: 0;    transform: scale(3.4); }
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-pulse {
  stroke-width: var(--mp-sw);
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
}
#ai-custom-widget-__SLUG__-__SFX__ .mp-fill {
  fill: var(--mp-gold);
  stroke: none;
  opacity: 0;
}
#ai-custom-widget-__SLUG__-__SFX__.mp-is-done .mp-line {
  filter: drop-shadow(0 0 4px rgba(224, 169, 59, 0.7));
  animation: mp-line-pulse-__SFX__ 1.1s ease-out 1;
}
#ai-custom-widget-__SLUG__-__SFX__.mp-is-done .mp-pulse {
  animation: mp-ring-__SFX__ 1.1s ease-out 1;
}
#ai-custom-widget-__SLUG__-__SFX__.mp-is-done .mp-fill {
  animation: mp-fill-__SFX__ 1.1s ease-out 1;
}
@keyframes mp-line-pulse-__SFX__ {
  0%   { stroke-width: var(--mp-sw); }
  30%  { stroke-width: calc(var(--mp-sw) * 1.6); }
  100% { stroke-width: var(--mp-sw); }
}
@keyframes mp-ring-__SFX__ {
  0%   { opacity: 0.9; stroke-width: var(--mp-sw);                 transform: scale(1); }
  100% { opacity: 0;   stroke-width: calc(var(--mp-sw) * 2.6);     transform: scale(1.06); }
}
@keyframes mp-fill-__SFX__ {
  0%   { opacity: 0; }
  30%  { opacity: 0.22; }
  100% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  #ai-custom-widget-__SLUG__-__SFX__ .mp-bw,
  #ai-custom-widget-__SLUG__-__SFX__ .mp-dot { transition: none; }
  #ai-custom-widget-__SLUG__-__SFX__.mp-is-landed .mp-dot-ring,
  #ai-custom-widget-__SLUG__-__SFX__.mp-is-done .mp-line,
  #ai-custom-widget-__SLUG__-__SFX__.mp-is-done .mp-pulse,
  #ai-custom-widget-__SLUG__-__SFX__.mp-is-done .mp-fill { animation: none; }
}
</style>

<script>
(function () {
  const root = document.querySelector('#ai-custom-widget-__SLUG__-__SFX__');
  if (!root || root.dataset.mpInit) return;
  root.dataset.mpInit = '1';

  // Timing (ms)
  const HOLD_COLOR = 1200;   // how long the color photo shows first
  const FADE = 1600;         // matches --mp-fade
  const DROP = 1800;         // gold dot drifting down to the start point
  const LAND_PAUSE = 500;    // beat after the dot lands, before tracing
  const DRAW = 3000;         // tracing the perimeter
  const BRANCH = 600;        // split-off dot travelling to an extra part
  const PART_DRAW = 1200;    // tracing an extra part

  // Photo size the outline coordinates are drawn against
  const IMG_W = __W__;
  const IMG_H = __H__;
  const LINE_PX = 6;         // on-screen thickness of the gold line
  const DOT_PX = 9;          // on-screen radius of the gold dot

  const src = root.getAttribute('data-src');
  const minHeight = parseInt(root.getAttribute('data-min-height'), 10) || 360;
  const zoom = Math.max(1, parseFloat(root.getAttribute('data-zoom')) || 1);
  const stage = root.querySelector('.mp-stage');
  const scene = root.querySelector('.mp-scene');
  const imgColor = root.querySelector('.mp-color');
  const imgBw = root.querySelector('.mp-bw');
  const line = root.querySelector('.mp-line:not(.mp-part)');
  const svg = root.querySelector('.mp-svg');
  const dot = root.querySelector('.mp-dot');
  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  imgColor.src = src;
  imgBw.src = src;

  // ---- Responsive sizing -------------------------------------------------
  // Height: fill the Elementor container (panel) this widget sits in.
  // Width: whatever the column gives us. The photo always fills the full height;
  // anything that doesn't fit is cropped off the sides, keeping the mall centered.
  // Zoom: crops in closer around the mall, but never so far that the outline
  // would be cut off, and never so little that the photo leaves empty space.
  const host = root.closest('.e-con, .elementor-column, .elementor-widget-wrap') || root.parentElement;
  // Frame the main outline plus any extra parts
  const bbox = (function () {
    let b = line.getBBox();
    let x0 = b.x, y0 = b.y, x1 = b.x + b.width, y1 = b.y + b.height;
    root.querySelectorAll('.mp-line.mp-part').forEach(function (p) {
      const q = p.getBBox();
      x0 = Math.min(x0, q.x); y0 = Math.min(y0, q.y);
      x1 = Math.max(x1, q.x + q.width); y1 = Math.max(y1, q.y + q.height);
    });
    return { x: x0, y: y0, width: x1 - x0, height: y1 - y0 };
  })();
  const focusX = bbox.x + bbox.width / 2;
  const focusY = bbox.y + bbox.height / 2;
  let scale = 1;
  let offsetY = 0;

  function fitHeight() {
    if (!host) return;
    root.style.height = minHeight + 'px';            // collapse so the panel shows its own height
    const cs = getComputedStyle(host);
    const avail = host.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    let h = avail;
    if (h <= minHeight + 1) {
      // Nothing beside us sets a height (e.g. columns stacked on mobile): use a pleasant ratio.
      h = Math.min(640, Math.max(minHeight, root.clientWidth * 0.8));
    }
    root.style.height = Math.round(h) + 'px';
  }

  function layout() {
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    if (!W || !H) return;
    const cover = Math.max(W / IMG_W, H / IMG_H);   // never any empty space
    const fitOutline = Math.min(0.85 * W / bbox.width, 0.85 * H / bbox.height);
    scale = Math.max(cover, Math.min(cover * zoom, fitOutline));
    const clamp = function (v, lo, hi) { return Math.min(hi, Math.max(lo, v)); };
    // Center on the mall, but never pull a photo edge into view
    const x = clamp(W / 2 - focusX * scale, W - IMG_W * scale, 0);
    const y = clamp(H / 2 - focusY * scale, H - IMG_H * scale, 0);
    offsetY = y;
    scene.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + scale.toFixed(4) + ')';
    root.style.setProperty('--mp-sw', (LINE_PX / scale).toFixed(2));
    root.querySelectorAll('.mp-dot-size').forEach(function (g) {
      g.setAttribute('transform', 'scale(' + (DOT_PX / 9 / scale).toFixed(3) + ')');
    });
  }

  let raf = 0;
  function refresh() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(function () { fitHeight(); layout(); });
  }
  fitHeight();
  layout();
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(refresh);
    ro.observe(root);
    if (host) ro.observe(host);
  }
  window.addEventListener('resize', refresh);

  const len = Math.ceil(line.getTotalLength());
  line.style.strokeDasharray = len + ' ' + len;
  line.style.strokeDashoffset = String(len);

  const start = line.getPointAtLength(0);
  let DROP_FROM = -30; // recalculated to just above the visible top edge

  function place(el, x, y) {
    el.setAttribute('transform', 'translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')');
  }
  function moveDot(x, y) { place(dot, x, y); }
  moveDot(start.x, DROP_FROM);

  // Extra parts: each is drawn by a dot that splits off where the main
  // outline passes closest to the part's starting corner.
  const parts = Array.prototype.map.call(root.querySelectorAll('.mp-line.mp-part'), function (el) {
    const plen = Math.ceil(el.getTotalLength());
    el.style.strokeDasharray = plen + ' ' + plen;
    el.style.strokeDashoffset = String(plen);
    const p0 = el.getPointAtLength(0);
    let best = Infinity, splitAt = 0;
    for (let i = 0; i <= 400; i++) {
      const L = len * i / 400;
      const q = line.getPointAtLength(L);
      const d2 = (q.x - p0.x) * (q.x - p0.x) + (q.y - p0.y) * (q.y - p0.y);
      if (d2 < best) { best = d2; splitAt = L; }
    }
    return { el: el, len: plen, p0: p0, splitAt: splitAt, started: false, done: false };
  });

  const easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
  const easeInOutCubic = function (t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  function tween(duration, ease, onFrame, onDone) {
    const t0 = performance.now();
    function frame(now) {
      const t = Math.min(1, (now - t0) / duration);
      onFrame(ease(t));
      if (t < 1) requestAnimationFrame(frame);
      else if (onDone) onDone();
    }
    requestAnimationFrame(frame);
  }

  function dropDot(done) {
    DROP_FROM = (-offsetY - 40) / scale;
    moveDot(start.x, DROP_FROM);
    root.classList.add('mp-is-dropping');
    tween(DROP, easeOutCubic, function (k) {
      moveDot(start.x, DROP_FROM + (start.y - DROP_FROM) * k);
    }, function () {
      root.classList.add('mp-is-landed');
      setTimeout(done, LAND_PAUSE);
    });
  }

  function branch(part, from, done) {
    const d2 = dot.cloneNode(true);
    svg.appendChild(d2);
    place(d2, from.x, from.y);
    tween(BRANCH, easeInOutCubic, function (k) {
      place(d2, from.x + (part.p0.x - from.x) * k, from.y + (part.p0.y - from.y) * k);
    }, function () {
      tween(PART_DRAW, easeInOutCubic, function (k) {
        const d = part.len * k;
        part.el.style.strokeDashoffset = String(part.len - d);
        const pt = part.el.getPointAtLength(Math.min(d, part.len - 0.01));
        place(d2, pt.x, pt.y);
      }, function () { part.done = true; done(); });
    });
  }

  function trace(done) {
    root.classList.add('mp-is-drawing');
    let mainDone = false;
    function check() {
      if (mainDone && parts.every(function (p) { return p.done; })) done();
    }
    tween(DRAW, easeInOutCubic, function (k) {
      const d = len * k;
      line.style.strokeDashoffset = String(len - d);
      const pt = line.getPointAtLength(Math.min(d, len - 0.01));
      moveDot(pt.x, pt.y);
      parts.forEach(function (p) {
        if (!p.started && d >= p.splitAt) { p.started = true; branch(p, pt, check); }
      });
    }, function () { mainDone = true; check(); });
  }

  function finish() {
    line.style.strokeDashoffset = '0';
    parts.forEach(function (p) { p.el.style.strokeDashoffset = '0'; });
    root.classList.add('mp-is-done');
  }

  let started = false;
  function play() {
    if (started) return;
    started = true;
    if (reduceMotion) {
      root.classList.add('mp-is-bw', 'mp-is-drawing');
      finish();
      return;
    }
    setTimeout(function () {
      root.classList.add('mp-is-bw');
      setTimeout(function () {
        dropDot(function () { trace(finish); });
      }, FADE * 0.8);
    }, HOLD_COLOR);
  }

  function startWhenReady() {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { io.disconnect(); play(); }
        });
      }, { threshold: 0.4 });
      io.observe(root);
    } else {
      play();
    }
  }

  if (imgColor.complete && imgColor.naturalWidth) startWhenReady();
  else {
    imgColor.addEventListener('load', startWhenReady, { once: true });
    imgColor.addEventListener('error', startWhenReady, { once: true });
  }
})();
</script>
```
