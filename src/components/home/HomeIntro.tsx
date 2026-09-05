"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import styles from "./HomeIntro.module.css";

const SESSION_KEY = "burki-home-intro-played";
const EXIT_MS = 560;
const subscribe = () => () => undefined;

function shouldPlayInBrowser() {
  try {
    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    return navigation?.type === "reload" || sessionStorage.getItem(SESSION_KEY) !== "1";
  } catch {
    return true;
  }
}

/**
 * A brand introduction, not a loading dependency.
 *
 * The homepage renders underneath this fixed layer while the exact supplied
 * logo assembles above it. A session marker prevents ordinary client-side
 * returns to Home from replaying the sequence; a real browser reload always
 * plays it again.
 */
export function HomeIntro() {
  const shouldPlay = useSyncExternalStore(subscribe, shouldPlayInBrowser, () => true);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const exitingRef = useRef(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    exitTimer.current = setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // Storage can be unavailable in hardened privacy modes.
      }
      setVisible(false);
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    if (!shouldPlay || !visible) return;

    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const pageRegions = Array.from(
      document.querySelectorAll<HTMLElement>(
        "header, main, footer, nav[aria-label='Quick actions']",
      ),
    );
    const previousInert = pageRegions.map((element) => element.inert);
    pageRegions.forEach((element) => {
      element.inert = true;
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const autoFinish = window.setTimeout(finish, reducedMotion ? 850 : 4240);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(autoFinish);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = bodyOverflow;
      pageRegions.forEach((element, index) => {
        element.inert = previousInert[index];
      });
    };
  }, [finish, shouldPlay, visible]);

  useEffect(
    () => () => {
      if (exitTimer.current) clearTimeout(exitTimer.current);
    },
    [],
  );

  if (!shouldPlay || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Burki and Company introduction"
      className={`${styles.overlay} ${exiting ? styles.exiting : ""}`}
      onPointerDown={finish}
    >
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.mover}>
          <Image
            src="/brand/logo-horizontal-navy.png"
            alt=""
            fill
            priority
            sizes="(min-width: 820px) 720px, 90vw"
            className={styles.logo}
          />

          <svg
            viewBox="0 0 292 412"
            className={styles.trace}
            focusable="false"
          >
            <g className={styles.guide}>
              <path d="M137 14 L251 126 Q270 144 251 163 L183 231" />
              <path d="M137 117 L25 229 Q5 249 5 264 Q5 280 24 298 L136 404" />
              <path d="M136 404 L254 286 Q272 268 253 249 L229 225" />
              <path d="M137 214 L184 167 L184 280" />
            </g>
            <g className={styles.drawn}>
              <path className={styles.strokeOne} pathLength="1" d="M137 14 L251 126 Q270 144 251 163 L183 231" />
              <path className={styles.strokeTwo} pathLength="1" d="M137 117 L25 229 Q5 249 5 264 Q5 280 24 298 L136 404" />
              <path className={styles.strokeThree} pathLength="1" d="M136 404 L254 286 Q272 268 253 249 L229 225" />
              <path className={styles.strokeFour} pathLength="1" d="M137 214 L184 167 L184 280" />
            </g>
            <g className={styles.amberTrace}>
              <path pathLength="1" d="M137 14 L251 126 Q270 144 251 163 L183 231" />
              <path pathLength="1" d="M137 117 L25 229 Q5 249 5 264 Q5 280 24 298 L136 404" />
              <path pathLength="1" d="M136 404 L254 286 Q272 268 253 249 L229 225" />
              <path pathLength="1" d="M137 214 L184 167 L184 280" />
            </g>
          </svg>
        </div>
        <span className={styles.baseline} />
      </div>

      <button
        type="button"
        className={styles.skip}
        onPointerDown={(event) => event.stopPropagation()}
        onClick={finish}
      >
        Skip
      </button>
    </div>
  );
}
