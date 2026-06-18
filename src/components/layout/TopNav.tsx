import { useState } from 'react';
import { useZone } from '../../context/ZoneContext';

/**
 * Nav link config.
 * zoneId: null  → go back to home (exitZone)
 * zoneId: 1–5  → enterZone(id) with transition wipe
 */
const NAV_LINKS: { label: string; zoneId: number | null }[] = [
  { label: 'Home', zoneId: null },
  { label: 'About', zoneId: 1 }, // → Code Cave
  { label: 'Projects', zoneId: 2 }, // → Projects Hanger
  { label: 'Experience', zoneId: 3 }, // → The Bunker
  { label: 'Achievements', zoneId: 4 }, // → YellowDuck HQ
  { label: 'Contact', zoneId: 5 }, // → Arena
];

export default function TopNav() {
  const { activeZoneId, enterZone, exitZone } = useZone();
  const [playing, setPlaying] = useState(false);

  function handleNavClick(zoneId: number | null) {
    if (zoneId === null) {
      exitZone();
    } else {
      enterZone(zoneId);
    }
  }

  function handleMusic() {
    setPlaying(p => !p);
  }

  return (
    <header id="main-header">
      {/* Brand */}
      <div className="header-brand">
        <i className="fa-solid fa-duck header-brand-icon pixel-glow-yellow" />
        <div>
          <div className="brand-title">PRKHR.EXE</div>
          <div className="brand-subtitle">Warning: Unsupervised Learner Detected.</div>
        </div>
      </div>

      {/* Nav — each link triggers zone transition */}
      <nav id="main-nav" aria-label="Main navigation">
        {NAV_LINKS.map(link => {
          const isActive =
            link.zoneId === null
              ? activeZoneId === null          // Home active when no zone
              : activeZoneId === link.zoneId;  // Zone active when matching

          return (
            <a
              key={link.label}
              href="#"
              className={`nav-link${isActive ? ' active' : ''}`}
              onClick={e => {
                e.preventDefault();
                handleNavClick(link.zoneId);
              }}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Actions */}
      <div className="header-actions">
        <button
          className="btn btn-icon"
          id="music-toggle-btn"
          aria-label="Toggle music"
          title="Toggle music"
          onClick={handleMusic}
        >
          <i className={`fa-solid ${playing ? 'fa-volume-xmark' : 'fa-music'}`} />
        </button>
        <button className="btn btn-orange">
          RESUME.PDF <i className="fa-solid fa-download" />
        </button>
      </div>
    </header>
  );
}
