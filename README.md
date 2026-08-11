# Southern Cross Strategic Holdings Pte Limited &mdash; corporate website

Static one-page site for SCSH, built from the Corporate Strategic Business Plan
2026&ndash;2031. No build step, no framework, no dependencies: open `index.html`
and it runs.

## Publish it on GitHub Pages

1. Create a repository (for example `scsh-website`).
2. Upload everything in this folder, keeping the folder structure exactly as it is.
   Drag-and-drop works: GitHub &rarr; **Add file** &rarr; **Upload files**.
3. Go to **Settings &rarr; Pages**.
4. Under **Source** choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
5. Save. The site appears at `https://<your-username>.github.io/<repository-name>/`
   within a minute or two.

To use a company domain instead, add a file named `CNAME` containing only the
domain (for example `www.scsh.com.fj`), then point a CNAME DNS record at
`<your-username>.github.io`.

## What is in the folder

    index.html              the whole site
    404.html                shown for a bad address
    robots.txt              search-engine instructions
    .nojekyll               tells GitHub Pages to serve the files as-is
    assets/css/site.css     all styling, including the motion layer
    assets/js/site.js       starfield, counters, tabs, menu, reveals
    assets/img/             put photographs here

## Things to fill in before it goes live

Search `index.html` for these and replace them:

- `[insert company phone]`, `[insert company email]` &mdash; the contact section
  and the enquiry form both use them.
- The enquiry form currently opens the visitor&rsquo;s own mail application. For a
  form that submits to an inbox, connect a service such as Formspree, Netlify
  Forms or Google Forms and change the `<form id="enq">` action.

## Replacing the illustrations with photographs

Every subsidiary image is a hand-drawn SVG so nothing is licensed from anyone.
To use a real photograph instead, drop the file into `assets/img/` and replace
the whole `<svg>...</svg>` inside that `<figure class="plate">` with:

    <img src="assets/img/your-photo.jpg" alt="Short description">

The frame, crop, gradient and caption all stay as they are. Use images at least
1400px wide, in a 16:7 crop.

## Background

The whole site runs on one continuous background: a fixed night-sky canvas
behind every section, with content layered over it as glass rather than as
bands of different colour. There are no light sections. If you add a section,
give it `class="sec"` and it will pick up the same ground automatically.

## The motion layer

Animation is grouped at the end of `site.css` under a marked heading and can be
removed in one block without touching the layout. It covers:

- the emblem &mdash; arcs sweep in sequence, then the five Southern Cross stars
  light in turn; the hero copy adds two counter-rotating orbit rings
- a page-wide starfield with three parallax depth layers and occasional
  shooting stars, drawn on `<canvas>`
- the Pacific scope in the Region section: a continuous 360&deg; sweep with
  island returns and site pings timed to the beam
- the growth chart, which builds when it scrolls into view
- the three meshed gears in the investment engine, geared at true
  inverse-tooth-ratio speeds

Everything stops for visitors who have asked their device to reduce motion.

## Browser support

Current Chrome, Edge, Firefox and Safari, on desktop and mobile. The scope pans
sideways on narrow screens so the callouts stay readable.
