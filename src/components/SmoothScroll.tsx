import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

declare global {
  interface Window {
    customLenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Luxurious easeOutExpo curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    // Expose lenis instance globally via custom property to prevent type conflicts
    window.customLenis = lenis;

    // Request Animation Frame loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      window.customLenis = undefined;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
