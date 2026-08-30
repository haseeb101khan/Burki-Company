# Burki & Company — Prototype Notes

Working notes for the build. Covers what is real, what is placeholder, and what
needs a decision or an asset from the client.

---

## Status

**Built:** design system, data layer (now Sanity-backed), full homepage, the
equipment catalogue (`/equipment`, `/equipment/[category]`) with brand and
category filters, the equipment detail page (`/equipment/[category]/[model]`),
About Us (`/about`), and the Request a Quote form (`/request-a-quote`), which
now stores submissions as `inquiry` documents.
**Stubbed:** Parts catalogue, Industries, Contact, Privacy Policy. Each has a
route and a placeholder screen so navigation never dead-ends.

### Equipment detail page

`/equipment/[category]/[model]` — built as one reusable template, not a
one-off for LX-936. Any equipment record with data behind it renders through
this same page. Sections, top to bottom:

1. **Breadcrumb** — Home / Equipment / category / model
2. **Gallery + overview** — thumbnail gallery, brand/series, model, tagline,
   summary, a highlight stat strip, Request a Quote / Talk to Sales
3. **Description** — the longer descriptive paragraph, on a muted band
4. **Technical specification** — `SpecTable`, every `SpecGroup` from the data
   layer in a two-column grid with navy group headers
5. **Why this machine** — `item.features`, on navy
6. **Explore other variants** — see below
7. **Compatible parts** — `getCompatibleParts()`, reusing the same `PartCard`
   built for the parts catalogue

A section only renders if the underlying data exists (no `description`, no
`features`, no series siblings → no empty section) — the page degrades
gracefully for a record that isn't fully filled in yet.

### Explore other variants — the orbit

Rebuilt from the client's second brief, which rejected the card carousel
outright: no cards, no boxes, no grid. One deep-blue arc spans the section;
the machines of the series stand *on* it as isolated cutouts, their names and
key numbers hanging below. `src/components/sections/VariantOrbit.tsx`.

- **One curve, one source of truth.** A symmetric quadratic Bézier traces an
  exact parabola, so the `curveY(x)` used to place machines and the rendered
  `<path>` cannot drift apart. The path runs 14% past both edges to read as
  part of something larger than the section — which means the control point
  has to be lifted by the *end* drop, not by `depth`. Getting that wrong is
  invisible in the markup and unmissable on screen: the machines stand off the
  line they are supposed to be riding.
- **Spacing is angular, not linear.** `x = A·sin(θ)`, 40° per slot — the
  horizontal projection of a body travelling a circle, so the outer machines
  bunch toward the edges the way real ones would as they swing away. Even
  pixel spacing is what makes this kind of thing read as flat cards on a
  decorative squiggle.
- **The assembly travels; nothing cross-fades.** A single unbounded
  `MotionValue` holds the position in slot units and every machine derives its
  x, y and scale from it. Because y is a function of x through the curve, the
  machines genuinely follow the arc. Animating each one's own start→end tween
  instead would cut straight chords across the curve and lose the orbit.
- **The orbit is closed.** Every machine renders on three laps — one back, in
  place, one forward — each copy fading out past the ends of the arc. The
  machine leaving on the right *is* the one already easing in on the left, so
  nothing pops mid-travel and no subtree unmounts during a drag. The copies
  parked off the arc are `visibility: hidden`, not merely transparent, so they
  stay out of the tab order and the accessibility tree.
- **Drag scrubs, it doesn't just flick.** A swipe moves the whole assembly
  under the finger and settles on the nearest slot; a short flick still steps
  one. Pointer capture is taken on the *first movement*, never on press —
  capturing at pointerdown retargets the following `click` to the stage and
  silently breaks every machine's link.
- **Clicking any machine opens its own detail page**, centred or not; arrows,
  dots, drag and ←/→ do the rotating.
- **No image containers.** The studio cutouts read as white but sit at 248–253
  across the frame, which prints a faint grey rectangle against a pure-white
  page; a white-point lift clips that to 255. (`mix-blend-multiply` is *not*
  used — the wrapper's depth fade sets `opacity < 1`, which isolates the group
  and makes the blend a no-op.) Machines whose model has no cutout fall back
  to their photo with its four edges feathered instead.
