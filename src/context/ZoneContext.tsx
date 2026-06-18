import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import { HUD_LORE, type HudLore } from '../data/hudLore';


export interface ZoneContextType {
  activeZoneId: number | null;
  hudLore: HudLore;
  enterZone: (id: number) => void;
  exitZone: () => void;
}

const ZoneContext = createContext<ZoneContextType | null>(null);

function runTransition(onMidpoint: () => void): void {
  const el = document.getElementById('transition-overlay');
  if (!el) {
    onMidpoint();
    return;
  }
  el.classList.remove('overlay-out');
  el.classList.add('overlay-in');
  setTimeout(onMidpoint, 150);
  setTimeout(() => {
    el.classList.remove('overlay-in');
    el.classList.add('overlay-out');
  }, 300);
}

export function ZoneProvider({ children }: { children: ReactNode }) {
  const [activeZoneId, setActiveZoneId] = useState<number | null>(null);
  const transitioning = useRef(false);

  const hudLore =
    activeZoneId !== null ? HUD_LORE[activeZoneId] : HUD_LORE['home'];

  const enterZone = useCallback((id: number) => {
    if (transitioning.current) return;
    transitioning.current = true;
    runTransition(() => {
      setActiveZoneId(id);
      document.body.style.overflow = 'hidden';
      transitioning.current = false;
    });
  }, []);

  const exitZone = useCallback(() => {
    if (transitioning.current) return;
    transitioning.current = true;
    runTransition(() => {
      setActiveZoneId(null);
      document.body.style.overflow = '';
      transitioning.current = false;
    });
  }, []);

  return (
    <ZoneContext.Provider value={{ activeZoneId, hudLore, enterZone, exitZone }}>
      {children}
    </ZoneContext.Provider>
  );
}

export function useZone(): ZoneContextType {
  const ctx = useContext(ZoneContext);
  if (!ctx) throw new Error('useZone must be used within <ZoneProvider>');
  return ctx;
}
