import { useEffect } from 'react';
import { ZONES } from '../../data/zones';
import { useZone } from '../../context/ZoneContext';
import { ZONE_NAV } from '../../data/codeCaveData';
import CodeCaveZone from './CodeCaveZone';
import YellowDuckZone from './YellowDuckZone';
import ArenaZone from './ArenaZone';
import ProjectsHangarZone from './ProjectsHangarZone';

// Custom zone components registry
const customZones: Record<number, React.ReactNode> = {
  1: <CodeCaveZone />,
  2: <ProjectsHangarZone />,
  4: <YellowDuckZone />,
  5: <ArenaZone />,
};

interface ZoneViewProps {
  activeZoneId: number | null;
  onExit: () => void;
}

export default function ZoneView({ activeZoneId, onExit }: ZoneViewProps) {
  const zone = activeZoneId !== null ? ZONES[activeZoneId] : null;
  const { enterZone } = useZone();

  // Escape key exits zone
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape' && activeZoneId !== null) onExit(); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [activeZoneId, onExit]);

  return (
    <div
      id="zone-view"
      role="dialog"
      aria-modal="true"
      aria-label="Zone View"
      className={zone ? `zone-active ${activeZoneId === 4 ? 'zone-hq' : ''}` : ''}
      style={zone ? {
        backgroundImage: `url('${zone.bg}')`,
        backgroundPosition: activeZoneId === 4 ? 'center bottom' : 'center',
        backgroundSize: activeZoneId === 4 ? '100% 99%' : 'cover',
        backgroundColor: activeZoneId === 4 ? '#050510' : activeZoneId === 5 ? '#020610' : 'transparent',
        backgroundBlendMode: activeZoneId === 5 ? 'luminosity' : undefined,
        filter: activeZoneId === 5 ? undefined : undefined,
      } : {}}
    >
      {/* ─── header ─────────────────────────────────────────── */}
      <header id="zone-view-header">
        {/* left: zone label */}
        <div className="zvh-left">
          <p className="zone-view-sub">// ZONE ENTERED</p>
          <h2 className="zone-view-title" id="zone-view-title">{zone?.name ?? ''}</h2>
        </div>

        {/* center: zone shortcuts — always visible when any zone is open */}
        {zone && (
          <nav className="zvh-zone-nav" aria-label="Zone shortcuts">
            {ZONE_NAV.map(z => (
              <button
                key={z.id}
                className={`zvh-zone-btn${activeZoneId === z.id ? ' zvh-zone-active' : ''}`}
                onClick={() => { if (z.id !== activeZoneId) enterZone(z.id); }}
              >
                {z.label}
              </button>
            ))}
          </nav>
        )}

        {/* right: return */}
        <button className="btn btn-outline" id="return-to-map-btn" onClick={onExit}>
          <i className="fa-solid fa-arrow-left" /> RETURN TO MAP
        </button>
      </header>

      {/* ─── content ─────────────────────────────────────────── */}
      <div
        id="zone-content-area"
        style={
          activeZoneId === 1 ? {
            alignItems: 'stretch',
            padding: '2.5rem 3.5rem',
            overflow: 'hidden',
          } : activeZoneId === 2 ? {
            alignItems: 'stretch',
            padding: 0,
            overflow: 'hidden',
          } : activeZoneId === 4 ? {
            alignItems: 'stretch',
            padding: '25vh 4vw 4vh 4vw',
            overflow: 'hidden',
            background: 'transparent',
          } : activeZoneId === 5 ? {
            alignItems: 'stretch',
            padding: 0,
            overflow: 'hidden',
          } : undefined
        }
      >
        {/* Render custom component from registry if it exists */}
        {activeZoneId !== null && customZones[activeZoneId]}

        {/* Standard panel for non-custom zones */}
        {activeZoneId !== null && zone && !zone.hasCustomView && (
          <div id="zone-panel" className="panel-glitch">
            <div className="panel-topbar">
              <span className="panel-topbar-title" id="panel-topbar-title">
                {zone.sub ?? 'SYSTEM CONSOLE — ZONE DATA LOADED'}
              </span>
              <div className="console-dots">
                <span className="console-dot dot-red" />
                <span className="console-dot dot-yellow" />
                <span className="console-dot dot-green" />
              </div>
            </div>
            <div className="panel-body">
              <p style={{ fontFamily: 'var(--font-term)', fontSize: '1.05rem', color: '#aaa', marginBottom: '1rem', lineHeight: 1.5 }}>
                {zone.intro}
              </p>
              <div className="panel-projects">
                {zone.projects.map(p => (
                  <div key={p.title} className="project-card">
                    <div className="project-card-title">{p.title}</div>
                    <div className="project-card-desc">{p.desc}</div>
                    <div className="project-tags">
                      {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
