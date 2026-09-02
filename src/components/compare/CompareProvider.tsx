"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** What the bar needs to draw a chip without another round trip. */
export type CompareMachine = {
  slug: string;
  model: string;
  brand: string;
  href: string;
  image: { src: string; alt: string };
};

/**
 * Three, as the comparison table is three columns wide. A fourth would either
 * push a column off a laptop screen or shrink all of them to the point where
 * the figures stop lining up, which is the only thing the table is for.
 */
export const COMPARE_LIMIT = 3;

const STORAGE_KEY = "burki:compare";

type CompareValue = {
  selected: string[];
  machines: CompareMachine[];
  isSelected: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  isFull: boolean;
  /** False until the stored selection has been read, so nothing flashes. */
  ready: boolean;
};

const CompareContext = createContext<CompareValue | null>(null);

/**
 * Which machines are being compared, held above the page.
 *
 * IT HAS TO SURVIVE NAVIGATION. Comparing is picking one machine here and
 * another two pages later — a Xinyuan against an XCMG means crossing two brand
 * catalogues — so the selection cannot live in the page that made it. It sits
 * in a provider at the root and is mirrored to `localStorage`, which also means
 * closing the tab mid-decision does not lose it.
 *
 * `ready` exists because that read cannot happen during render: the server has
 * no localStorage, and seeding state from it would make the server and client
 * disagree on the first paint. Everything that depends on the selection waits
 * one tick rather than flashing an empty bar.
 *
 * The machine index is passed in from the server rather than fetched here. It
 * is the whole catalogue reduced to five fields — small enough to hand down
 * once, and it saves the bar and the toggle from knowing anything about the
 * data layer.
 */
export function CompareProvider({
  machines,
  children,
}: {
  machines: CompareMachine[];
  children: ReactNode;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      if (Array.isArray(parsed)) {
        /* Filtered against the live catalogue: a machine withdrawn since the
           selection was stored would otherwise sit in the bar for ever. */
        const known = new Set(machines.map((m) => m.slug));
        setSelected(
          parsed.filter((s): s is string => typeof s === "string" && known.has(s)).slice(0, COMPARE_LIMIT),
        );
      }
    } catch {
      /* Private mode, blocked storage, corrupt value — start empty. */
    }
    setReady(true);
  }, [machines]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      /* Not being able to remember it is not a reason to break the page. */
    }
  }, [selected, ready]);

  const toggle = useCallback((slug: string) => {
    setSelected((current) => {
      if (current.includes(slug)) return current.filter((s) => s !== slug);
      if (current.length >= COMPARE_LIMIT) return current;
      return [...current, slug];
    });
  }, []);

  const remove = useCallback(
    (slug: string) => setSelected((current) => current.filter((s) => s !== slug)),
    [],
  );

  const clear = useCallback(() => setSelected([]), []);

  const value = useMemo<CompareValue>(
    () => ({
      selected,
      machines,
      isSelected: (slug) => selected.includes(slug),
      toggle,
      remove,
      clear,
      isFull: selected.length >= COMPARE_LIMIT,
      ready,
    }),
    [selected, machines, toggle, remove, clear, ready],
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare(): CompareValue {
  const value = useContext(CompareContext);
  if (!value) throw new Error("useCompare must be used inside CompareProvider");
  return value;
}
