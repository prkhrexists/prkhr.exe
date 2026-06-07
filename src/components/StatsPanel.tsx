import type { StatItem } from '../types';

const STATS: StatItem[] = [
  { label: 'LOGIC',          icon: 'fa-brain',     colorClass: 'c-purple', value: 93 },
  { label: 'INNOVATION',     icon: 'fa-lightbulb', colorClass: 'c-cyan',   value: 90 },
  { label: 'DEBUGGING',      icon: 'fa-bug',        colorClass: 'c-red',    value: 72 },
  { label: 'STRENGTH',       icon: 'fa-dumbbell',   colorClass: 'c-red',    value: 85 },
  { label: 'FOCUS',          icon: 'fa-crosshairs', colorClass: 'c-blue',   value: 35 },
];

const TOTAL_SEGS = 10;

function StatRow({ stat }: { stat: StatItem }) {
  const filled = Math.round(stat.value / TOTAL_SEGS);
  return (
    <div className="stat-row">
      <div className={`stat-label ${stat.colorClass}`}>
        <i className={`fa-solid ${stat.icon}`} />
        {stat.label}
      </div>
      <div className="stat-track">
        {Array.from({ length: TOTAL_SEGS }).map((_, i) => (
          <div key={i} className={`stat-seg${i >= filled ? ' empty' : ''}`} />
        ))}
      </div>
      <div className="stat-val">{stat.value}</div>
    </div>
  );
}

export default function StatsPanel() {
  return (
    <aside id="stats-panel" aria-label="Player stats">
      {/* Player card */}
      <div className="player-card">
        <div className="player-avatar">
          <img
            className="player-avatar-img"
            src="/Screenshot 2026-06-03 172209.png"
            alt="Player avatar"
          />
        </div>
        <div>
          <div className="player-name">PRAKHAR.EXE</div>
          <div className="player-level">Lv. 21 | Class: Edge AI Engineer</div>
        </div>
        {/* Music note icon REMOVED per spec */}
      </div>

      {/* XP Bar */}
      <div className="xp-bar-wrap">
        <div className="xp-track">
          <div className="xp-fill" style={{ width: '75%' }} />
        </div>
        <div className="xp-label">750 / 1000 XP</div>
      </div>

      {/* Stats — mapped from data array */}
      <div className="stat-rows">
        {STATS.map(stat => (
          <StatRow key={stat.label} stat={stat} />
        ))}
      </div>

      {/* Achievements row REMOVED per spec */}
    </aside>
  );
}
