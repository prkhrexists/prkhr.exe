import { useEffect, useRef, useState, useCallback } from 'react';
import {
  CHARACTER, STATS,
  MISSION_LOG, TECH_STACK, TERMINAL_COMMANDS,
} from '../data/codeCaveData';

// ─────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────

/** Renders either a devicon or a FontAwesome icon */
function TechIcon({ icon, color }: { icon: string; color: string }) {
  if (icon.startsWith('fa:')) {
    const faClass = icon.slice(3);
    return <i className={`${faClass} rpg-ti`} style={{ color }} />;
  }
  return <i className={`${icon} colored rpg-ti`} />;
}

/** Segmented pixel XP bar — full width */
function XpBar() {
  const segs   = 20;
  const filled = Math.round((CHARACTER.xpCurrent / CHARACTER.xpMax) * segs);
  return (
    <div className="ps-xp-wrap">
      <div className="ps-xp-row">
        <span className="ps-xp-label">XP</span>
        <div className="ps-xp-track">
          {Array.from({ length: segs }).map((_, i) => (
            <div key={i} className={`ps-xp-seg${i < filled ? ' filled' : ''}`} />
          ))}
        </div>
        <span className="ps-xp-nums">{CHARACTER.xpCurrent} / {CHARACTER.xpMax} XP</span>
      </div>
    </div>
  );
}

