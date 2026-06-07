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
  { faClass: 'fa-solid fa-trophy',        color: '#FFD700', label: '1st Place INNOVENT 2026' },
  { faClass: 'fa-solid fa-rocket',        color: '#00ffff', label: '1st Place Google Hackathon' },
  { faClass: 'fa-solid fa-robot',         color: '#9b5de5', label: 'Edge-AI & Robotics Engineer' },
  { faClass: 'fa-solid fa-graduation-cap',color: '#00ff88', label: 'CS @ NMIMS Shirpur'       },
];

// ── Mission Log ───────────────────────────────────────────────
export const MISSION_LOG = {
  lines: [
    'Aspiring Software Engineer with a technical focus on Edge-AI deployment',
    'and hardware-software integration.',
    '',
    'Committed to building scalable, high-performance solutions for social good.',
    'Seeking a role that challenges my problem-solving skills.',
  ],
  objective: 'Develop robust, industry-standard systems.',
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
      { name: 'C',          icon: 'devicon-c-plain',          color: '#00599C' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain', color: '#F7DF1E' },
      { name: 'Java',       icon: 'devicon-java-plain',       color: '#ED8B00' },
      { name: 'SQL',        icon: 'devicon-mysql-plain',      color: '#4479A1' },
    ],
  },
  {
    category: 'Intelligence & ML',
    accent:   '#00ffff',
    items: [
      { name: 'YOLOv8',     icon: 'fa:fa-solid fa-eye',              color: '#00ffff' },
      { name: 'OpenCV',     icon: 'devicon-opencv-plain',            color: '#5C3EE8' },
      { name: 'MediaPipe',  icon: 'fa:fa-solid fa-hand',             color: '#00C853' },
      { name: 'Multi-Agent',icon: 'fa:fa-solid fa-network-wired',    color: '#FFD700' },
    ],
  },
  {
    category: 'Engineering & Simulation',
    accent:   '#FFD700',
    items: [
      { name: 'Gazebo',       icon: 'fa:fa-solid fa-cube',           color: '#F3702A' },
      { name: 'RTKLIB',       icon: 'fa:fa-solid fa-satellite-dish', color: '#9b5de5' },
      { name: 'PCB Design',   icon: 'fa:fa-solid fa-microchip',      color: '#00ff88' },
      { name: 'Raspberry Pi', icon: 'devicon-raspberrypi-plain',     color: '#C51A4A' },
    ],
  },
  {
    category: 'Systems Architecture',
    accent:   '#00ff88',
    items: [
      { name: 'Linux',      icon: 'devicon-linux-plain',      color: '#FCC624' },
      { name: 'Python',     icon: 'devicon-python-plain',     color: '#3776AB' },
      { name: 'Supabase',   icon: 'devicon-supabase-plain',   color: '#3ECF8E' },
      { name: 'Git',        icon: 'devicon-git-plain',        color: '#F05032' },
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
    'Aspiring Software Engineer · Edge-AI & Systems Integration',
    'Currently running: B.Tech CS @ NMIMS Shirpur',
    'System status: ONLINE',
    'Core directive: Develop robust, industry-standard systems.',
  ],
  about: [
    'Aspiring Software Engineer with a technical focus on Edge-AI deployment',
    'and hardware-software integration.',
    'Committed to building scalable, high-performance solutions for social good.',
    'Seeking an internship or mentorship-driven role that challenges my',
    'problem-solving skills and provides a platform to develop robust,',
    'industry-standard systems.',
  ],
  skills: [
    'Languages   : Python · C · Java · JavaScript · SQL',
    'AI / ML     : YOLOv8 · OpenCV · MediaPipe · Multi-agent Orchestration',
    'Engineering : GAZEBO · RTKLIB · PCB Design · RaspberryPi/ESP32',
    'Systems     : Linux (Ubuntu) · Python · Supabase · Git',
  ],
  projects: [
    '[ 01 ] STRIDE — Autonomous Drone based Infrastructure Inspection System',
    '       Stack : ROS 2 · Gazebo · Docker · YOLOv8s · Next.js · FastAPI · Supabase',
    '',
    '[ 02 ] RTK Precision GNSS — Hardware Hacking & Signal Processing',
    '       Stack : RTKLIB · Serial (UART) · Python · FTDI/PL2303 Hardware',
    '',
    '[ 03 ] RESQ LIVE OPS — Edge AI Drone Perception',
    '       Stack : YOLOv8 · Python · OpenCV · Supabase · Streamlit · Gemini',
    '',
    '[ 04 ] FORGE — Autonomous Career Intelligence',
    '       Stack : Python · LLMs · GitHub API · Streamlit',
  ],
  experience: [
    '● Technical Member  ·  UAS NMIMS Shirpur (Aug 2025 - Present)',
    '  ISRO IRoC Robotics: Developing modular subsystems for space-grade robotics.',
    '  Boeing Aeromodelling: Fabricated a 1.2m heavy-lift aircraft.',
    '  Techfest & SVNIT Surat: Real-time hardware-software troubleshooting.',
    '',
    '● Scriptwriter & Researcher  ·  YouTube (Aug - Dec 2024)',
    '  Authored 15+ technical scripts reaching 3M+ views.',
    '  Translated complex concepts into engaging mass-market content.',
  ],
  awards: [
    '[ 1ST ] INNOVENT 2026 (SOBUS & IIC NMIMS)',
    '        Grand Prize ₹20,000 · Outperformed 150+ teams',
    '',
    '[ 1ST ] Google Hackathon, NMIMS Shirpur 2025',
    '        Won among 50+ competing teams in 24-hour sprint',
  ],
  education: [
    'Degree  :  B.Tech Computer Science',
    'School  :  NMIMS Shirpur',
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
