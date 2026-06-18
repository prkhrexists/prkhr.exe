import { useState, useCallback } from 'react';
import { useTransform, motion } from 'framer-motion';
import { ZoneProvider, useZone } from './context/ZoneContext';
import { useScrollDriver }       from './hooks/useScrollDriver';
import ParallaxBackground        from './components/ParallaxBackground';
import RootLayout                from './components/RootLayout';
import StatsPanel                from './components/StatsPanel';
import Hero                      from './components/Hero';
import SystemConsole             from './components/SystemConsole';
import ZoneGrid                  from './components/ZoneGrid';
import ZoneView                  from './components/ZoneView';
import ArcadeWorldMap            from './components/ArcadeWorldMap/ArcadeWorldMap';
import { playRetroSound }        from './utils/audio';

function AppContent() {
  const { activeZoneId, enterZone, exitZone } = useZone();
  const [glitching, setGlitching] = useState(false);

  // ── Scroll driver (pointer tracking, wheel hijack, CSS vars, spring) ─────
  const { scrollRef, smoothScroll } = useScrollDriver();

  // ── Transform outputs ─────────────────────────────────────────────────────
  // Left sidebar: fade out + slide left
  const leftOpacity = useTransform(smoothScroll, [0, 0.45], [1, 0]);
  const leftX       = useTransform(smoothScroll, [0, 0.5],  [0, -140]);

  // Hero center: fade out + slide up
  const heroOpacity = useTransform(smoothScroll, [0, 0.4],  [1, 0]);
  const heroY       = useTransform(smoothScroll, [0, 0.45], [0, -80]);

  // Scroll indicator: fade out quickly
  const scrollHintOpacity = useTransform(smoothScroll, [0, 0.15], [1, 0]);

  const handleExplore = useCallback(() => {
    playRetroSound();

    // Trigger CSS glitch on the main wrapper
    setGlitching(true);
    setTimeout(() => setGlitching(false), 400);

    enterZone(1);
  }, [enterZone]);

  return (
    <>
      <ParallaxBackground />

      {/* ── Zone detail view (takes over when a zone is active) ────────── */}
      <ZoneView activeZoneId={activeZoneId} onExit={exitZone} />

      {/* ── Scroll driver overlay ───────────────────────────────────────── */}
      {/* Fixed full-screen div; its scrollTop drives the rawScroll value. */}
      <div
        ref={scrollRef}
        style={{
          position:      'fixed',
          inset:         0,
          zIndex:        5,
          overflowY:     'scroll',
          overflowX:     'hidden',
          scrollbarWidth:'thin',
          scrollbarColor:'rgba(0,255,255,0.2) transparent',
          background:    'transparent',
        }}
      >
        <div style={{ height: '500vh', width: '100%', pointerEvents: 'none' }} />
      </div>

      {/* ── Main UI layer ───────────────────────────────────────────────── */}
      <RootLayout>
        <div id="map-view" className={glitching ? 'ui-glitch' : ''}>
          <div id="top-row">

            {/* Left sidebar fades out and slides left */}
            <motion.div
              className="left-sidebar"
              style={{ opacity: leftOpacity, x: leftX }}
            >
              <StatsPanel />
              <SystemConsole />
            </motion.div>

            {/* Hero center fades out and rises */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY, flex: 1 }}
              className={glitching ? 'animate-pulse' : ''}
            >
              <Hero onExplore={handleExplore} />
            </motion.div>

            {/* Right sidebar fades out */}
            <motion.div className="right-sidebar" style={{ opacity: leftOpacity }}>
              <ZoneGrid onEnterZone={enterZone} />
            </motion.div>
          </div>

          {/* Arcade World Map takes over after scrolling */}
          <ArcadeWorldMap scrollProgress={smoothScroll} />

          {/* Scroll hint — bounces and fades away as you start scrolling */}
          <motion.div
            className="scroll-down-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[0.65rem] text-cyan-400 font-pixel tracking-widest gap-2"
            style={{ opacity: scrollHintOpacity }}
            aria-hidden="true"
          >
            <span className="animate-pulse">SCROLL DOWN</span>
            <span className="animate-bounce text-lg">↓</span>
          </motion.div>
        </div>
      </RootLayout>
    </>
  );
}

export default function App() {
  return (
    <ZoneProvider>
      <AppContent />
    </ZoneProvider>
  );
}
