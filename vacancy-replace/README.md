# Vacancy → Occupied logo reveal

An animated case-study element for spinosoreg.com. A dark, empty storefront shows a
hanging **For Lease** sign and taped-over windows. When it scrolls into view:

1. The lease sign flickers, loses a hook, swings, and falls out of frame.
2. The dashed "empty sign bay" outline turns into a lit sign panel.
3. The tenant logo powers on with a neon-style flicker.
4. The windows light up one by one, and the tape comes off.
5. The caption flips from ~~Vacant~~ to **Now Open**.

No libraries. It respects `prefers-reduced-motion` (it shows the finished state with no movement)
and plays once per page view, with an optional Replay button.

## Files

| File | Purpose |
| --- | --- |
| `vacancy-replace.css` | Styles and animation. Load once per page. |
| `vacancy-replace.js` | Starts each reveal when it scrolls into view. Load once per page. |
| `demo.html` | Working example. Open it in a browser. |
| `img/dicks-house-of-sport.png` | Logo used in the demo. |

## Adding it to the site

1. Upload `vacancy-replace.css`, `vacancy-replace.js`, and the logo to the site.
   In WordPress, you can use the media library or the theme folder.
2. Load the CSS in the page `<head>` and the JS before `</body>`. You can also paste them into
   `<style>` and `<script>` tags inside a Custom HTML block.
3. Paste the `<figure class="vr" data-vr>…</figure>` block from `demo.html` where the reveal should
   appear. Update the logo `src`, `alt`, and caption.

## Using it for another tenant

Each `<figure>` works on its own, so you can place several on one page. For each one:

- **Logo:** change the `<img class="vr__logo">` `src` and `alt`. Transparent PNG or SVG works best.
  If the logo isn't about 16:9, change `aspect-ratio` on `.vr__bay`.
- **Colors:** set these inline on the figure:
  `style="--vr-glow:#E31837; --vr-facade:#2b2b2b;"`
  - `--vr-glow`: the tenant's brand color, used for the sign glow and "Now Open".
  - `--vr-facade`: the storefront color after the reveal.
- **Lease sign text:** edit the three `vr__vacant-*` spans, e.g. "Former Bed Bath & Beyond" or "52,000 SF".
- **Speed:** `--vr-duration: 1.5` makes every step 1.5× slower.
- **Start delay:** `data-vr-delay="600"` waits 600 ms after the figure is in view (default 250 ms).
- **No replay button:** delete the `<button class="vr__replay">`.
