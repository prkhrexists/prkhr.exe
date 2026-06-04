import { useEffect, useRef, useState, useCallback } from 'react';
import {
  CHARACTER, STATS,
  MISSION_LOG, TECH_STACK, TERMINAL_COMMANDS,
} from '../data/codeCaveData';

// ─────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────

/** Renders either a devicon or a FontAwesome icon based on prefix */
function TechIcon({ icon, color }: { icon: string; color: string }) {
  if (icon.startsWith('fa:')) {
    const faClass = icon.slice(3);
    return <i className={`${faClass} rpg-ti`} style={{ color }} />;
  }
  return <i className={`${icon} colored rpg-ti`} />;
}

/** Segmented pixel XP bar */
function XpBar() {
  const segs  = 16;
  const filled = Math.round((CHARACTER.xpCurrent / CHARACTER.xpMax) * segs);
  return (
    <div className="rpg-xp-wrap">
      <div className="rpg-xp-header">
        <span className="rpg-xp-label">XP</span>
        <span className="rpg-xp-nums">{CHARACTER.xpCurrent} / {CHARACTER.xpMax} XP</span>
      </div>
      <div className="rpg-xp-track">
        {Array.from({ length: segs }).map((_, i) => (
          <div key={i} className={`rpg-xp-seg${i < filled ? ' filled' : ''}`} />
        ))}
      </div>
    </div>
  );
}

/** Segmented RPG stat bar */
function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  const segs   = 8;
  const filled = Math.round((value / 100) * segs);
  return (
    <div className="rpg-stat-row">
      <span className="rpg-stat-label">{label}</span>
      <div className="rpg-stat-track">
        {Array.from({ length: segs }).map((_, i) => (
          <div
            key={i}
            className="rpg-stat-seg"
            style={i < filled ? { background: color, boxShadow: `0 0 4px ${color}99` } : undefined}
          />
        ))}
      </div>
      <span className="rpg-stat-val">{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  TERMINAL
// ─────────────────────────────────────────────────────────────
interface Line { type: 'boot' | 'cmd' | 'output' | 'error' | 'blank'; text: string }
const PROMPT = 'prkhr@codecave:~$';

function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { type: 'boot',  text: 'System boot complete. Welcome to CODE CAVE.' },
    { type: 'blank', text: '' },
    { type: 'output',text: "Type 'help' to see available commands." },
    { type: 'blank', text: '' },
    { type: 'cmd',   text: `${PROMPT} help` },
    ...TERMINAL_COMMANDS['help'].map(t => ({ type: (t === '' ? 'blank' : 'output') as Line['type'], text: t })),
    { type: 'blank', text: '' },
  ]);
  const [input,   setInput]      = useState('');
  const [cmdHist, setCmdHist]    = useState<string[]>([]);
  const [hIdx,    setHIdx]       = useState(-1);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

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
        <div className="rpg-term-dots">
          <span className="rpg-dot rpg-dot-r" /><span className="rpg-dot rpg-dot-y" /><span className="rpg-dot rpg-dot-g" />
        </div>
        <span className="rpg-term-title">TERMINAL v2.1.0</span>
        <span className="rpg-term-live">● LIVE</span>
      </div>

      {/* body */}
      <div className="rpg-term-body">
        {/* CRT scanlines */}
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

      {/* ── Top-Left (Profile Area) ─────────────────────────── */}
      <div className="rpg-grid-box rpg-profile-area">
        {/* Left Side (Avatar Box) */}
        <div className="rpg-avatar-box">
          <div className="rpg-blueprint-bg" />
          <video
            src={CHARACTER.avatar}
            className="rpg-avatar-img"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="rpg-live-badge">
            <span className="rpg-live-dot" />
            <span className="rpg-live-text">LIVE FEED</span>
          </div>
        </div>

        {/* Right Side (Stats Box) */}
        <div className="rpg-stats-box">
          
          <div className="rpg-name-row">
            <h1 className="rpg-h1-name">Prakhar Jaiswal</h1>
          </div>

          <div className="rpg-subtitle">
            <div className="rpg-level-text">Level 21</div>
            <div className="rpg-role-text">CS Undergrad and AIML enthusiast</div>
          </div>

          <XpBar />

          <div className="rpg-divider" />

          <div className="rpg-stats-block">
            {STATS.map(s => <StatBar key={s.label} {...s} />)}
          </div>

        </div>
      </div>

      {/* ── Top-Right (Terminal Area) ───────────────────────── */}
      <div className="rpg-grid-box rpg-terminal-area">
        <Terminal />
      </div>

      {/* ── Bottom-Left (Mission Log) ───────────────────────── */}
      <div className="rpg-grid-box rpg-mission-area">
        <div className="rpg-panel-hdr">
          <i className="fa-solid fa-file-code rpg-panel-icon" />
          <span>MISSION LOG #001</span>
        </div>
        <div className="rpg-mission-body">
          {MISSION_LOG.lines.map((ln, i) =>
            ln === '' ? <br key={i} /> : <p key={i} className="rpg-mission-p">{ln}</p>
          )}
          <p className="rpg-mission-obj">
            <span className="rpg-obj-kw">OBJECTIVE:</span><br />
            {MISSION_LOG.objective}
          </p>
        </div>
      </div>

      {/* ── Bottom-Right (Tech Stack) ───────────────────────── */}
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
