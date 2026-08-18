# Southern Cross Strategic Holdings Pte Limited &mdash; corporate website

A fourteen-page static site built from the Corporate Strategic Business Plan
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
    gallery.html      Photos &amp; video clips
    resources.html    Resources &mdash; policies and SOPs to download
    contact.html      Contact us
    404.html          shown for a bad address

Every page carries the same header, footer and background. The header menu
links to all twelve; the emblem returns to the home page; each page ends with
previous / next links so the site can also be read straight through in the
order of the Business Plan.

## Supporting files

    assets/css/site.css   all styling, including the motion and multi-page layers
    assets/js/site.js     starfield, counters, tabs, menu, reveals
    assets/img/gallery/   gallery photographs (display size)
    assets/img/gallery/thumb/  gallery thumbnails, loaded by the grid
    assets/docs/policies/ the 14 Group policies, as PDFs
    assets/docs/sops/     the 14 standard operating procedures, as PDFs
    assets/video/         create this folder to add video clips
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

## The gallery

Sixty photographs, sorted into five categories that can be filtered from the
page. Each photograph exists twice: a thumbnail in
`assets/img/gallery/thumb/` that the grid loads, and a larger copy in
`assets/img/gallery/` that loads only when a visitor opens it. The grid
therefore costs about 2.3 MB to display rather than 15 MB.

The tiles reshuffle every five seconds. The movement is a FLIP animation:
positions are measured, the order changes, positions are measured again, and
each tile is animated from where it was to where it now is. Visitors can
shuffle on demand or switch the automatic shuffle off, and it pauses by itself
in a background tab or while a photograph is open.

### Adding or replacing photographs

Photographs are listed in the markup of `gallery.html`, so adding one means
adding a `<figure class="tile">` block and a matching entry in the
`galdata` JSON at the foot of the page. Copy an existing pair and change the
file name, title, caption and category. Give portrait images
`class="tile tile--tall"` so they take the taller grid slot.

Keep new photographs under about 400 KB. Anything straight off a phone will be
three to eight times that, which is what the two-size split above is for.

### Adding video clips

No clips were supplied, so that section is in place but empty. Create
`assets/video/`, put an MP4 in it, then open `gallery.html` and follow the
commented example inside `#clips-grid` &mdash; delete the placeholder block above
it and uncomment the `<figure class="clip">` pattern. The player and captions
are already styled. Use a poster image so the page does not download the video
until someone presses play.

## Resources

Twenty-eight documents: fourteen Group policies and fourteen standard
operating procedures, grouped by function, with filter buttons and a search
box that matches on title or document code.

The list is generated from the markup in `resources.html`. To add a document,
drop the PDF into `assets/docs/policies/` or `assets/docs/sops/` and copy an
existing `<a class="doc">` block, changing the file name, title, document code,
version, page count and file size.

**Before publishing, read this.** Every one of these documents is marked on its
own cover page as confidential, restricted, or a controlled copy. Publishing
them on a public website contradicts that marking, and once they are pushed to
a public repository they remain in its history even if deleted later. If they
are meant for staff and clients rather than the public, the usual options are:

- keep `resources.html` as a public list of what exists, and remove the PDFs
  from the repository, supplying them on request;
- host the PDFs behind a login (SharePoint, Google Drive with restricted
  sharing, or similar) and point each Download link at that;
- publish the repository privately and serve the site to a restricted audience.
