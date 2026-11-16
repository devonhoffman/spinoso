# Spinoso property widgets

This repo holds animated graphics for Spinoso property pages. Each one is pasted into a
single WordPress Elementor "HTML Widget". Aerial "perimeter trace" widgets, one per property:

- `mall-perimeter-widget.html`: Broward Mall
- `albany-mall-perimeter-widget.html`: Albany Mall (Albany, GA). This is the current template
  for new properties: same as Broward plus the `data-zoom` setting.
- `antelope-valley-mall-perimeter-widget.html`: Antelope Valley Mall (Palmdale, CA)
- `bayshore-mall-perimeter-widget.html`: Bayshore Mall (Eureka, CA)
- `cottonwood-mall-perimeter-widget.html`: Cottonwood Mall (Albuquerque, NM)
- `crossroads-center-perimeter-widget.html`: Crossroads Center (St. Cloud, MN)
- `ellsworth-place-perimeter-widget.html`: Ellsworth Place (Silver Spring, MD)
- `fairfield-commons-perimeter-widget.html`: Fairfield Commons (Beavercreek, OH)
- `galleria-at-sunset-perimeter-widget.html`: Galleria at Sunset (Henderson, NV)
- `greenville-mall-perimeter-widget.html`: Greenville Mall (Greenville, NC)
- `greenwood-mall-perimeter-widget.html`: Greenwood Mall (Bowling Green, KY)
- `hampshire-mall-perimeter-widget.html`: Hampshire Mall (Hadley, MA). Black & white photo only
  (no color version), so `HOLD_COLOR` / `FADE` are shortened to skip the empty color stage.
- `haute-city-center-perimeter-widget.html`: Haute City Center (Terre Haute, IN)
- `imperial-valley-mall-perimeter-widget.html`: Imperial Valley Mall (El Centro, CA)
- `ingram-park-mall-perimeter-widget.html`: Ingram Park Mall (San Antonio, TX). The photo has an
  unwanted blue tint (old branding), so `.mp-color` gets a warm-gray filter and the opening
  fades from warm gray to black & white instead of from full color.
- `jefferson-mall-perimeter-widget.html`: Jefferson Mall (Louisville, KY). Two outlined areas.
  Template for properties with extra outlined parts (outparcels): add each extra area as a
  `mp-fill mp-part` / `mp-pulse mp-part` / `mp-line mp-part` polygon trio; a second dot splits
  off the main trace where it passes closest to the part's first point and traces it
  (`BRANCH` / `PART_DRAW` timings), and everything pulses together when all parts are done.
  Put the part's first point on the corner nearest the main outline.
- `kingston-collection-perimeter-widget.html`: Kingston Collection (Kingston, MA). Black & white
  photo only, short opening like Hampshire. Built from the Jefferson-based template.
- `mall-at-johnson-city-perimeter-widget.html`: Mall at Johnson City (Johnson City, TN)
- `north-county-mall-perimeter-widget.html`: North County Mall (Escondido, CA). Blue-tinted photo,
  warm-gray opening like Ingram Park.
- `northridge-mall-perimeter-widget.html`: Northridge Mall (Salinas, CA)
- `palisades-center-perimeter-widget.html`: Palisades Center (West Nyack, NY). Black & white,
  close-up photo where both ends of the mall are out of frame: the outline's end points sit just
  past the photo edges so the line runs off both sides (the widget never shows past the edges).
- `rogue-valley-mall-perimeter-widget.html`: Rogue Valley Mall (Medford, OR). Color photo is
  rotated ~90° from the outline image; traced by hand on the color photo.
- `santa-maria-town-center-perimeter-widget.html`: Santa Maria Town Center (Santa Maria, CA).
  Black & white photo only, short opening.
- `shops-at-montebello-perimeter-widget.html`: The Shops at Montebello (Montebello, CA)
- `simi-valley-town-center-perimeter-widget.html`: Simi Valley Town Center (Simi Valley, CA).
  Traced by hand on the color photo (different viewpoint from the outline image).
- `solano-town-center-perimeter-widget.html`: Solano Town Center (Fairfield, CA). Traced by hand
  on the color photo (different viewpoint).
- `solomon-pond-mall-perimeter-widget.html`: Solomon Pond Mall (Marlborough, MA). Color photo
  rotated ~90° from the outline image; traced by hand. The outline leaves out the tan-roofed anchor.
- `southpark-mall-perimeter-widget.html`: Southpark Mall (Colonial Heights, VA)
- `southpark-mall-oh-perimeter-widget.html`: Southpark Mall (Strongsville, OH)
- `southridge-mall-perimeter-widget.html`: Southridge Mall (Greendale, WI)
- `springfield-mall-perimeter-widget.html`: Springfield Mall (Springfield Township, PA). Traced
  by hand on the color photo (different viewpoint).
- `sunvalley-shopping-center-perimeter-widget.html`: Sunvalley Shopping Center (Concord, CA). Two
  outlined areas (split-off dot, like Jefferson).
- `mall-at-partridge-creek-perimeter-widget.html`: The Mall at Partridge Creek (Clinton Township,
  MI). Traced by hand on the color photo (different viewpoint).
- `mall-at-wellington-green-perimeter-widget.html`: The Mall at Wellington Green (Wellington, FL).
  Blue-tinted photo, warm-gray opening like Ingram Park.
