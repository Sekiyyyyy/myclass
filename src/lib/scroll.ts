import type Lenis from "lenis";

let activeLenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  activeLenis = instance;
}

export function pauseScroll() {
  activeLenis?.stop();
}

export function resumeScroll() {
  activeLenis?.start();
}

export function scrollToTop(immediate = false) {
  if (typeof window === "undefined") return;
  if (activeLenis) {
    activeLenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? "auto" : "smooth" });
  }
}

export function scrollToSection(id: string, immediate = false) {
  if (typeof window === "undefined") return;
  const cleanId = id.replace(/^#/, "");
  if (cleanId === "hero" || cleanId === "") {
    scrollToTop(immediate);
    return;
  }

  const el = document.getElementById(cleanId);
  if (!el) return;

  if (activeLenis) {
    activeLenis.scrollTo(el, { offset: -12, immediate });
  } else {
    el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
}
