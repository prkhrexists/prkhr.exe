import { useEffect } from 'react';
import { ZONES } from '../data/zones';
import { useZone } from '../context/ZoneContext';
import { ZONE_NAV } from '../data/codeCaveData';
import CodeCaveZone from './CodeCaveZone';

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
      className={zone ? 'zone-active' : ''}
      style={zone ? { backgroundImage: `url('${zone.bg}')` } : {}}
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
        /* Zone 1: no scroll, fill height, no padding — grid handles spacing */
        style={activeZoneId === 1 ? {
          alignItems: 'stretch',
          padding: 0,
          overflow: 'hidden',
        } : undefined}
      >
        {activeZoneId === 1 && <CodeCaveZone />}

        {/* Zones 2-5: standard panel */}
        {activeZoneId !== null && activeZoneId !== 1 && (
          <div id="zone-panel" className="panel-glitch">
            <div className="panel-topbar">
              <span className="panel-topbar-title" id="panel-topbar-title">
                {zone?.sub ?? 'SYSTEM CONSOLE — ZONE DATA LOADED'}
              </span>
              <div className="console-dots">
                <span className="console-dot dot-red"   />
                <span className="console-dot dot-yellow" />
                <span className="console-dot dot-green"  />
              </div>
            </div>
            <div className="panel-body">
              <p style={{ fontFamily: 'var(--font-term)', fontSize: '1.05rem', color: '#aaa', marginBottom: '1rem', lineHeight: 1.5 }}>
                {zone?.intro}
              </p>
              <div className="panel-projects">
                {zone?.projects.map(p => (
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
