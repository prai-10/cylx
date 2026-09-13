import { Job } from '@/types';

export const JOBS: Job[] = [
  {
    id: 'creative-strategist',
    slug: 'creative-strategist',
    title: 'Senior Creative Strategist',
    department: 'Strategy & Concept',
    location: 'Remote / New York / London',
    type: 'Full-time',
    description: 'We are seeking a culture-obsessed strategist who understands internet subcultures, algorithmic storytelling, and how to build campaign architectures that demand attention.',
    responsibilities: [
      'Lead campaign concepts and strategic pitches for tier-one brands',
      'Translate cultural and audience data into sharp, provocative creative briefs',
      'Collaborate closely with art directors, motion designers, and copywriters',
      'Monitor emerging internet trends, memes, and platform formats in real time'
    ],
    requirements: [
      '3+ years of experience in creative strategy at an agency, brand, or studio',
      'Demonstrated portfolio of culturally resonant campaigns or viral activations',
      'Deep fluency in Gen-Z media consumption patterns across TikTok, YouTube, and Discord',
      'Exceptional presentation and storytelling capabilities'
    ],
    niceToHave: [
      'Experience in consumer goods, tech, or creator economy brands',
      'Hands-on copywriting or content creation experience'
    ],
    status: 'open'
  },
  {
    id: 'motion-3d-designer',
    slug: 'motion-3d-designer',
    title: 'Lead Motion & 3D Designer',
    department: 'Design & Visuals',
    location: 'Remote',
    type: 'Full-time',
    description: 'Bring brand worlds to life through hyper-tactile 3D simulations, kinetic typography, and physics-driven motion graphics.',
    responsibilities: [
      'Direct and execute 3D assets, product visualizations, and kinetic typography',
      'Create high-impact social motion assets, campaign trailers, and brand guidelines',
      'Collaborate with the web engineering team to prepare 3D assets for WebGL and interactive scenes',
      'Experiment with new tools, shaders, and simulation techniques'
    ],
    requirements: [
      'High level of mastery in Cinema 4D, Blender, Houdini, and After Effects',
      'Strong sense of lighting, texturing, physical weight, and typographic timing',
      'Comprehensive showreel demonstrating distinct artistic direction',
      'Ability to iterate quickly while maintaining production-grade polish'
    ],
    niceToHave: [
      'Familiarity with Three.js / GLTF pipeline optimization',
      'Experience designing for immersive physical activations or billboards'
    ],
    status: 'open'
  },
  {
    id: 'social-video-creator',
    slug: 'social-video-creator',
    title: 'Social Content Creator & Editor',
    department: 'Content Production',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    description: 'Own the edit. We are looking for a vertical video native who understands hook timing, pacing, humor, and how to capture retention in the first split-second.',
    responsibilities: [
      'Concept, shoot, and edit high-velocity video assets for TikTok, Reels, and Shorts',
      'Test multiple hooks, audio tracks, and narrative angles for maximum audience retention',
      'Participate in collaborative brainstorming sessions and rapid content sprints',
      'Stay ahead of trending audio, memes, and platform updates'
    ],
    requirements: [
      'Proven track record of producing content with millions of organic impressions',
      'Fast turnaround speed in Premiere Pro, Final Cut, or DaVinci Resolve',
      'Native understanding of mobile shooting techniques and vertical compositions',
      'Strong sense of humor, pop culture awareness, and creative curiosity'
    ],
    niceToHave: [
      'On-camera charisma or experience hosting short-form interviews',
      'Basic motion graphics skills in After Effects'
    ],
    status: 'open'
  },
  {
    id: 'creative-frontend-engineer',
    slug: 'creative-frontend-engineer',
    title: 'Creative Frontend Engineer',
    department: 'Engineering & Tech',
    location: 'Remote',
    type: 'Full-time',
    description: 'Bridge the boundary between code and fine art. Build award-winning web flagships, WebGL experiences, and silky-smooth micro-interactions.',
    responsibilities: [
      'Develop dynamic, accessible, and performant web applications using Next.js and TypeScript',
      'Implement Three.js / React Three Fiber scenes and custom GLSL shaders',
      'Choreograph scroll-driven animations with GSAP ScrollTrigger and Framer Motion',
      'Ensure cross-browser compatibility, responsive performance, and high Core Web Vitals'
    ],
    requirements: [
      '3+ years of experience with React, Next.js, and modern TypeScript',
      'Solid experience with WebGL / Three.js and shader programming',
      'Obsession with 60fps performance, typography rendering, and interactive polish',
      'Deep understanding of web accessibility (a11y) and responsive design'
    ],
    niceToHave: [
      'Awwwards or FWA recognized project contributions',
      'Experience with headless CMS architectures and Supabase'
    ],
    status: 'open'
  }
];

export function getJobBySlug(slug: string): Job | undefined {
  return JOBS.find((job) => job.slug === slug);
}
