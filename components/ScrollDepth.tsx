"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const THRESHOLDS = [25, 50, 75, 100];

export function ScrollDepth() {
  useEffect(() => {
    const fired = new Set<number>();

    function handleScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((window.scrollY / docHeight) * 100);
      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackEvent("scroll_depth", { percentual: threshold });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
