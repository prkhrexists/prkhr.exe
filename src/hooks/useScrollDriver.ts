import { useRef, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

/**
 * useScrollDriver
 *
 * Owns the custom scroll-jacking system used on the home screen:
 *
 * 1. Tracks pointer position → writes `--scene-mouse-x/y` CSS vars.
 * 2. Listens to a fixed full-screen div's scroll position → writes
 *    `--scene-scroll` and `--scene-speed` CSS vars.
 * 3. Hijacks `wheel` events on the window and forwards them to the
 *    scroll driver div so the user can scroll-jack from anywhere,
 *    regardless of z-index ordering. Skips elements that have their
 *    own native scroll.
 * 4. Spring-smooths the raw scroll value.
 *
 * @returns scrollRef — attach to the fixed scroll-driver div in JSX.
 * @returns smoothScroll — spring-smoothed MotionValue (0 → 1) for animations.
 */
export function useScrollDriver() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const rawScroll = useMotionValue(0);

  // ── 1. Pointer tracking → CSS vars ──────────────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--scene-mouse-x', '50%');
    root.style.setProperty('--scene-mouse-y', '40%');

    const handleMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      root.style.setProperty('--scene-mouse-x', `${x}%`);
      root.style.setProperty('--scene-mouse-y', `${y}%`);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);

  // ── 2. Scroll progress + speed → CSS vars ───────────────────────────────
  useEffect(() => {
    const root = document.documentElement;
    let lastValue = 0;
    let lastAt = performance.now();

    const unsubscribe = rawScroll.on('change', value => {
      root.style.setProperty('--scene-scroll', value.toFixed(4));

      const now     = performance.now();
      const delta   = Math.abs(value - lastValue);
      const elapsed = Math.max(now - lastAt, 16);
      const speed   = Math.min((delta / elapsed) * 1200, 1.75);
      root.style.setProperty('--scene-speed', speed.toFixed(3));

      lastValue = value;
      lastAt    = now;
    });

    return unsubscribe;
  }, [rawScroll]);

  // ── 3. Wheel hijack → forward to scroll driver div ──────────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Track scroll progress from the div's own scrollTop
    const updateProgress = () => {
      const max = el.scrollHeight - el.clientHeight;
      if (max <= 0) return;
      rawScroll.set(el.scrollTop / max);
    };

    // Walk up the DOM to check if a node has its own native scroll
    const isScrollable = (node: HTMLElement | null): boolean => {
      if (!node || node === document.body) return false;
      const st        = window.getComputedStyle(node);
      const hasScroll = node.scrollHeight > node.clientHeight;
      const canScroll = st.overflowY === 'auto' || st.overflowY === 'scroll';
      if (hasScroll && canScroll) return true;
      return isScrollable(node.parentElement);
    };

    const handleWheel = (e: WheelEvent) => {
      // Let naturally-scrollable children scroll themselves
      if (isScrollable(e.target as HTMLElement)) return;
      e.preventDefault();
      el.scrollTop += e.deltaY;
      updateProgress();
    };

    el.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('scroll', updateProgress);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [rawScroll]);

  // ── 4. Spring-smooth the raw value ──────────────────────────────────────
  const smoothScroll = useSpring(rawScroll, { stiffness: 70, damping: 20 });

  return { scrollRef, smoothScroll };
}
