import type { ZoneData } from '../types';

export const ZONES: Record<number, ZoneData> = {
  1: {
    key:   'CODE_CAVE',
    name:  'CODE CAVE',
    color: 'var(--col-purple)',
    bg:    '/Level1-CodeCave.png',
    sub:   'Skills & Expertise — Level 1',
    intro: 'The Code Cave is where raw ideas crystallize into working systems. Every line of code is a commitment to quality.',
    projects: [
      { title: 'FULL-STACK SYSTEMS',  desc: 'End-to-end web platforms with React, Node.js, and cloud deployments.',      tags: ['React','Node','AWS'] },
      { title: 'EMBEDDED SYSTEMS',    desc: 'Real-time firmware for robotics and drone control units.',                  tags: ['C++','RTOS','STM32'] },
      { title: 'ML PIPELINES',        desc: 'Computer vision and inference pipelines for edge devices.',                 tags: ['Python','ONNX','PyTorch'] },
      { title: 'OPEN SOURCE TOOLING', desc: 'CLI tools and libraries used by thousands of developers globally.',         tags: ['Go','Rust','GitHub'] },
    ],
  },
  2: {
    key:   'PROJECTS_HANGER',
    name:  'PROJECTS HANGER',
    color: 'var(--col-cyan)',
    bg:    '/Level2-ProjectHanger.png',
    sub:   'Projects — Level 2',
    intro: "The Hanger stores every machine I've built, shipped, and launched. Each project a testament to execution over ideation.",
    projects: [
      { title: 'STRIDE', desc: 'Autonomous drone infrastructure inspection with edge-AI object detection.', tags: ['ROS 2', 'YOLOv8s', 'Next.js'] },
      { title: 'RTK PRECISION GNSS', desc: 'Hardware hacking for centimeter-level positioning via RTKLIB.', tags: ['RTKLIB', 'Python', 'UART'] },
      { title: 'RESQ LIVE OPS', desc: 'Edge AI perception system for drones in search-and-rescue.', tags: ['YOLOv8', 'OpenCV', 'Supabase'] },
      { title: 'FORGE', desc: 'Multi-agent AI career command center with zero hallucinations.', tags: ['Python', 'Multi-Agent', 'LLMs'] },
    ],
  },
  3: {
    key:   'LAB',
    name:  'THE BUNKER — LAB',
    color: 'var(--col-red)',
    bg:    '/Level3-Bunker.png',
    sub:   'Research & Development — Level 3',
    intro: 'The Bunker is where prototypes live. Experimental hardware, research papers, and ideas too wild for the main hanger.',
    projects: [
      { title: 'ISRO IRoC ROBOTICS', desc: 'Modular subsystems for space-grade robotics and sensor fusion.', tags: ['Robotics', 'Sensors'] },
      { title: 'BOEING AEROMODELLING', desc: '1.2m heavy-lift aircraft with optimized S1223 airfoil.', tags: ['Aerodynamics', 'Design'] },
      { title: 'TECHFEST IIT BOMBAY', desc: 'Aeromodelling and autonomous robotics challenge finalist.', tags: ['Competition', 'Hardware'] },
      { title: 'SVNIT SURAT ROBOTICS', desc: 'Real-time hardware-software troubleshooting under constraints.', tags: ['Troubleshooting', 'Embedded'] },
    ],
  },
  4: {
    key:   'YELLOWDUCK_HQ',
    name:  'YELLOWDUCK HQ',
    color: 'var(--col-gold)',
    bg:    '/Level4-YellowDuckHQ.png',
    sub:   'Ventures & Team — Level 4',
    intro: "YellowDuck is more than a brand — it's a mindset. Winners build legacy. This HQ is where the team ships together.",
    projects: [
      { title: 'TEAM OPERATIONS', desc: 'Cross-functional teams delivering hardware+software products at pace.',  tags: ['Agile','Notion','Linear'] },
      { title: 'BRAND STRATEGY',  desc: 'From logo to lore — building an identity that outlasts the product.',   tags: ['Design','Marketing','Story'] },
      { title: 'CLIENT DELIVERY', desc: 'Consulting engagements across aerospace, fintech and health sectors.',   tags: ['B2B','SaaS','Ops'] },
      { title: 'COMMUNITY',       desc: 'Open workshops, hackathons and mentorship for the next generation.',     tags: ['Events','Mentoring','OSS'] },
    ],
  },
  5: {
    key:   'ARENA',
    name:  'ARENA',
    color: 'var(--col-blue)',
    bg:    '/Zone5-arena.png',
    sub:   'Competitions & Achievements — Level 5',
    intro: 'The Arena is where skill meets pressure. Hackathons, competitions, and leaderboards — this is the scoreboard.',
    projects: [
      { title: 'INNOVENT 2026',  desc: 'Grand Prize Winner (₹20K) out of 150+ teams. Developed FORGE multi-agent system.', tags: ['1st Place', 'AI'] },
      { title: 'GOOGLE HACKATHON', desc: 'Led team to victory among 50+ teams with a production-ready solution in 24h.', tags: ['1st Place', 'Hackathon'] },
      { title: 'YOUTUBE STRATEGIST', desc: 'Authored 15+ technical scripts reaching 3M+ views on mass-market tech concepts.', tags: ['Content', '3M+ Views'] },
      { title: 'UAS NMIMS SHIRPUR', desc: 'Technical team member developing control systems for autonomous drones.', tags: ['Robotics', 'Team'] },
    ],
  },
};
