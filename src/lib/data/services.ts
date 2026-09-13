import { Service } from '@/types';

export const SERVICES: Service[] = [
  {
    id: 'influencer-marketing',
    title: 'Influencer Marketing',
    shortDescription: 'We build and manage a creator bench matched to your category, then negotiate content + usage rights for paid.',
    longDescription: 'Instead of transactional shoutouts, we recruit and manage a dedicated creator bench aligned directly with your brand category. Every creator relationship is structured to secure dark-post permissions and full paid whitelisting rights from day one.',
    capabilities: [
      'Category-Matched Creator Scouting',
      'Usage & Paid Whitelisting Rights Negotiation',
      'Creator Bench Management & Retention',
      'Creative Briefing & Hook Formulation',
      'Dark Posting & Handle Permissions Setup'
    ]
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    shortDescription: 'Meta & Google campaigns run on data, not guesses — we scale spend behind what\'s already converting.',
    longDescription: 'Paid ad scaling built around verified unit economics. We structure full-funnel Meta and Google ad accounts, test dozens of creator hooks weekly, and rapidly scale spend behind the creative variations that hit target CPA and ROAS thresholds.',
    capabilities: [
      'Full-Funnel Meta & Google Ads Architecture',
      'Data-Backed Creative Scaling Engine',
      'ROAS Optimization & Daily Budget Allocation',
      'Retargeting & LTV Multiplier Campaigns',
      'Attribution & Conversion API Configuration'
    ]
  },
  {
    id: 'social-media-management',
    title: 'Social Media Management',
    shortDescription: 'Monthly content calendars, channel management, and organic strategy that builds a real audience.',
    longDescription: 'Consistent organic presence that builds brand authority and compound reach. We produce monthly content calendars, direct vertical video production, manage channel publishing, and interact with your community in real time.',
    capabilities: [
      'Monthly Strategic Content Calendars',
      'Channel Growth & Community Moderation',
      'Organic Trend Adaptation & Audio Sourcing',
      'Brand Tone & Editorial Voice Execution',
      'Cross-Platform Distribution (IG, TikTok, YouTube)'
    ]
  },
  {
    id: 'ugc-videos',
    title: 'UGC Videos',
    shortDescription: 'Product photography, video direction, and AI-assisted design assets built for the feed, not a boardroom.',
    longDescription: 'Content engineered to stop thumbs in the first 1.5 seconds. We script, direct, and produce high-converting user-generated style video, tactile product visuals, and dynamic assets designed to blend seamlessly into native feeds.',
    capabilities: [
      'Feed-Native Hook Scripting & Video Direction',
      'Unboxing, Testimonial & Problem-Solution UGC',
      'Tactile Product Visuals & Video Shoots',
      'AI-Assisted Creative Asset Variations',
      'High-Velocity Hook Testing Assets'
    ]
  },
  {
    id: 'website-development',
    title: 'Website Development',
    shortDescription: 'UI/UX-first, conversion-built sites — coded fast, priced for what they return in revenue.',
    longDescription: 'Conversion-engineered web experiences designed to monetize ad traffic. We combine high-performance frontend engineering with modern typography and frictionless checkout journeys that maximize average order value and conversion rate.',
    capabilities: [
      'Conversion-Optimized Landing Page Design',
      'Custom Headless Next.js & React Engineering',
      'Sub-Second Page Load Optimization',
      'Mobile-First Ergonomics & Frictionless UX',
      'Continuous Conversion Rate Optimization (CRO)'
    ]
  },
  {
    id: 'shopify-store',
    title: 'Shopify Store',
    shortDescription: 'Storefronts built around checkout speed, merchandising, and the metrics that actually move revenue.',
    longDescription: 'E-commerce flagships designed to handle high-volume creator traffic without bottlenecks. We configure storefront architecture, speed-optimized theme development, strategic upsells, cross-sells, and checkout workflows that maximize revenue per visitor.',
    capabilities: [
      'Custom Shopify Theme Development',
      'Checkout Speed & Core Web Vitals Tuning',
      'High-Converting Bundle & Upsell Architecture',
      'Merchandising & Product Page Optimization',
      'Analytics, Pixel & Tracking Stack Setup'
    ]
  }
];
