import { useEffect, useRef, useState } from 'react';

import PhaserFightingGame from './PhaserFightingGame';

// ─────────────────────────────────────────────────────────────
//  STATUS INDICATOR
// ─────────────────────────────────────────────────────────────
function BlinkDot({ color = '#00ff88' }: { color?: string }) {
  return (
    <span
      style={{
        display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
        background: color, boxShadow: `0 0 8px ${color}`,
        animation: 'arena-blink 1.4s step-end infinite', marginRight: 6, flexShrink: 0,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
//  ACTION BUTTON
// ─────────────────────────────────────────────────────────────
function CmdBtn({
  icon, label, href, color = '#00ccff',
}: { icon: string; label: string; href?: string; color?: string }) {
  const style: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 18px',
    background: `${color}10`,
    border: `1px solid ${color}55`,
    color,
    fontFamily: "'Press Start 2P', cursive",
    fontSize: '0.52rem',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
    textDecoration: 'none',
    flex: 1,
    justifyContent: 'center',
    boxShadow: `inset 0 0 12px ${color}08`,
    clipPath: 'polygon(4px 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%,0 4px)',
  };

  const el = (
    <a
      href={href ?? '#'}
      target={href ? '_blank' : undefined}
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={e => {
        const t = e.currentTarget as HTMLAnchorElement;
        t.style.background = `${color}22`;
        t.style.borderColor = color;
        t.style.boxShadow = `0 0 16px ${color}44, inset 0 0 12px ${color}15`;
      }}
      onMouseLeave={e => {
        const t = e.currentTarget as HTMLAnchorElement;
        t.style.background = `${color}10`;
        t.style.borderColor = `${color}55`;
        t.style.boxShadow = `inset 0 0 12px ${color}08`;
      }}
    >
      <i className={icon} style={{ fontSize: '0.8rem', color }} />
      {label}
    </a>
  );

  return el;
}

// ─────────────────────────────────────────────────────────────
//  PANEL WRAPPER
// ─────────────────────────────────────────────────────────────
function Panel({
  children, accent = '#00ccff', style = {},
}: { children: React.ReactNode; accent?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: 'rgba(4,8,20,0.90)',
        border: `1px solid ${accent}33`,
        boxShadow: `inset 0 0 20px ${accent}06, 0 0 18px ${accent}11`,
        backdropFilter: 'blur(6px)',
        position: 'relative',
        clipPath: 'polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)',
        ...style,
      }}
    >
      {/* Corner brackets */}
      {['top:0;left:0;borderTop:1px solid;borderLeft:1px solid', 'top:0;right:0;borderTop:1px solid;borderRight:1px solid', 'bottom:0;left:0;borderBottom:1px solid;borderLeft:1px solid', 'bottom:0;right:0;borderBottom:1px solid;borderRight:1px solid'].map((raw, i) => {
        const parts = raw.split(';').reduce<Record<string, string>>((acc, p) => {
          const [k, v] = p.split(':');
          acc[k] = v;
          return acc;
        }, {});
        return (
          <div key={i} style={{
            position: 'absolute',
            top: parts.top, bottom: parts.bottom, left: parts.left, right: parts.right,
            width: 10, height: 10,
            borderTopWidth: parts.borderTop ? 1 : 0,
            borderBottomWidth: parts.borderBottom ? 1 : 0,
            borderLeftWidth: parts.borderLeft ? 1 : 0,
            borderRightWidth: parts.borderRight ? 1 : 0,
            borderStyle: 'solid',
            borderColor: accent,
            opacity: 0.6,
          }} />
        );
      })}
      {children}
    </div>
  );
}

function PanelHdr({ icon, title, accent = '#00ccff' }: { icon: string; title: string; accent?: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '6px 14px',
      borderBottom: `1px solid ${accent}22`,
      background: `${accent}08`,
    }}>
      <i className={icon} style={{ color: accent, fontSize: '0.7rem' }} />
      <span style={{ fontFamily: "'Press Start 2P',cursive", fontSize: '0.48rem', color: accent, letterSpacing: '0.12em' }}>
        {title}
      </span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
        {['#ef476f', '#febc2e', '#28c840'].map(c => (
          <div key={c} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN EXPORT
// ─────────────────────────────────────────────────────────────
const DIAG_ITEMS = [
  { label: 'FLUTTER', value: 'READY', color: '#00ff88' },
  { label: 'AI SYSTEMS', value: 'READY', color: '#00ff88' },
  { label: 'CYBERSECURITY', value: 'READY', color: '#00ff88' },
  { label: 'HACKATHONS', value: 'ACTIVE', color: '#00ccff' },
];

const ACHIEVEMENT_ITEMS = [
  { label: 'PROJECTS BUILT', value: '15+', icon: 'fa-solid fa-layer-group' },
  { label: 'HACKATHONS WON', value: '2', icon: 'fa-solid fa-trophy' },
  { label: 'CERTIFICATIONS', value: '6+', icon: 'fa-solid fa-certificate' },
  { label: 'CURRENT QUEST', value: 'HIRING', icon: 'fa-solid fa-crosshairs' },
];

export default function ArenaZone() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });

  return (
    <div
      className="arena-root"
      style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'VT323', monospace",
        color: '#c8d8f0',
        gap: 0,
        padding: '12px 18px 10px',
        boxSizing: 'border-box',
      }}
    >
      {/* ── HEADER ───────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 10, flexShrink: 0 }}>
        <div style={{
          fontFamily: "'Press Start 2P',cursive",
          fontSize: 'clamp(0.75rem, 1.6vw, 1.1rem)',
          color: '#00ccff',
          letterSpacing: '0.18em',
          textShadow: '0 0 22px rgba(0,200,255,0.7), 0 0 6px rgba(0,200,255,0.5)',
          marginBottom: 4,
        }}>
          FINAL COMMAND CENTER
        </div>
        <div style={{
          fontFamily: "'VT323',monospace", fontSize: '1.1rem',
          color: '#6a8aaa', letterSpacing: '0.14em',
        }}>
          END OF JOURNEY. BEGINNING OF COLLABORATION.
        </div>
        {/* Divider */}
        <div style={{ position: 'relative', height: 2, margin: '8px 0' }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, #00ccff88, #00ccff, #00ccffcc, transparent)',
            filter: 'blur(1px)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, #00ccff, transparent)',
          }} />
        </div>
      </div>

      {/* ── MAIN SPLIT ───────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 14, flex: 1, minHeight: 0, overflow: 'hidden' }}>

        {/* ════ LEFT: CONTACT TERMINAL (40%) ════ */}
        <div style={{ width: '38%', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Contact terminal panel */}
          <Panel accent="#00ccff" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <PanelHdr icon="fa-solid fa-terminal" title="CONTACT TERMINAL" accent="#00ccff" />
            <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

              <div style={{
                fontFamily: "'Press Start 2P',cursive",
                fontSize: 'clamp(0.65rem, 1.4vw, 0.95rem)',
                color: '#ffffff',
                textShadow: '0 0 14px rgba(0,200,255,0.5)',
                marginBottom: 12,
                lineHeight: 1.5,
              }}>
               OPEN TO NEW VENTURES!
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
                {[
                  ['fa-solid fa-mobile-alt', 'Got a project for me?', '#00ccff'],
                  ['fa-solid fa-users', 'Looking for a Hackathon Teammate?', '#00ff88'],
                  ['fa-solid fa-rocket', 'Building a Startup?', '#ffd700'],
                       ['fa-solid fa-brain', 'Or just need a friend?', '#a855f7'],
                ].map(([icon, text, col]) => (
                  <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: '1.05rem', color: '#b0c8e0' }}>
                    <i className={icon as string} style={{ color: col as string, fontSize: '0.75rem', width: 14, textAlign: 'center' }} />
                    <span>{text as string}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: 7, marginBottom: 10, flexWrap: 'wrap' }}>
                <CmdBtn icon="fa-solid fa-envelope" label="CONTACT" href="mailto:prakhar@example.com" color="#00ccff" />
                <CmdBtn icon="fa-solid fa-file-alt" label="RESUME" href="#" color="#a855f7" />
              </div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                <CmdBtn icon="fa-brands fa-github" label="GITHUB" href="https://github.com" color="#00ff88" />
                <CmdBtn icon="fa-brands fa-linkedin" label="LINKEDIN" href="https://linkedin.com" color="#0ea5e9" />
              </div>
            </div>
          </Panel>

          {/* Status mini panel */}
          <Panel accent="#00ff88" style={{ flexShrink: 0 }}>
            <PanelHdr icon="fa-solid fa-signal" title="COMM STATUS" accent="#00ff88" />
            <div style={{ padding: '8px 14px', display: 'flex', flexWrap: 'wrap', gap: '4px 20px' }}>
              {[
                ['STATUS', 'ONLINE', '#00ff88'],
                ['AVAILABILITY', 'FOR PROJECTS', '#00ff88'],
                ['RESPONSE TIME', 'FAST', '#ffd700'],
                ['READY TO', 'BUILD', '#00ccff'],
              ].map(([k, v, c]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.9rem' }}>
                  <BlinkDot color={c} />
                  <span style={{ color: '#607080' }}>{k}:</span>
                  <span style={{ color: c, fontFamily: "'Press Start 2P',cursive", fontSize: '0.42rem', letterSpacing: '0.1em' }}>{v}</span>
                </div>
              ))}
            </div>
          </Panel>

        </div>

        {/* ════ RIGHT: SIMULATION ARENA (60%) ════ */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>

          {/* Monitor frame */}
          <Panel accent="#00ccff" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {/* Label above */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '7px 16px',
              borderBottom: '1px solid #00ccff22',
              background: 'rgba(0,200,255,0.06)',
              flexShrink: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <i className="fa-solid fa-gamepad" style={{ color: '#00ccff', fontSize: '0.8rem' }} />
                <span style={{ fontFamily: "'Press Start 2P',cursive", fontSize: '0.5rem', color: '#00ccff', letterSpacing: '0.15em' }}>
                  SIMULATION ARENA
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.85rem', color: '#507090' }}>
                <span style={{ color: '#00ff88' }}><BlinkDot color="#00ff88" />LIVE</span>
                <span>SYS/{timeStr}</span>
                {['fa-solid fa-expand', 'fa-solid fa-ellipsis-v'].map(ic => (
                  <i key={ic} className={ic} style={{ cursor: 'pointer', color: '#405060' }} />
                ))}
              </div>
            </div>

            {/* Game canvas area — futuristic monitor bezel */}
            <div style={{
              flex: 1, position: 'relative', padding: 12, overflow: 'hidden',
              display: 'flex', alignItems: 'stretch',
            }}>
              {/* Outer monitor glow */}
              <div style={{
                position: 'absolute', inset: 6,
                border: '1px solid #00ccff44',
                boxShadow: '0 0 30px rgba(0,200,255,0.18), inset 0 0 30px rgba(0,200,255,0.05)',
                pointerEvents: 'none', zIndex: 2,
                clipPath: 'polygon(8px 0,100% 0,100% calc(100%-8px),calc(100%-8px) 100%,0 100%,0 8px)',
              }} />

              {/* CRT scanline overlay */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 3,
                background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px)',
                pointerEvents: 'none',
              }} />

              {/* Corner accents */}
              {[{ top: 8, left: 8 }, { top: 8, right: 8 }, { bottom: 8, left: 8 }, { bottom: 8, right: 8 }].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute', ...pos,
                  width: 16, height: 16, zIndex: 4,
                  borderTop: i < 2 ? '2px solid #00ccff' : undefined,
                  borderBottom: i >= 2 ? '2px solid #00ccff' : undefined,
                  borderLeft: i % 2 === 0 ? '2px solid #00ccff' : undefined,
                  borderRight: i % 2 === 1 ? '2px solid #00ccff' : undefined,
                  opacity: 0.7,
                  pointerEvents: 'none',
                }} />
              ))}

              {/* The game */}
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
                <PhaserFightingGame />
              </div>
            </div>

            {/* Label below */}
            <div style={{
              padding: '5px 16px',
              borderTop: '1px solid #00ccff15',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'VT323',monospace", fontSize: '0.9rem', color: '#304a64' }}>
                PRKHR_AI.EXE TRAINING ENVIRONMENT
              </span>
              <span style={{ fontFamily: "'Press Start 2P',cursive", fontSize: '0.38rem', color: '#00ccff55', letterSpacing: '0.1em' }}>
                DEMO MODE — AUTO BATTLE
              </span>
            </div>
          </Panel>

          {/* ── Bottom row: diagnostics + achievements ── */}
          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>

            {/* System diagnostics */}
            <Panel accent="#00ff88" style={{ flex: 1 }}>
              <PanelHdr icon="fa-solid fa-microchip" title="SYSTEM STATUS" accent="#00ff88" />
              <div style={{ padding: '8px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 16px' }}>
                {DIAG_ITEMS.map(({ label, value, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.9rem' }}>
                    <BlinkDot color={color} />
                    <span style={{ color: '#405870', fontSize: '0.85rem' }}>{label}:</span>
                    <span style={{ color, fontFamily: "'Press Start 2P',cursive", fontSize: '0.38rem' }}>{value}</span>
                  </div>
                ))}
              </div>
            </Panel>

            {/* Achievements */}
            <Panel accent="#ffd700" style={{ flex: 1 }}>
              <PanelHdr icon="fa-solid fa-trophy" title="ACHIEVEMENTS" accent="#ffd700" />
              <div style={{ padding: '8px 14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 16px' }}>
                {ACHIEVEMENT_ITEMS.map(({ label, value, icon }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem' }}>
                    <i className={icon} style={{ color: '#ffd700', fontSize: '0.65rem', width: 12, textAlign: 'center' }} />
                    <span style={{ color: '#405870', fontSize: '0.85rem', flex: 1 }}>{label}:</span>
                    <span style={{
                      color: '#ffd700', fontFamily: "'Press Start 2P',cursive",
                      fontSize: '0.5rem',
                      textShadow: '0 0 8px rgba(255,215,0,0.5)',
                    }}>{value}</span>
                  </div>
                ))}
              </div>
            </Panel>

          </div>
        </div>

      </div>

      {/* ── CSS keyframes injected via style tag ── */}
      <style>{`
        @keyframes arena-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
