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
      { title: 'DRONE FLEET OS',   desc: 'Autonomous multi-drone coordination OS for industrial inspection.',          tags: ['ROS2','Python','C++'] },
      { title: 'PORTFOLIO ENGINE', desc: 'This very world — a 16-bit cyberpunk portfolio built from scratch.',        tags: ['HTML','CSS','JS'] },
      { title: 'LIFTOS',           desc: 'Smart gym tracker with AI form correction and progressive overload logic.',  tags: ['Swift','CoreML','Firebase'] },
      { title: 'SIGNAL FORGE',     desc: 'Real-time radio signal processing dashboard for SDR hardware.',              tags: ['Python','GNU Radio','D3.js'] },
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
      { title: 'NEURAL FLIGHT CTRL', desc: 'Reinforcement-learning-based PID replacement for multirotor stabilization.', tags: ['RL','SITL','Python'] },
      { title: 'BIO-SIGNAL HCI',     desc: 'Human-computer interface using EMG signals for gesture recognition.',        tags: ['EMG','Arduino','TensorFlow'] },
      { title: 'MESH COMMS PROTO',   desc: 'Low-power mesh communication protocol for remote sensor networks.',          tags: ['LoRa','C','Embedded'] },
      { title: 'SYNTHETIC DATA GEN', desc: 'Procedural environment simulator for autonomous systems dataset generation.', tags: ['Unity','Python','BlenderAPI'] },
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
      { title: 'HACKATHON WINS',  desc: '3× national hackathon winner across AI, hardware, and fintech tracks.', tags: ['Awards','AI','Hardware'] },
      { title: 'DRONE RACING',    desc: 'Top-3 placement in regional FPV drone racing leagues.',                  tags: ['FPV','Racing','Pilots'] },
      { title: 'RESEARCH AWARDS', desc: 'Best undergraduate research paper — autonomous systems, 2024.',          tags: ['Academic','Paper','2024'] },
      { title: 'POWERLIFTING PRs',desc: '130 kg bench · 200 kg squat · 230 kg deadlift. Consistency compounds.', tags: ['Strength','PRs','Discipline'] },
    ],
  },
};
