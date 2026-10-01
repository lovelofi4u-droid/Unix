import { useEffect } from "react";
import Lenis from "lenis";

/** Buttery smooth scrolling for the whole page. */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
