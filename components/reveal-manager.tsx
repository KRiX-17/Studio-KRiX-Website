"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelector = "[data-reveal]";
const visibleClass = "scroll-reveal--visible";
const readyClass = "scroll-reveal--ready";

function show(element: HTMLElement) {
  element.classList.add(visibleClass);
}

export function RevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(revealSelector),
    );

    if (elements.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          show(element);
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    const initialViewportLimit = window.innerHeight * 0.92;

    elements.forEach((element) => {
      if (element.classList.contains(visibleClass)) {
        return;
      }

      const bounds = element.getBoundingClientRect();

      if (bounds.top <= initialViewportLimit && bounds.bottom >= 0) {
        show(element);
        return;
      }

      element.classList.add(readyClass);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