- **Geometry is measured, not guessed.** The stand-off between a machine and
  its node is computed from the arc's actual climb across that machine's box,
  and the width of an identity block is derived from the gap between slots.
  Fixed values for either look right at one viewport and collide at the next:
  the tablet range is where the neighbours' numbers land on the centred
  machine's tagline. Below 1100px the neighbours drop to their model name
  alone; below 620px the arc carries two neighbours instead of four and only
  the centred machine is named.
- Driven by `getSeriesVariants(slug)` — every other machine sharing the same
  `series` + `brand`, **not** the curated `relatedEquipmentSlugs` used
  elsewhere for cross-sell. That distinction mattered here: LX-936's
  `relatedEquipmentSlugs` only lists 3 models (missing LX-650) because it was
  curated for cross-sell suggestions, but "explore the rest of the line" needs
  all 4. Using the wrong accessor would silently drop LX-650 from the orbit.
- All five LX models now carry a `cutoutImage` from the client's supplied
  white-background shots. The WM Series has none yet and takes the feathered
  fallback until they arrive.

### Media gallery — arrows, swipe, and a slot for video

`src/components/ui/EquipmentGallery.tsx`.

- The thumbnail strip is still the primary control: a buyer reading specs jumps
  to "the cab" or "the bucket" rather than stepping through frames in order.
  Arrows and swipe are for the linear pass, and for phones where the thumbnails
  are small enough that dragging the big frame is the natural move.
- **Swipe is a real drag**, not a tap zone — the frame follows the finger and
  snaps back under 60px, so a hesitant gesture does not commit. `touch-pan-y`
  keeps vertical page scrolling with the page.
- Arrows wrap in both directions, and ←/→ drive the gallery **only while it
  holds focus**, so they keep working for the rest of the page.
- A frame enters from the side it is travelling from, so gesture and motion
  agree. Thumbnail jumps have no direction to honour and simply cross-fade.
- **Video is supported and unused.** `Equipment.videos` takes `VideoRef`
  entries, which render after the photos with a play badge on their thumbnail
  and a native `<video controls preload="none">` in the frame; drag is disabled
  on a video slide so the scrubber is not fighting the swipe. No model has
  footage yet — when `videos` is empty this is exactly the photo gallery it
  was. Drop files in `public/videos/` and add the entries.

### Specification table — collapsible strips

`src/components/ui/SpecTable.tsx`. Built to the client's brief: each group
(Identification, Operating, Engine, Transmission, Axle and Brakes, Tyres and
Dimensions) is a navy strip, collapsed on arrival, expanding on click.

- **All collapsed by default, deliberately.** A full loader spec is ~35 rows;
  printing it at once buries everything below it. As strips the buyer sees the
  shape of the specification first and opens the section they came for.
- The rows stay **in the DOM** when collapsed — only visually hidden — so they
  remain findable by in-page search and by crawlers.
- Row counts sit next to each title, an "Expand all" toggle sits above, and an
  open strip stays a lighter navy so the open sections read without hovering.
- Generic over whatever `SpecGroup[]` a model carries — LX-650 has different
  groups (Engine, Operating, Dimensions, Capacities) and renders the same way.

### Request a Quote

`/request-a-quote` — `src/components/sections/QuoteForm.tsx`, on the primitives
in `src/components/ui/Field.tsx` (the first form controls in the system; the
Contact page will reuse them).

- **Fields:** category, model, quantity · country, city · name, dial code,
  phone, email · company, preferred contact method, purchase timeframe · free
  text · consent. Category and model are the catalogue's own data, so an
  enquiry arrives already matched to a record rather than as loose text.
- **The two selects cannot disagree.** Choosing a category clears a model from a
  different one; choosing a model fills its category back in. "Other / not
  listed" reveals a free-text field, because the machine someone wants is not
  always one that is stocked.
- **Deep-linked from the detail page.** "Request a Quote" on a machine carries
  `?model=<slug>`, and the form opens with that machine already selected.
