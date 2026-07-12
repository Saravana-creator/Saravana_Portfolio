/**
 * useGSAP.ts
 * Runs a GSAP animation context inside a container ref.
 * Automatically kills all ScrollTriggers and tweens on unmount.
 */
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-setup';

type GSAPCallback = (
  ctx: ReturnType<typeof gsap.context>,
  el: HTMLElement
) => void;

export function useGSAP(callback: GSAPCallback) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      callback(ctx, el);
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger && el.contains(st.vars.trigger as Node)) {
          st.kill();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
