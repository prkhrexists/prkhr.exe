import { useState } from 'react';

// ─── ACHIEVEMENT DATA (9 cards matching the reference image) ─────────────────
interface Bullet { title: string; text: string }
interface Achievement {
  id: number;
  rank: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;          // emoji for gallery card
  level: string;
  project: string;
  projectDesc: string;
  about: string;
  stats: Record<string, string>;
  stack: string[];
  bullets: Bullet[];
  team: string;
  date: string;
  links: { label: string; icon: string }[];
  keyStats?: { value: string; label: string }[];
}

const achievements: Achievement[] = [
  {
    id: 1,
    rank: 'WINNER',
    title: 'SMART INDIA HACKATHON 2026',
    subtitle: 'National Level',
    badge: 'WINNER',
    icon: '🏆',
    level: 'National Level',
    project: 'Fraud Detection Engine',
    projectDesc: 'AI-powered platform to detect financial frauds in real-time using machine learning and analytics.',
    about: 'Fraud Detection Engine is an AI-powered platform that analyzes transaction patterns in real-time to detect fraudulent activities and prevent financial crimes.',
    stats: { 'TEAMS BEATEN': '500+', 'PRIZE WON': '₹1,00,000', 'HACKATHON DURATION': '36 h' },
    stack: ['Flutter', 'Node.js', 'TensorFlow', 'MongoDB', 'Python'],
    bullets: [
      { title: 'Real-time transaction monitoring', text: 'Continuous analysis of financial transactions using streaming data pipelines for instant fraud detection.' },
      { title: 'ML-based anomaly detection', text: 'Custom TensorFlow models trained on financial datasets to identify suspicious patterns with 98.7% accuracy.' },
      { title: 'Risk scoring and alert system', text: 'Dynamic risk scoring algorithm that evaluates transaction risk and triggers automated alerts for high-risk activities.' },
      { title: 'Analytics dashboard', text: 'Comprehensive dashboard built with Flutter for real-time visualization of fraud patterns and system metrics.' },
    ],
    team: 'YellowDuck Labs (4 Members)',
    date: 'Dec 2026',
    links: [
      { label: 'GitHub', icon: 'fa-brands fa-github' },
      { label: 'Demo', icon: 'fa-solid fa-play' },
      { label: 'Presentation', icon: 'fa-solid fa-file-powerpoint' },
    ],
    keyStats: [
      { value: '1000+', label: 'Transactions Analyzed' },
      { value: '98.7%', label: 'Detection Accuracy' },
      { value: '30%', label: 'False Positive Reduction' },
      { value: '24/7', label: 'Monitoring System' },
    ],
  },
  {
    id: 2,
    rank: 'WINNER',
    title: 'CSI CODEFEST 2025',
    subtitle: 'National Level',
    badge: 'WINNER',
    icon: '🏅',
    level: 'National Level',
    project: 'CodeReview AI',
    projectDesc: 'Automated code review assistant powered by LLMs.',
    about: 'An intelligent code review platform leveraging large language models.',
    stats: { 'TEAMS BEATEN': '300+', 'TRACK': 'AI/ML' },
    stack: ['Python', 'LangChain', 'React', 'FastAPI'],
    bullets: [
      { title: 'LLM-Powered Analysis', text: 'Uses GPT-based models to analyze code quality, security vulnerabilities, and suggest improvements.' },
    ],
    team: 'YellowDuck Labs (4 Members)',
    date: 'Nov 2025',
    links: [{ label: 'GitHub', icon: 'fa-brands fa-github' }],
  },
  {
    id: 3,
    rank: 'COMPLETED',
    title: 'CS50',
    subtitle: 'Harvard',
    badge: 'COMPLETED',
    icon: '🎓',
    level: 'Completed',
    project: "Harvard's CS50",
    projectDesc: "Completed Harvard's Introduction to Computer Science.",
    about: "Successfully completed all problem sets and the final project for Harvard's CS50x.",
    stats: { 'GRADE': 'Satisfactory', 'PROJECTS': '10+' },
    stack: ['C', 'Python', 'SQL', 'JavaScript', 'HTML/CSS'],
    bullets: [
      { title: 'Full Curriculum', text: 'Covered algorithms, data structures, web development, and more.' },
    ],
    team: 'Individual',
    date: '2025',
    links: [{ label: 'Certificate', icon: 'fa-solid fa-certificate' }],
  },
  {
    id: 4,
    rank: 'TOP 10',
    title: 'GOOGLE SOLUTION CHALLENGE 2025',
    subtitle: 'National Level',
    badge: 'TOP 10',
    icon: '🔍',
    level: 'National Level',
    project: 'EcoTrack',
    projectDesc: 'Sustainability tracking app for communities.',
    about: 'A mobile app that helps communities track and reduce their carbon footprint.',
    stats: { 'TEAMS': '1000+', 'RANK': 'Top 10' },
    stack: ['Flutter', 'Firebase', 'Google Cloud', 'TensorFlow Lite'],
    bullets: [
      { title: 'Carbon Footprint Calculator', text: 'AI-powered carbon footprint estimation based on daily activities.' },
    ],
    team: 'YellowDuck Labs (3 Members)',
    date: 'Mar 2025',
    links: [{ label: 'GitHub', icon: 'fa-brands fa-github' }, { label: 'Demo', icon: 'fa-solid fa-play' }],
  },
  {
    id: 5,
    rank: 'TOP 5',
    title: 'TCS INNOVATION CHALLENGE 2025',
    subtitle: 'National Level',
    badge: 'TOP 5',
    icon: '🏆',
    level: 'National Level',
    project: 'SmartSupply',
    projectDesc: 'AI-driven supply chain optimization.',
    about: 'An intelligent supply chain management system using predictive analytics.',
    stats: { 'TEAMS': '500+', 'RANK': 'Top 5' },
    stack: ['Python', 'PyTorch', 'React', 'PostgreSQL'],
    bullets: [
      { title: 'Predictive Analytics', text: 'Demand forecasting using deep learning models with 95% accuracy.' },
    ],
    team: 'YellowDuck Labs (4 Members)',
    date: 'Jun 2025',
    links: [{ label: 'GitHub', icon: 'fa-brands fa-github' }],
  },
  {
    id: 6,
    rank: 'WINNER',
    title: 'HACKVERSE 2025',
    subtitle: 'National Level',
    badge: 'WINNER',
    icon: '👑',
    level: 'National Level',
    project: 'MediScan',
    projectDesc: 'Medical document digitization using OCR and AI.',
    about: 'A platform to digitize and analyze medical records using advanced OCR.',
    stats: { 'TEAMS BEATEN': '200+', 'PRIZE': '₹50,000' },
    stack: ['Python', 'Tesseract', 'React', 'MongoDB'],
    bullets: [
      { title: 'OCR Pipeline', text: 'Custom OCR pipeline with 99.2% accuracy for medical documents.' },
    ],
    team: 'YellowDuck Labs (4 Members)',
    date: 'Feb 2025',
    links: [{ label: 'GitHub', icon: 'fa-brands fa-github' }, { label: 'Demo', icon: 'fa-solid fa-play' }],
  },
  {
    id: 7,
    rank: 'TOP PERFORMER',
    title: 'INTERNSHALA TRAINING',
    subtitle: 'National Level',
    badge: 'TOP PERFORMER',
    icon: '👥',
    level: 'National Level',
    project: 'Web Development',
    projectDesc: 'Full-stack web development training.',
    about: 'Completed an intensive full-stack web development training program.',
    stats: { 'RANK': 'Top Performer', 'DURATION': '8 weeks' },
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    bullets: [
      { title: 'Project-based Learning', text: 'Built 5+ production-ready web applications during the training.' },
    ],
    team: 'Individual',
    date: '2024',
    links: [{ label: 'Certificate', icon: 'fa-solid fa-certificate' }],
  },
  {
    id: 8,
    rank: 'CONTRIBUTOR',
    title: 'OPEN SOURCE CONTRIBUTOR 2024',
    subtitle: 'Global',
    badge: 'CONTRIBUTOR',
    icon: '💻',
    level: 'Global',
    project: 'Open Source',
    projectDesc: 'Active contributor to open source projects.',
    about: 'Contributed to multiple open source projects on GitHub.',
    stats: { 'PR MERGED': '25+', 'REPOS': '10+' },
    stack: ['TypeScript', 'Python', 'Go', 'Rust'],
    bullets: [
      { title: 'Community Impact', text: 'Contributed bug fixes and features to popular open source repositories.' },
    ],
    team: 'Individual',
    date: '2024',
    links: [{ label: 'GitHub', icon: 'fa-brands fa-github' }],
  },
  {
    id: 9,
    rank: 'SPEAKER',
    title: 'FLUTTER FEST 2024',
    subtitle: 'National Level',
    badge: 'SPEAKER',
    icon: '🦋',
    level: 'National Level',
    project: 'Flutter Talk',
    projectDesc: 'Technical talk on Flutter state management.',
    about: 'Delivered a technical talk on advanced Flutter state management patterns.',
    stats: { 'ATTENDEES': '200+', 'RATING': '4.8/5' },
    stack: ['Flutter', 'Dart', 'Riverpod', 'BLoC'],
    bullets: [
      { title: 'State Management Deep Dive', text: 'Covered Riverpod, BLoC, and Provider patterns with live coding demos.' },
    ],
    team: 'Individual',
    date: 'Oct 2024',
    links: [{ label: 'Slides', icon: 'fa-solid fa-file-powerpoint' }],
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function YellowDuckZone() {
  const [activeId, setActiveId] = useState(1);
  const active = achievements.find((a) => a.id === activeId)!;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden text-sm relative font-mono text-slate-200">

      {/* ── THREE-PANEL GRID ─────────────────────────────────────── */}
      <main className="flex-1 relative z-10 w-full max-w-[1920px] mx-auto flex flex-col h-full overflow-hidden px-4 py-4 lg:px-8 lg:py-6">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-0">

          {/* ═══════════════════════════════════════════════════════════
              PANEL 1 — LEFT: Achievement Details  (3 cols)
          ═══════════════════════════════════════════════════════════ */}
          <section
            className="lg:col-span-3 rounded-lg p-5 flex flex-col h-full overflow-hidden relative"
            style={{
              backgroundColor: 'rgba(10,15,25,0.88)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,204,0,0.45)',
              boxShadow: 'inset 0 0 12px rgba(255,204,0,0.08)',
            }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-sm"
              aria-label="Close details"
            >✕</button>

            {/* Header */}
            <h2 className="text-[#FFCC00] text-xs tracking-[0.2em] mb-5">// ACHIEVEMENT DETAILS</h2>

            {/* Trophy + Title */}
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl mt-1"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(255,204,0,0.5))' }}>🏆</span>
              <div>
                <h3 className="text-[#FFCC00] text-base font-bold leading-tight mb-2">{active.title}</h3>
                <span className="inline-block border border-[#FFCC00] text-[#FFCC00] text-[9px] tracking-wider px-2 py-0.5 rounded mb-1">
                  {active.badge}
                </span>
                <p className="text-gray-500 text-[11px]">{active.subtitle}</p>
              </div>
            </div>

            <div className="w-full h-px bg-gray-800 mb-3 mt-1" />

            {/* Project */}
            <h4 className="text-[#FFCC00] text-[10px] tracking-[0.15em] mb-1">PROJECT</h4>
            <p className="text-white text-sm font-bold mb-3">{active.project}</p>

            {/* Tech Stack */}
            <h4 className="text-[#FFCC00] text-[10px] tracking-[0.15em] mb-2">TECH STACK</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mb-3">
              {active.stack.slice(0, 4).map((t) => (
                <span key={t} className="text-gray-300 text-[11px] flex items-center gap-1.5">
                  <span className="text-[#FFCC00] text-[8px]">●</span> {t}
                </span>
              ))}
            </div>

            {/* Team */}
            <h4 className="text-[#FFCC00] text-[10px] tracking-[0.15em] mb-1">TEAM</h4>
            <p className="text-gray-400 text-[11px] mb-3">{active.team}</p>

            {/* Date */}
            <h4 className="text-[#FFCC00] text-[10px] tracking-[0.15em] mb-1">DATE</h4>
            <p className="text-gray-400 text-[11px] mb-3">{active.date}</p>

            {/* Links */}
            <h4 className="text-[#FFCC00] text-[10px] tracking-[0.15em] mb-2">LINKS</h4>
            <div className="flex flex-wrap gap-2">
              {active.links.map((l) => (
                <button key={l.label}
                  className="flex items-center gap-1.5 border border-[#FFCC00]/40 text-[#FFCC00]/90 text-[10px] px-3 py-1.5 rounded hover:border-[#FFCC00] hover:text-[#FFCC00] transition-colors cursor-pointer bg-gray-900/30"
                >
                  <i className={`${l.icon} text-[#FFCC00]/80`} />
                  {l.label}
                </button>
              ))}
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════════════
              PANEL 2 — CENTER: Legacy Database  (5 cols)
          ═══════════════════════════════════════════════════════════ */}
          <section
            className="lg:col-span-5 rounded-lg p-5 flex flex-col h-full overflow-hidden"
            style={{
              backgroundColor: 'rgba(10,15,25,0.88)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,204,0,0.45)',
              boxShadow: 'inset 0 0 12px rgba(255,204,0,0.08)',
            }}
          >
            {/* Header + Badge */}
            <div className="flex justify-between items-start mb-1">
              <h2 className="text-[#FFCC00] text-xs tracking-[0.2em]">// LEGACY DATABASE</h2>
            </div>

            {/* Title row */}
            <div className="flex items-center gap-3 mb-2 mt-2">
              <h3 className="text-white text-xl lg:text-2xl font-bold tracking-wide leading-tight">
                {active.title}
              </h3>
              <span className="border border-[#FFCC00] text-[#FFCC00] text-[9px] tracking-wider px-2 py-0.5 rounded flex-shrink-0">
                {active.badge}
              </span>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-4 text-gray-400 text-[11px] mb-4 flex-wrap">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-[10px] text-[#FFCC00]" />{active.subtitle}</span>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-calendar text-[10px] text-[#FFCC00]" />{active.date}</span>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-users text-[10px] text-[#FFCC00]" />{active.team.includes('(') ? active.team.split('(')[1]?.replace(')', '') : active.team}</span>
            </div>

            {/* Project image placeholder */}
            <div className="w-full h-[180px] lg:h-[220px] bg-[#0a0e18] border border-gray-800 rounded flex flex-col items-center justify-center mb-2 flex-shrink-0 relative overflow-hidden group">
              {/* Decorative title bar */}
              <div className="absolute top-0 left-0 right-0 bg-black/50 px-3 py-1.5 text-[9px] tracking-[0.15em] text-[#FFCC00]/80 uppercase border-b border-gray-800/50">
                {active.project}
              </div>
              
              {/* Center graphic */}
              <div className="flex flex-col items-center gap-2 opacity-40 mt-6">
                <div className="w-16 h-12 border border-[#00EEFF] rounded flex items-center justify-center relative">
                   <div className="w-8 h-6 bg-[#00EEFF]/20 rounded-sm" />
                   <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-[#FFCC00]/40 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-[#FFCC00] rounded-full" /></div>
                </div>
                <p className="text-[#00EEFF] text-[8px] tracking-[0.2em] uppercase font-bold">SYSTEM ACTIVE</p>
              </div>

              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00EEFF]/30" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00EEFF]/30" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00EEFF]/30" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00EEFF]/30" />
            </div>

            {/* Key Features & Chart */}
            <div className="flex gap-4 mb-2">
              <div className="flex-1">
                <h4 className="text-[#FFCC00] text-[10px] tracking-[0.15em] mb-3 uppercase">Key Features</h4>
                <ul className="space-y-2">
                  {active.bullets.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-[11px]">
                      <span className="text-[#FFCC00] mt-[3px] flex-shrink-0 text-[8px]">●</span>
                      <span className="text-gray-300 leading-tight">{b.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Mini Chart Placeholder */}
              <div className="w-[120px] lg:w-[150px] flex-shrink-0 border border-gray-800 bg-gray-900/40 rounded p-3 flex flex-col justify-end relative">
                <div className="absolute top-2 left-2 text-[7px] text-gray-500 tracking-wider">ACTIVITY</div>
                <div className="w-full h-[60px] flex items-end justify-between gap-1 mt-4">
                   <div className="w-full bg-[#00EEFF]/40 h-[30%] rounded-t-sm hover:bg-[#00EEFF] transition-colors" />
                   <div className="w-full bg-[#00EEFF]/40 h-[50%] rounded-t-sm hover:bg-[#00EEFF] transition-colors" />
                   <div className="w-full bg-[#00EEFF]/40 h-[20%] rounded-t-sm hover:bg-[#00EEFF] transition-colors" />
                   <div className="w-full bg-[#00EEFF]/40 h-[70%] rounded-t-sm hover:bg-[#00EEFF] transition-colors" />
                   <div className="w-full bg-[#00EEFF]/40 h-[45%] rounded-t-sm hover:bg-[#00EEFF] transition-colors" />
                   <div className="w-full bg-[#FFCC00] h-[90%] rounded-t-sm shadow-[0_0_8px_rgba(255,204,0,0.5)]" />
                   <div className="w-full bg-[#00EEFF]/40 h-[60%] rounded-t-sm hover:bg-[#00EEFF] transition-colors" />
                </div>
              </div>
            </div>

            {/* Key Stats Bar (bottom) */}
            {active.keyStats && (
              <div className="flex items-stretch mt-auto pt-3 border-t border-gray-800 flex-shrink-0">
                {active.keyStats.map((s, i) => (
                  <div key={i} className="flex flex-col items-center flex-1 gap-0.5 text-center relative">
                    <span className="text-[#FFCC00] font-bold text-sm lg:text-base leading-none">{s.value}</span>
                    <span className="text-gray-600 text-[8px] lg:text-[9px] leading-tight tracking-wide">{s.label}</span>
                    {i < active.keyStats!.length - 1 && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-px bg-gray-800" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ═══════════════════════════════════════════════════════════
              PANEL 3 — RIGHT: Achievement Gallery  (4 cols)
          ═══════════════════════════════════════════════════════════ */}
          <section
            className="lg:col-span-4 rounded-lg p-5 flex flex-col h-full overflow-hidden relative"
            style={{
              backgroundColor: 'rgba(10,15,25,0.88)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,204,0,0.45)',
              boxShadow: 'inset 0 0 12px rgba(255,204,0,0.08)',
            }}
          >
            {/* Header */}
            <h2 className="text-[#FFCC00] text-xs tracking-[0.2em] mb-4">// ACHIEVEMENT GALLERY</h2>

            {/* "Click to expand" callout */}
            <div className="absolute top-3 right-4 flex flex-col items-center">
              <span className="text-[8px] text-[#FFCC00]/80 tracking-widest uppercase leading-tight text-center">
                CLICK TO EXPAND<br/>FOR DETAILS
              </span>
              <span className="text-[#FFCC00] text-base mt-0.5">↓</span>
            </div>

            {/* 3×3 Gallery Grid */}
            <div
              className="grid grid-cols-3 gap-3 overflow-y-auto flex-1 pr-1 pb-2"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#FFCC0044 transparent' }}
            >
              {achievements.map((a) => {
                const isActive = a.id === activeId;
                return (
                  <button
                    key={a.id}
                    onClick={() => setActiveId(a.id)}
                    aria-pressed={isActive}
                    className={[
                      'rounded-md p-2 flex flex-col relative cursor-pointer transition-all font-mono text-left',
                      'aspect-[3/4]',
                      isActive
                        ? 'border-2 border-[#FFCC00] bg-[#FFCC00]/5'
                        : 'border border-gray-800 bg-gray-900/40 hover:border-gray-600',
                    ].join(' ')}
                    style={isActive ? { boxShadow: '0 0 18px rgba(255,204,0,0.25), inset 0 0 12px rgba(255,204,0,0.05)' } : undefined}
                  >
                    {/* Number */}
                    <span className={`text-[10px] font-bold mb-1 ${isActive ? 'text-[#FFCC00]' : 'text-gray-600'}`}>
                      {String(a.id).padStart(2, '0')}
                    </span>

                    {/* Icon + Title */}
                    <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
                      <span
                        className="text-xl lg:text-2xl leading-none"
                        style={{
                          filter: isActive
                            ? 'drop-shadow(0 0 10px rgba(255,204,0,0.8))'
                            : 'grayscale(0.3) brightness(0.7)',
                          transition: 'filter 0.2s',
                        }}
                      >
                        {a.icon}
                      </span>
                      <span className={`text-[8px] lg:text-[9px] font-bold text-center uppercase tracking-wider leading-tight ${isActive ? 'text-[#FFCC00]' : 'text-gray-300'}`}>
                        {a.title.length > 22 ? a.title.slice(0, 22) + '…' : a.title}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <div className="text-center mt-auto">
                      <p className={`text-[8px] ${isActive ? 'text-[#FFCC00]/70' : 'text-gray-500'}`}>
                        {a.rank === 'COMPLETED' ? a.subtitle : a.rank}
                      </p>
                      <p className="text-[7px] text-gray-600">{a.level}</p>
                    </div>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FFCC00]"
                           style={{ boxShadow: '0 0 6px #FFCC00', animation: 'pulse 1.5s ease-in-out infinite' }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Gallery Footer */}
            <div className="pt-3 border-t border-gray-800 flex items-center justify-center gap-2 flex-shrink-0">
              <span className="text-[#FFCC00] text-sm">🏆</span>
              <span className="text-gray-500 text-[10px] tracking-[0.15em]">
                {String(achievements.length).padStart(2, '0')} ACHIEVEMENTS UNLOCKED
              </span>
            </div>
          </section>

        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-gray-800 bg-black/70 py-2 px-6 justify-between items-center text-[10px] text-gray-500 hidden lg:flex flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-base">🦆</span>
          <span className="tracking-[0.15em]">BUILDING IMPACTFUL SOLUTIONS. WINNING TOGETHER.</span>
        </div>
        <div className="tracking-[0.12em]">YELLOWDUCK HQ © 2025</div>
      </footer>
    </div>
  );
}