- **Validation errors on submit, then live per field once a field is in error.**
  Validating every keystroke shouts at someone halfway through typing their
  email; validating only on submit leaves them hunting for what they fixed.
  A failed submit moves focus to the first field that actually failed and
  announces the count to screen readers.
- The dial code follows the country select until the buyer overrides it, after
  which it stays put. Country list is global — positioning is nationwide and no
  export markets are confirmed, so the form must not quietly decide who may
  enquire. Pakistan is pinned to the top of both selects.
- **Delivery is a seam, not a fake.** `submitQuoteRequest()` in
  `src/lib/data/form.ts` is the one function to rewrite when this points at an
  API route, a transactional email service or a CRM. Everything around it —
  validation, pending state, success screen, error path — is real, and the
  success screen says plainly that the prototype does not yet deliver the
  message rather than inventing a response-time promise.
- `/privacy-policy` exists as a scaffold so the consent checkbox does not link
  into a 404. The policy text is a legal document and is the client's to
  supply.

### Homepage vs. detail-page photography — two different fields

LX-936 now has two distinct image slots, on purpose:

- `image` / `gallery` — **on-site photos**, used everywhere general-purpose
  (equipment listings, brand pages, and this detail page's gallery).
- `featuredImage` / `featuredHoverImage` — **white-background studio shots**,
  used **only** by the homepage "hot" card (`FeaturedProducts.tsx`). Falls back
  to `image` when absent, so every other featured machine still works without
  a dedicated studio shot.
- `cutoutImage` — the **isolated machine on plain white** used by the variant
  orbit, where the image has no container and has to dissolve into the white
  section. All five LX models have one. Falls back to `featuredImage` then
  `image`, which get a feathered edge instead of the white-point lift.

This split exists because the client was explicit: the white-background photos
are for the homepage only, and the detail-page gallery should show the 3
on-site shots. Before this, both were pointing at the same field and the
white images were leaking into the gallery. If a future model gets a studio
shot, set `featuredImage`/`featuredHoverImage` on it — don't repoint `image`
or the studio shot will start appearing in general-purpose contexts (listing
grids, brand pages) where an on-site photo is expected.

## Homepage running order

Set by the client, following the structure they liked on ghandharaautomobiles.com.pk:

1. **Brand strip** — manufacturer names directly under the nav
2. **Banners** — 5 auto-advancing slides: company welcome, WORK MASTER, LOAD-X, then two machine panels
3. **Trusted partners** — credibility block + partner logo rail
4. **Equipment catalogue** — 12 categories, each into its listing
5. **Parts** — category level only, no individual part listings
6. **Company introduction** — navy block, 3 cards rotating on a 5s cycle, founder portrait, video, Explore More
7. **Industries** — collapsed to a navy strip; opens to white with the six sectors
8. **Request a quote** — plus direct call / WhatsApp
9. **Footer**

Page height dropped from 9,089px to 6,406px in the restructure — less filler,
same information.

---

## ⚠ Assets needed from you

| Asset | Where it goes | Notes |
| --- | --- | --- |
| ~~Founder photograph~~ | `public/images/founder.jpg` | **Supplied.** The original was a framed studio photo; the wooden frame was cropped out (it would have swallowed an 84px thumbnail) and the portrait tightened to 4:5. Original kept at `design/founder-original.png`. |
| **Company intro video** | Company Info → Media → introduction video URL | Currently renders as a poster with a play badge. |
| ~~Brand logo files~~ | `public/brand-logos/` | **Supplied.** See *Brand logos* below. Permission to display each mark is still outstanding. |
| **Partner names / logos** | Partner documents in the Studio | None created — see below. Each carries a "confirmed by the client" flag and is hidden until it is ticked. |
| ~~Banner artwork~~ | `public/images/banner-*.jpg` | **Supplied** for slots 1–3 (client's own premises and yard). Slots 4–5 still use machine photos pending dedicated artwork. |
| ~~LX-936 studio photography~~ | `public/images/lx-936-white-*.jpg` | **Supplied** — real white-background studio shots, used on the homepage featured card. |
| ~~LX Series cutouts~~ | `public/images/lx-{650,926,930,950}-cutout.*` | **Supplied** — isolated machines on white, driving the variant orbit. |
| **WM Series cutouts** | `cutoutImage` on an Equipment document in the Studio | Not supplied. The WM orbit currently falls back to on-site category photos with feathered edges. |
| **Machine video** | `videos` on an Equipment document in the Studio | Not supplied. The gallery already renders video entries with a play badge and a native player; no model has footage yet. |
| **Privacy Policy text** | `src/app/privacy-policy/page.tsx` | Not supplied. The quote form's consent checkbox links here; currently a placeholder screen. |
| ~~Quote form delivery~~ | `src/lib/actions/quote.ts` | **Partly done.** Submissions are stored as `inquiry` documents in Sanity and appear in the Studio, and the buyer gets a WhatsApp link pre-filled with their reference. Still open: which email service, if any, should also be notified. |
| **Xinyuan catalogue** | Sanity Studio | Photos and specs not yet supplied. Create the Brand, then add machines — no code change needed. |
| **Company history, mission, certifications** | Company Info in the Studio | Not supplied. The About page shows clearly-marked "to be confirmed" notes that clear themselves when the fields are filled. |

> **After replacing any image:** stop the dev server, `rm -rf .next`, restart.
> Next caches optimised images by path and Next 16 raised the default TTL to
> 4 hours. Clearing only `.next/cache/images` is not enough.

---

## Design decisions

| Decision | Value | Basis |
| --- | --- | --- |
| Brand navy | `#002665` | **Sampled from the supplied logo artwork** |
| Dark sections | `#001A47` | Matches the supplied footer logo's background |
| Accent | Safety amber `#F5A623` | ~10% of the palette |
| Display face | Barlow Condensed | Condensed industrial sans |
| Section rhythm | white → dark → navy → white → muted → navy → white → navy | Alternating tone; the page was reading flat and white |
| Body face | Inter | Neutral, legible in spec tables |

### Featured ("hot") equipment cards

Homepage equipment section, styled on a client-supplied reference (SANY's
product carousel): photograph on the left, a compact spec panel on the right,
category icons below that swap to a photo on hover.

- **LX-936 uses real studio photography** — `lx-936-white-1.jpg` (rest) and
  `lx-936-white-2.jpg` (hover), both genuine white-background shots the client
  supplied. No fade or vignette is applied over studio photography — that is
  what gives it the floating, premium look. The on-site yard photos
  (`lx-936-1/2/3.jpg`) stay in the gallery on the detail page, where "shot on
  site" is expected rather than "floating product."
- Every other featured machine (LX-926, WM-220, WM-330) still uses an on-site
  photo and will show its real background plainly until a white-background
  studio shot is supplied for it. **Get a studio shot before featuring a new
  machine here** — an on-site photo in this slot looks like an unfinished crop,
  not a product shot.
- **Badge mismatch caught before shipping.** Three of the four client-supplied
  LOAD-X photos (`load_x-1`, `load_x-2`, `load_x-4`) are badged **LX-936**; only
  `load_x-3` reads **LX-926**. The featured card and its `lx-936` gallery use
  the correctly badged photos; `load_x-3` is used for LX-926 instead. Check the
  cab badge before assigning any new LOAD-X photo to a model.
- **LX-926 and LX-936 specs are real**, supplied by the client, not
  representative — their "Details are provisional" flag is unticked. These
  values **broke the placeholder pattern** the other LX models were built on —
  the model number does not track rated load the way the placeholders assumed
  (LX-926 is 1.5 t, not 2.6 t; LX-936 is 3.0 t, not 3.6 t). Treat every other LX
  placeholder spec as unreliable, not merely unconfirmed, until real figures
  replace it.

### Banners

Slides are Banner documents in the Studio, in two kinds:

- **`custom`** — hand-written panels. Slots 1–3: the company welcome, WORK MASTER
  and LOAD-X, using the client's own photography of the Karachi premises and yard.
- **`equipment`** — generated from a catalogue record. Slots 4–5. Their heading
  line is built from the machine's own key figures rather than written copy, so
  it stays accurate when placeholder specs are replaced.

> WM-330's photo was changed away from `cat-dump-trucks.jpg`: it had
> **CATERPILLAR** legible on the truck body, under a WORK MASTER heading. It now
> uses an unbranded quarry frame. Weaker composition, but it was the safer
> trade — worth replacing with real WORK MASTER photography.

Both resolve to one `Banner` shape, so the carousel never branches on origin.
Every slide carries **View All Equipment** as its second action.

**Scrim.** The readability wash is deliberately light and direction-aware: a
left-to-right gradient on wider screens that clears by 82% so the photograph
stays visible, and a bottom-up gradient on phones where the copy spans the full
width. The type carries a soft shadow so the scrim can stay light. An earlier
version ran to 92% across the left plus a second wash over the whole frame,
which buried the client's own photography. **Do not darken it back** without
checking the banners again.

**Image prep.** Source PNGs (~2.7MB each) are converted to progressive JPEG at
1920px with a restrained clarity pass — brightness 1.05, contrast 1.16,
saturation 1.12, light unsharp mask — because the originals were shot in flat,
dusty light. Roughly 8.3MB down to ~1MB total. Originals in
`design/banner-source/`.

**Timer-reset bug, fixed across all three carousels.** Every `setInterval`
driving auto-advance (banners, featured equipment, company intro) originally
had `[reduceMotion, count]` as its effect dependency array — never `index`. A
manual click or arrow press changed the slide but did **not** restart the
clock, so the *next* auto-advance still fired on the interval's original
schedule. Click a slide 7 seconds into a 10-second cycle and the one after it
got 3 seconds, not 10 — the bug reported as "the next card disappears within a
second." Fixed by adding `index` to each effect's dependencies, so any change
to the current slide — manual or automatic — tears down and restarts the
timer. **Verified by measurement, not just by reading the code**: a script
clicked a slide mid-cycle and timed the next auto-advance at ~9.4s (banners,
10s target) and ~19.4s (featured equipment, 20s target).

> The WORK MASTER and LOAD-X panels state Burki is **sole nationwide dealer**.
> That is the client's own claim about their business and is repeated as given —
> but it is a strong exclusivity statement, so it is worth confirming before
> launch alongside the manufacturer relationships.

Brand catalogues live at `/brands/load-x` and `/brands/work-master` — built and
working. They sit outside `/equipment` because that tree is organised by machine
category and a brand cuts across all of them.

### Motion

Restrained, and every piece earns its place:

| Where | What |
| --- | --- |
| Header | Inverts on scroll — white ground / navy type becomes navy ground / white type, logo swapping with it. The utility bar slides out at the same time so it reads as one movement. |
| Nav links | Amber rule wipes in from the left on hover. |
| Banners | 10s cycle, continuous — hovering does not pause it. Slow push-in on the active frame; the active dot fills as a timer. Arrows sit on the left/right edges from `lg` up, and fall back to the bottom bar below that, where the copy runs full width. |
| Section headings | Rise from behind a clipped edge rather than fading. |
| Cards | Lift 4px with a soft shadow; image scales inside its frame. |
| Brand strip | Staggered entrance ~40ms apart; each box inverts to navy on hover with its logo cross-fading to the white variant. |
| Industries | Collapsed to a navy strip. Opening flips the block to the light ground and expands the sector grid; the chevron grows and takes the accent colour on hover. |
| Featured equipment | 20s cycle, continuous. Photograph and spec panel cross-fade together; arrows sit outside the card from `xl` up. |
| Category icon tiles | Hand-drawn silhouette icon at rest; crossfades to the category's real photograph under a navy scrim on hover. |

All of it respects `prefers-reduced-motion` through `MotionProvider`.

> **Watch the masked heading pattern.** `RevealMask` puts the intersection
> observer on the *outer* wrapper, never the animated span. The span starts
> translated fully below the mask, so `overflow: hidden` clips it to zero and it
> can never intersect the viewport — headings stay permanently invisible. It hit
> the two-line headings first, since their larger offset put them further
> outside the clip box. If you build another masked reveal, observe the wrapper.

### Section alignment

`SectionHeader` now has **one** layout: eyebrow, title, supporting line and
action stack in a single left-aligned column, each directly beneath the last.
The earlier version floated the description to the right of the title, which
read as two unrelated fragments on one row. That variant is gone, so no section
can reintroduce it.

### Logo

Both variants were rebuilt from the supplied header artwork — background
removed, trimmed, re-coloured from one shared mask.

- `public/brand/logo-navy.png` — light backgrounds
- `public/brand/logo-white.png` — navy and photographic backgrounds
- Originals in `design/logo-source/`

`components/ui/Logo.tsx` is the only place the logo is referenced. Replace those
two files at the same aspect ratio (2.483:1) to swap it.

---

## Content architecture

**The site now reads from Sanity.** See [CMS.md](CMS.md) for setup, the data
model and the outstanding content list.

Pages and components import **only** from `@/lib/data`. Nothing outside
`src/lib/data/` touches `@/sanity/`.

```
src/lib/data/
  types.ts          domain contract
  equipment.ts      getEquipment, getEquipmentBySlug, getCompatibleParts …
  parts.ts          getParts, getPartBySlug, getCompatibleEquipment …
  industries.ts     getIndustries, getIndustryEquipment …
  site.ts           getCompanyInfo, getSiteConfig, getBrands, getServices …
  form.ts           country list and form option sets — still local, not CMS
  _sources/form.ts  the only remaining local data
```

Every accessor is `async` and returns the same shapes it returned in the
prototype. **The migration to Sanity rewrote these function bodies and touched
no page and no component**, which is what the abstraction layer was built for.
Two components changed for genuinely new behaviour, not for the backend move:
`BrandStrip` now reads an explicit `showInBrandStrip` flag rather than
inferring the strip from a brand's relationship, and `QuoteForm` reads a
richer submission result.

> Client components may import only **types** from `@/lib/data` — the modules
> behind it are `server-only`. The one value a client component needs,
> `submitQuoteRequest`, lives in `@/lib/actions/quote` as a server action.

**Equipment ↔ Parts** is still modelled one-way: each part declares its
compatible equipment, and the machine side is derived in GROQ, so the two
directions cannot drift apart. **Industry → Equipment** works the same way.

The prototype's hand-written content now lives in `scripts/seed-data/` as input
to `scripts/seed.ts`, the one-time migration. It is not read by the running
site.

### Brands: replaced since the prototype

The eight "serviced" marques (Caterpillar, Komatsu, Hitachi, Volvo, Hino,
Sakai, Doosan, Hyundai) were **removed** — the client confirmed those are not
lines Burki supplies, and showing a manufacturer you do not represent was the
exact risk the old notes warned about. WORK MASTER went with them, on the same
instruction, taking its 4 machines and 2 banners.

The catalogue is now six brands: **Xinyuan, LOAD-X, XCMG, Zoomlion, SANY,
Liugong**. Only LOAD-X has machines so far; the rest show as "Being catalogued"
on the brand index. The list is expected to grow, and adding the seventh is a
Studio action.

`/equipment` is now a brand index, `/equipment/<brand>` is a brand catalogue,
and machine URLs are keyed on brand rather than category so a buyer stays
inside the catalogue they entered. Cross-brand category browsing moved to
`/equipment/category/<slug>`. **All catalogue URLs are built by
`src/lib/routes.ts`** — the shape was previously hand-written in ten files.

Catalogue cards now show the **studio cutout** where a machine has one, on a
pale ground with `object-contain`; a cutout cannot be cropped like a photograph
without losing a bucket off the edge of the frame. Machines with no cutout keep
the original cover treatment.

### Superseded: the earlier brand correction

The prototype modelled LOAD-X and WORK MASTER as Burki's own house import
lines. **They are Chinese manufacturers Burki holds distributorships for**, on
the same footing as Xinyuan. Copy on the brand pages, the homepage About cards
and the LOAD-X banner was corrected accordingly. `relationship: "distributed"`
now means "we import and sell this line", not "we badge it".

Brand is also a real browse dimension in the catalogue now — `/equipment` filters
by brand and category independently, and `/equipment/[category]` carries its own
brand filter. Neither axis is subordinate to the other, which is the point of a
multi-brand dealer.
