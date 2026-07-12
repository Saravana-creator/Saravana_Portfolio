/**
 * gsap-setup.ts
 * Central GSAP + ScrollTrigger configuration.
 * Import this once at app root; all sections reference the same instance.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin }    from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ── Global GSAP defaults ───────────────────────────────────────────────────
gsap.defaults({ ease: 'power3.out', duration: 0.8 });

// Smooth scroll-trigger refresh on resize
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger };
