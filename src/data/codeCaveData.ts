// ============================================================
//  CODE CAVE — ZONE 1  ·  SINGLE DATA FILE
//  Edit all portfolio content here — UI + terminal outputs
// ============================================================

// ── Character ─────────────────────────────────────────────────
export const CHARACTER = {
  username:   'PRAKHAR.EXE',
  status:     'ONLINE',
  classTitle: 'AI TINKERER',
  role:       'Builder • Researcher • Problem Solver',
  level:      21,
  xpCurrent:  650,
  xpMax:      1000,
  avatar:     '/convert_this_to_an_animation_o.mp4',
};

// ── RPG Stats ─────────────────────────────────────────────────
export const STATS: { label: string; value: number; color: string }[] = [
  { label: 'Logic',          value: 93, color: '#9b5de5' },
  { label: 'Innovation',     value: 90, color: '#00ffff' },
  { label: 'Debugging',      value: 72, color: '#ef476f' },
  { label: 'Strength',       value: 85, color: '#FFD700' },
  { label: 'Attention Span', value: 35, color: '#00ff88' },
];

// ── Achievements (Font Awesome icons, no emoji) ───────────────
export const ACHIEVEMENTS: { faClass: string; color: string; label: string }[] = [
  { faClass: 'fa-solid fa-trophy',        color: '#FFD700', label: '3x Hackathon Winner'          },
  { faClass: 'fa-solid fa-rocket',        color: '#00ffff', label: '3 Major AI Projects'           },
  { faClass: 'fa-solid fa-robot',         color: '#9b5de5', label: 'Autonomous Robotics Enthusiast' },
  { faClass: 'fa-solid fa-graduation-cap',color: '#00ff88', label: 'Computer Science Student'       },
];

// ── Mission Log ───────────────────────────────────────────────
export const MISSION_LOG = {
  lines: [
    'CS undergrad specializing in AI/ML systems, multi-agent architectures,',
    'and autonomous robotics.',
    '',
    '3x hackathon winner across 200+ competing teams; proven record of',
    'shipping production-grade pipelines under time constraints.',
  ],
  objective: 'Turn ambitious ideas into production-grade systems.',
};