- `oaks-mall-perimeter-widget.html`: The Oaks Mall (Gainesville, FL)
- `outlet-shoppes-at-gettysburg-perimeter-widget.html`: The Outlet Shoppes at Gettysburg (Gettysburg, PA).
  Color photo is zoomed in from the outline image; aligned by scale + offset, west end adjusted by hand.

`gemini-canvas-prompt.md` is a standalone prompt (with the widget as a fill-in template) for
making these in Gemini Canvas. If the widget template changes, update that file too.

## CRITICAL CONSTRAINTS FOR WORDPRESS ELEMENTOR HTML WIDGET

These come from the site's developer. Every generated widget MUST follow them, with no
exceptions. Check the finished code against each rule before handing it over.

The output you generate will be placed directly into a single WordPress Elementor "HTML Widget". To ensure this code does not conflict with the existing WordPress theme, Elementor global styles, or other plugins, you MUST strictly adhere to the following rules:

1.  **Single-Block Output:** Provide a single, unified block of code containing the HTML, `<style>`, and `<script>` tags. Do not provide separate files or instructions to enqueue scripts.
2.  **No Global Tags:** Do NOT include `<html>`, `<head>`, `<body>`, or `<!DOCTYPE>` tags. Start directly with the outer container of the widget.
3.  **Mandatory CSS Namespacing:**
    *   You MUST wrap all HTML in a single unique wrapper `div` with a highly specific ID (e.g., `<div id="ai-custom-widget-[unique_string]">`).
    *   **Every single CSS rule** in your `<style>` block MUST be prefixed with that unique ID to isolate the styles (e.g., `#ai-custom-widget-12345 h2 { ... }`).
    *   Do NOT use global selectors (like `body`, `a`, `h1`, `p`) without the unique ID prefix.
    *   Do NOT use CSS resets or normalize styles.
    *   Avoid using `!important` unless absolutely necessary to override an Elementor default.
4.  **JavaScript Encapsulation (IIFE):**
    *   All JavaScript MUST be contained within an Immediately Invoked Function Expression (IIFE) to avoid polluting the global namespace (e.g., `(function() { ... })();`).
    *   Use `const` and `let` instead of `var` within the IIFE.
    *   Target DOM elements exclusively within the unique wrapper ID using `document.querySelector('#ai-custom-widget-[unique_string] .my-class')` to ensure you do not accidentally manipulate other elements on the WordPress page.
    *   Since WordPress runs jQuery in compatibility mode, if you must use jQuery, pass it into the IIFE safely: `(function($) { ... })(jQuery);`. However, prefer Vanilla JS.
5.  **No External Assets (Unless Specified):** Do not call external CSS frameworks (like Bootstrap or Tailwind via CDN) or JS libraries in the code unless explicitly asked.

### How these apply to this repo's widgets

- Each widget gets its own unique ID (e.g. `ai-custom-widget-mallperim-<random>`), so several
  can sit on one page. Use that ID everywhere: the wrapper, every CSS selector, the JS lookup.
- `@keyframes` names and SVG/filter IDs are global too: suffix them with the same unique string
  (e.g. `mp-ring-7q3x9k`).
- JavaScript may *read* an ancestor (the widget measures the Elementor container it sits in to
  match the panel height) but must never *write* to anything outside the wrapper.
- Hand over the full code block in the reply, ready to paste, plus the `.html` file.

## Perimeter-trace widget: making one for a new property

Inputs, per property:
1. The full-color aerial photo (uploaded in chat). This is the image that is displayed.
2. The same view with the gold outline drawn on it (uploaded in chat). Used only for tracing.
3. The Media Library URL of the color photo. It goes into `data-src`. The session's network
   may block the site, so the URL is not fetched; the uploaded copy must be the same image
   (same crop/framing; resolution can differ).
4. The property name, for the `aria-label`.

Process (as done for Broward Mall):
1. Extract the gold line from the outline image (high red-minus-blue, bright pixels) and read
   off the polygon's corner points.
2. Align the outline image to the color photo (they can be cropped/scaled differently): fit a
   scale + offset by correlating the two grayscale images, then map the points into the color
   photo's pixel coordinates. Overlay the result on the color photo and check it by eye.
   If the two images are from different viewpoints (e.g. an angled 3D view vs. a straight-down
   photo, as with Antelope Valley), they cannot be aligned: trace the building footprint
   directly in the color photo instead (a bright-roof mask helps), matching the shape and
   level of detail of the gold outline.
   The user may add a close-up crop of the color photo to show which building is the mall:
   locate it in the color photo by template matching, then trace that building.
3. Copy the current template (`albany-mall-perimeter-widget.html`), give it a new unique ID
   (every occurrence, including the keyframe suffixes), and update: the top comment,
   `data-src`, `aria-label`, the three `<polygon points>`, the SVG `viewBox`, the `.mp-scene`
   width/height, and `IMG_W` / `IMG_H` in the script, all to the color photo's pixel size.
   Set `data-zoom` for how small the property is in the photo: `1` when it fills much of the
   frame (Broward), about `2.2` when it is a small part of a wide shot (Albany). The script
   never zooms so far that the outline is cut off. Leave the animation, timing and responsive
   behavior unchanged.
4. Test in headless Chromium (Playwright with
   `executablePath: /opt/pw-browsers/chromium-*/chrome-linux/chrome`) inside a mock
   two-column Elementor layout: check the outline lines up, the animation plays, there are no
   script errors, and the widget fills the panel height at several widths.
