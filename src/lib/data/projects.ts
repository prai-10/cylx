import { Project, ProjectCategory } from '@/types';

export const PROJECTS: Project[] = [
  {
    slug: 'kaviar-streetwear-whitelisting',
    title: 'Kaviar Apparel Creator Engine',
    client: 'Kaviar Label',
    category: 'Fashion',
    year: '2025',
    description: 'Creator whitelisting and Meta scaling strategy behind limited-run streetwear capsule drops.',
    services: ['Influencer Marketing', 'Performance Marketing', 'UGC Videos'],
    thumbnail: '/textures/project-fashion.jpg',
    heroMedia: '/textures/project-fashion-hero.jpg',
    gallery: [
      { url: '/textures/project-fashion-1.jpg', caption: 'Creator handle dark-posting rollout' },
      { url: '/textures/project-fashion-2.jpg', caption: 'High-converting haul and fit check hooks' }
    ],
    overview: 'Kaviar needed an authentic distribution pipeline to scale ad spend without losing underground streetwear credibility. CLYX ran whitelisted ads through niche fashion creators.',
    challenge: 'Direct brand ads had high CPMs and low conversion rates due to audience skepticism in the streetwear space.',
    approach: 'We sourced 18 micro-creators, seeded seasonal capsules, and ran their top-performing organic fit videos as whitelisted ads directly through the creators\' personal handles.',
    execution: 'Constructed custom landing pages, configured dark-posting permissions in Meta Ads Manager, and scaled budget dynamically behind top-converting creator handles.',
    results: [
      { metric: 'Category', label: 'Fashion & Apparel' },
      { metric: 'Strategy', label: 'Creator Whitelisting' },
      { metric: 'Deliverable', label: 'Scaled Ad Account' }
    ],
    tags: ['Fashion', 'Whitelisting', 'Meta Ads', 'Creator Bench']
  },
  {
    slug: 'lumis-botanicals-roas-scale',
    title: 'Lumis Clean Skincare Paid Scale',
    client: 'Lumis Botanicals',
    category: 'Beauty',
    year: '2025',
    description: 'Routine-focused UGC videos and performance scaling across Meta & Google for clean skincare.',
    services: ['Performance Marketing', 'UGC Videos', 'Shopify Store'],
    thumbnail: '/textures/project-beauty.jpg',
    heroMedia: '/textures/project-beauty-hero.jpg',
    gallery: [
      { url: '/textures/project-beauty-1.jpg', caption: 'Side-by-side skin texture comparison hook' },
      { url: '/textures/project-beauty-2.jpg', caption: 'Custom Shopify 2-step bundle checkout' }
    ],
    overview: 'Lumis had established organic popularity but struggled to achieve stable customer acquisition costs at higher ad spend volumes.',
    challenge: 'Skincare buyers demand undeniable proof and peer recommendations before trying new barrier formulations.',
    approach: 'Developed 3-second problem-solution hooks featuring genuine creator skin routines, driving to a speed-optimized Shopify bundle page.',
    execution: 'Tested 24 creative hook variations weekly, optimized Google Search intent, and scaled top-performing creator ads through verified handle whitelisting.',
    results: [
      { metric: 'Category', label: 'Beauty & Skincare' },
      { metric: 'Channel', label: 'Meta & Google Ads' },
      { metric: 'Platform', label: 'Shopify Store' }
    ],
    tags: ['Beauty', 'UGC', 'Shopify', 'Performance']
  },
  {
    slug: 'sip-nourish-functional-beverage',
    title: 'Sip Craft Beverage Launch',
    client: 'Sip Nourish',
    category: 'Food',
    year: '2024',
    description: 'Flavor unboxing content and conversion-first storefront launch for zero-sugar functional drinks.',
    services: ['Influencer Marketing', 'Website Development', 'Social Media Management'],
    thumbnail: '/textures/project-food.jpg',
    heroMedia: '/textures/project-food-hero.jpg',
    gallery: [
      { url: '/textures/project-food-1.jpg', caption: 'Taste-test creator reaction formats' },
      { url: '/textures/project-food-2.jpg', caption: 'High-speed headless landing page' }
    ],
    overview: 'Sip entered the crowded ready-to-drink functional category with a canned botanical soda needing rapid trial and subscription acquisition.',
    challenge: 'Communicating taste and health benefits simultaneously without sounding clinical or dry.',
    approach: 'Leveraged food & lifestyle creators doing authentic blind taste comparisons, paired with a sub-second load Next.js landing page.',
    execution: 'Negotiated paid usage rights across 25 creator assets, structured subscription bundles, and scaled profitable Meta ad campaigns.',
    results: [
      { metric: 'Category', label: 'Food & Beverage' },
      { metric: 'Execution', label: 'Taste Test Ads' },
      { metric: 'Infrastructure', label: 'Next.js Flagship' }
    ],
    tags: ['Food', 'Beverage', 'Next.js', 'Creator Ads']
  },
  {
    slug: 'volt-audio-smart-hardware',
    title: 'Volt Audio Flagship Conversion Store',
    client: 'Volt Audio',
    category: 'Tech',
    year: '2024',
    description: 'Hardware demonstration UGC and conversion-built web store for wireless studio monitors.',
    services: ['Website Development', 'Performance Marketing', 'UGC Videos'],
    thumbnail: '/textures/project-tech.jpg',
    heroMedia: '/textures/project-tech-hero.jpg',
    gallery: [
      { url: '/textures/project-tech-1.jpg', caption: 'Acoustic desk setup lifestyle creative' },
      { url: '/textures/project-tech-2.jpg', caption: 'Conversion-engineered product detail page' }
    ],
    overview: 'Volt Audio designed premium wireless desk speakers for music producers and remote professionals.',
    challenge: 'Higher price point ($280 AOV) required deep product education and frictionless checkout.',
    approach: 'Producer and tech creator desk setups paired with detailed audio breakdown reels and a lightning-fast custom web store.',
    execution: 'Constructed custom landing pages highlighting latency specs, executed Google Shopping and Meta whitelisted campaigns.',
    results: [
      { metric: 'Category', label: 'Consumer Tech' },
      { metric: 'AOV Focus', label: 'High-Ticket Scale' },
      { metric: 'Tech Stack', label: 'Custom Web Dev' }
    ],
    tags: ['Tech', 'Hardware', 'Web Dev', 'Google Ads']
  }
];

export const CATEGORIES: ('All' | ProjectCategory)[] = ['All', 'Fashion', 'Beauty', 'Food', 'Tech'];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return PROJECTS.map((project) => project.slug);
}
