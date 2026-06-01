import { useEffect, useRef } from "react";

/**
 * Adds the `is-visible` class to elements with the `reveal` class
 * when they scroll into view. Returns a ref to attach to a container;
 * if no ref is attached, it observes the whole document.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const root = containerRef.current ?? document;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (els.length === 0) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}
