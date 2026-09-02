import type { Equipment, Highlight } from "@/lib/data";

/**
 * The three figures a catalogue card leads with: weight, engine, bucket.
 *
 * DERIVED, NOT INDEXED. The obvious implementation is `highlights[0..2]`, and it
 * would be wrong: the labels are not consistent across the range because the
 * manufacturers' own sheets are not. Weight is "Operating weight" on the
 * Xinyuan and XCMG machines and "Total weight" on two of the LOAD-X; engine
 * power is "Engine power", "Rated power" or "Rated output" depending on whose
 * sheet it came off. Positions differ too — the LX-926 leads with bucket, not
 * weight.
 *
 * So each figure is found by what it MEANS. Highlights first, since those are
 * the figures chosen to represent the machine; then the full specification, so
 * that a machine whose highlights omit one still shows it. The C130 is exactly
 * that case: its four highlights are weight, power and two digging figures, and
 * its bucket capacity is further down the sheet.
 *
 * Anything genuinely absent returns undefined and the card leaves the line out
 * rather than printing a label with nothing after it.
 */
const WEIGHT = /(operating|total|machine)\s+weight|^weight$/i;
const ENGINE = /(engine|rated)\s+(power|output)/i;
const BUCKET = /bucket\s+capacity|volume\s+of\s+bucket/i;

const find = (item: Equipment, pattern: RegExp): Highlight | undefined =>
  item.highlights.find((h) => pattern.test(h.label)) ??
  item.specs.flatMap((group) => group.specs).find((s) => pattern.test(s.label));

export type KeyFigure = { label: string; value: string; unit?: string };

/** Weight, engine, bucket — in that order, skipping any the machine lacks. */
export function keyFigures(item: Equipment): KeyFigure[] {
  const wanted = [
    { pattern: WEIGHT, label: "Operating weight" },
    { pattern: ENGINE, label: "Rated power" },
    { pattern: BUCKET, label: "Bucket capacity" },
  ];

  const figures: KeyFigure[] = [];
  for (const { pattern, label } of wanted) {
    const found = find(item, pattern);
    /* The house label rather than the manufacturer's, so a row of cards reads
       as one table instead of three different sheets side by side. */
    if (found) figures.push({ label, value: found.value, unit: found.unit });
  }
  return figures;
}