/** Stat bar row matching the reference image style */
function StatBar({
  label, value, color, icon,
}: {
  label: string; value: number; color: string; icon: string;
}) {
  const segs   = 12;
  const filled = Math.round((value / 100) * segs);
  return (
    <div className="ps-stat-row">
      <i className={`fa-solid ${icon} ps-stat-icon`} style={{ color }} />
      <span className="ps-stat-label" style={{ color }}>{label}</span>
      <div className="ps-stat-track">
        {Array.from({ length: segs }).map((_, i) => (
          <div
            key={i}
            className="ps-stat-seg"
            style={i < filled ? { background: '#FFD700', boxShadow: '0 0 3px #FFD70077' } : undefined}
          />
        ))}
      </div>
      <span className="ps-stat-val">{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  SYSTEM STATUS (bottom of Player Status panel)
// ─────────────────────────────────────────────────────────────
const SYSTEM_VITALS = [
  { label: 'Caffeine Levels',    value: 'Critical',  color: '#FFD700' },
  { label: 'Stack Overflow',     value: 'Pinging',   color: '#00ffff' },
  { label: 'Imposter Syndrome',  value: 'Suppressed',color: '#00ff88' },
  { label: 'Bugs in Prod',       value: 'Features',  color: '#ef476f' },
];

// STAT icons matching reference
const STAT_ICONS: Record<string, string> = {
  Logic:          'fa-brain',
  Innovation:     'fa-lightbulb',
  Debugging:      'fa-bug',
  Strength:       'fa-dumbbell',
  'Attention Span': 'fa-crosshairs',
};

// ─────────────────────────────────────────────────────────────
//  TERMINAL
// ─────────────────────────────────────────────────────────────
interface Line { type: 'boot' | 'cmd' | 'output' | 'error' | 'blank' | 'highlight'; text: string }
const PROMPT = 'prkhr@codecave:~$';

function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { type: 'boot',      text: 'System boot complete. Welcome to CODE CAVE.' },
    { type: 'blank',     text: '' },
    { type: 'highlight', text: "Type 'help' to see available commands." },
    { type: 'blank',     text: '' },
    { type: 'cmd',       text: `${PROMPT} help` },
    ...TERMINAL_COMMANDS['help'].map(t => ({
      type: (t === '' ? 'blank' : 'output') as Line['type'],
      text: t,
    })),
    { type: 'blank', text: '' },
  ]);
  const [input,   setInput]   = useState('');
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [hIdx,    setHIdx]    = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const run = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setCmdHist(h => [raw, ...h]);
    setHIdx(-1);
    const entry: Line = { type: 'cmd', text: `${PROMPT} ${raw}` };
    if (cmd === 'clear') { setHistory([]); return; }
    const lines = TERMINAL_COMMANDS[cmd];
    if (lines) {
      setHistory(h => [
        ...h, entry,
        ...lines.map(t => ({ type: (t === '' ? 'blank' : 'output') as Line['type'], text: t })),
        { type: 'blank', text: '' },
      ]);
    } else {
      setHistory(h => [
        ...h, entry,
        { type: 'error', text: `bash: ${cmd}: command not found. Type 'help'.` },
        { type: 'blank', text: '' },
      ]);
    }
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { run(input); setInput(''); }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const n = Math.min(hIdx + 1, cmdHist.length - 1);
      setHIdx(n); setInput(cmdHist[n] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const n = Math.max(hIdx - 1, -1);
      setHIdx(n); setInput(n === -1 ? '' : cmdHist[n]);
    }
  }

  return (
    <div className="rpg-terminal" onClick={() => inputRef.current?.focus()}>
      {/* title bar */}
      <div className="rpg-term-bar">
        <span className="rpg-term-title-label">ACTIVE TERMINAL</span>
        <span className="rpg-term-version">TERMINAL v2.1.0</span>
        <div className="rpg-term-dots">
          <span className="rpg-dot rpg-dot-r" />
          <span className="rpg-dot rpg-dot-y" />
          <span className="rpg-dot rpg-dot-g" />
        </div>
      </div>

      {/* body */}
      <div className="rpg-term-body">
        <div className="rpg-term-scan" />
        <div className="rpg-term-content">
          {history.map((ln, i) =>
            ln.type === 'blank'
              ? <div key={i} className="rpg-t-blank" />
              : <div key={i} className={`rpg-t-line rpg-t-${ln.type}`}>{ln.text}</div>
          )}
          {/* live input */}
          <div className="rpg-t-input-row">
            <span className="rpg-t-prompt">{PROMPT}&nbsp;</span>
            <span className="rpg-t-typed">{input}</span>
            <span className="rpg-cursor" />
            <input
              ref={inputRef}
              className="rpg-t-hidden-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoFocus
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN
// ─────────────────────────────────────────────────────────────
export default function CodeCaveZone() {
  return (
    <div className="rpg-root">

      {/* ══ TOP-LEFT: Player Status ══════════════════════════════ */}
      <div className="rpg-grid-box rpg-player-status-panel">

        {/* Panel header */}
        <div className="rpg-panel-hdr">
          <i className="fa-solid fa-user rpg-panel-icon" />
          <span>PLAYER STATUS</span>
        </div>

        {/* Avatar + name + class row */}
        <div className="ps-card-row">
          {/* Avatar */}
          <div className="ps-avatar">
            <img
              src="/Screenshot 2026-06-03 172209.png"
              alt="Player avatar"
              className="ps-avatar-img"
            />
            <div className="ps-avatar-scanlines" />
          </div>
          {/* Identity */}
          <div className="ps-identity">
            <div className="ps-name">PRKHR</div>
            <div className="ps-class">Lv. {CHARACTER.level} | AI Enthusiast</div>
          </div>
        </div>

        {/* XP bar */}
        <XpBar />

        {/* Divider */}
        <div className="rpg-divider" />

        {/* Stat bars */}
        <div className="ps-stats-list">
          {STATS.map(s => (
            <StatBar
              key={s.label}
              label={s.label}
              value={s.value}
              color={s.color}
              icon={STAT_ICONS[s.label] ?? 'fa-circle'}
            />
          ))}
        </div>

        {/* System Status sub-panel */}
        <div className="rpg-divider" />
        <div className="ps-sys-status">
          <div className="ps-sys-hdr">
            <i className="fa-solid fa-terminal" style={{ fontSize: '0.5rem' }} />
            <span>SYSTEM STATUS</span>
          </div>
          <div className="ps-sys-body">
            <div className="ps-sys-lines">
              {SYSTEM_VITALS.map(v => (
                <div key={v.label} className="ps-sys-row">
                  <span className="ps-sys-chevron">&gt;</span>
                  <span className="ps-sys-key">{v.label}:</span>
                  <span className="ps-sys-val" style={{ color: v.color }}>{v.value}</span>
                </div>
              ))}
            </div>
            {/* Mini pixel-art screen — fills remaining width */}
            <div className="ps-sys-miniscreen" aria-hidden="true">
              <div className="ps-ms-grid" />
              <div className="ps-ms-dot ps-ms-d1" />
              <div className="ps-ms-dot ps-ms-d2" />
              <div className="ps-ms-dot ps-ms-d3" />
              <div className="ps-ms-d4" />
              <div className="ps-ms-d5" />
              <div className="ps-ms-scanline" />
            </div>
          </div>
        </div>
      </div>

      {/* ══ TOP-RIGHT: Active Terminal ═══════════════════════════ */}
      <div className="rpg-grid-box rpg-terminal-area">
        <Terminal />
      </div>

      {/* ══ BOTTOM-LEFT: About Me ════════════════════════════════ */}
      <div className="rpg-grid-box rpg-about-panel">
        <div className="rpg-panel-hdr">
          <i className="fa-solid fa-user-astronaut rpg-panel-icon" />
          <span>ABOUT ME</span>
        </div>

        <div className="about-inner">
          {/* Text block */}
          <div className="about-text-block">
            {MISSION_LOG.lines.map((ln, i) =>
              ln === '' ? <br key={i} /> : <p key={i} className="about-p">{ln}</p>
            )}
            <p className="about-objective">
              <span className="rpg-obj-kw">OBJECTIVE:</span><br />
              {MISSION_LOG.objective}
            </p>
          </div>
        </div>
      </div>

      {/* ══ BOTTOM-RIGHT: Tech Stack ═════════════════════════════ */}
      <div className="rpg-grid-box rpg-tech-area">
        <div className="rpg-panel-hdr">
          <i className="fa-solid fa-gear rpg-panel-icon" />
          <span>TECH STACK</span>
        </div>

        <div className="rpg-tech-table">
          {TECH_STACK.map(cat => (
            <div key={cat.category} className="rpg-tech-row">
              <span className="rpg-tech-cat" style={{ color: cat.accent }}>
                {cat.category.toUpperCase()}
              </span>
              <div className="rpg-tech-items">
                {cat.items.map(item => (
                  <div
                    key={item.name}
                    className="rpg-tech-card"
                    style={{ '--tc': item.color } as React.CSSProperties}
                  >
                    <TechIcon icon={item.icon} color={item.color} />
                    <span className="rpg-tc-name">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
