import { useEffect } from 'react';
import { useParallax } from '../hooks/useParallax';
import { useCharacterSprite } from '../hooks/useCharacterSprite';

export default function ParallaxBackground() {
  const { bgFarRef, bgMidRef, bgFrontRef } = useParallax();
  const charRef = useCharacterSprite();

  // Calibrate drone sprites on mount
  useEffect(() => {
    const drones = document.querySelectorAll<HTMLDivElement>('.drone-sprite');
    if (!drones.length) return;
    const testImg = new Image();
    testImg.src = '/DroneSprite.png';
    testImg.onload = () => {
      const w = testImg.naturalWidth;
      const h = testImg.naturalHeight;
      const frameH = h;
      drones.forEach(drone => {
        drone.style.backgroundSize = `${w}px ${frameH}px`;
        drone.style.width  = `${Math.min(frameH, 64)}px`;
        drone.style.height = `${Math.min(frameH, 64)}px`;
      });
    };
  }, []);

  // Calibrate duck sprite on mount
  useEffect(() => {
    const duck = document.querySelector<HTMLDivElement>('.duck-sprite');
    if (!duck) return;
    const testImg = new Image();
    testImg.src = '/YellowDuckSprite.png';
    testImg.onload = () => {
      const w = testImg.naturalWidth;
      const h = testImg.naturalHeight;
      duck.style.backgroundSize = `${w}px ${h}px`;
      duck.style.width  = `${Math.min(h, 52)}px`;
      duck.style.height = `${Math.min(h, 52)}px`;
    };
  }, []);

  return (
    <>
      {/* Parallax background layers */}
      <div id="parallax-env" aria-hidden="true">
        <div className="bg-layer" id="bg-sky" />
        <div className="bg-layer" id="bg-far"   ref={bgFarRef}>
          <video
            src="/bg.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="bg-layer" id="bg-mid"   ref={bgMidRef} />
        <div className="bg-layer" id="bg-front" ref={bgFrontRef} />
      </div>

      {/* CRT overlay */}
      <div id="crt-overlay" aria-hidden="true" />

      {/* Ambient sprites */}
      <div id="ambient-layer" aria-hidden="true">
        <div className="drone-sprite drone-a" />
        <div className="drone-sprite drone-b" />
        <div className="drone-sprite drone-c" />
        <div className="duck-sprite" />
      </div>

      {/* Scroll character */}
      <div id="character-track" aria-hidden="true">
        <div id="scroll-character" className="char-idle" ref={charRef}>
          <div id="char-bubble">LOADING…</div>
        </div>
      </div>

      {/* Transition overlay */}
      <div id="transition-overlay" aria-hidden="true" />
    </>
  );
}
