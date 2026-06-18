import { useState } from 'react';

/* ─── Project Data ─────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 'PF25',
    name: 'Portfolio Website',
    year: 2025,
    tech: 'Next.js, Tailwind, Phaser.js',
    desc: 'A gamified portfolio with retro arcade experience. Five explorable zones, RPG mechanics and drone delivery system.',
    crateColor: '#00FF88',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'CS50',
    name: 'CS50 Projects',
    year: 2025,
    tech: 'C, Python, SQL, Flask',
    desc: "Harvard CS50x capstone projects. Full-stack web app, C data structures, Python algorithms built under academic conditions.",
    crateColor: '#FFB800',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'FL25',
    name: 'Flutter App',
    year: 2025,
    tech: 'Flutter, Dart, Firebase',
    desc: 'Cross-platform mobile application with real-time sync, offline-first architecture and adaptive dark-mode UI.',
    crateColor: '#00DFFF',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'HK25',
    name: 'Hackathon Project',
    year: 2025,
    tech: 'React, Node.js, Firebase',
    desc: 'Award-winning national cybersecurity competition. Live vulnerability scanner with automated CVSS scoring.',
    crateColor: '#FF2244',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 'CS26',
    name: 'CyberShield 2026',
    year: 2026,
    tech: 'Python, TensorFlow, Docker',
    desc: 'AI-powered threat detection for enterprise cybersecurity. Classifies threats in real time using neural networks.',
    crateColor: '#B04AFF',
    liveUrl: '#',
    githubUrl: '#',
  },
];

function wait(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}

export default function ProjectsHangarZone() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);

  // Drone animation state
  const [droneY, setDroneY] = useState(0);
  const [isFloating, setIsFloating] = useState(true);
  const [droneTransition, setDroneTransition] = useState('transform 0.7s cubic-bezier(0.4,0,0.2,1)');

  // Crate state
  const [showCrate, setShowCrate] = useState(false);
  const [crateScale, setCrateScale] = useState(0);
  const [scanning, setScanning] = useState(false);

  // Beam state
  const [beamOpacity, setBeamOpacity] = useState(0.5);

  // Payload panel state
  const [showPayload, setShowPayload] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState('AWAITING SELECTION');
  const [statusColor, setStatusColor] = useState('#4A8A60');

  const activeP = activeIdx !== null ? PROJECTS[activeIdx] : null;

  const selectProject = async (idx: number) => {
    if (busy || idx === activeIdx) return;
    setBusy(true);
    setShowPayload(false);

    const p = PROJECTS[idx];
    setActiveIdx(idx);

    // Phase 1: Drone descends
    setIsFloating(false);
    setDroneTransition('transform 0.7s cubic-bezier(0.4,0,0.2,1)');
    setDeliveryStatus('LOCATING PAYLOAD...');
    setStatusColor('#FFB800');
    setBeamOpacity(0.9);
    setDroneY(40);
    await wait(750);

    // Phase 2: Crate appears
    setDeliveryStatus('PAYLOAD ACQUIRED');
    setStatusColor('#00FF88');
    setShowCrate(true);
    setCrateScale(0);
    await wait(100);
    setCrateScale(1);
    await wait(600);

    // Phase 3: Drone rises back
    setDeliveryStatus('DELIVERY IN TRANSIT...');
    setStatusColor('#00DFFF');
    setDroneY(0);
    await wait(800);

    // Phase 4: Scanning
    setDeliveryStatus('SCANNING PAYLOAD...');
    setScanning(true);
    setBeamOpacity(1);
    await wait(1400);
    setScanning(false);

    // Phase 5: Complete — resume float
    setDeliveryStatus('PAYLOAD ARRIVED ✓');
    setStatusColor('#00FF88');
    setBeamOpacity(0.5);
    setDroneTransition('none');
    setDroneY(0);
    setIsFloating(true);
    setShowPayload(true);

    setBusy(false);
  };

  const years = [...new Set(PROJECTS.map(p => p.year))].sort((a, b) => b - a);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Share Tech Mono', 'Courier New', monospace",
    }}>

      {/* ── Keyframe Styles ─────────────────────────────────── */}
      <style>{`
        @keyframes ph-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes ph-rotor {
          to { transform: rotate(360deg); }
        }
        @keyframes ph-rotor-rev {
          to { transform: rotate(-360deg); }
        }
        @keyframes ph-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes ph-beam-pulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.85; }
        }
        @keyframes ph-scanline {
          from { top: 0%; opacity: 0.9; }
          to   { top: 100%; opacity: 0.1; }
        }
        @keyframes ph-crate-in {
          from { transform: scaleY(0) translateY(-10px); opacity: 0; }
          to   { transform: scaleY(1) translateY(0); opacity: 1; }
        }
        @keyframes ph-ring-pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.7; }
        }
        @keyframes ph-text-glow {
          0%, 100% { text-shadow: 0 0 6px rgba(0,255,136,0.4); }
          50%       { text-shadow: 0 0 14px rgba(0,255,136,0.9); }
        }
        @keyframes ph-dot-blink {
          0%, 49% { background: #00FF88; box-shadow: 0 0 6px #00FF88; }
          50%, 100% { background: #0A2A15; box-shadow: none; }
        }
        @keyframes ph-status-slide {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .ph-rotor-a { animation: ph-rotor 0.28s linear infinite; }
        .ph-rotor-b { animation: ph-rotor-rev 0.28s linear infinite; }
        .ph-floating { animation: ph-float 2.8s ease-in-out infinite; }
        .ph-list-item {
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
          border-left: 2px solid transparent;
        }
        .ph-list-item:hover {
          background: rgba(0,255,136,0.06) !important;
          border-left-color: rgba(0,255,136,0.4) !important;
        }
        .ph-list-item.ph-active {
          background: rgba(0,255,136,0.1) !important;
          border-left-color: #00FF88 !important;
        }
        .ph-list-item.ph-active .ph-proj-name {
          color: #00FF88 !important;
          animation: ph-text-glow 2s ease-in-out infinite;
        }
        .ph-btn {
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
          font-family: 'Press Start 2P', monospace;
        }
        .ph-btn:hover {
          transform: translateY(-1px);
        }
        .ph-btn-primary:hover {
          background: rgba(0,255,136,0.15) !important;
          box-shadow: 0 0 14px rgba(0,255,136,0.35) !important;
        }
        .ph-btn-secondary:hover {
          background: rgba(0,255,136,0.05) !important;
          border-color: rgba(0,255,136,0.3) !important;
        }
      `}</style>

      {/* ── Outer Shell ─────────────────────────────────────── */}
      <div style={{
        width: '100%',
        height: '100%',
        background: '#050F08',
        border: '2px solid #00FF41',
        boxShadow: '0 0 0 1px #001A08, 0 0 30px rgba(0,255,65,0.2), inset 0 0 60px rgba(0,20,10,0.8)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Scanline overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none',
          background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)',
        }} />
        {/* Corner vignette */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 19, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* ── Top Bar ────────────────────────────────────────── */}
        <div style={{
          background: '#020C05',
          borderBottom: '1px solid #00FF41',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          position: 'relative',
          zIndex: 10,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#4A8A60', letterSpacing: 2 }}>
              TYPE 3
            </span>
            <span style={{ color: '#1A3A20', fontSize: 8 }}>—</span>
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 6, color: '#00FF88', letterSpacing: 3 }}>
              DRONE DELIVERY
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ animation: 'ph-dot-blink 1.2s infinite', width: 6, height: 6, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 6px #00FF88' }} />
            <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 5, color: '#4A8A60', letterSpacing: 1 }}>
              ONLINE
            </span>
          </div>
        </div>

        {/* ── Main Three-Panel Body ───────────────────────────── */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative', zIndex: 5 }}>

          {/* ══ LEFT PANEL — PROJECT LOG ════════════════════════ */}
          <div style={{
            width: 190,
            background: '#020C05',
            borderRight: '1px solid #00FF41',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
          }}>
            {/* Header */}
            <div style={{
              padding: '10px 14px 8px',
              borderBottom: '1px solid #0A3018',
            }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#00FF88', letterSpacing: 2, lineHeight: 1.8 }}>
                PROJECT LOG
              </div>
              <div style={{ marginTop: 4, fontSize: 7, color: '#2A5A35', letterSpacing: 1 }}>
                LZ-ARCHIVE / ACTIVE
              </div>
            </div>

            {/* Project list grouped by year */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
              {years.map(year => (
                <div key={year}>
                  <div style={{
                    padding: '4px 14px',
                    fontSize: 7,
                    color: '#2A6A3A',
                    letterSpacing: 3,
                    fontFamily: "'Share Tech Mono', monospace",
                  }}>
                    {year}
                  </div>
                  {PROJECTS
                    .map((p, i) => ({ p, i }))
                    .filter(({ p }) => p.year === year)
                    .map(({ p, i }) => (
                      <div
                        key={p.id}
                        className={`ph-list-item ${activeIdx === i ? 'ph-active' : ''}`}
                        onClick={() => selectProject(i)}
                        style={{
                          padding: '6px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        {/* Bullet */}
                        <div style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          border: `1px solid ${activeIdx === i ? '#00FF88' : '#2A5A35'}`,
                          background: activeIdx === i ? '#00FF88' : 'transparent',
                          boxShadow: activeIdx === i ? '0 0 6px #00FF88' : 'none',
                          flexShrink: 0,
                          transition: 'all 0.2s',
                        }} />
                        <span
                          className="ph-proj-name"
                          style={{
                            fontSize: 8,
                            color: activeIdx === i ? '#00FF88' : '#8ABFA0',
                            lineHeight: 1.4,
                            transition: 'color 0.2s',
                          }}
                        >
                          {p.name}
                        </span>
                      </div>
                    ))}
                </div>
              ))}
            </div>

            {/* System Status Footer */}
            <div style={{
              borderTop: '1px solid #0A3018',
              padding: '8px 14px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 5, color: '#4A8A60', letterSpacing: 1 }}>
                  SYSTEM STATUS
                </span>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00FF88', boxShadow: '0 0 5px #00FF88', animation: 'ph-dot-blink 2s infinite' }} />
              </div>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 5, color: '#00FF88', letterSpacing: 1, lineHeight: 1.8 }}>
                ALL SYSTEMS<br />OPERATIONAL
              </div>
            </div>
          </div>

          {/* ══ CENTER PANEL — DRONE STAGE ══════════════════════ */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(180deg, #020C05 0%, #030F07 60%, #051208 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Grid floor */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
              backgroundImage: 'linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }} />
            {/* Ceiling grid */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '30%',
              backgroundImage: 'linear-gradient(rgba(0,255,65,0.025) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
            }} />

            {/* Status strip */}
            <div style={{
              position: 'absolute', top: 10, left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
            }}>
              <div style={{
                fontSize: 7,
                fontFamily: "'Share Tech Mono', monospace",
                color: statusColor,
                letterSpacing: 2,
                padding: '3px 10px',
                border: `1px solid ${statusColor}44`,
                background: `${statusColor}11`,
                animation: 'ph-status-slide 0.3s ease-out',
                transition: 'color 0.3s, border-color 0.3s, background 0.3s',
              }}>
                {deliveryStatus}
              </div>
            </div>

            {/* Drone + Crate assembly */}
            <div
              className={isFloating ? 'ph-floating' : ''}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: isFloating ? undefined : `translateY(${droneY}px)`,
                transition: isFloating ? undefined : droneTransition,
                marginTop: -20,
              }}
            >
              {/* Drone Image */}
              <div style={{ position: 'relative', width: 180, height: 160 }}>
                <img
                  src="/drone_hero.png"
                  alt="Cargo Drone"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    imageRendering: 'pixelated',
                    filter: 'drop-shadow(0 0 12px rgba(0,255,136,0.5)) drop-shadow(0 0 24px rgba(0,200,255,0.25))',
                    mixBlendMode: 'screen',
                  }}
                />
                {/* Rotor glow overlays */}
                <div style={{
                  position: 'absolute', top: 8, left: 4, right: 4,
                  display: 'flex', justifyContent: 'space-between',
                }}>
                  {[0, 1, 2, 3].map(i => (
                    <div
                      key={i}
                      className={i % 2 === 0 ? 'ph-rotor-a' : 'ph-rotor-b'}
                      style={{
                        width: 28, height: 6,
                        borderRadius: '50%',
                        background: 'rgba(0,255,136,0.25)',
                        boxShadow: '0 0 8px rgba(0,255,136,0.6)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Beam connecting drone to crate */}
              {showCrate && (
                <div style={{
                  width: 3,
                  height: 28,
                  background: `linear-gradient(180deg, rgba(0,255,136,${beamOpacity}), rgba(0,200,255,${beamOpacity * 0.6}))`,
                  boxShadow: `0 0 8px rgba(0,255,136,0.6)`,
                  animation: 'ph-beam-pulse 1.5s ease-in-out infinite',
                  marginTop: -4,
                }} />
              )}

              {/* Cargo Crate */}
              {showCrate && (
                <div style={{
                  position: 'relative',
                  width: 88,
                  height: 70,
                  border: `2px solid ${activeP?.crateColor || '#00FF88'}`,
                  background: '#020C05',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  boxShadow: `0 0 20px ${activeP?.crateColor || '#00FF88'}55, inset 0 0 15px rgba(0,0,0,0.6)`,
                  transform: `scale(${crateScale})`,
                  transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  overflow: 'hidden',
                }}>
                  {/* Crate image */}
                  <img
                    src="/cargo_crate.png"
                    alt="Cargo"
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      imageRendering: 'pixelated',
                      opacity: 0.7,
                      mixBlendMode: 'screen',
                    }}
                  />
                  {/* Code symbol overlay */}
                  <div style={{
                    position: 'relative', zIndex: 2,
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 14,
                    color: activeP?.crateColor || '#00FF88',
                    textShadow: `0 0 10px ${activeP?.crateColor || '#00FF88'}`,
                    letterSpacing: -1,
                  }}>
                    {'</>'}
                  </div>
                  {/* Corner rivets */}
                  {[[3, 3], [3, 'auto'], ['auto', 3], ['auto', 'auto']].map(([t, b], i) => (
                    <div key={i} style={{
                      position: 'absolute',
                      top: t === 'auto' ? 'auto' : t as number,
                      bottom: b === 'auto' ? 'auto' : b as number,
                      left: i < 2 ? 3 : 'auto',
                      right: i >= 2 ? 3 : 'auto',
                      width: 4, height: 4,
                      borderRadius: '50%',
                      background: `${activeP?.crateColor || '#00FF88'}88`,
                    }} />
                  ))}
                  {/* Scan line */}
                  {scanning && (
                    <div style={{
                      position: 'absolute', left: 0, right: 0, height: 2,
                      background: `${activeP?.crateColor || '#00FF88'}`,
                      boxShadow: `0 0 8px ${activeP?.crateColor || '#00FF88'}`,
                      animation: 'ph-scanline 1.3s linear infinite',
                      zIndex: 3,
                    }} />
                  )}
                </div>
              )}

              {/* Beam glow below crate */}
              {showCrate && (
                <div style={{
                  width: 120,
                  height: 60,
                  background: `radial-gradient(ellipse at top, ${activeP?.crateColor || '#00FF88'}30 0%, transparent 70%)`,
                  marginTop: 4,
                  animation: 'ph-beam-pulse 1.5s ease-in-out infinite',
                }} />
              )}
            </div>

            {/* Landing platform rings */}
            <div style={{
              position: 'absolute', bottom: 16,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              {[140, 100, 60].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: w,
                    height: Math.max(10, 18 - i * 4),
                    borderRadius: '50%',
                    border: `1px solid rgba(0,255,65,${0.2 + i * 0.1})`,
                    animation: `ph-ring-pulse ${2 + i * 0.4}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
              <div style={{ fontSize: 5, color: '#1A3A20', letterSpacing: 3, fontFamily: "'Press Start 2P', monospace", marginTop: 2 }}>
                DEPLOYMENT PLATFORM
              </div>
            </div>

            {/* Idle hint */}
            {!showCrate && activeIdx === null && (
              <div style={{
                position: 'absolute', bottom: 80,
                fontSize: 7,
                color: '#1A3A20',
                letterSpacing: 2,
                fontFamily: "'Share Tech Mono', monospace",
                animation: 'ph-blink 2s infinite',
              }}>
                SELECT A PROJECT →
              </div>
            )}
          </div>

          {/* ══ RIGHT PANEL — PROJECTS HANGAR / PAYLOAD ════════ */}
          <div style={{
            width: 230,
            background: '#020C05',
            borderLeft: '1px solid #00FF41',
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
          }}>
            {/* Panel Header */}
            <div style={{
              padding: '10px 14px 8px',
              borderBottom: '1px solid #0A3018',
            }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: 7, color: '#CCFFCC', letterSpacing: 2, lineHeight: 1.8 }}>
                PROJECTS HANGAR
              </div>
            </div>

            {/* Payload section */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {!showPayload ? (
                /* Empty state */
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: 20,
                }}>
                  <div style={{
                    width: 40, height: 40,
                    border: '1px solid #0A3018',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'ph-ring-pulse 2s infinite',
                  }}>
                    <div style={{ fontSize: 16, color: '#1A3A20' }}>📦</div>
                  </div>
                  <div style={{
                    fontSize: 7,
                    color: '#1A3A20',
                    letterSpacing: 1,
                    textAlign: 'center',
                    fontFamily: "'Share Tech Mono', monospace",
                    lineHeight: 1.8,
                  }}>
                    NO PAYLOAD<br />SELECTED
                  </div>
                </div>
              ) : (
                /* Payload content */
                <div style={{ padding: '10px 14px', animation: 'ph-status-slide 0.4s ease-out' }}>

                  {/* PAYLOAD ARRIVED badge */}
                  <div style={{
                    display: 'inline-block',
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: 6,
                    color: '#00FF88',
                    border: '1px solid #00FF88',
                    padding: '3px 8px',
                    marginBottom: 12,
                    boxShadow: '0 0 8px rgba(0,255,136,0.2)',
                    background: 'rgba(0,255,136,0.06)',
                    letterSpacing: 1,
                  }}>
                    PAYLOAD ARRIVED
                  </div>

                  {/* Project info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div>
                      <span style={{ fontSize: 7, color: '#4A8A60', letterSpacing: 1 }}>NAME: </span>
                      <span style={{ fontSize: 7, color: '#CCFFCC', letterSpacing: 1 }}>{activeP?.name}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 7, color: '#4A8A60', letterSpacing: 1 }}>TECH: </span>
                      <span style={{ fontSize: 7, color: '#CCFFCC', letterSpacing: 1 }}>{activeP?.tech}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: 7, color: '#4A8A60', letterSpacing: 1 }}>DESC: </span>
                      <span style={{ fontSize: 7, color: '#AACFBB', letterSpacing: 0, lineHeight: 1.7, display: 'inline' }}>
                        {activeP?.desc}
                      </span>
                    </div>
                  </div>

                  {/* Screenshot previews */}
                  <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                    {[0, 1].map(i => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: 52,
                          border: '1px solid #0A3018',
                          background: '#030F07',
                          overflow: 'hidden',
                          position: 'relative',
                          boxShadow: '0 0 6px rgba(0,255,65,0.1)',
                        }}
                      >
                        <img
                          src="/project_previews.png"
                          alt="Preview"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: i === 0 ? 'left center' : 'right center',
                            imageRendering: 'pixelated',
                            opacity: 0.75,
                            filter: `hue-rotate(${i * 30}deg)`,
                          }}
                        />
                        {/* Screen glare */}
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(135deg, rgba(0,255,136,0.06) 0%, transparent 60%)',
                          pointerEvents: 'none',
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div style={{
              borderTop: '1px solid #0A3018',
              padding: '10px 14px',
              display: 'flex',
              gap: 8,
            }}>
              <a
                href={activeP?.liveUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="ph-btn ph-btn-primary"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  padding: '7px 4px',
                  background: showPayload ? 'rgba(0,255,136,0.08)' : 'transparent',
                  border: `1px solid ${showPayload ? '#00FF88' : '#0A3018'}`,
                  color: showPayload ? '#00FF88' : '#1A3A20',
                  fontSize: 5,
                  letterSpacing: 1,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  pointerEvents: showPayload ? 'auto' : 'none',
                }}
              >
                VIEW LIVE
              </a>
              <a
                href={activeP?.githubUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="ph-btn ph-btn-secondary"
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  padding: '7px 4px',
                  background: 'transparent',
                  border: `1px solid ${showPayload ? '#0A3018' : '#060F08'}`,
                  color: showPayload ? '#4A8A60' : '#1A3A20',
                  fontSize: 5,
                  letterSpacing: 1,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  pointerEvents: showPayload ? 'auto' : 'none',
                }}
              >
                GITHUB
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
