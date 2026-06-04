import { useState, useCallback } from 'react';
import { ZoneProvider, useZone } from './context/ZoneContext';
import ParallaxBackground from './components/ParallaxBackground';
import RootLayout          from './components/RootLayout';
import StatsPanel          from './components/StatsPanel';
import Hero                from './components/Hero';
import SystemConsole       from './components/SystemConsole';
import ZoneGrid            from './components/ZoneGrid';
import ZoneView            from './components/ZoneView';
import { playRetroSound }  from './utils/audio';

function AppContent() {
  const { activeZoneId, enterZone, exitZone } = useZone();
  const [glitching, setGlitching] = useState(false);

  const handleExplore = useCallback(() => {
    // Play sound
    playRetroSound();
    
    // Trigger CSS glitch on the main wrapper
    setGlitching(true);
    setTimeout(() => setGlitching(false), 400);

    // Instantly navigate to Level 1
    enterZone(1);
  }, [enterZone]);

  return (
    <>
      <ParallaxBackground />

      <ZoneView activeZoneId={activeZoneId} onExit={exitZone} />

      <RootLayout>
        <div id="map-view" className={glitching ? 'ui-glitch' : ''}>
          <div id="top-row">
            <div className="left-sidebar">
              <StatsPanel />
              <SystemConsole />
            </div>
            
            <Hero onExplore={handleExplore} />
            
            <div className="right-sidebar">
              <ZoneGrid onEnterZone={enterZone} />
            </div>
          </div>
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
