import { useState, useCallback } from 'react';
import { ZoneProvider, useZone } from './context/ZoneContext';
import ParallaxBackground from './components/ParallaxBackground';
import RootLayout          from './components/RootLayout';
import StatsPanel          from './components/StatsPanel';
import Hero                from './components/Hero';
import RightPanel          from './components/RightPanel';
import ZoneGrid            from './components/ZoneGrid';
import ZoneView            from './components/ZoneView';
import { playRetroSound }  from './utils/audio';

function AppContent() {
  const { activeZoneId, enterZone, exitZone } = useZone();
  const [isPoweringUp, setIsPoweringUp] = useState(false);
  const [glitching, setGlitching] = useState(false);

  const handleExplore = useCallback(() => {
    if (isPoweringUp) return;
    
    // Play sound
    playRetroSound();
    
    // Trigger CSS glitch on the main wrapper
    setGlitching(true);
    setTimeout(() => setGlitching(false), 400);

    // Start powering up the grid
    setIsPoweringUp(true);
  }, [isPoweringUp]);

  const handlePowerUpComplete = useCallback(() => {
    // Scroll down to the zone grid smoothly
    document.getElementById('zone-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <ParallaxBackground />

      <ZoneView activeZoneId={activeZoneId} onExit={exitZone} />

      <RootLayout>
        <div id="map-view" className={glitching ? 'ui-glitch' : ''}>
          <div id="top-row">
            <StatsPanel />
            <Hero onExplore={handleExplore} />
            <RightPanel />
          </div>
          <ZoneGrid 
            onEnterZone={enterZone} 
            isPoweringUp={isPoweringUp} 
            onPowerUpComplete={handlePowerUpComplete} 
          />
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
