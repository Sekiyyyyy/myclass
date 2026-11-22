"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap-config";
import { registerLenis, scrollToSection, scrollToTop } from "@/lib/scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });

    lenisRef.current = lenis;
    registerLenis(lenis);

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    let animationFrameId = 0;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  // Synchronize scroll position cleanly whenever Next.js changes route (e.g. /galeri <-> /)
  useEffect(() => {
    const hash = window.location.hash;
    const timer = window.setTimeout(() => {
      if (hash && hash !== "#hero") {
        scrollToSection(hash, false);
      } else {
        scrollToTop(true);
      }
    }, 60);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
