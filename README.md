# Southern Cross Strategic Holdings Pte Limited &mdash; corporate website

A twelve-page static site built from the Corporate Strategic Business Plan
2026&ndash;2031. No build step, no framework, no dependencies: open
`index.html` and it runs.

## Publish it on GitHub Pages

1. Create a repository (for example `scsh-website`).
2. Upload everything in this folder, keeping the folder structure exactly as
   it is. Drag-and-drop works: GitHub &rarr; **Add file** &rarr; **Upload files**.
3. Go to **Settings &rarr; Pages**.
4. Under **Source** choose **Deploy from a branch**, branch `main`, folder
   `/ (root)`.
5. Save. The site appears at
   `https://<your-username>.github.io/<repository-name>/` within a minute or two.

To use a company domain instead, add a file named `CNAME` containing only the
domain (for example `www.scsh.com.fj`), then point a CNAME DNS record at
`<your-username>.github.io`.

## The pages

    index.html        Home &mdash; hero, key figures, and an index of every page
    about.html        About us
    purpose.html      Purpose &mdash; vision, mission, eight values
    region.html       Region &mdash; the Pacific operating picture
    group.html        The Group &mdash; four subsidiaries
    strategy.html     Strategy &mdash; six objectives
    growth.html       Growth &amp; investment
    roadmap.html      Implementation roadmap
    leadership.html   Leadership &amp; accountability
    governance.html   Governance &amp; assurance
    careers.html      Careers
    contact.html      Contact us
    404.html          shown for a bad address

Every page carries the same header, footer and background. The header menu
links to all twelve; the emblem returns to the home page; each page ends with
previous / next links so the site can also be read straight through in the
order of the Business Plan.

## Supporting files

    assets/css/site.css   all styling, including the motion and multi-page layers
    assets/js/site.js     starfield, counters, tabs, menu, reveals
    assets/img/           put photographs here
    robots.txt            search-engine instructions
    .nojekyll             tells GitHub Pages to serve the files as-is

## Adding a page

Copy any subpage, change the `<title>`, the meta description, the breadcrumb
and the previous / next links, then add a link to the new file in the `<nav>`
of every page and in the footer. Keep the section markup inside `<main>` and
give it `class="sec"` so it picks up the shared background automatically.

## Things to fill in before it goes live

Search the files for these and replace them:

- `[insert company phone]`, `[insert company email]` &mdash; on `contact.html`,
  used by both the contact block and the enquiry form.
- The enquiry form opens the visitor&rsquo;s own mail application. For a form that
  submits to an inbox, connect a service such as Formspree, Netlify Forms or
  Google Forms and change the `<form id="enq">` action.

## Replacing the illustrations with photographs

Every subsidiary image on `group.html` is a hand-drawn SVG, so nothing is
licensed from anyone. To use a real photograph instead, drop the file into
`assets/img/` and replace the whole `<svg>...</svg>` inside that
`<figure class="plate">` with:

    <img src="assets/img/your-photo.jpg" alt="Short description">

The frame, crop, gradient and caption stay as they are. Use images at least
1400px wide, in a 16:7 crop.

## Background and motion

The whole site runs on one continuous background: a fixed night-sky canvas
behind every page, with content layered over it as glass. There are no light
sections.

Animation is grouped at the end of `site.css` under marked headings and can be
removed in one block without touching the layout: the emblem&rsquo;s sequenced arcs
and stars, the starfield with its parallax layers and shooting stars, the
Pacific scope on `region.html`, the growth chart on `growth.html`, and the
meshed gears. Everything stops for visitors who have asked their device to
reduce motion.

## Browser support

Current Chrome, Edge, Firefox and Safari, on desktop and mobile. The Pacific
scope pans sideways on narrow screens so its callouts stay readable.
