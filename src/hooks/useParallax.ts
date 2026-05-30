import { useEffect, useRef } from 'react';

export function useParallax() {
  const bgFarRef   = useRef<HTMLDivElement>(null);
  const bgMidRef   = useRef<HTMLDivElement>(null);
  const bgFrontRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bgFar   = bgFarRef.current;
    const bgMid   = bgMidRef.current;
    const bgFront = bgFrontRef.current;
    if (!bgFar || !bgMid || !bgFront) return;

    const FAR_K   = 0.18;
    const MID_K   = 0.46;
    const FRONT_K = 0.78;

    let scrollY = 0;
    let mouseX  = 0;
    let mouseY  = 0;
    let rafId: number | null = null;

    function applyParallax() {
      const sy     = scrollY;
      const mxNorm = (mouseX / window.innerWidth  - 0.5);
      const myNorm = (mouseY / window.innerHeight - 0.5);

      bgFar!.style.transform   = `translate(${mxNorm * -12}px, calc(${myNorm * -8}px  - ${sy * FAR_K}px))`;
      bgMid!.style.transform   = `translate(${mxNorm * -22}px, calc(${myNorm * -14}px - ${sy * MID_K}px))`;
      bgFront!.style.transform = `translate(${mxNorm * -34}px, calc(${myNorm * -20}px - ${sy * FRONT_K}px))`;
      rafId = null;
    }

    function schedule() {
      if (!rafId) rafId = requestAnimationFrame(applyParallax);
    }

    const onScroll = () => { scrollY = window.scrollY; schedule(); };
    const onMove   = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; schedule(); };

    window.addEventListener('scroll',    onScroll, { passive: true });
    window.addEventListener('mousemove', onMove,   { passive: true });
    applyParallax();

    return () => {
      window.removeEventListener('scroll',    onScroll);
      window.removeEventListener('mousemove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return { bgFarRef, bgMidRef, bgFrontRef };
}
