import { useEffect, useRef } from 'react';
import { ZONES } from '../data/zones';

interface ZoneViewProps {
  activeZoneId: number | null;
  onExit: () => void;
}

function buildProjectCards(zoneId: number): string {
  const zone = ZONES[zoneId];
  if (!zone) return '';
  return zone.projects
    .map(p => {
      const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
      return `
        <div class="project-card">
          <div class="project-card-title">${p.title}</div>
          <div class="project-card-desc">${p.desc}</div>
          <div class="project-tags">${tags}</div>
        </div>`;
    })
    .join('');
}

export default function ZoneView({ activeZoneId, onExit }: ZoneViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const zone = activeZoneId !== null ? ZONES[activeZoneId] : null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeZoneId !== null) onExit();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [activeZoneId, onExit]);

  useEffect(() => {
    if (contentRef.current && activeZoneId !== null) {
      contentRef.current.innerHTML = `
        <p style="font-family:var(--font-term); font-size:1.05rem; color:#aaa; margin-bottom:1rem; line-height:1.5;">
          ${ZONES[activeZoneId]?.intro ?? ''}
        </p>
        <div class="panel-projects">${buildProjectCards(activeZoneId)}</div>`;
    }
  }, [activeZoneId]);

  return (
    <div
      id="zone-view"
      role="dialog"
      aria-modal="true"
      aria-label="Zone View"
      className={zone ? 'zone-active' : ''}
      style={zone ? { backgroundImage: `url('${zone.bg}')` } : {}}
    >
      <header id="zone-view-header">
        <div>
          <p className="zone-view-sub">// ZONE ENTERED</p>
          <h2 className="zone-view-title" id="zone-view-title">
            {zone?.name ?? ''}
          </h2>
        </div>
        <button className="btn btn-outline" id="return-to-map-btn" onClick={onExit}>
          <i className="fa-solid fa-arrow-left" /> RETURN TO MAP
        </button>
      </header>

      <div id="zone-content-area">
        <div id="zone-panel" className="panel-glitch">
          <div className="panel-topbar">
            <span className="panel-topbar-title" id="panel-topbar-title">
              {zone?.sub ?? 'SYSTEM CONSOLE — ZONE DATA LOADED'}
            </span>
            <div className="console-dots">
              <span className="console-dot dot-red" />
              <span className="console-dot dot-yellow" />
              <span className="console-dot dot-green" />
            </div>
          </div>
          <div className="panel-body">
            <div id="zone-panel-content" ref={contentRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