// ── Tech Stack ────────────────────────────────────────────────
// icon: devicon-* class (renders as <i class="icon colored" />)
//       OR 'fa:fa-solid fa-xxx' — FA fallback (no brand color)
export interface TechItem {
  name:  string;
  icon:  string;
  color: string;
}
export const TECH_STACK: { category: string; accent: string; items: TechItem[] }[] = [
  {
    category: 'Languages',
    accent:   '#9b5de5',
    items: [
      { name: 'Python',     icon: 'devicon-python-plain',     color: '#3776AB' },
      { name: 'C++',        icon: 'devicon-cplusplus-plain',  color: '#00599C' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain', color: '#F7DF1E' },
      { name: 'Java',       icon: 'devicon-java-plain',       color: '#ED8B00' },
      { name: 'SQL',        icon: 'devicon-mysql-plain',      color: '#4479A1' },
    ],
  },
  {
    category: 'AI / ML',
    accent:   '#00ffff',
    items: [
      { name: 'Multi-Agent Systems', icon: 'fa:fa-solid fa-network-wired', color: '#00ffff' },
      { name: 'LangChain',  icon: 'fa:fa-solid fa-link',             color: '#1E88E5' },
      { name: 'YOLOv8',     icon: 'fa:fa-solid fa-eye',              color: '#00ffff' },
      { name: 'Hugging Face',icon: 'devicon-huggingface-plain',      color: '#FFD21E' },
      { name: 'RAG Pipelines', icon: 'fa:fa-solid fa-database',      color: '#9b5de5' },
      { name: 'Computer Vision', icon: 'fa:fa-solid fa-camera',      color: '#FFD700' },
      { name: 'MediaPipe',  icon: 'fa:fa-solid fa-hand',             color: '#00C853' },
      { name: 'Model Optimization', icon: 'fa:fa-solid fa-gauge-high', color: '#ef476f' },
    ],
  },
  {
    category: 'Backend',
    accent:   '#00ff88',
    items: [
      { name: 'FastAPI',   icon: 'devicon-fastapi-plain',   color: '#009688' },
      { name: 'Next.js',   icon: 'devicon-nextjs-plain',    color: '#ffffff' },
      { name: 'Supabase',  icon: 'devicon-supabase-plain',  color: '#3ECF8E' },
      { name: 'Streamlit', icon: 'fa:fa-solid fa-chart-bar',color: '#FF4B4B' },
      { name: 'GitHub REST API', icon: 'fa:fa-solid fa-code', color: '#aaa' },
    ],
  },
  {
    category: 'Robotics',
    accent:   '#FFD700',
    items: [
      { name: 'ROS 2',   icon: 'devicon-ros-plain',        color: '#22314E' },
      { name: 'OpenCV',  icon: 'devicon-opencv-plain',     color: '#5C3EE8' },
    ],
  },
  {
    category: 'Infrastructure',
    accent:   '#FFA500',
    items: [
      { name: 'Docker', icon: 'devicon-docker-plain',  color: '#2496ED' },
      { name: 'Linux',  icon: 'devicon-linux-plain',   color: '#FCC624' },
      { name: 'Git',    icon: 'devicon-git-plain',     color: '#F05032' },
    ],
  },
];

// ── Zone navigation shortcuts shown in Code Cave header ───────
export const ZONE_NAV = [
  { id: 1, label: '[01] CODE CAVE'      },
  { id: 2, label: '[02] PROJECTS HANGER'},
  { id: 3, label: '[03] THE BUNKER'     },
  { id: 4, label: '[04] YELLOWDUCK HQ'  },
  { id: 5, label: '[05] ARENA'          },
];

// ── Terminal Commands ─────────────────────────────────────────
export const TERMINAL_COMMANDS: Record<string, string[]> = {
  help: [
    'AVAILABLE COMMANDS:',
    '',
    '  about       - Get to know me',
    '  skills      - View my technical skills',
    '  projects    - Explore my key projects',
    '  experience  - My experience & roles',
    '  awards      - Achievements & hackathons',
    '  education   - Education details',
    '  contact     - Contact information',
    '  resume      - Download my resume',
    '  whoami      - Who am I?',
    '  clear       - Clear terminal',
  ],
  whoami: [
    'Prakhar Jaiswal',
    'AI/ML Engineer · Robotics Developer',
    'Currently running: B.Tech CS @ NMIMS MPSTME Shirpur',
    'System status: ONLINE',
    'Core directive: Ship production-grade systems.',
  ],
  about: [
    'CS undergrad specializing in AI/ML systems,',
    'multi-agent architectures, and autonomous robotics.',
    '3x hackathon winner across 200+ competing teams.',
    'Proven record of shipping production-grade pipelines',
    'under time constraints.',
  ],
  skills: [
    'Languages  :  Python · C++ · JavaScript · Java · SQL',
    'AI / ML    :  Multi-Agent · LangChain · YOLOv8 · HuggingFace',
    '             RAG · Computer Vision · MediaPipe · Model Opt',
    'Tools/Infra:  ROS 2 · FastAPI · Next.js · Streamlit · Docker',
    '             Supabase · OpenCV · Git · Linux · GitHub API',
  ],
  projects: [
    '[ 01 ] FORGE — Autonomous Career Intelligence Platform',
    '       Stack : Python · LLMs (Multi-Agent) · GitHub REST API · Streamlit',
    '       Result: 0% hallucination rate; 84% ATS pass-rate improvement',
    '',
    '[ 02 ] Autonomous Drone Infrastructure Inspection System',
    '       Stack : ROS 2 · YOLOv8s · Docker · Next.js · FastAPI',
    '       Result: Autonomous nav, 15-30 FPS defect classification',
    '',
    '[ 03 ] RESQ LIVE OPS — Real-Time AI Perception System',
    '       Stack : YOLOv8 · Python · OpenCV · Supabase · Gemini',
    '       Result: -40% inference latency, live automated intel',
  ],
  experience: [
    '● Technical Team Member  ·  UAS NMIMS Shirpur (Drone Team)',
    '  Building control systems & sensor fusion for autonomous',
    '  robotics (ISRO IRoC). Represented team at multiple IITs.',
    '',
    '● AIML Intern  ·  QSkill (SR India)',
    '  Built end-to-end ML pipelines on real-world datasets.',
    '',
    '● Content Writer / Researcher  ·  Freelance',
    '  Authored 10+ scripts generating 3M+ combined views.',
  ],
  awards: [
    '[ 1ST ] INNOVENT 2026 (SOBUS & IIC NMIMS)',
    '        Grand Prize ₹20,000 · Outperformed 150+ teams',
    '',
    '[ 3RD ] BGI Hackathon, Indore 2026',
    '        Top 3 from 200+ teams (Autonomous Drone track)',
    '',
    '[ 1ST ] Google Developer Groups Hackathon, NMIMS',
    '        Won among 50+ teams in 24-hour sprint',
  ],
  education: [
    'Degree  :  B.Tech Computer Science',
    'School  :  NMIMS MPSTME Shirpur, Maharashtra',
    'Year    :  2025 - 2029',
    'GPA     :  8.5+ / 10',
  ],
  contact: [
    'Phone    :  +91 7891516041',
    'Email    :  prkhr.exists@gmail.com',
    'LinkedIn :  linkedin.com/in/prkhrexists',
    'Location :  Lucknow, UP',
  ],
  resume: [
    '> Initiating resume download...',
    '> Compressing projects and hackathons...',
    '> File: Prakhar_Jaiswal_Resume.pdf',
    '> Status: [############] 100% DONE',
  ],
};
