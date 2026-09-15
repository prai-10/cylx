export const PRIMARY_NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
];

export const ALL_NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Creators', href: '/creators' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const NAV_PROMPTS = [
  { prompt: 'go home', path: '/' },
  { prompt: 'who are you?', path: '/about' },
  { prompt: 'what do you do?', path: '/services' },
  { prompt: 'show me your portfolio', path: '/portfolio' },
  { prompt: 'show case studies', path: '/case-studies' },
  { prompt: 'creator network', path: '/creators' },
  { prompt: 'read your blog', path: '/blog' },
  { prompt: 'i want to join', path: '/careers' },
  { prompt: 'start a project', path: '/contact' },
  { prompt: 'book a growth call', path: '/contact' }
] as const;

export type NavPrompt = (typeof NAV_PROMPTS)[number];
