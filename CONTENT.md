# Burki & Company — content

**The site does not talk to a CMS while a page loads.** Content is baked into
`src/lib/content/content.ts` at build time, and every image and video is served
from `public/`. Nothing on the site needs the internet to render.

This was a deliberate change. The site previously queried Sanity on every
request and loaded images from Sanity's CDN. On this connection — and possibly
on a customer's in Pakistan — Sanity is intermittently unreachable, and when it
is, the site did not render at all. A dealer's catalogue going blank because a
service in another country is slow is not an acceptable failure.

## Changing content

```bash
npm run content:build     # rebuild the baked content file
npm run build             # runs content:build automatically first
npm run dev               # local preview
```

Source content lives in `scripts/seed-data/`:

| File | What it holds |
| --- | --- |
| `site.ts` | Brands, company details, services, statistics |
| `equipment.ts` | The LOAD-X machines |
| `xinyuan.ts` + `xinyuan-specs.ts` | Xinyuan models, specs, attachments |
| `parts.ts` | Part categories and the parts catalogue |
| `industries.ts` | Sector pages |
| `banners.ts` | Homepage carousel |

Edit a file, run `npm run content:build`, and the change is on the site. The
generated file is committed on purpose — a fresh checkout builds with no network
and no credentials.

## Media

```bash
node scripts/prepare-xinyuan.mjs         # cutouts, brand banners, logos
node scripts/prepare-xinyuan-media.mjs   # gallery photos + film transcodes
node scripts/make-brand-logos.mjs        # brand marks -> navy/white pair
```

Source artwork stays where the client filed it, under `public/brands/`. These
scripts write the web-ready versions the site actually serves:

| Output | What |
| --- | --- |
| `public/images/xinyuan/` | Machine cutouts, transparent background |
| `public/images/xinyuan/gallery/` | 263 working photographs, all eleven models |
| `public/videos/xinyuan/` | 8 detailing films, 720p |
| `public/brand-logos/` | Six brand marks, navy + white |
| `public/videos/xinyuan-hero.mp4` | The homepage opening banner film |

The homepage banner film is muted and autoplaying, so its audio track is
stripped — it can never be heard and would only add weight to the first thing a
visitor downloads. The carousel waits for it to finish before moving on, but
falls back to its normal ten-second clock if the browser refuses to autoplay.

Films were 866 MB of 1080p and are now 113 MB at 720p. Photographs went from
172 MB to 17 MB. **Do not put the originals on the site.**

`public/brand/` and `public/brand-logos/` are read by code — do not rename them.

## No CMS

Sanity has been removed entirely — the Studio, the client libraries, the schema,
the seeding scripts and the webhook route are all gone, along with 887 packages.
The site has **no third-party runtime dependency of any kind**: it builds with
no credentials, renders with no network, and cannot be taken down by an outage
somewhere else.

The trade is that content changes go through the files above and a rebuild,
rather than through an editing interface.

## Business partners

`scripts/seed-data/partners.ts`, with artwork prepared by
`node scripts/prepare-partners.mjs`. They appear twice: a static grid on the
About page beside the client paragraphs, and a continuously running strip on
the homepage below the quote section.

Logos are trimmed tight and fitted inside a 440x260 box, each keeping its own
proportions; the page caps both height and width so a circular crest and a wide
wordmark read at the same size. Names are alt text only and are never printed
under a logo.

**Four supplied files are not published** — three carry another company's logo
entirely and one is a business card with a personal email address on it. The
reasons are listed in the `SKIP` map in `scripts/prepare-partners.mjs`; delete
an entry there once correct artwork replaces the file.

## The news strip

`scripts/seed-data/news.ts` — the homepage strip of social posts, below the
industries section. Curated by hand, not fetched: a live feed would need an API
token per platform and a homepage that breaks when one expires, which is the
dependency this site was deliberately built without.

Four cards, in the client's order: Facebook, the Xinyuan TikTok reel, the
LX-926 TikTok reel, then the LX-936 customer review on Instagram. The three
reels link to real posts; the Facebook card links to the page, because no post
has been supplied for it yet.

Captions are the client's descriptions rather than each post's own caption
text, and no card carries a date — neither changes where a card sends you.
Cover images are Burki's photographs of the machine each post is about; a
reel's own opening frame is better where one exists. To use one, save it to
`public/images/news/` and point `image.src` at it.

Tracking parameters are stripped from every link.

## Still outstanding

| | |
| --- | --- |
| **C150 engine power and weight** | Given only as an estimate and as two different weights. Not published. |
| **Three attachments** | Disc saw and both tiltrotators have no carrier class, so no machine fitment. |
| **Company history, mission, certifications** | Not supplied. The About page marks each clearly. |
| **Founding year** | Client copy says both "late 1970s" and "since 1970". Neither is printed as a year; the stats band counts decades instead. |
| **About section covers** | Sections 2-4 show a designed navy panel until cover photographs arrive. |
| **Four partner logos** | Wrong artwork supplied for ZKB, NKB and SKB; the Faisalabad Oil Refinery file is a business card. |
| **News strip covers and dates** | Three reels are linked. Reel cover frames, posting dates and a Facebook post are still to come. |
| **Manufacturer permissions** | Xinyuan is confirmed by certificate. The other five are unconfirmed until an agreement is on file. |
| **Video captions** | None supplied for the introduction film. |
| **Domain** | Set `NEXT_PUBLIC_SITE_URL` once decided. |
