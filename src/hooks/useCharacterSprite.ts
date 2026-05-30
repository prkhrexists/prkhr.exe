import { useEffect, useRef } from 'react';

export function useCharacterSprite() {
  const charRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const char = charRef.current;
    if (!char) return;

    const img = new Image();
    img.src = '/MainCharacterSpriteSheet.png';
    img.onload = () => {
      const naturalH = img.naturalHeight;
      const naturalW = img.naturalWidth;
      const frameH   = naturalH;
      const numCols  = Math.round(naturalW / frameH);
      const frameW   = frameH;

      char.style.setProperty('--sprite-frame-w',    `${frameW}px`);
      char.style.setProperty('--sprite-frame-h',    `${frameH}px`);
      char.style.setProperty('--sprite-walk-frames', `${numCols}`);
      char.style.setProperty('--sprite-walk-row-y',  '0px');
      char.style.backgroundSize = `${naturalW}px ${frameH}px`;
      char.style.width  = `${Math.min(frameW, 96)}px`;
      char.style.height = `${Math.min(frameH, 96)}px`;
    };
    img.onerror = () => {
      char.style.setProperty('--sprite-frame-w',    '64px');
      char.style.setProperty('--sprite-frame-h',    '64px');
      char.style.setProperty('--sprite-walk-frames', '4');
      char.style.backgroundSize = '256px 64px';
    };

    const MIN_TOP_PCT = 10;
    const MAX_TOP_PCT = 72;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    function setWalking() {
      char!.classList.remove('char-idle');
      char!.classList.add('char-walking');
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        char!.classList.remove('char-walking');
        char!.classList.add('char-idle');
      }, 150);
    }

    function updatePosition() {
      const doc      = document.documentElement;
      const total    = doc.scrollHeight - doc.clientHeight;
      const progress = total > 0 ? doc.scrollTop / total : 0;
      const topPct   = MIN_TOP_PCT + (MAX_TOP_PCT - MIN_TOP_PCT) * progress;
      char!.style.top = `${topPct}%`;
      if (total > 0 && doc.scrollTop > 0) setWalking();
    }

    window.addEventListener('scroll', updatePosition, { passive: true });
    updatePosition();
    char.classList.add('char-idle');

    return () => {
      window.removeEventListener('scroll', updatePosition);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return charRef;
}
