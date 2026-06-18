// ============================================================
//  YELLOWDUCK HQ — ZONE 4  ·  ACHIEVEMENT DATA
//  Add new trophies by appending to ACHIEVEMENTS array below
// ============================================================

export interface AchievementDetail {
  label: string;
  description: string;
}

export interface Achievement {
  id: number;
  rank: string;          // e.g. "1ST PLACE"
  rankShort: string;     // e.g. "01" for the gallery card number
  eventName: string;     // e.g. "INNOVENT 2026"
  organizer: string;     // e.g. "SOBUS & IIC NMIMS"
  prize?: string;        // optional prize amount
  competingTeams: number;
  trackTeams?: number;   // teams in specific track (if different)
  result: string;        // short result label e.g. "Grand Prize Winner"
  projectName: string;
  projectTagline: string;
  projectDesc: string;
  month: string;         // e.g. "April 2026"
  details: AchievementDetail[];
  techStack: string[];
  accentColor: string;
  rankColor: string;
  trophyIcon: string;    // FA class e.g. "fa-solid fa-trophy"
  badgeLabel: string;    // e.g. "WINNER" or "TOP 3"
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── ID 1: INNOVENT 2026 ──────────────────────────────────────
  {
    id: 1,
    rank: '1ST PLACE',
    rankShort: '01',
    eventName: 'INNOVENT 2026',
    organizer: 'SOBUS & IIC NMIMS',
    prize: '₹20,000',
    competingTeams: 150,
    result: 'Grand Prize Winner',
    projectName: 'FORGE',
    projectTagline: 'Autonomous Career Intelligence Platform',
    projectDesc:
      'Architected a multi-agent AI system that autonomously researches, verifies, and optimizes career profiles. Achieved 0% hallucination rate through intelligent cross-validation and delivered an 84% ATS pass-rate improvement.',
    month: 'April 2026',
    details: [
      {
        label: 'Multi-Agent Architecture',
        description:
          'Designed a coordinated pipeline of specialised AI agents — each owning a distinct subtask (research, verify, optimise) — communicating through a shared state graph to eliminate redundancy and hallucinations.',
      },
      {
        label: 'Intelligent Verification Engine',
        description:
          'Leveraged the GitHub REST API to cross-reference user-claimed projects against real commit histories, repository metadata, and language stats, ensuring zero fabricated credentials in the final output.',
      },
      {
        label: 'ATS Optimization Pipeline',
        description:
          'Built a keyword-extraction and scoring pipeline that analyses job descriptions and rewrites resume bullet points to maximise ATS pass-rate, resulting in an 84% improvement in screening success.',
      },
    ],
    techStack: [
      'Python',
      'LLMs (Multi-Agent Systems)',
      'GitHub REST API',
      'PDF Parsing Libraries',
      'ATS Optimization Algorithms',
      'Streamlit',
    ],
    accentColor: '#FFD700',
    rankColor: '#FFD700',
    trophyIcon: 'fa-solid fa-trophy',
    badgeLabel: 'GRAND PRIZE',
  },

  // ── ID 2: GDG Hackathon ──────────────────────────────────────
  {
    id: 2,
    rank: '1ST PLACE',
    rankShort: '02',
    eventName: 'GDG HACKATHON',
    organizer: 'Google Developer Groups | NMIMS Shirpur',
    competingTeams: 50,
    result: 'Winner · 24-Hour Sprint',
    projectName: 'RESQ LIVE OPS',
    projectTagline: 'Real-Time AI Perception System',
    projectDesc:
      'Led team to first place in a 24-hour hackathon, shipping a live AI perception system for emergency responders. Reduced inference latency by 40%, enabling real-time situational awareness from edge cameras to a live Streamlit dashboard.',
    month: 'January 2026',
    details: [
      {
        label: 'ML Model Optimization (YOLOv8)',
        description:
          'Profiled and optimised a YOLOv8 inference pipeline — quantisation, batching, and ONNX export — reducing end-to-end latency by 40% while maintaining detection accuracy for emergency-scene object classes.',
      },
      {
        label: 'Full-Stack Integration',
        description:
          'Wired edge-device inference directly to a Supabase (PostgreSQL) event stream, feeding a live Streamlit operational dashboard with bounding-box overlays, alert triggers, and historical incident logs.',
      },
      {
        label: 'AI-Powered Analytics (Google Gemini AI)',
        description:
          'Integrated Google Gemini AI to generate natural-language incident summaries from raw detection data, giving responders an instant contextual briefing without manually parsing video feeds.',
      },
    ],
    techStack: [
      'YOLOv8',
      'Python',
      'OpenCV',
      'Supabase (PostgreSQL)',
      'Streamlit',
      'Google Generative AI',
      'Real-time Data Streaming',
    ],
    accentColor: '#00ff88',
    rankColor: '#00ff88',
    trophyIcon: 'fa-solid fa-trophy',
    badgeLabel: 'WINNER',
  },
];

// ============================================================
//  YELLOWDUCK ZONE — GALLERY CARD DATA
//  The 3×3 achievement gallery shown inside Zone 4.
//  Add new cards by appending to ZONE_ACHIEVEMENTS below.
// ============================================================

export interface Bullet {
  title: string;
  text: string;
}

export interface ZoneAchievement {
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

export const ZONE_ACHIEVEMENTS: ZoneAchievement[] = [
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
      { value: '30%',   label: 'False Positive Reduction' },
      { value: '24/7',  label: 'Monitoring System' },
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
