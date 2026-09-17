"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function ScrollToTop() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (previousPath.current === null) {
      previousPath.current = pathname;
      return;
    }

    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (window.location.hash) return;

    requestAnimationFrame(() => {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = "auto";
      window.scrollTo({ left: 0, top: 0, behavior: "auto" });
      root.style.scrollBehavior = previousBehavior;
    });
  }, [pathname]);

  return null;
}
