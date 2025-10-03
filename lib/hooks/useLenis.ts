import { useEffect } from "react";

export default function useLenis() {
  useEffect(() => {
    let frameId: number;
    let lenis: any;

    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis();

      const raf = (time: number) => {
        lenis.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frameId);
      lenis?.destroy?.();
    };
  }, []);
}
