"use client";
import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (options?: IntersectionObserverInit) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    // Small delay to ensure DOM is ready before checking
    const timeoutId = setTimeout(() => {
      // Check if element is already visible on page load
      if (ref.current && window.scrollY === 0) {
        const rect = ref.current.getBoundingClientRect();
        // If element is already in viewport, show it immediately without animation
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
          return; // Don't set up observer for already visible elements
        }
      }

      // Otherwise, set up observer for scroll animation
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (observer) {
              observer.disconnect();
            }
          }
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
          ...options,
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (observer && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
};
