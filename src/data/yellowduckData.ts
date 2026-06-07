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
