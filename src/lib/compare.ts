/**
 * Shared constants for the comparison feature.
 *
 * THIS FILE EXISTS BECAUSE THE LIMIT IS NEEDED ON BOTH SIDES. It started life in
 * `CompareProvider`, which carries "use client" — and a plain value imported
 * from a client module into a SERVER component does not arrive as that value.
 * React hands back a client reference, so `slice(0, COMPARE_LIMIT)` sliced to
 * `NaN`, the comparison page saw an empty selection, and every comparison
 * rendered as "nothing to compare yet" no matter what was in the URL.
 *
 * Constants that both sides read belong in a module that declares neither.
 */

/**
 * Three, as the comparison table is three columns wide. A fourth would either
 * push a column off a laptop screen or shrink them all to the point where the
 * figures stop lining up, which is the only thing the table is for.
 */
export const COMPARE_LIMIT = 3;
