/* GENERATED FILE — do not edit by hand.
 *
 * Written by `npm run content:build`. This is the site's baked-in content: the
 * data layer reads it directly, so a page render never touches the network.
 * Edit the source in scripts/seed-data/ (or in the Studio, then re-pull) and
 * regenerate.
 */
import type { ContentSnapshot } from "./types";

export const content: ContentSnapshot = {
  "brands": [
    {
      "id": "br-xinyuan",
      "name": "Xinyuan",
      "relationship": "distributed",
      "logo": {
        "navy": "/brand-logos/xinyuan-navy.png",
        "white": "/brand-logos/xinyuan-white.png"
      },
      "showcaseVideoUrl": "/videos/xinyuan-intro.mp4",
      "showcaseImages": [
        {
          "src": "/images/xinyuan/xinyuan-banner-1.jpg",
          "alt": "XINYUAN branding on an excavator boom"
        },
        {
          "src": "/images/xinyuan/xinyuan-banner-2.jpg",
          "alt": "The Xinyuan headquarters, carrying the company values on its facade"
        },
        {
          "src": "/images/xinyuan/xinyuan-banner-3.jpg",
          "alt": "The Xinyuan manufacturing plant from the air"
        }
      ],
      "manufacturerLegalName": "Fujian Xinyuan Heavy Industry Co., Ltd.",
      "relationshipConfirmed": true,
      "countryOfOrigin": "China",
      "website": "https://www.xinyuanexcavator.com",
      "shortDescription": "Founded in 1990, Xinyuan built China's first 5-tonne 360° full-rotation wheeled hydraulic excavator and now specialises in machines from 5 to 15 tonnes. The C Series runs on a digital plant with robot welding, CNC machining and automated coating, and carries a deep attachment range designed around the same carriers.",
      "showInBrandStrip": true,
      "isFeatured": true,
      "order": 1,
      "slug": "xinyuan"
    },
    {
      "id": "br-load-x",
      "name": "LOAD-X",
      "relationship": "distributed",
      "logo": null,
      "showcaseImages": [
        {
          "src": "/images/load-x/loadx-yard.webp",
          "alt": "The Burki & Company yard, ranks of LOAD-X wheel loaders either side of the aisle"
        }
      ],
      "countryOfOrigin": "China",
      "shortDescription": "Compact and mid-range wheel loaders, from yard machines to the 5-tonne class. Burki & Company is the nationwide distributor.",
      "showInBrandStrip": true,
      "isFeatured": true,
      "order": 2,
      "slug": "load-x",
      "showcaseVideoUrl": null,
      "relationshipConfirmed": false
    },
    {
      "id": "br-xcmg",
      "name": "XCMG",
      "relationship": "distributed",
      "logo": {
        "navy": "/brand-logos/xcmg-navy.png",
        "white": "/brand-logos/xcmg-white.png"
      },
      "showcaseImages": [
        {
          "src": "/images/xcmg-zl50gn-side.webp",
          "alt": "An XCMG ZL50GN loader, side view"
        }
      ],
      "manufacturerLegalName": "Xuzhou Construction Machinery Group Co., Ltd.",
      "countryOfOrigin": "China",
      "website": "https://www.xcmg.com",
      "shortDescription": "One of the largest construction equipment manufacturers in the world, with a range spanning earthmoving, lifting and road machinery.",
      "showInBrandStrip": true,
      "isFeatured": true,
      "order": 3,
      "slug": "xcmg",
      "showcaseVideoUrl": null,
      "relationshipConfirmed": false
    }
  ],
  "equipmentCategories": [
    {
      "id": "cat-01",
      "slug": "excavators",
      "name": "Excavators",
      "description": "Tracked and wheeled excavators for bulk earthmoving, trenching, foundation work and demolition, from compact site machines to quarry-duty units.",
      "image": {
        "src": "/images/cat-excavators.webp",
        "alt": "Xinyuan wheeled excavator on a city street, boom lowered"
      },
      "order": 1
    },
    {
      "id": "cat-02",
      "slug": "wheel-loaders",
      "name": "Wheel Loaders",
      "shortName": "Loaders",
      "description": "Front-end loaders for stockpile handling, truck loading and site logistics — the workhorse of aggregate yards, batching plants and road projects.",
      "image": {
        "src": "/images/cat-wheel-loaders.webp",
        "alt": "Wheel loader with its bucket lowered on a yard"
      },
      "order": 2
    },
    {
      "id": "cat-03",
      "slug": "backhoe-loaders",
      "name": "Backhoe Loaders",
      "description": "Loaders for utilities, municipal work and confined urban sites, where a full-size machine cannot turn.",
      "image": {
        "src": "/images/xcmg-zl50gn-side.webp",
        "alt": "An XCMG ZL50GN loader, side view"
      },
      "order": 3
    },
    {
      "id": "cat-04",
      "slug": "bulldozers",
      "name": "Bulldozers",
      "description": "Crawler dozers for mass earthmoving, site clearing, levelling and haul road formation in heavy ground conditions.",
      "image": {
        "src": "/images/cat-bulldozers.jpg",
        "alt": "Bulldozer working a cut on a construction site"
      },
      "order": 4
    },
    {
      "id": "cat-05",
      "slug": "dump-trucks",
      "name": "Dump Trucks",
      "description": "Rigid and articulated haulers for moving spoil, aggregate and overburden across long site cycles and rough haul roads.",
      "image": {
        "src": "/images/cat-dump-trucks.jpg",
        "alt": "Articulated haul truck on a quarry haul road"
      },
      "order": 5
    },
    {
      "id": "cat-06",
      "slug": "mixer-trucks",
      "name": "Mixer Trucks",
      "description": "Transit mixers for ready-mix delivery, keeping concrete workable from batching plant to pour on schedule.",
      "image": {
        "src": "/images/cat-mixer-trucks.jpg",
        "alt": "Concrete mixer truck discharging on site"
      },
      "order": 6
    },
    {
      "id": "cat-07",
      "slug": "concrete-pumps",
      "name": "Concrete Pumps",
      "description": "Boom and line pumps for placing concrete at height and distance — high-rise decks, bridge sections and large slab pours.",
      "image": {
        "src": "/images/cat-concrete-pumps.jpg",
        "alt": "Concrete pump truck with boom extended on a city site"
      },
      "order": 7
    },
    {
      "id": "cat-08",
      "slug": "cranes",
      "name": "Cranes",
      "description": "Mobile and crawler lifting equipment for structural steel, precast placement, plant installation and heavy site lifts.",
      "image": {
        "src": "/images/cat-cranes.jpg",
        "alt": "Construction crane against an open sky"
      },
      "order": 8
    },
    {
      "id": "cat-09",
      "slug": "forklifts",
      "name": "Forklifts",
      "description": "Diesel and electric forklifts for warehouses, ports and industrial yards, from light pallet duty to heavy container handling.",
      "image": {
        "src": "/images/cat-forklifts.jpg",
        "alt": "Forklift operating in a stocked warehouse aisle"
      },
      "order": 9
    },
    {
      "id": "cat-10",
      "slug": "rollers",
      "name": "Rollers",
      "description": "Single-drum, tandem and pneumatic compactors for subgrade, base course and asphalt compaction to specified density.",
      "image": {
        "src": "/images/cat-rollers.jpg",
        "alt": "Single drum vibratory roller compacting a road base"
      },
      "order": 10
    },
    {
      "id": "cat-11",
      "slug": "graders",
      "name": "Graders",
      "description": "Motor graders for fine grading, camber control, haul road maintenance and precise formation levels on road projects.",
      "image": {
        "src": "/images/cat-graders.jpg",
        "alt": "Motor grader shaping a road formation"
      },
      "order": 11
    },
    {
      "id": "cat-12",
      "slug": "attachments",
      "name": "Attachments",
      "description": "Buckets, breakers, grapples, quick couplers and ground-engaging tools that adapt a carrier to the job in front of it.",
      "image": {
        "src": "/images/attachments-breaker.webp",
        "alt": "Xinyuan 7 tonne hydraulic breaker attachment"
      },
      "order": 12
    }
  ],
  "partCategories": [
    {
      "id": "pc-00",
      "slug": "attachments",
      "name": "Attachments",
      "description": "Buckets, breakers, grapples, quick couplers and augers. What turns one machine into several, matched to the carrier it is going on.",
      "image": {
        "src": "/images/attachments-breaker.webp",
        "alt": "Xinyuan 7 tonne hydraulic breaker attachment"
      },
      "order": 0
    },
    {
      "id": "pc-01",
      "slug": "xinyuan-genuine-parts",
      "name": "Xinyuan Genuine Parts",
      "description": "Factory components for the C Series, ordered against a machine's model and serial rather than guessed at from a picture.",
      "image": {
        "src": "/images/part-engine.jpg",
        "alt": "Diesel engine assembly detail"
      },
      "order": 1
    },
    {
      "id": "pc-02",
      "slug": "filters",
      "name": "Filters",
      "description": "Engine oil, fuel, air, hydraulic and transmission filtration. The consumables that decide component life.",
      "image": {
        "src": "/images/part-filters.jpg",
        "alt": "Oil filter and lubricant containers"
      },
      "order": 2
    },
    {
      "id": "pc-03",
      "slug": "oil",
      "name": "Oil",
      "description": "Engine, hydraulic, transmission and axle oils, and the greases that go with them, matched to the machine's service schedule.",
      "image": {
        "src": "",
        "alt": ""
      },
      "order": 3
    }
  ],
  "equipment": [
    {
      "id": "eq-lx-926",
      "slug": "lx-926",
      "model": "LX-926",
      "name": "LX-926 Wheel Loader",
      "categorySlug": "wheel-loaders",
      "brand": "LOAD-X",
      "series": "LX Series",
      "tagline": "Compact where it counts",
      "summary": "A 4.5 tonne loader with a 1 m³ bucket, built for confined yards, block plants and municipal work where a full-size machine cannot turn.",
      "description": "The LX-926 is the compact machine in the LX Series. A 5,870 mm length and articulated steering let it work close to walls and stockpiles, while a 76 kW Huafeng diesel and 4WD driveline keep it loading rather than spinning. Supplied new, CE / BV / SGS certified with ROPS and FOPS structures.",
      "image": {
        "src": "/images/load-x/lx-926/lx-926-01.webp",
        "alt": "LOAD-X LX-926 wheel loader, side view, carrying its LX 926 badge"
      },
      "cutoutImage": {
        "src": "/images/load-x/lx-926-cutout.webp",
        "alt": "LOAD-X LX-926 wheel loader, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/load-x/lx-926/lx-926-01.webp",
          "alt": "LOAD-X LX-926 wheel loader, side view, carrying its LX 926 badge"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-02.webp",
          "alt": "LOAD-X LX-926 wheel loader, head on, bucket down"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-03.webp",
          "alt": "LOAD-X LX-926 wheel loader, three-quarter view on the yard"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-04.webp",
          "alt": "LOAD-X LX-926 wheel loader, side view with the bucket lowered"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-05.webp",
          "alt": "LOAD-X LX-926 wheel loader, with the bucket raised"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-06.webp",
          "alt": "LOAD-X LX-926 wheel loader, under the canopy"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-07.webp",
          "alt": "LOAD-X LX-926 wheel loader, rear, counterweight and lamps"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-08.webp",
          "alt": "LOAD-X LX-926 wheel loader, loader arms and lift cylinders"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-09.webp",
          "alt": "LOAD-X LX-926 wheel loader, engine under the raised bonnet"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-10.webp",
          "alt": "LOAD-X LX-926 wheel loader, engine bay, air cleaner and manifold"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-11.webp",
          "alt": "LOAD-X LX-926 wheel loader, fluid reservoirs and filters under the bonnet"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-12.webp",
          "alt": "LOAD-X LX-926 wheel loader, wheel and tyre"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-13.webp",
          "alt": "LOAD-X LX-926 wheel loader, wheel hub and brake assembly"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-14.webp",
          "alt": "LOAD-X LX-926 wheel loader, chassis hydraulics beneath the frame"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-15.webp",
          "alt": "LOAD-X LX-926 wheel loader, cab interior, seat and controls"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-16.webp",
          "alt": "LOAD-X LX-926 wheel loader, steering wheel and column"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-17.webp",
          "alt": "LOAD-X LX-926 wheel loader, switch panel"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-18.webp",
          "alt": "LOAD-X LX-926 wheel loader, control knobs on the console"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-19.webp",
          "alt": "LOAD-X LX-926 wheel loader, in-cab display screen"
        },
        {
          "src": "/images/load-x/lx-926/lx-926-20.webp",
          "alt": "LOAD-X LX-926 wheel loader, instrument cluster"
        }
      ],
      "highlights": [
        {
          "label": "Bucket capacity",
          "value": "1",
          "unit": "m³"
        },
        {
          "label": "Rated output",
          "value": "76",
          "unit": "kW"
        },
        {
          "label": "Total weight",
          "value": "4,500",
          "unit": "kg"
        },
        {
          "label": "Rated load",
          "value": "1,500",
          "unit": "kg"
        }
      ],
      "specs": [
        {
          "title": "Identification",
          "specs": [
            {
              "label": "Brand",
              "value": "LOAD-X"
            },
            {
              "label": "Model",
              "value": "LX-926"
            },
            {
              "label": "Condition",
              "value": "New"
            },
            {
              "label": "Colour",
              "value": "Yellow"
            },
            {
              "label": "Certification",
              "value": "CE, BV, SGS, ROPS & FOPS"
            },
            {
              "label": "Warranty",
              "value": "6 months"
            },
            {
              "label": "Loading port",
              "value": "China"
            },
            {
              "label": "Minimum order",
              "value": "1 set"
            },
            {
              "label": "Supply capability",
              "value": "25 sets/month"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Total weight",
              "value": "4,500",
              "unit": "kg"
            },
            {
              "label": "Rated load",
              "value": "1,500",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "1",
              "unit": "m³"
            },
            {
              "label": "Fuel type",
              "value": "Diesel"
            },
            {
              "label": "Wheel quantity (F/R)",
              "value": "2 / 2"
            },
            {
              "label": "Tyre type (F/R)",
              "value": "Pneumatic / Pneumatic"
            }
          ]
        },
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Manufacturer",
              "value": "Huafeng"
            },
            {
              "label": "Type",
              "value": "ZHBZG1"
            },
            {
              "label": "Rated output",
              "value": "76",
              "unit": "kW"
            },
            {
              "label": "Rated torque",
              "value": "2,400",
              "unit": "r/min"
            },
            {
              "label": "Maximum torque",
              "value": "297",
              "unit": "N·m"
            },
            {
              "label": "Min fuel-consume ratio",
              "value": "240",
              "unit": "kW·h"
            },
            {
              "label": "Cylinders",
              "value": "4"
            }
          ]
        },
        {
          "title": "Transmission",
          "specs": [
            {
              "label": "Converter model",
              "value": "280BG B"
            },
            {
              "label": "Gear shifts",
              "value": "1 forward, 1 reverse"
            },
            {
              "label": "Max speed",
              "value": "35",
              "unit": "km/h"
            },
            {
              "label": "Drive mode",
              "value": "4WD"
            }
          ]
        },
        {
          "title": "Axle and Brakes",
          "specs": [
            {
              "label": "Axle type",
              "value": "Decelerating type"
            },
            {
              "label": "Service brake",
              "value": "Pneumatic disc brake"
            },
            {
              "label": "Park brake",
              "value": "Hand operated caliper disc"
            }
          ]
        },
        {
          "title": "Tyres and Dimensions",
          "specs": [
            {
              "label": "Quantity (F/R)",
              "value": "2 / 2"
            },
            {
              "label": "Front tyre size",
              "value": "16/60-20"
            },
            {
              "label": "Rear tyre size",
              "value": "16/60-20"
            },
            {
              "label": "Loader length",
              "value": "5,870",
              "unit": "mm"
            },
            {
              "label": "Loader width",
              "value": "1,980",
              "unit": "mm"
            },
            {
              "label": "Loader height",
              "value": "2,830",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Turns in its own yard",
          "description": "5,870 mm long with articulated steering, so it works close to walls and stockpiles without repositioning."
        },
        {
          "title": "4WD driveline",
          "description": "Drive to all four wheels keeps it loading on loose and broken ground instead of spinning."
        },
        {
          "title": "Certified and warranted",
          "description": "Supplied new with CE, BV and SGS certification, ROPS and FOPS structures and a 6 month warranty."
        }
      ],
      "relatedEquipmentSlugs": [
        "lx-936",
        "lx-930"
      ],
      "isFeatured": true,
      "isPlaceholder": false,
      "order": 2,
      "brandSlug": "load-x",
      "categoryName": "Wheel Loaders",
      "videos": []
    },
    {
      "id": "eq-lx-930",
      "slug": "lx-930",
      "model": "LX-930",
      "name": "LX-930 Wheel Loader",
      "categorySlug": "wheel-loaders",
      "brand": "LOAD-X",
      "series": "LX Series",
      "tagline": "More bucket, same class",
      "summary": "A step up in bucket and breakout over the LX-926, for contractors running longer cycles and heavier material.",
      "description": "The LX-930 answers the most common request from LX-926 operators: more bucket without moving to a larger class of machine. A 1.8 m³ bucket, 3.0 tonne rated load and a slightly larger cooling pack suit continuous aggregate handling and longer load-and-carry cycles in high ambient temperatures.",
      "image": {
        "src": "/images/load-x/lx-930/lx-930-01.webp",
        "alt": "LOAD-X LX-930 wheel loader, front three-quarter view with the bucket down"
      },
      "cutoutImage": {
        "src": "/images/load-x/lx-930-cutout.webp",
        "alt": "LOAD-X LX-930 wheel loader, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/load-x/lx-930/lx-930-01.webp",
          "alt": "LOAD-X LX-930 wheel loader, front three-quarter view with the bucket down"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-02.webp",
          "alt": "LOAD-X LX-930 wheel loader, side view, carrying its LX 930 badge"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-03.webp",
          "alt": "LOAD-X LX-930 wheel loader, three-quarter view with the bucket raised"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-04.webp",
          "alt": "LOAD-X LX-930 wheel loader, on the yard, bucket lowered"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-05.webp",
          "alt": "LOAD-X LX-930 wheel loader, rear, counterweight and lamps"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-06.webp",
          "alt": "LOAD-X LX-930 wheel loader, engine bay, turbocharger and manifold"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-07.webp",
          "alt": "LOAD-X LX-930 wheel loader, engine under the raised bonnet"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-08.webp",
          "alt": "LOAD-X LX-930 wheel loader, engine bay from the side"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-09.webp",
          "alt": "LOAD-X LX-930 wheel loader, fluid reservoirs and filters under the bonnet"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-10.webp",
          "alt": "LOAD-X LX-930 wheel loader, wheel and tyre"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-11.webp",
          "alt": "LOAD-X LX-930 wheel loader, drive shaft and axle beneath the frame"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-12.webp",
          "alt": "LOAD-X LX-930 wheel loader, steering wheel and dash"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-13.webp",
          "alt": "LOAD-X LX-930 wheel loader, cab interior with the display screen"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-14.webp",
          "alt": "LOAD-X LX-930 wheel loader, operator's seat and controls"
        },
        {
          "src": "/images/load-x/lx-930/lx-930-15.webp",
          "alt": "LOAD-X LX-930 wheel loader, cab from the doorway, seat and console"
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "10,900",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "1.8",
          "unit": "m³"
        },
        {
          "label": "Rated load",
          "value": "3,000",
          "unit": "kg"
        },
        {
          "label": "Engine power",
          "value": "97",
          "unit": "kW"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Engine model",
              "value": "Weichai WP6G130E22"
            },
            {
              "label": "Rated power",
              "value": "97",
              "unit": "kW (130 hp)"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            },
            {
              "label": "Displacement",
              "value": "6.2",
              "unit": "L"
            },
            {
              "label": "Emission standard",
              "value": "Stage II equivalent"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "10,900",
              "unit": "kg"
            },
            {
              "label": "Rated load",
              "value": "3,000",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "1.8",
              "unit": "m³"
            },
            {
              "label": "Breakout force",
              "value": "112",
              "unit": "kN"
            },
            {
              "label": "Static tipping load (full turn)",
              "value": "7,100",
              "unit": "kg"
            },
            {
              "label": "Max travel speed",
              "value": "36",
              "unit": "km/h"
            }
          ]
        },
        {
          "title": "Transmission and Axles",
          "specs": [
            {
              "label": "Transmission",
              "value": "Countershaft powershift"
            },
            {
              "label": "Gears",
              "value": "4 forward / 3 reverse"
            },
            {
              "label": "Brakes",
              "value": "Four-wheel wet disc"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "7,250",
              "unit": "mm"
            },
            {
              "label": "Overall width (bucket)",
              "value": "2,560",
              "unit": "mm"
            },
            {
              "label": "Overall height (cab)",
              "value": "3,320",
              "unit": "mm"
            },
            {
              "label": "Dump height",
              "value": "3,100",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Capacities",
          "specs": [
            {
              "label": "Fuel tank",
              "value": "165",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "125",
              "unit": "L"
            },
            {
              "label": "Tyre size",
              "value": "17.5-25"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Larger bucket, same footprint",
          "description": "Extra capacity over the LX-926 without a step up in transport width or site footprint."
        },
        {
          "title": "Uprated cooling",
          "description": "Cooling pack sized for continuous duty in sustained high ambient temperatures."
        },
        {
          "title": "Common LX parts",
          "description": "Shares filters, cutting edges and driveline components with the rest of the LX Series."
        }
      ],
      "relatedEquipmentSlugs": [
        "lx-926",
        "lx-936"
      ],
      "isFeatured": true,
      "isPlaceholder": true,
      "order": 3,
      "brandSlug": "load-x",
      "categoryName": "Wheel Loaders",
      "videos": []
    },
    {
      "id": "eq-lx-936",
      "slug": "lx-936",
      "model": "LX-936",
      "name": "LX-936 Wheel Loader",
      "categorySlug": "wheel-loaders",
      "brand": "LOAD-X",
      "series": "LX Series",
      "tagline": "Built to load, all day",
      "summary": "A 9.5 tonne loader with a 1.8 m³ bucket and Weichai power, sized for crusher feed, batching plants and sustained truck loading.",
      "description": "The LX-936 is the volume machine of the LX Series. A 92 kW Weichai WP6G125E22 drives a two-speed powershift and 4WD driveline, with a 1.8 m³ bucket and 3,000 kg rated load for continuous loading duty. Supplied new, CE / BV / SGS certified with ROPS and FOPS structures.",
      "image": {
        "src": "/images/load-x/lx-936/lx-936-01.webp",
        "alt": "LOAD-X LX-936 wheel loader, side view, carrying its LX 936 badge"
      },
      "featuredImage": {
        "src": "/brands/Load-x/lx936/lx-936-white-1.jpg",
        "alt": "LOAD-X LX-936 wheel loader, studio shot on white"
      },
      "featuredHoverImage": {
        "src": "/brands/Load-x/lx936/lx-936-white-2.jpg",
        "alt": "LOAD-X LX-936 wheel loader, rear three-quarter studio shot on white"
      },
      "cutoutImage": {
        "src": "/images/load-x/lx-936-cutout.webp",
        "alt": "LOAD-X LX-936 wheel loader, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/load-x/lx-936/lx-936-01.webp",
          "alt": "LOAD-X LX-936 wheel loader, side view, carrying its LX 936 badge"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-02.webp",
          "alt": "LOAD-X LX-936 wheel loader, head on, bucket down"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-03.webp",
          "alt": "LOAD-X LX-936 wheel loader, front, loader arms and linkage"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-04.webp",
          "alt": "LOAD-X LX-936 wheel loader, with the bucket raised"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-05.webp",
          "alt": "LOAD-X LX-936 wheel loader, rear three-quarter view"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-06.webp",
          "alt": "LOAD-X LX-936 wheel loader, side view under the canopy"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-07.webp",
          "alt": "LOAD-X LX-936 wheel loader, rear, counterweight and lamps"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-08.webp",
          "alt": "LOAD-X LX-936 wheel loader, engine under the raised bonnet"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-09.webp",
          "alt": "LOAD-X LX-936 wheel loader, engine bay from the front"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-10.webp",
          "alt": "LOAD-X LX-936 wheel loader, fluid reservoirs and hoses under the bonnet"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-11.webp",
          "alt": "LOAD-X LX-936 wheel loader, wheel and tyre"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-12.webp",
          "alt": "LOAD-X LX-936 wheel loader, wheel hub and brake assembly"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-13.webp",
          "alt": "LOAD-X LX-936 wheel loader, articulation joint and rear frame"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-14.webp",
          "alt": "LOAD-X LX-936 wheel loader, cab interior, seat and steering"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-15.webp",
          "alt": "LOAD-X LX-936 wheel loader, steering wheel and column"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-16.webp",
          "alt": "LOAD-X LX-936 wheel loader, operator's console and joystick"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-17.webp",
          "alt": "LOAD-X LX-936 wheel loader, in-cab display screen"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-18.webp",
          "alt": "LOAD-X LX-936 wheel loader, instrument cluster"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-19.webp",
          "alt": "LOAD-X LX-936 wheel loader, control knobs on the console"
        },
        {
          "src": "/images/load-x/lx-936/lx-936-20.webp",
          "alt": "LOAD-X LX-936 wheel loader, switch panel"
        }
      ],
      "highlights": [
        {
          "label": "Bucket capacity",
          "value": "1.8",
          "unit": "m³"
        },
        {
          "label": "Rated output",
          "value": "92",
          "unit": "kW"
        },
        {
          "label": "Total weight",
          "value": "9,500",
          "unit": "kg"
        },
        {
          "label": "Rated load",
          "value": "3,000",
          "unit": "kg"
        }
      ],
      "specs": [
        {
          "title": "Identification",
          "specs": [
            {
              "label": "Brand",
              "value": "LOAD-X"
            },
            {
              "label": "Model",
              "value": "LX-936"
            },
            {
              "label": "Condition",
              "value": "New"
            },
            {
              "label": "Colour",
              "value": "Yellow"
            },
            {
              "label": "Certification",
              "value": "CE, BV, SGS, ROPS & FOPS"
            },
            {
              "label": "Warranty",
              "value": "6 months"
            },
            {
              "label": "Loading port",
              "value": "China"
            },
            {
              "label": "Minimum order",
              "value": "1 set"
            },
            {
              "label": "Supply capability",
              "value": "25 sets/month"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Total weight",
              "value": "9,500",
              "unit": "kg"
            },
            {
              "label": "Rated load",
              "value": "3,000",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "1.8",
              "unit": "m³"
            },
            {
              "label": "Fuel type",
              "value": "Diesel"
            },
            {
              "label": "Wheel quantity (F/R)",
              "value": "2 / 2"
            },
            {
              "label": "Tyre type (F/R)",
              "value": "Pneumatic / Pneumatic"
            }
          ]
        },
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Manufacturer",
              "value": "Weichai"
            },
            {
              "label": "Type",
              "value": "WP6G125E22"
            },
            {
              "label": "Rated output",
              "value": "92",
              "unit": "kW"
            },
            {
              "label": "Rated torque",
              "value": "2,200",
              "unit": "r/min"
            },
            {
              "label": "Maximum torque",
              "value": "500",
              "unit": "N·m"
            },
            {
              "label": "Min fuel-consume ratio",
              "value": "<210",
              "unit": "kW·h"
            },
            {
              "label": "Cylinders",
              "value": "6"
            }
          ]
        },
        {
          "title": "Transmission",
          "specs": [
            {
              "label": "Converter model",
              "value": "YJ315-X"
            },
            {
              "label": "Gear shifts",
              "value": "2 forward, 2 reverse"
            },
            {
              "label": "Max speed",
              "value": "39",
              "unit": "km/h"
            },
            {
              "label": "Drive mode",
              "value": "4WD"
            }
          ]
        },
        {
          "title": "Axle and Brakes",
          "specs": [
            {
              "label": "Axle type",
              "value": "Decelerating type"
            },
            {
              "label": "Service brake",
              "value": "Pneumatic disc brake"
            },
            {
              "label": "Park brake",
              "value": "Hand operated caliper disc"
            }
          ]
        },
        {
          "title": "Tyres and Dimensions",
          "specs": [
            {
              "label": "Quantity (F/R)",
              "value": "2 / 2"
            },
            {
              "label": "Front tyre size",
              "value": "17.5-25"
            },
            {
              "label": "Rear tyre size",
              "value": "17.5-25"
            },
            {
              "label": "Loader length",
              "value": "7,000",
              "unit": "mm"
            },
            {
              "label": "Loader width",
              "value": "2,420",
              "unit": "mm"
            },
            {
              "label": "Loader height",
              "value": "3,150",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Two-speed powershift",
          "description": "Two forward and two reverse gears on a YJ315-X converter, matched to load-and-carry cycles rather than one fixed ratio."
        },
        {
          "title": "Weichai WP6G125E22",
          "description": "Six-cylinder diesel at 92 kW and 500 N·m, the driveline most widely serviced and stocked for in this class."
        },
        {
          "title": "Certified and warranted",
          "description": "Supplied new with CE, BV and SGS certification, ROPS and FOPS structures and a 6 month warranty."
        }
      ],
      "relatedEquipmentSlugs": [
        "lx-926",
        "lx-930"
      ],
      "isFeatured": true,
      "isPlaceholder": false,
      "order": 4,
      "brandSlug": "load-x",
      "categoryName": "Wheel Loaders",
      "videos": []
    },
    {
      "id": "eq-lw300fn",
      "slug": "lw300fn",
      "model": "LW300FN",
      "name": "LW300FN Wheel Loader",
      "categorySlug": "backhoe-loaders",
      "brand": "XCMG",
      "tagline": "The yard machine",
      "summary": "A 10.4 tonne loader with a 1.8 m³ bucket and 92 kW, for coal yards, stone plants and general site loading.",
      "description": "XCMG's LW300FN is built for shovelling and loading material, and is applied to workplaces such as coal yards, railway works, construction areas and stone material factories. A 1.8 m³ bucket on a 3,000 kg rated load and a 2,600 mm wheelbase keep it manoeuvrable where a larger machine cannot turn.",
      "image": {
        "src": "/images/xcmg/lw300fn-cutout.webp",
        "alt": "XCMG LW300FN wheel loader"
      },
      "cutoutImage": {
        "src": "/images/xcmg/lw300fn-cutout.webp",
        "alt": "XCMG LW300FN wheel loader, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xcmg/lw300fn-cutout.webp",
          "alt": "XCMG LW300FN wheel loader"
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "10,400",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "1.8",
          "unit": "m³"
        },
        {
          "label": "Rated power",
          "value": "92",
          "unit": "kW"
        },
        {
          "label": "Rated load",
          "value": "3,000",
          "unit": "kg"
        }
      ],
      "specs": [
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Bucket capacity",
              "value": "1.8",
              "unit": "m³"
            },
            {
              "label": "Operating weight",
              "value": "10,400",
              "unit": "kg"
            },
            {
              "label": "Rated load",
              "value": "3,000",
              "unit": "kg"
            }
          ]
        },
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Rated power",
              "value": "92",
              "unit": "kW"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "7,050",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "2,482",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "3,118",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,600",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Shovelling and loading duty",
          "description": "XCMG lists it for coal yards, railway works, construction areas and stone material factories."
        },
        {
          "title": "1.8 m3 bucket on 92 kW",
          "description": "A 1.8 cubic metre bucket and a 3,000 kg rated load, on 92 kW of rated power."
        },
        {
          "title": "The compact one of the three",
          "description": "A 2,600 mm wheelbase and 7,050 mm overall length, the shortest XCMG loader carried."
        }
      ],
      "relatedEquipmentSlugs": [
        "lw500fn",
        "zl50gn"
      ],
      "isFeatured": true,
      "isPlaceholder": false,
      "order": 5,
      "brandSlug": "xcmg",
      "categoryName": "Backhoe Loaders",
      "videos": []
    },
    {
      "id": "eq-lw500fn",
      "slug": "lw500fn",
      "model": "LW500FN",
      "name": "LW500FN Wheel Loader",
      "categorySlug": "backhoe-loaders",
      "brand": "XCMG",
      "tagline": "Five tonnes of rated load",
      "summary": "A 17 tonne loader carrying a 3.0 m³ bucket on 162 kW, for sustained loading in yards, quarries and railway works.",
      "description": "XCMG's LW500FN is suited to shovelling and loading material, and is applied to workplaces such as coal yards, railway works, construction areas and stone material factories. A 3.0 m³ bucket and 5,000 kg rated load on a 3,050 mm wheelbase put it in the five-tonne class for continuous truck and hopper loading.",
      "image": {
        "src": "/images/xcmg/lw500fn-cutout.webp",
        "alt": "XCMG LW500FN wheel loader"
      },
      "cutoutImage": {
        "src": "/images/xcmg/lw500fn-cutout.webp",
        "alt": "XCMG LW500FN wheel loader, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xcmg/lw500fn-cutout.webp",
          "alt": "XCMG LW500FN wheel loader"
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "17,000",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "3.0",
          "unit": "m³"
        },
        {
          "label": "Rated power",
          "value": "162",
          "unit": "kW"
        },
        {
          "label": "Rated load",
          "value": "5,000",
          "unit": "kg"
        }
      ],
      "specs": [
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Bucket capacity",
              "value": "3.0",
              "unit": "m³"
            },
            {
              "label": "Operating weight",
              "value": "17,000",
              "unit": "kg"
            },
            {
              "label": "Rated load",
              "value": "5,000",
              "unit": "kg"
            }
          ]
        },
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Rated power",
              "value": "162",
              "unit": "kW"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "8,100",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "2,996",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "3,515",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "3,050",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Five-tonne rated load",
          "description": "A 3.0 cubic metre bucket and a 5,000 kg rated load, on 162 kW of rated power."
        },
        {
          "title": "Shovelling and loading duty",
          "description": "XCMG lists it for coal yards, railway works, construction areas and stone material factories."
        },
        {
          "title": "17 tonne platform",
          "description": "A 3,050 mm wheelbase under an 8,100 mm machine, at 17,000 kg operating weight."
        }
      ],
      "relatedEquipmentSlugs": [
        "zl50gn",
        "lw300fn"
      ],
      "isFeatured": true,
      "isPlaceholder": false,
      "order": 6,
      "brandSlug": "xcmg",
      "categoryName": "Backhoe Loaders",
      "videos": []
    },
    {
      "id": "eq-zl50gn",
      "slug": "zl50gn",
      "model": "ZL50GN",
      "name": "ZL50GN Wheel Loader",
      "categorySlug": "backhoe-loaders",
      "brand": "XCMG",
      "tagline": "The cross-generation five-tonne",
      "summary": "A 17.15 tonne loader with a 3.2 m³ bucket and 162 kW, developed for construction, aggregate yards and coal logistics.",
      "description": "The ZL50GN is XCMG's cross-generation wheel loader, developed on the basis of the group's globalised technical resources. Focused on customer value and operator experience, it is aimed at efficiency in engineering construction, aggregate yards and coal logistics, with a 3.2 m³ bucket and a 5,500 kg rated load on a 3,300 mm wheelbase.",
      "image": {
        "src": "/images/xcmg/zl50gn-cutout.webp",
        "alt": "XCMG ZL50GN wheel loader"
      },
      "cutoutImage": {
        "src": "/images/xcmg/zl50gn-cutout.webp",
        "alt": "XCMG ZL50GN wheel loader, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xcmg/zl50gn-cutout.webp",
          "alt": "XCMG ZL50GN wheel loader"
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "17,150",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "3.2",
          "unit": "m³"
        },
        {
          "label": "Rated power",
          "value": "162",
          "unit": "kW"
        },
        {
          "label": "Rated load",
          "value": "5,500",
          "unit": "kg"
        }
      ],
      "specs": [
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Bucket capacity",
              "value": "3.2",
              "unit": "m³"
            },
            {
              "label": "Operating weight",
              "value": "17,150",
              "unit": "kg"
            },
            {
              "label": "Rated load",
              "value": "5,500",
              "unit": "kg"
            }
          ]
        },
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Rated power",
              "value": "162",
              "unit": "kW"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "8,350",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "2,996",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "3,515",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "3,300",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Cross-generation development",
          "description": "XCMG describes it as its cross-generation loader, developed on the group's globalised technical resources."
        },
        {
          "title": "The largest bucket of the three",
          "description": "A 3.2 cubic metre bucket and a 5,500 kg rated load, on 162 kW of rated power."
        },
        {
          "title": "Construction, aggregate and coal",
          "description": "The fields XCMG names for it are engineering construction, aggregate yards and coal logistics."
        }
      ],
      "relatedEquipmentSlugs": [
        "lw500fn",
        "lw300fn"
      ],
      "isFeatured": true,
      "isPlaceholder": false,
      "order": 7,
      "brandSlug": "xcmg",
      "categoryName": "Backhoe Loaders",
      "videos": []
    },
    {
      "id": "eq-xy-c65",
      "slug": "c65",
      "model": "C65",
      "name": "C65 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "Stage IV clean, and quick between jobs",
      "summary": "A 6.2 tonne wheeled excavator on a Stage IV Yuchai F30, travelling at 28 km/h between sites on four-wheel hydraulic disc brakes.",
      "description": "The C65 is the compact end of the C Series: a 6.2 tonne wheeled excavator on a Yuchai F30 engine certified to non-road Stage IV, without giving up power to get there. A 28 km/h travel speed and 1,975 mm width let it move itself between sites rather than waiting on a low-loader, and four-wheel hydraulic disc brakes and dual cameras keep that practical on public roads.",
      "image": {
        "src": "/images/xinyuan/c65-cutout.webp",
        "alt": "Xinyuan C65 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c65-cutout.webp",
        "alt": "Xinyuan C65 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c65-1.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c65-2.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c65-3.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c65-4.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c65-5.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c65-6.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c65-7.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c65-8.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c65-9.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c65-10.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c65-11.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c65-12.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c65-13.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c65-14.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c65-15.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c65-16.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c65-17.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c65-18.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c65-19.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c65-20.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c65-21.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c65-22.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c65-23.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c65-24.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 24"
        },
        {
          "src": "/images/xinyuan/gallery/c65-25.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 25"
        },
        {
          "src": "/images/xinyuan/gallery/c65-26.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 26"
        },
        {
          "src": "/images/xinyuan/gallery/c65-27.jpg",
          "alt": "Xinyuan C65 wheeled excavator, view 27"
        }
      ],
      "videos": [],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "6,200",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.18",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "36.8",
          "unit": "kW"
        },
        {
          "label": "Max digging force",
          "value": "35",
          "unit": "kN"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Engine model",
              "value": "Yuchai F30"
            },
            {
              "label": "Emission standard",
              "value": "Non-road Stage IV"
            },
            {
              "label": "Displacement",
              "value": "2,982",
              "unit": "mL"
            },
            {
              "label": "Rated power",
              "value": "36.8",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "6,200",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.18",
              "unit": "m³"
            },
            {
              "label": "Fuel tank",
              "value": "135",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "120",
              "unit": "L"
            },
            {
              "label": "Hydraulic flow rate",
              "value": "190",
              "unit": "L/min"
            },
            {
              "label": "Main relief valve",
              "value": "24.5",
              "unit": "MPa"
            },
            {
              "label": "Swing pressure",
              "value": "21.5",
              "unit": "MPa"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "35",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "35",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "28",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "8.5",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "5,855",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "1,975",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "2,800",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,410",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "250",
              "unit": "mm"
            },
            {
              "label": "Front track",
              "value": "1,570",
              "unit": "mm"
            },
            {
              "label": "Rear track",
              "value": "1,525",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "6,145",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "3,315",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "5,910",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "4,390",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,350",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "1,650",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Drive system",
              "value": "Hydrostatic transmission"
            },
            {
              "label": "Brakes",
              "value": "4-wheel hydraulic disc"
            },
            {
              "label": "Boom length",
              "value": "3,150",
              "unit": "mm"
            },
            {
              "label": "Arm length",
              "value": "1,750",
              "unit": "mm"
            },
            {
              "label": "Standard bucket width",
              "value": "630",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "1,975",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "390",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "45",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Stage IV without losing power",
          "description": "Meets non-road Stage IV emission limits while holding 36.8 kW, so tightening regulation does not cost productivity."
        },
        {
          "title": "Reversible operating handle",
          "description": "Controls flip for travelling and for digging, so the operator faces the work either way round."
        },
        {
          "title": "Dual-camera monitoring",
          "description": "Front and rear cameras with enlarged mirrors, cutting the blind spots that matter on a busy site."
        },
        {
          "title": "Attachment-ready hydraulics",
          "description": "Plumbed for a hydraulic breaker with auxiliary lines and a proportional electric control handle. Quick coupler optional."
        }
      ],
      "relatedEquipmentSlugs": [
        "c70",
        "c75",
        "c80"
      ],
      "isFeatured": true,
      "isPlaceholder": false,
      "order": 1,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c70",
      "slug": "c70",
      "model": "C70",
      "name": "C70 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "Built to move, built to last",
      "summary": "A 6.7 tonne machine on Xinyuan's own reinforced axles, with four-wheel independent hydraulic braking and 50 kN of traction.",
      "description": "The C70W is Xinyuan's own design, carrying more than eighty technical patents across the machine. A reinforced front and rear axle set, four-wheel independent hydraulic braking and heavy wear-resistant tyres give it a chassis meant for rough ground, while a 30 km/h road speed keeps it useful across scattered sites.",
      "image": {
        "src": "/images/xinyuan/c70-cutout.webp",
        "alt": "Xinyuan C70 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c70-cutout.webp",
        "alt": "Xinyuan C70 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c70-1.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c70-2.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c70-3.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c70-4.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c70-5.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c70-6.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c70-7.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c70-8.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c70-9.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c70-10.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c70-11.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c70-12.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c70-13.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c70-14.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c70-15.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c70-16.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c70-17.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c70-18.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c70-19.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c70-20.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c70-21.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c70-22.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c70-23.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c70-24.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 24"
        },
        {
          "src": "/images/xinyuan/gallery/c70-25.jpg",
          "alt": "Xinyuan C70 wheeled excavator, view 25"
        }
      ],
      "videos": [
        {
          "src": "/videos/xinyuan/c70.mp4",
          "title": "Detailing film",
          "poster": {
            "src": "/images/xinyuan/posters/c70.jpg",
            "alt": "Xinyuan C70 detailing film"
          }
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "6,665",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.2",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "48",
          "unit": "kW"
        },
        {
          "label": "Max traction force",
          "value": "50",
          "unit": "kN"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Model",
              "value": "XYC70WTJ"
            },
            {
              "label": "Engine",
              "value": "Yuchai 4F30"
            },
            {
              "label": "Rated power",
              "value": "48",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "6,665",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.2",
              "unit": "m³"
            },
            {
              "label": "Main relief valve",
              "value": "24",
              "unit": "MPa"
            },
            {
              "label": "Fuel tank",
              "value": "140",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "120",
              "unit": "L"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "30",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "50",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "30",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "10.5",
              "unit": "rpm"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "5,775",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "2,010",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "2,845",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,456",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "8.25-16"
            },
            {
              "label": "Ground contact width",
              "value": "500",
              "unit": "mm"
            },
            {
              "label": "Track",
              "value": "1,595",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "285",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "6,535",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "3,560",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "6,685",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "4,875",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,275",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "1,655",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Bucket width",
              "value": "700",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "2,070",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "470",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "50",
              "unit": "mm"
            },
            {
              "label": "Certification",
              "value": "CE, ISO 9001:2015, ISO 14001:2015"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Reinforced four-wheel chassis",
          "description": "Xinyuan's own strengthened front and rear axles with four-wheel independent hydraulic brakes and heavy wear-resistant tyres."
        },
        {
          "title": "Full-colour LCD instrument panel",
          "description": "Multi-function display carrying machine status and operating information at a glance, with a parking button on the joystick."
        },
        {
          "title": "Reversible operating handle",
          "description": "Controls flip for travelling and for digging, so the operator faces the work either way round."
        },
        {
          "title": "Dual-camera monitoring",
          "description": "Front and rear cameras with enlarged mirrors, cutting the blind spots that matter on a busy site."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c75",
        "c80"
      ],
      "isFeatured": false,
      "isPlaceholder": false,
      "order": 2,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c75",
      "slug": "c75",
      "model": "C75",
      "name": "C75 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "Long shifts, fewer stops",
      "summary": "A 6.7 tonne excavator on an open hydraulic circuit built for dirty conditions, with tank capacity sized for long shifts.",
      "description": "The C75W runs an open hydraulic system with an air-blown parallel radiator — mature, tolerant of dirty conditions and cheap to keep going. A larger fuel tank and the option of a bigger hydraulic tank extend the working day, and a new upper frame with double C-section side beams carries the load.",
      "image": {
        "src": "/images/xinyuan/c75-cutout.webp",
        "alt": "Xinyuan C75 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c75-cutout.webp",
        "alt": "Xinyuan C75 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c75-1.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c75-2.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c75-3.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c75-4.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c75-5.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c75-6.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c75-7.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c75-8.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c75-9.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c75-10.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c75-11.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c75-12.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c75-13.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c75-14.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c75-15.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c75-16.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c75-17.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c75-18.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c75-19.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c75-20.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c75-21.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c75-22.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c75-23.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c75-24.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 24"
        },
        {
          "src": "/images/xinyuan/gallery/c75-25.jpg",
          "alt": "Xinyuan C75 wheeled excavator, view 25"
        }
      ],
      "videos": [
        {
          "src": "/videos/xinyuan/c75.mp4",
          "title": "Detailing film",
          "poster": {
            "src": "/images/xinyuan/posters/c75.jpg",
            "alt": "Xinyuan C75 detailing film"
          }
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "6,700",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.2",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "50",
          "unit": "kW"
        },
        {
          "label": "Max traction force",
          "value": "50",
          "unit": "kN"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Model",
              "value": "XYC75WYTJ"
            },
            {
              "label": "Engine",
              "value": "Yuchai 4FA / Yuchai 4DK"
            },
            {
              "label": "Rated power",
              "value": "50",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "6,700",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.2",
              "unit": "m³"
            },
            {
              "label": "Main relief valve",
              "value": "22",
              "unit": "MPa"
            },
            {
              "label": "Fuel tank",
              "value": "130",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "135",
              "unit": "L"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "30",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "50",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "28",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "10.5",
              "unit": "rpm"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "6,005",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "1,950",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "2,845",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,410",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "8.25-16"
            },
            {
              "label": "Ground contact width",
              "value": "430",
              "unit": "mm"
            },
            {
              "label": "Track",
              "value": "1,520",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "230",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "6,540",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "3,365",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "6,657",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "4,860",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,315",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "1,840",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Bucket width",
              "value": "700",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "1,910",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "390",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "45",
              "unit": "mm"
            },
            {
              "label": "Certification",
              "value": "CE, ISO 9001:2015, ISO 14001:2015"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Open hydraulic system",
          "description": "Air-blown parallel radiator and an open circuit: proven technology, high tolerance of contamination, low failure rate and simple maintenance."
        },
        {
          "title": "Long continuous operation",
          "description": "High-capacity fuel tank with an enlarged hydraulic tank available, for shifts that do not stop to refill."
        },
        {
          "title": "Reversible operating handle",
          "description": "Controls flip for travelling and for digging, so the operator faces the work either way round."
        },
        {
          "title": "Dual-camera monitoring",
          "description": "Front and rear cameras with enlarged mirrors, cutting the blind spots that matter on a busy site."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c70",
        "c80"
      ],
      "isFeatured": true,
      "isPlaceholder": false,
      "order": 3,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c80",
      "slug": "c80",
      "model": "C80",
      "name": "C80 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "Extra reach on the same footprint",
      "summary": "Nearly 7 metres of reach and 3.65 metres of depth on a 6.65 tonne chassis that still travels at 30 km/h.",
      "description": "The C80W carries the longest working envelope of the six-tonne machines in the range — nearly 7 metres of reach and 3.65 metres of depth — on a chassis that still travels at 30 km/h. It shares the C75's open hydraulic system and upgraded upper frame, with a wider 195/85-20 tyre for load carrying.",
      "image": {
        "src": "/images/xinyuan/c80-cutout.webp",
        "alt": "Xinyuan C80 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c80-cutout.webp",
        "alt": "Xinyuan C80 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c80-1.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c80-2.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c80-3.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c80-4.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c80-5.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c80-6.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c80-7.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c80-8.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c80-9.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c80-10.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c80-11.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c80-12.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c80-13.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c80-14.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c80-15.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c80-16.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c80-17.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c80-18.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c80-19.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c80-20.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c80-21.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c80-22.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c80-23.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c80-24.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 24"
        },
        {
          "src": "/images/xinyuan/gallery/c80-25.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 25"
        },
        {
          "src": "/images/xinyuan/gallery/c80-26.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 26"
        },
        {
          "src": "/images/xinyuan/gallery/c80-27.jpg",
          "alt": "Xinyuan C80 wheeled excavator, view 27"
        }
      ],
      "videos": [
        {
          "src": "/videos/xinyuan/c80.mp4",
          "title": "Detailing film",
          "poster": {
            "src": "/images/xinyuan/posters/c80.jpg",
            "alt": "Xinyuan C80 detailing film"
          }
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "6,650",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.2",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "48",
          "unit": "kW"
        },
        {
          "label": "Max digging reach",
          "value": "6,950",
          "unit": "mm"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Model",
              "value": "XYC80WYT"
            },
            {
              "label": "Engine",
              "value": "Yuchai F3065-T300"
            },
            {
              "label": "Rated power",
              "value": "48",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "6,650",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.2",
              "unit": "m³"
            },
            {
              "label": "Main relief valve",
              "value": "22",
              "unit": "MPa"
            },
            {
              "label": "Fuel tank",
              "value": "130",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "135",
              "unit": "L"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "35",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "50",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "30",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "8.5",
              "unit": "rpm"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "6,435",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "1,980",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "2,845",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,410",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "195/85-20"
            },
            {
              "label": "Ground contact width",
              "value": "430",
              "unit": "mm"
            },
            {
              "label": "Track",
              "value": "1,520",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "230",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "6,950",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "3,655",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "7,090",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "5,245",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,455",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "1,965",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Bucket width",
              "value": "700",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "1,980",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "390",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "45",
              "unit": "mm"
            },
            {
              "label": "Certification",
              "value": "CE, ISO 9001:2015, ISO 14001:2015"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Longest reach in its class",
          "description": "6,950 mm of digging reach and 7,090 mm of height, so more of the site is covered without repositioning."
        },
        {
          "title": "Reversible operating handle",
          "description": "Controls flip for travelling and for digging, so the operator faces the work either way round."
        },
        {
          "title": "Dual-camera monitoring",
          "description": "Front and rear cameras with enlarged mirrors, cutting the blind spots that matter on a busy site."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c70",
        "c75"
      ],
      "isFeatured": false,
      "isPlaceholder": false,
      "order": 4,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c95",
      "slug": "c95",
      "model": "C95",
      "name": "C95 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "Grapple build, on outriggers",
      "summary": "The grapple configuration of the 7.1 tonne platform: outriggers spreading to 2,805 mm and a long arm reaching 7.14 metres.",
      "description": "The C95 G4 is the grapple build of Xinyuan's 7.1 tonne platform. Outriggers fold out from 1,970 to 2,805 mm to plant the machine for handling out to the side, and a longer 2,300 mm arm takes the reach to 7,140 mm - almost two metres further out than the machine is long. A Yuchai F3065-T480 at 48 kW, 30 km/h on the road, and a dozer blade that drops 110 mm below grade.",
      "image": {
        "src": "/images/xinyuan/c95-cutout.webp",
        "alt": "Xinyuan C95 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c95-cutout.webp",
        "alt": "Xinyuan C95 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c95-1.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c95-2.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c95-3.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c95-4.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c95-5.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c95-6.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c95-7.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c95-8.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c95-9.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c95-10.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c95-11.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c95-12.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c95-13.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c95-14.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c95-15.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c95-16.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c95-17.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c95-18.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c95-19.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c95-20.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c95-21.jpg",
          "alt": "Xinyuan C95 wheeled excavator, view 21"
        }
      ],
      "videos": [
        {
          "src": "/videos/xinyuan/c95.mp4",
          "title": "Detailing film",
          "poster": {
            "src": "/images/xinyuan/posters/c95.jpg",
            "alt": "Xinyuan C95 detailing film"
          }
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "7,100",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.2-0.35",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "48",
          "unit": "kW"
        },
        {
          "label": "Max digging reach",
          "value": "7,140",
          "unit": "mm"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Model",
              "value": "C95 G4 (grapple type)"
            },
            {
              "label": "Engine model",
              "value": "Yuchai F3065-T480"
            },
            {
              "label": "Rated power",
              "value": "48",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "7,100",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.2-0.35",
              "unit": "m³"
            },
            {
              "label": "Fuel tank",
              "value": "160",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "130",
              "unit": "L"
            },
            {
              "label": "Main relief valve",
              "value": "24.5",
              "unit": "MPa"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "35",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "35",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "30",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "8.5",
              "unit": "rpm"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "6,135",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "1,970",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "3,150",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,410",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "195/85-20"
            },
            {
              "label": "Ground contact width",
              "value": "430",
              "unit": "mm"
            },
            {
              "label": "Front track",
              "value": "1,570",
              "unit": "mm"
            },
            {
              "label": "Rear track",
              "value": "1,525",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "230",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "7,140",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "3,850",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "7,225",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "5,380",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,495",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "1,965",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Outriggers",
          "specs": [
            {
              "label": "Folded width",
              "value": "1,970",
              "unit": "mm"
            },
            {
              "label": "Unfolded width",
              "value": "2,805",
              "unit": "mm"
            },
            {
              "label": "Folding angle",
              "value": "128",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Boom length",
              "value": "3,600",
              "unit": "mm"
            },
            {
              "label": "Arm length",
              "value": "2,300",
              "unit": "mm"
            },
            {
              "label": "Standard bucket width",
              "value": "730",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "1,910",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "505",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "110",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Outriggers for side loading",
          "description": "Legs fold out from 1,970 to 2,805 mm, planting the machine to work over the side without the tail coming light."
        },
        {
          "title": "Long arm, long reach",
          "description": "A 2,300 mm arm takes the reach to 7,140 mm and dumping height to 5,380 mm, for loading over the side of a trailer."
        },
        {
          "title": "Blade below grade",
          "description": "The dozer blade rises 505 mm and drops 110 mm under the machine, for levelling and for bracing on soft ground."
        },
        {
          "title": "Attachment-ready hydraulics",
          "description": "Plumbed for a hydraulic breaker with auxiliary lines and a proportional electric control handle. Quick coupler optional."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c70",
        "c75"
      ],
      "isFeatured": false,
      "isPlaceholder": false,
      "order": 5,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c105",
      "slug": "c105",
      "model": "C105",
      "name": "C105 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "Tight tail, full-size dig",
      "summary": "An 8.3 tonne machine inside a 1,945 mm tail swing, with twin boom cylinders as standard for digging and lifting alike.",
      "description": "The C105W puts an 8.3 tonne machine into a 1,945 mm tail swing, so it works close to trucks and walls without giving up capacity. A wide-body chassis lowers the centre of gravity, twin boom cylinders as standard carry both digging and lifting, and an intelligent control system monitors more than 800 fault conditions across power, hydraulics and body.",
      "image": {
        "src": "/images/xinyuan/c105-cutout.webp",
        "alt": "Xinyuan C105 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c105-cutout.webp",
        "alt": "Xinyuan C105 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c105-1.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c105-2.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c105-3.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c105-4.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c105-5.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c105-6.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c105-7.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c105-8.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c105-9.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c105-10.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c105-11.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c105-12.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c105-13.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c105-14.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c105-15.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c105-16.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c105-17.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c105-18.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c105-19.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c105-20.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c105-21.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c105-22.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c105-23.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c105-24.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 24"
        },
        {
          "src": "/images/xinyuan/gallery/c105-25.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 25"
        },
        {
          "src": "/images/xinyuan/gallery/c105-26.jpg",
          "alt": "Xinyuan C105 wheeled excavator, view 26"
        }
      ],
      "videos": [
        {
          "src": "/videos/xinyuan/c105.mp4",
          "title": "Detailing film",
          "poster": {
            "src": "/images/xinyuan/posters/c105.jpg",
            "alt": "Xinyuan C105 detailing film"
          }
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "8,300",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.32",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "56",
          "unit": "kW"
        },
        {
          "label": "Max digging force",
          "value": "45",
          "unit": "kN"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Model",
              "value": "XYC105WT"
            },
            {
              "label": "Engine",
              "value": "Yuchai 4DK"
            },
            {
              "label": "Rated power",
              "value": "56",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "8,300",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.32",
              "unit": "m³"
            },
            {
              "label": "Main relief valve",
              "value": "25",
              "unit": "MPa"
            },
            {
              "label": "Fuel tank",
              "value": "180",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "165",
              "unit": "L"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "45",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "50",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "30",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "11",
              "unit": "rpm"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "6,020",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "2,250",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "2,910",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,500",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "7.50-20"
            },
            {
              "label": "Ground contact width",
              "value": "490",
              "unit": "mm"
            },
            {
              "label": "Track",
              "value": "1,755",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "328",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "6,800",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "3,980",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "7,410",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "5,290",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,115",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "1,945",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Bucket width",
              "value": "720",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "2,250",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "500",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "85",
              "unit": "mm"
            },
            {
              "label": "Certification",
              "value": "CE, ISO 9001:2015, ISO 14001:2015"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "1,945 mm tail swing",
          "description": "Works close in to trucks and structures without the tail needing space it has not got."
        },
        {
          "title": "Twin boom cylinders as standard",
          "description": "More capable at both digging and lifting; the clamp variant adds a longer boom and arm for a wider working envelope."
        },
        {
          "title": "800-fault diagnostic system",
          "description": "Intelligent control monitors power, hydraulic and body faults in real time and prompts for maintenance before it becomes downtime."
        },
        {
          "title": "Dual-camera monitoring",
          "description": "Front and rear cameras with enlarged mirrors, cutting the blind spots that matter on a busy site."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c70",
        "c75"
      ],
      "isFeatured": false,
      "isPlaceholder": false,
      "order": 6,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c115",
      "slug": "c115",
      "model": "C115",
      "name": "C115 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "More power over the same tail",
      "summary": "An 8.05 tonne machine with 73.5 kW and over 7 metres of reach on the wide-body chassis, and a 190 litre tank for long working days.",
      "description": "The C115W is an 8.05 tonne machine that lifts rated power to 73.5 kW and stretches the working envelope past 7 metres of reach and 4.28 metres of depth, on the same wide-body chassis and 2,090 mm tail swing as the C120. A 190 litre fuel tank and load-tolerant hydraulics keep it working through long days.",
      "image": {
        "src": "/images/xinyuan/c115-cutout.webp",
        "alt": "Xinyuan C115 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c115-cutout.webp",
        "alt": "Xinyuan C115 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c115-1.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c115-2.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c115-3.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c115-4.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c115-5.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c115-6.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c115-7.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c115-8.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c115-9.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c115-10.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c115-11.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c115-12.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c115-13.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c115-14.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c115-15.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c115-16.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c115-17.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c115-18.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c115-19.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c115-20.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c115-21.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c115-22.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c115-23.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c115-24.jpg",
          "alt": "Xinyuan C115 wheeled excavator, view 24"
        }
      ],
      "videos": [],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "8,050",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.32",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "73.5",
          "unit": "kW"
        },
        {
          "label": "Max digging force",
          "value": "50",
          "unit": "kN"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Model",
              "value": "XYC115WT"
            },
            {
              "label": "Engine",
              "value": "Yuchai 4DK100-T304"
            },
            {
              "label": "Rated power",
              "value": "73.5",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "8,050",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.32",
              "unit": "m³"
            },
            {
              "label": "Main relief valve",
              "value": "25",
              "unit": "MPa"
            },
            {
              "label": "Fuel tank",
              "value": "190",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "165",
              "unit": "L"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "50",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "50",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "30",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "8.5",
              "unit": "rpm"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "6,575",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "2,250",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "3,240",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,500",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "7.50-20"
            },
            {
              "label": "Ground contact width",
              "value": "490",
              "unit": "mm"
            },
            {
              "label": "Track",
              "value": "1,755",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "328",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "7,100",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "4,280",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "7,625",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "5,500",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,275",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "2,090",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Bucket width",
              "value": "720",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "2,250",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "500",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "85",
              "unit": "mm"
            },
            {
              "label": "Certification",
              "value": "CE, ISO 9001:2015, ISO 14001:2015"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Standard and clamp variants",
          "description": "Both carry twin boom cylinders; the clamp model adds a longer, stronger boom and arm for a wider attachment range."
        },
        {
          "title": "800-fault diagnostic system",
          "description": "Real-time monitoring of power, hydraulic and body faults, with maintenance prompts rather than post-mortems."
        },
        {
          "title": "Dual-camera monitoring",
          "description": "Front and rear cameras with enlarged mirrors, cutting the blind spots that matter on a busy site."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c70",
        "c75"
      ],
      "isFeatured": false,
      "isPlaceholder": false,
      "order": 7,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c120",
      "slug": "c120",
      "model": "C120",
      "name": "C120 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "The high-end nine tonne",
      "summary": "The top of the mid-range: 8.875 tonnes on load-sensing hydraulics, with the highest relief setting in the series below the C150.",
      "description": "The C120W is the top of the mid-range: 8.875 tonnes (8,875 kg) on a load-sensing hydraulic system that supplies only the power the machine is actually asking for, which cuts both fuel burn and heat. Twin boom cylinders and a reinforced boom and arm carry heavy digging and lifting, and a 28 MPa relief setting is the highest in the series below the C150.",
      "image": {
        "src": "/images/xinyuan/c120-cutout.webp",
        "alt": "Xinyuan C120 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c120-cutout.webp",
        "alt": "Xinyuan C120 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c120-1.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c120-2.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c120-3.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c120-4.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c120-5.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c120-6.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c120-7.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c120-8.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c120-9.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c120-10.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c120-11.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c120-12.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c120-13.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c120-14.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c120-15.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c120-16.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c120-17.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c120-18.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c120-19.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c120-20.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c120-21.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c120-22.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c120-23.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c120-24.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 24"
        },
        {
          "src": "/images/xinyuan/gallery/c120-25.jpg",
          "alt": "Xinyuan C120 wheeled excavator, view 25"
        }
      ],
      "videos": [
        {
          "src": "/videos/xinyuan/c120.mp4",
          "title": "Detailing film",
          "poster": {
            "src": "/images/xinyuan/posters/c120.jpg",
            "alt": "Xinyuan C120 detailing film"
          }
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "8,875",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.32",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "73.5",
          "unit": "kW"
        },
        {
          "label": "Max digging force",
          "value": "50",
          "unit": "kN"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Model",
              "value": "XYC120WT"
            },
            {
              "label": "Engine",
              "value": "Yuchai 4DK"
            },
            {
              "label": "Rated power",
              "value": "73.5",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "8,875",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.32",
              "unit": "m³"
            },
            {
              "label": "Main relief valve",
              "value": "28",
              "unit": "MPa"
            },
            {
              "label": "Fuel tank",
              "value": "180",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "165",
              "unit": "L"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "50",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "48",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "31",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "11",
              "unit": "rpm"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "6,375",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "2,250",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "2,950",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,500",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "8.25-20"
            },
            {
              "label": "Ground contact width",
              "value": "490",
              "unit": "mm"
            },
            {
              "label": "Track",
              "value": "1,755",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "345",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "6,865",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "4,075",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "7,435",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "5,245",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,250",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "2,090",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Bucket width",
              "value": "780",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "2,250",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "500",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "85",
              "unit": "mm"
            },
            {
              "label": "Certification",
              "value": "CE, ISO 9001:2015, ISO 14001:2015"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Load-sensing hydraulics",
          "description": "Supplies the pressure and flow the load actually needs, so movements are quick and smooth while fuel burn and hydraulic heat both drop."
        },
        {
          "title": "Twin boom cylinders",
          "description": "Reinforced boom and arm with two cylinders, for heavy digging and for lifting work at reach."
        },
        {
          "title": "800-fault diagnostic system",
          "description": "Real-time monitoring across power, hydraulics and body, with maintenance prompted rather than discovered."
        },
        {
          "title": "Dual-camera monitoring",
          "description": "Front and rear cameras with enlarged mirrors, cutting the blind spots that matter on a busy site."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c70",
        "c75"
      ],
      "isFeatured": true,
      "isPlaceholder": false,
      "order": 8,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c130",
      "slug": "c130",
      "model": "C130",
      "name": "C130 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "Thirteen tonnes, 4.7 m down",
      "summary": "Thirteen tonnes and 86 kW, digging 4.76 metres down and reaching 7.72 metres out on dual-circuit disc brakes.",
      "description": "The C130S is the heavy end of the wheeled range: 13 tonnes on an 86 kW Yuchai 4DK, digging 4.76 metres down and reaching 7.72 metres out. Dual-circuit four-wheel hydraulic disc brakes and 35° gradeability make a machine this size practical to move under its own power, and load-sensing hydraulics keep the fuel burn in proportion to the work.",
      "image": {
        "src": "/images/xinyuan/c130-cutout.webp",
        "alt": "Xinyuan C130 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c130-cutout.webp",
        "alt": "Xinyuan C130 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c130-1.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c130-2.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c130-3.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c130-4.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c130-5.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c130-6.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c130-7.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c130-8.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c130-9.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c130-10.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c130-11.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c130-12.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c130-13.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c130-14.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c130-15.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c130-16.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c130-17.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c130-18.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c130-19.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c130-20.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c130-21.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c130-22.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c130-23.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c130-24.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 24"
        },
        {
          "src": "/images/xinyuan/gallery/c130-25.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 25"
        },
        {
          "src": "/images/xinyuan/gallery/c130-26.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 26"
        },
        {
          "src": "/images/xinyuan/gallery/c130-27.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 27"
        },
        {
          "src": "/images/xinyuan/gallery/c130-28.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 28"
        },
        {
          "src": "/images/xinyuan/gallery/c130-29.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 29"
        },
        {
          "src": "/images/xinyuan/gallery/c130-30.jpg",
          "alt": "Xinyuan C130 wheeled excavator, view 30"
        }
      ],
      "videos": [
        {
          "src": "/videos/xinyuan/c130.mp4",
          "title": "Detailing film",
          "poster": {
            "src": "/images/xinyuan/posters/c130.jpg",
            "alt": "Xinyuan C130 detailing film"
          }
        }
      ],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "13,000",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.35",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "86",
          "unit": "kW"
        },
        {
          "label": "Max digging force",
          "value": "55",
          "unit": "kN"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Engine model",
              "value": "Yuchai 4DK"
            },
            {
              "label": "Emission standard",
              "value": "Non-road Stage III"
            },
            {
              "label": "Aftertreatment",
              "value": "Fitted"
            },
            {
              "label": "Displacement",
              "value": "3,621",
              "unit": "mL"
            },
            {
              "label": "Rated power",
              "value": "86",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "2,200",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "13,000",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.35",
              "unit": "m³"
            },
            {
              "label": "Fuel tank",
              "value": "200",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "165",
              "unit": "L"
            },
            {
              "label": "Hydraulic flow rate",
              "value": "230",
              "unit": "L/min"
            },
            {
              "label": "Main relief valve",
              "value": "25",
              "unit": "MPa"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "55",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "50",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "30",
              "unit": "km/h"
            },
            {
              "label": "Platform swing speed",
              "value": "8.5",
              "unit": "rpm"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "7,035",
              "unit": "mm"
            },
            {
              "label": "Overall width",
              "value": "2,290",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "3,109",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,750",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "320",
              "unit": "mm"
            },
            {
              "label": "Track",
              "value": "1,725",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "8.25-20"
            },
            {
              "label": "Ground contact width",
              "value": "490",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "7,720",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "4,765",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "7,960",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "5,750",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,815",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "2,135",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Drive system",
              "value": "Hydrostatic transmission"
            },
            {
              "label": "Brakes",
              "value": "Dual-circuit 4-wheel hydraulic disc"
            },
            {
              "label": "Hydraulic system",
              "value": "Load-sensing"
            },
            {
              "label": "Boom length",
              "value": "4,150",
              "unit": "mm"
            },
            {
              "label": "Arm length",
              "value": "2,300",
              "unit": "mm"
            },
            {
              "label": "Standard bucket width",
              "value": "850",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "2,250",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "470",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "115",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Deep trenching capability",
          "description": "4.76 metres of digging depth and 55 kN of breakout, for foundations and deep services in hard material."
        },
        {
          "title": "Dual-circuit braking",
          "description": "Four-wheel hydraulic disc brakes on two independent circuits — the safety margin a 13 tonne machine needs on the road."
        },
        {
          "title": "Load-sensing hydraulics",
          "description": "Flow matched to demand, so cycle times stay quick without paying for it in fuel and heat."
        },
        {
          "title": "Attachment-ready hydraulics",
          "description": "Plumbed for a hydraulic breaker with auxiliary lines and a proportional electric control handle. Quick coupler optional."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c70",
        "c75"
      ],
      "isFeatured": false,
      "isPlaceholder": false,
      "order": 9,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    },
    {
      "id": "eq-xy-c150",
      "slug": "c150",
      "model": "C150",
      "name": "C150 Wheeled Excavator",
      "categorySlug": "excavators",
      "brand": "Xinyuan",
      "series": "C Series",
      "tagline": "The largest in the range",
      "summary": "A 12.5 tonne machine on 118 kW, reaching 8.39 metres out with a 0.55 m³ bucket for large-site excavation.",
      "description": "The C150W tops the C Series: 12.5 tonnes on a 118 kW Yuchai A05160, carrying a 0.55 m³ bucket at a 32 MPa relief setting and reaching 8.39 metres out and 5.3 metres down. An extended working device — a 4,600 mm boom on a 2,500 mm arm — covers a large site from fewer set-ups, while a 310 litre fuel tank and 360 mm of ground clearance suit it to days where refuelling and rough ground both cost time.",
      "image": {
        "src": "/images/xinyuan/c150-cutout.webp",
        "alt": "Xinyuan C150 wheeled excavator, isolated on white"
      },
      "cutoutImage": {
        "src": "/images/xinyuan/c150-cutout.webp",
        "alt": "Xinyuan C150 wheeled excavator, isolated on white"
      },
      "gallery": [
        {
          "src": "/images/xinyuan/gallery/c150-1.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 1"
        },
        {
          "src": "/images/xinyuan/gallery/c150-2.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 2"
        },
        {
          "src": "/images/xinyuan/gallery/c150-3.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 3"
        },
        {
          "src": "/images/xinyuan/gallery/c150-4.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 4"
        },
        {
          "src": "/images/xinyuan/gallery/c150-5.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 5"
        },
        {
          "src": "/images/xinyuan/gallery/c150-6.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 6"
        },
        {
          "src": "/images/xinyuan/gallery/c150-7.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 7"
        },
        {
          "src": "/images/xinyuan/gallery/c150-8.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 8"
        },
        {
          "src": "/images/xinyuan/gallery/c150-9.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 9"
        },
        {
          "src": "/images/xinyuan/gallery/c150-10.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 10"
        },
        {
          "src": "/images/xinyuan/gallery/c150-11.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 11"
        },
        {
          "src": "/images/xinyuan/gallery/c150-12.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 12"
        },
        {
          "src": "/images/xinyuan/gallery/c150-13.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 13"
        },
        {
          "src": "/images/xinyuan/gallery/c150-14.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 14"
        },
        {
          "src": "/images/xinyuan/gallery/c150-15.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 15"
        },
        {
          "src": "/images/xinyuan/gallery/c150-16.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 16"
        },
        {
          "src": "/images/xinyuan/gallery/c150-17.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 17"
        },
        {
          "src": "/images/xinyuan/gallery/c150-18.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 18"
        },
        {
          "src": "/images/xinyuan/gallery/c150-19.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 19"
        },
        {
          "src": "/images/xinyuan/gallery/c150-20.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 20"
        },
        {
          "src": "/images/xinyuan/gallery/c150-21.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 21"
        },
        {
          "src": "/images/xinyuan/gallery/c150-22.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 22"
        },
        {
          "src": "/images/xinyuan/gallery/c150-23.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 23"
        },
        {
          "src": "/images/xinyuan/gallery/c150-24.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 24"
        },
        {
          "src": "/images/xinyuan/gallery/c150-25.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 25"
        },
        {
          "src": "/images/xinyuan/gallery/c150-26.jpg",
          "alt": "Xinyuan C150 wheeled excavator, view 26"
        }
      ],
      "videos": [],
      "highlights": [
        {
          "label": "Operating weight",
          "value": "12,500",
          "unit": "kg"
        },
        {
          "label": "Bucket capacity",
          "value": "0.55",
          "unit": "m³"
        },
        {
          "label": "Engine power",
          "value": "118",
          "unit": "kW"
        },
        {
          "label": "Max digging force",
          "value": "75",
          "unit": "kN"
        }
      ],
      "specs": [
        {
          "title": "Engine",
          "specs": [
            {
              "label": "Engine model",
              "value": "Yuchai A05160"
            },
            {
              "label": "Emission standard",
              "value": "Non-road Stage III"
            },
            {
              "label": "Aftertreatment",
              "value": "Fitted"
            },
            {
              "label": "Displacement",
              "value": "4,837",
              "unit": "mL"
            },
            {
              "label": "Rated power",
              "value": "118",
              "unit": "kW"
            },
            {
              "label": "Rated speed",
              "value": "1,800",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Operating",
          "specs": [
            {
              "label": "Operating weight",
              "value": "12,500",
              "unit": "kg"
            },
            {
              "label": "Bucket capacity",
              "value": "0.55",
              "unit": "m³"
            },
            {
              "label": "Fuel tank",
              "value": "310",
              "unit": "L"
            },
            {
              "label": "Hydraulic tank",
              "value": "240",
              "unit": "L"
            },
            {
              "label": "Main relief valve",
              "value": "32",
              "unit": "MPa"
            },
            {
              "label": "Swing pressure",
              "value": "27",
              "unit": "MPa"
            }
          ]
        },
        {
          "title": "Performance",
          "specs": [
            {
              "label": "Max digging force",
              "value": "75",
              "unit": "kN"
            },
            {
              "label": "Max traction force",
              "value": "55",
              "unit": "kN"
            },
            {
              "label": "Max travel speed",
              "value": "30",
              "unit": "km/h"
            },
            {
              "label": "Gradeability",
              "value": "35",
              "unit": "°"
            },
            {
              "label": "Platform swing speed",
              "value": "8.5",
              "unit": "rpm"
            }
          ]
        },
        {
          "title": "Dimensions",
          "specs": [
            {
              "label": "Overall length",
              "value": "7,790",
              "unit": "mm"
            },
            {
              "label": "Overall width (blade)",
              "value": "2,520",
              "unit": "mm"
            },
            {
              "label": "Overall height",
              "value": "3,150",
              "unit": "mm"
            },
            {
              "label": "Wheelbase",
              "value": "2,800",
              "unit": "mm"
            },
            {
              "label": "Min ground clearance",
              "value": "360",
              "unit": "mm"
            },
            {
              "label": "Track",
              "value": "1,975",
              "unit": "mm"
            },
            {
              "label": "Tyre type",
              "value": "9.00-20"
            },
            {
              "label": "Ground contact width",
              "value": "560",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Working range",
          "specs": [
            {
              "label": "Max digging reach",
              "value": "8,390",
              "unit": "mm"
            },
            {
              "label": "Max digging depth",
              "value": "5,295",
              "unit": "mm"
            },
            {
              "label": "Max digging height",
              "value": "9,060",
              "unit": "mm"
            },
            {
              "label": "Max dumping height",
              "value": "6,415",
              "unit": "mm"
            },
            {
              "label": "Min front swing radius",
              "value": "2,470",
              "unit": "mm"
            },
            {
              "label": "Min tail swing radius",
              "value": "2,318",
              "unit": "mm"
            }
          ]
        },
        {
          "title": "Configuration",
          "specs": [
            {
              "label": "Drive system",
              "value": "Hydrostatic transmission"
            },
            {
              "label": "Brakes",
              "value": "Dual-circuit hydraulic wheel-end"
            },
            {
              "label": "Hydraulic system",
              "value": "Load-sensing"
            },
            {
              "label": "Boom length",
              "value": "4,600",
              "unit": "mm"
            },
            {
              "label": "Arm length",
              "value": "2,500",
              "unit": "mm"
            },
            {
              "label": "Standard bucket width",
              "value": "900",
              "unit": "mm"
            },
            {
              "label": "Blade width",
              "value": "2,520",
              "unit": "mm"
            },
            {
              "label": "Blade max rise",
              "value": "540",
              "unit": "mm"
            },
            {
              "label": "Blade max drop",
              "value": "80",
              "unit": "mm"
            }
          ]
        }
      ],
      "features": [
        {
          "title": "Extended working device",
          "description": "A 4,600 mm boom on a 2,500 mm arm, with a reinforced main arm support, covering a larger working range from fewer set-ups."
        },
        {
          "title": "Largest working envelope",
          "description": "8.39 metres of reach and 5.3 metres of depth cover a large site without repositioning."
        },
        {
          "title": "Dual-circuit wet braking",
          "description": "Front and rear axles each carry an independent wet braking system, so service braking is doubly protected."
        },
        {
          "title": "Long endurance",
          "description": "310 litres of fuel and 360 mm of ground clearance, for full days on rough, spread-out sites."
        }
      ],
      "relatedEquipmentSlugs": [
        "c65",
        "c70",
        "c75"
      ],
      "isFeatured": false,
      "isPlaceholder": false,
      "order": 10,
      "brandSlug": "xinyuan",
      "categoryName": "Excavators"
    }
  ],
  "parts": [
    {
      "id": "pt-07",
      "slug": "hydraulic-return-filter",
      "name": "Hydraulic Return Filter",
      "partNumber": "BC-FL-7012",
      "categorySlug": "filters",
      "summary": "In-tank return line filter element with bypass valve. The highest-turnover filter across the LX Series.",
      "image": {
        "src": "/images/part-filters.jpg",
        "alt": "Oil filter and lubricant containers"
      },
      "attributes": [
        {
          "label": "Filtration rating",
          "value": "10 micron"
        },
        {
          "label": "Bypass setting",
          "value": "0.35 MPa"
        },
        {
          "label": "Service interval",
          "value": "500 hours"
        }
      ],
      "compatibleEquipmentSlugs": [
        "lx-926",
        "lx-930",
        "lx-936"
      ],
      "isPlaceholder": true,
      "order": 7,
      "categoryName": "Filters",
      "images": [],
      "isGenuine": false
    },
    {
      "id": "pt-08",
      "slug": "engine-oil-filter",
      "name": "Engine Oil Filter",
      "partNumber": "BC-FL-7104",
      "categorySlug": "filters",
      "summary": "Spin-on full-flow engine oil filter with anti-drainback valve, rated for high-ambient operation.",
      "image": {
        "src": "/images/part-filters.jpg",
        "alt": "Oil filter and lubricant containers"
      },
      "attributes": [
        {
          "label": "Type",
          "value": "Spin-on, full flow"
        },
        {
          "label": "Thread",
          "value": "M27 x 2"
        },
        {
          "label": "Service interval",
          "value": "250 hours"
        }
      ],
      "compatibleEquipmentSlugs": [
        "lx-926",
        "lx-930"
      ],
      "isPlaceholder": true,
      "order": 8,
      "categoryName": "Filters",
      "images": [],
      "isGenuine": false
    },
    {
      "id": "pt-xy-auger-drill-7t",
      "slug": "auger-drill-7t",
      "name": "Auger Drill, 7 t",
      "partNumber": "XY-7T-AUGERDRILL",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Earth auger for post holes, piling and planting, sized for a 7 tonne carrier.",
      "image": {
        "src": "/images/xinyuan-attachments/auger-drill-7t.webp",
        "alt": "Auger Drill, 7 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 1,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-auger-drill-9t",
      "slug": "auger-drill-9t",
      "name": "Auger Drill, 9 t",
      "partNumber": "XY-9T-AUGERDRILL",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Earth auger sized for a 9 tonne carrier.",
      "image": {
        "src": "/images/xinyuan-attachments/auger-drill-9t.webp",
        "alt": "Auger Drill, 9 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "9",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c105",
        "c115",
        "c120"
      ],
      "isPlaceholder": true,
      "order": 2,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-auger-drill-15t",
      "slug": "auger-drill-15t",
      "name": "Auger Drill, 15 t",
      "partNumber": "XY-15T-AUGERDRILL",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Earth auger sized for a 15 tonne carrier.",
      "image": {
        "src": "/images/xinyuan-attachments/auger-drill-15t.webp",
        "alt": "Auger Drill, 15 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "15",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c130"
      ],
      "isPlaceholder": true,
      "order": 3,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-log-grapple-5-claw-7t",
      "slug": "log-grapple-5-claw-7t",
      "name": "Five-Claw Log Grapple, Full-Rotation, 7 t",
      "partNumber": "XY-7T-LOGGRAPPLE",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Continuous-rotation five-claw grapple for timber handling and loading. Supplied in standard and short-jaw forms.",
      "image": {
        "src": "/images/xinyuan-attachments/log-grapple-5-claw-7t.webp",
        "alt": "Five-Claw Log Grapple, Full-Rotation, 7 t"
      },
      "images": [
        {
          "src": "/images/xinyuan-attachments/log-grapple-5-claw-7t-2.webp",
          "alt": "Five-Claw Log Grapple, Full-Rotation, 7 t, alternative view"
        },
        {
          "src": "/images/xinyuan-attachments/log-grapple-5-claw-7t-3.webp",
          "alt": "Five-Claw Log Grapple, Full-Rotation, 7 t, alternative view"
        }
      ],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 4,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-log-grapple-5-claw-9t",
      "slug": "log-grapple-5-claw-9t",
      "name": "Five-Claw Log Grapple, Full-Rotation, 9 t",
      "partNumber": "XY-9T-LOGGRAPPLE",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Continuous-rotation five-claw timber grapple for a 9 tonne carrier.",
      "image": {
        "src": "/images/xinyuan-attachments/log-grapple-5-claw-9t.webp",
        "alt": "Five-Claw Log Grapple, Full-Rotation, 9 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "9",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c105",
        "c115",
        "c120"
      ],
      "isPlaceholder": true,
      "order": 5,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-log-grapple-5-claw-15t",
      "slug": "log-grapple-5-claw-15t",
      "name": "Five-Claw Log Grapple, Electric Full-Rotation, 15 t",
      "partNumber": "XY-15T-LOGGRAPPLE",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Electrically controlled continuous-rotation grapple for the largest machines in the range.",
      "image": {
        "src": "/images/xinyuan-attachments/log-grapple-5-claw-15t.webp",
        "alt": "Five-Claw Log Grapple, Electric Full-Rotation, 15 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "15",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c130"
      ],
      "isPlaceholder": true,
      "order": 6,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-log-grapple-3-claw-7t",
      "slug": "log-grapple-3-claw-7t",
      "name": "Three-Claw Log Grapple, Full-Rotation, 7 t",
      "partNumber": "XY-7T-LOGGRAPPLE",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Three-claw grapple built to order, for lighter timber and brash.",
      "image": {
        "src": "/images/xinyuan-attachments/log-grapple-3-claw-7t.webp",
        "alt": "Three-Claw Log Grapple, Full-Rotation, 7 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 7,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-log-grab-7t",
      "slug": "log-grab-7t",
      "name": "Log Grab, Full-Rotation, 7 t",
      "partNumber": "XY-7T-LOGGRAB",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Full-rotation log grab for stacking and loading cut timber.",
      "image": {
        "src": "/images/xinyuan-attachments/log-grab-7t.webp",
        "alt": "Log Grab, Full-Rotation, 7 t"
      },
      "images": [
        {
          "src": "/images/xinyuan-attachments/log-grab-7t-2.webp",
          "alt": "Log Grab, Full-Rotation, 7 t, alternative view"
        }
      ],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 8,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-log-grab-4-claw-9t",
      "slug": "log-grab-4-claw-9t",
      "name": "Four-Claw Log Grab, Full-Rotation, 9 t",
      "partNumber": "XY-9T-LOGGRAB4CL",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Four-claw grab with continuous rotation, for heavier timber work.",
      "image": {
        "src": "/images/xinyuan-attachments/log-grab-4-claw-9t.webp",
        "alt": "Four-Claw Log Grab, Full-Rotation, 9 t"
      },
      "images": [
        {
          "src": "/images/xinyuan-attachments/log-grab-4-claw-9t-2.webp",
          "alt": "Four-Claw Log Grab, Full-Rotation, 9 t, alternative view"
        }
      ],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "9",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c105",
        "c115",
        "c120"
      ],
      "isPlaceholder": true,
      "order": 9,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-grapple-saw-7t",
      "slug": "grapple-saw-7t",
      "name": "Grapple Saw, Full-Rotation, 7 t",
      "partNumber": "XY-7T-GRAPPLESAW",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Grapple and saw in one head: hold the limb and cut it without repositioning.",
      "image": {
        "src": "/images/xinyuan-attachments/grapple-saw-7t.webp",
        "alt": "Grapple Saw, Full-Rotation, 7 t"
      },
      "images": [
        {
          "src": "/images/xinyuan-attachments/grapple-saw-7t-2.webp",
          "alt": "Grapple Saw, Full-Rotation, 7 t, alternative view"
        }
      ],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 10,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-disc-saw",
      "slug": "disc-saw",
      "name": "Single-Disc Circular Saw",
      "partNumber": "XY-DISCSAW",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Single-disc circular saw head for felling and cross-cutting.",
      "image": {
        "src": "/images/xinyuan-attachments/disc-saw.webp",
        "alt": "Single-Disc Circular Saw"
      },
      "images": [],
      "attributes": [],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [],
      "isPlaceholder": true,
      "order": 11,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-hedge-trimmer-rotating-7t",
      "slug": "hedge-trimmer-rotating-7t",
      "name": "T150 Hedge Trimmer, Full-Rotation, 7 t",
      "partNumber": "XY-7T-HEDGETRIMM",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Boom-mounted cutter bar with continuous rotation, for roadside and plantation trimming.",
      "image": {
        "src": "/images/xinyuan-attachments/hedge-trimmer-rotating-7t.webp",
        "alt": "T150 Hedge Trimmer, Full-Rotation, 7 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 12,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-hedge-trimmer-7t",
      "slug": "hedge-trimmer-7t",
      "name": "T150 Hedge Trimmer, 7 t",
      "partNumber": "XY-7T-HEDGETRIMM",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Boom-mounted cutter bar for hedge and branch trimming.",
      "image": {
        "src": "/images/xinyuan-attachments/hedge-trimmer-7t.webp",
        "alt": "T150 Hedge Trimmer, 7 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 13,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-sugarcane-grab-7t",
      "slug": "sugarcane-grab-7t",
      "name": "Five-Claw Sugarcane Grab, Full-Rotation, 7 t",
      "partNumber": "XY-7T-SUGARCANEG",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Wide five-claw grab shaped for loading cut cane.",
      "image": {
        "src": "/images/xinyuan-attachments/sugarcane-grab-7t.webp",
        "alt": "Five-Claw Sugarcane Grab, Full-Rotation, 7 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 14,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-palm-fruit-grab-7t",
      "slug": "palm-fruit-grab-7t",
      "name": "Palm Fruit Grab, Full-Rotation, 7 t",
      "partNumber": "XY-7T-PALMFRUITG",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Perforated clamshell for loading palm fruit while letting loose material fall through.",
      "image": {
        "src": "/images/xinyuan-attachments/palm-fruit-grab-7t.webp",
        "alt": "Palm Fruit Grab, Full-Rotation, 7 t"
      },
      "images": [
        {
          "src": "/images/xinyuan-attachments/palm-fruit-grab-7t-2.webp",
          "alt": "Palm Fruit Grab, Full-Rotation, 7 t, alternative view"
        }
      ],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 15,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-stone-grab-7t",
      "slug": "stone-grab-7t",
      "name": "Stone Grab, Full-Rotation, 7 t",
      "partNumber": "XY-7T-STONEGRAB",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Rotating grab for placing rock and block work.",
      "image": {
        "src": "/images/xinyuan-attachments/stone-grab-7t.webp",
        "alt": "Stone Grab, Full-Rotation, 7 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 16,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-scrap-claw-grab-7t",
      "slug": "scrap-claw-grab-7t",
      "name": "Ductile-Iron Claw Grab, Full-Rotation, 7 t",
      "partNumber": "XY-7T-SCRAPCLAWG",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Heavy claw grab for scrap and demolition handling.",
      "image": {
        "src": "/images/xinyuan-attachments/scrap-claw-grab-7t.webp",
        "alt": "Ductile-Iron Claw Grab, Full-Rotation, 7 t"
      },
      "images": [
        {
          "src": "/images/xinyuan-attachments/scrap-claw-grab-7t-2.webp",
          "alt": "Ductile-Iron Claw Grab, Full-Rotation, 7 t, alternative view"
        }
      ],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 17,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-hydraulic-thumb-7t",
      "slug": "hydraulic-thumb-7t",
      "name": "Hydraulic Thumb, 7 t",
      "partNumber": "XY-7T-HYDRAULICT",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Hydraulic thumb working against the bucket, so one machine digs and handles without a change of tool.",
      "image": {
        "src": "/images/xinyuan-attachments/hydraulic-thumb-7t.webp",
        "alt": "Hydraulic Thumb, 7 t"
      },
      "images": [
        {
          "src": "/images/xinyuan-attachments/hydraulic-thumb-7t-2.webp",
          "alt": "Hydraulic Thumb, 7 t, alternative view"
        }
      ],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 18,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-hydraulic-breaker-7t",
      "slug": "hydraulic-breaker-7t",
      "name": "Hydraulic Breaker, 7 t",
      "partNumber": "XY-7T-HYDRAULICB",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Hydraulic breaker for rock, concrete and foundation work.",
      "image": {
        "src": "/images/xinyuan-attachments/hydraulic-breaker-7t.webp",
        "alt": "Hydraulic Breaker, 7 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 19,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-quick-coupler-7t",
      "slug": "quick-coupler-7t",
      "name": "Quick Coupler, Full-Rotation, 7 t",
      "partNumber": "XY-7T-QUICKCOUPL",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Full-rotation quick coupler, so attachments change without breaking pins.",
      "image": {
        "src": "/images/xinyuan-attachments/quick-coupler-7t.webp",
        "alt": "Quick Coupler, Full-Rotation, 7 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "7",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c65",
        "c70",
        "c75",
        "c80",
        "c95"
      ],
      "isPlaceholder": true,
      "order": 20,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-quick-coupler-9t",
      "slug": "quick-coupler-9t",
      "name": "Quick Coupler, Full-Rotation, 9 t",
      "partNumber": "XY-9T-QUICKCOUPL",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Full-rotation quick coupler for a 9 tonne carrier.",
      "image": {
        "src": "/images/xinyuan-attachments/quick-coupler-9t.webp",
        "alt": "Quick Coupler, Full-Rotation, 9 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "9",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c105",
        "c115",
        "c120"
      ],
      "isPlaceholder": true,
      "order": 21,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-pallet-forks-9t",
      "slug": "pallet-forks-9t",
      "name": "Pallet Fork Carriage on Quick Coupler, 9 t",
      "partNumber": "XY-9T-PALLETFORK",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Pallet fork carriage mounting to the rotating quick coupler, turning the excavator into a yard handler.",
      "image": {
        "src": "/images/xinyuan-attachments/pallet-forks-9t.webp",
        "alt": "Pallet Fork Carriage on Quick Coupler, 9 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "9",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c105",
        "c115",
        "c120"
      ],
      "isPlaceholder": true,
      "order": 22,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-lifting-magnet-9t",
      "slug": "lifting-magnet-9t",
      "name": "Electromagnetic Lifting Plate, 9 t",
      "partNumber": "XY-9T-LIFTINGMAG",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Electromagnet for scrap and steel handling.",
      "image": {
        "src": "/images/xinyuan-attachments/lifting-magnet-9t.webp",
        "alt": "Electromagnetic Lifting Plate, 9 t"
      },
      "images": [],
      "attributes": [
        {
          "label": "Carrier class",
          "value": "9",
          "unit": "t"
        }
      ],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [
        "c105",
        "c115",
        "c120"
      ],
      "isPlaceholder": true,
      "order": 23,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-tiltrotator-l07",
      "slug": "tiltrotator-l07",
      "name": "L-07 Hydraulic Wrist (Tiltrotator)",
      "partNumber": "XY-TILTROTATO",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Tiltrotator giving the tool full rotation and tilt, so the machine works without repositioning.",
      "image": {
        "src": "/images/xinyuan-attachments/tiltrotator-l07.webp",
        "alt": "L-07 Hydraulic Wrist (Tiltrotator)"
      },
      "images": [],
      "attributes": [],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [],
      "isPlaceholder": true,
      "order": 24,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    },
    {
      "id": "pt-xy-tiltrotator-l15",
      "slug": "tiltrotator-l15",
      "name": "L-15 Hydraulic Wrist (Tiltrotator)",
      "partNumber": "XY-TILTROTATO",
      "categorySlug": "attachments",
      "brand": "Xinyuan",
      "summary": "Larger tiltrotator for the heavier machines in the range.",
      "image": {
        "src": "/images/xinyuan-attachments/tiltrotator-l15.webp",
        "alt": "L-15 Hydraulic Wrist (Tiltrotator)"
      },
      "images": [],
      "attributes": [],
      "isGenuine": true,
      "compatibleEquipmentSlugs": [],
      "isPlaceholder": true,
      "order": 25,
      "categoryName": "Attachments",
      "brandSlug": "xinyuan"
    }
  ],
  "services": [
    {
      "id": "sv-01",
      "slug": "equipment-consultation",
      "name": "Equipment Consultation",
      "description": "Specifying the right machine for the job before it is bought, based on the material, cycle and site conditions you are actually working with.",
      "points": [
        "Machine class and capacity matched to the duty cycle",
        "Attachment and configuration advice",
        "Fleet planning across mixed contracts"
      ],
      "order": 1
    },
    {
      "id": "sv-02",
      "slug": "parts-support",
      "name": "Parts Support",
      "description": "Filters, wear parts and driveline components held locally, so the common failures do not become long delays.",
      "points": [
        "Fast-moving consumables held in stock",
        "Part identification from machine model and serial",
        "Sourcing for units outside the regular range"
      ],
      "order": 2
    },
    {
      "id": "sv-03",
      "slug": "maintenance-repair",
      "name": "Maintenance and Repair",
      "description": "Scheduled servicing and repair work, planned around your programme rather than carried out only once a machine has stopped.",
      "points": [
        "Preventive service schedules by operating hours",
        "Diagnostic and repair support",
        "Component overhaul and replacement"
      ],
      "order": 3
    },
    {
      "id": "sv-04",
      "slug": "after-sales-support",
      "name": "After-Sales Support",
      "description": "The relationship after the invoice: commissioning, operator familiarisation and a direct line when something needs attention.",
      "points": [
        "Handover and commissioning on delivery",
        "Operator and maintenance familiarisation",
        "Direct contact for ongoing technical questions"
      ],
      "order": 4
    }
  ],
  "partners": [
    {
      "id": "pt-fwo",
      "name": "Frontier Works Organization (FWO)",
      "logo": "/images/partners/fwo.webp",
      "confirmed": true,
      "order": 1
    },
    {
      "id": "pt-habib-rafiq",
      "name": "Habib Rafiq Engineering (Pvt) Limited",
      "logo": "/images/partners/habib-rafiq.webp",
      "confirmed": true,
      "order": 2
    },
    {
      "id": "pt-d-baloch",
      "name": "Sardar Mohammad Ashraf D. Baluch (Pvt) Ltd",
      "logo": "/images/partners/d-baloch.webp",
      "confirmed": true,
      "order": 3
    },
    {
      "id": "pt-paragon",
      "name": "Paragon Constructors (Pvt) Ltd",
      "logo": "/images/partners/paragon.webp",
      "confirmed": true,
      "order": 4
    },
    {
      "id": "pt-ace",
      "name": "ACE",
      "logo": "/images/partners/ace.webp",
      "confirmed": true,
      "order": 5
    },
    {
      "id": "pt-gda",
      "name": "Galiyat Development Authority, Abbottabad",
      "logo": "/images/partners/gda.webp",
      "confirmed": true,
      "order": 6
    },
    {
      "id": "pt-pdma",
      "name": "PDMA, Government of Balochistan",
      "logo": "/images/partners/pdma.webp",
      "confirmed": true,
      "order": 7
    },
    {
      "id": "pt-ghani-dairies",
      "name": "Ghani Dairies Limited",
      "logo": "/images/partners/ghani-dairies.webp",
      "confirmed": true,
      "order": 8
    },
    {
      "id": "pt-kisan",
      "name": "Kisan Cooking Oil",
      "logo": "/images/partners/kisan-cooking-oil.webp",
      "confirmed": true,
      "order": 9
    },
    {
      "id": "pt-shaheen-wood",
      "name": "Shaheen Wood Industries (Pvt) Ltd",
      "logo": "/images/partners/shaheenwood.webp",
      "confirmed": true,
      "order": 10
    },
    {
      "id": "pt-h2-ready-mix",
      "name": "H2 Ready Mix",
      "logo": "/images/partners/h2-ready-mix.webp",
      "confirmed": true,
      "order": 11
    },
    {
      "id": "pt-nkb",
      "name": "Nidwaldner Kantonalbank",
      "logo": "/images/partners/nkb.webp",
      "confirmed": true,
      "order": 12
    },
    {
      "id": "pt-zkb",
      "name": "Zürcher Kantonalbank",
      "logo": "/images/partners/zkb.webp",
      "confirmed": true,
      "order": 13
    },
    {
      "id": "pt-skb",
      "name": "SKB Cases",
      "logo": "/images/partners/skb.webp",
      "confirmed": true,
      "order": 14
    }
  ],
  "banners": [
    {
      "id": "bn-xinyuan-film",
      "video": {
        "src": "/videos/xinyuan-hero.mp4"
      },
      "image": {
        "src": "/images/xinyuan/xinyuan-hero-poster.jpg",
        "alt": "Xinyuan wheeled excavators at work"
      },
      "eyebrow": "Xinyuan",
      "title": "Wheeled excavators",
      "meta": "C Series",
      "body": "The C Series, imported and supported directly by Burki & Company — with the attachment range designed around the same carriers.",
      "primary": {
        "label": "View The Range",
        "href": "/equipment/xinyuan"
      },
      "secondary": {
        "label": "View All Equipment",
        "href": "/equipment"
      }
    },
    {
      "id": "bn-company",
      "image": {
        "src": "/images/banner-company.jpg",
        "alt": "The Burki & Company premises in Karachi with a line of wheel loaders outside"
      },
      "eyebrow": "Welcome",
      "title": "Burki & Company",
      "meta": "Heavy equipment · Parts · After-sales support",
      "body": "Four decades supplying earthmoving and construction machinery from our Karachi headquarters, with the parts and service behind it to keep every machine earning.",
      "primary": {
        "label": "View All Equipment",
        "href": "/equipment"
      },
      "secondary": {
        "label": "More About Us",
        "href": "/about"
      }
    },
    {
      "id": "bn-load-x",
      "image": {
        "src": "/images/banner-load-x.jpg",
        "alt": "A line of LOAD-X wheel loaders and excavators at Burki & Company"
      },
      "eyebrow": "Load-X",
      "title": "Sole nationwide dealer",
      "meta": "Compact yard machines to the 5-tonne class",
      "body": "Burki & Company holds the LOAD-X distributorship nationwide. We bring the machines in, commission them and stock the wear parts they run through, so the loader and its parts come from the same place.",
      "primary": {
        "label": "View All Models",
        "href": "/equipment/load-x"
      },
      "secondary": {
        "label": "View All Equipment",
        "href": "/equipment"
      }
    },
    {
      "id": "bn-lx-936",
      "image": {
        "src": "/images/load-x/lx-936/lx-936-01.webp",
        "alt": "LOAD-X LX-936 wheel loader, side view, carrying its LX 936 badge"
      },
      "eyebrow": "LOAD-X",
      "title": "LX-936",
      "meta": "1.8 m³ bucket capacity  ·  92 kW rated output",
      "body": "A 9.5 tonne loader with a 1.8 m³ bucket and Weichai power, sized for crusher feed, batching plants and sustained truck loading.",
      "primary": {
        "label": "View This Machine",
        "href": "/equipment/load-x/lx-936"
      },
      "secondary": {
        "label": "View All Equipment",
        "href": "/equipment"
      }
    }
  ],
  "news": [
    {
      "id": "nw-01",
      "platform": "facebook",
      "caption": "Our Karachi head office on the Super Highway — sales, parts and service from one place.",
      "date": null,
      "image": {
        "src": "/images/banner-company.jpg",
        "alt": "The Burki & Company premises in Karachi"
      },
      "href": "https://www.facebook.com/share/1HhWiZ7kUQ/",
      "isPlaceholder": true,
      "order": 1
    },
    {
      "id": "nw-02",
      "platform": "tiktok",
      "caption": "Authorised Xinyuan dealers — the C Series wheeled excavator range, imported and supported directly.",
      "date": null,
      "image": {
        "src": "/images/xinyuan/gallery/c120-1.jpg",
        "alt": "A Xinyuan C120 wheeled excavator"
      },
      "href": "https://www.tiktok.com/@burkicompanyofficial/video/7611448807062015233",
      "isPlaceholder": false,
      "order": 2
    },
    {
      "id": "nw-03",
      "platform": "tiktok",
      "caption": "The LOAD-X LX-926 wheel loader — a 4.5 tonne machine for yards and sites a full-size loader cannot turn in.",
      "date": null,
      "image": {
        "src": "/brands/Load-x/lx926/lx-926-1.jpg",
        "alt": "A LOAD-X LX-926 wheel loader"
      },
      "href": "https://www.tiktok.com/@burkicompanyofficial/video/7677577812387106068",
      "isPlaceholder": false,
      "order": 3
    },
    {
      "id": "nw-04",
      "platform": "instagram",
      "caption": "A customer on the LX-936 wheel loader he took delivery of from Burki & Company.",
      "date": null,
      "image": {
        "src": "/brands/Load-x/lx936/lx-936-1.jpg",
        "alt": "A LOAD-X LX-936 wheel loader"
      },
      "href": "https://www.instagram.com/burki_andcompany/reel/DcRDGb8COTy/",
      "isPlaceholder": false,
      "order": 4
    }
  ],
  "companyInfo": {
    "companyName": "Burki & Company",
    "legalName": "Burki & Company",
    "tagline": "Heavy equipment, parts and support for the work that builds.",
    "foundedYear": null,
    "founder": {
      "name": "Haji Jahanzeb Khan Burki",
      "role": "Founder",
      "image": {
        "src": "/images/about/founder.webp",
        "alt": "Haji Jahanzeb Khan Burki, founder of Burki & Company"
      }
    },
    "story": [
      "Burki & Company was established in the late 1970s in Karachi, Pakistan, built on a foundation of integrity, quality, and an unwavering commitment to the construction and heavy machinery industry.",
      "What began as a specialised dealership has evolved over five decades into one of Pakistan's most trusted names in heavy equipment, serving contractors, construction companies and infrastructure developers across Pakistan and beyond."
    ],
    "mission": "Five decades. Thousands of machines. One standard, excellence.",
    "milestones": [],
    "certifications": [],
    "regionsServed": [],
    "locations": [
      {
        "label": "Karachi",
        "line1": "15-16, Highway Trade Centre",
        "line2": "Super Highway",
        "city": "Karachi",
        "country": "Pakistan",
        "mapQuery": "Highway Trade Centre, Super Highway, Karachi, Pakistan",
        "phone": "+92 21 3456 7890",
        "email": "info@burkigroup.com",
        "isPrimary": true
      },
      {
        "label": "Islamabad",
        "line1": "Al Madina Plaza",
        "line2": "Near Police Station, Tarnol",
        "city": "Islamabad",
        "country": "Pakistan",
        "mapQuery": "Al Madina Plaza, Tarnol, Islamabad, Pakistan",
        "isPrimary": false
      }
    ],
    "primaryLocation": {
      "label": "Karachi",
      "line1": "15-16, Highway Trade Centre",
      "line2": "Super Highway",
      "city": "Karachi",
      "country": "Pakistan",
      "mapQuery": "Highway Trade Centre, Super Highway, Karachi, Pakistan",
      "phone": "+92 21 3456 7890",
      "email": "info@burkigroup.com",
      "isPrimary": true
    },
    "phone": "+92 21 3456 7890",
    "whatsapp": "+92 300 1234567",
    "email": "info@burkigroup.com",
    "salesEmail": "sales@burkigroup.com",
    "businessHours": [
      {
        "days": "Monday to Saturday",
        "hours": "9:00am to 6:00pm"
      }
    ],
    "socials": [
      {
        "id": "so-01",
        "platform": "facebook",
        "label": "Facebook",
        "href": "https://www.facebook.com/share/1HhWiZ7kUQ/"
      },
      {
        "id": "so-02",
        "platform": "instagram",
        "label": "Instagram",
        "href": "https://www.instagram.com/burki_andcompany"
      },
      {
        "id": "so-03",
        "platform": "tiktok",
        "label": "TikTok",
        "href": "https://www.tiktok.com/@burkicompanyofficial"
      }
    ],
    "contactIsPlaceholder": true,
    "introVideo": {
      "src": null,
      "poster": {
        "src": "/images/band-about.jpg",
        "alt": "Burki & Company"
      }
    },
    "stats": [
      {
        "id": "st-01",
        "label": "Decades in business",
        "value": 5,
        "description": "Supplying heavy machinery since the late 1970s"
      },
      {
        "id": "st-02",
        "label": "Offices",
        "value": 2,
        "description": "Karachi and Islamabad"
      },
      {
        "id": "st-03",
        "label": "Equipment categories",
        "value": 12,
        "description": "Excavators through to attachments"
      },
      {
        "id": "st-04",
        "label": "Brands supplied",
        "value": 3,
        "description": "Including two sole distributorships"
      }
    ]
  }
} as const;
