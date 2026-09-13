import { CaseStudy } from '@/types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'scaling-apparel-creator-whitelisting',
    title: 'Scaling D2C Streetwear via Creator Handle Whitelisting',
    client: 'Kaviar Label',
    category: 'Fashion',
    adSpendManaged: '₹3.2Cr+',
    roasLift: '3.6x',
    creatorHandle: '@marcus.fits',
    whitelistedFormat: 'Reels Dark Post / Fit Check Hook',
    summary: 'How shifting ad spend from brand-owned profiles into verified creator whitelisting dropped CPA by 42% while scaling monthly spend.',
    challenge: 'Kaviar relied on standard studio-shot collection ads on Meta. Ad fatigue hit quickly, CPA doubled, and cold audiences viewed the creative as uninspired commercial interruption.',
    whitelistingStrategy: 'We onboarded 12 micro-creators already wearing the brand. Instead of reposting their videos on the brand page, we connected their Facebook/Instagram handles directly to Kaviar\'s ad account and ran their organic "how I style it" clips as whitelisted dark posts.',
    scalingData: 'Ad spend was systematically shifted into the top 3 creator handles generating sub-target CPA. Conversion rate surged because the ad appeared organically as a personal creator recommendation rather than a sponsored post.',
    results: [
      { metric: '3.6x', label: 'Blended ROAS achieved' },
      { metric: '-42%', label: 'Reduction in customer acquisition cost' },
      { metric: '100%', label: 'Scale driven by creator handles' }
    ]
  },
  {
    slug: 'skincare-ugc-performance-engine',
    title: 'Turning Problem-Solution UGC Into a 3.2x ROAS Engine',
    client: 'Lumis Botanicals',
    category: 'Beauty',
    adSpendManaged: '₹4.8Cr+',
    roasLift: '3.2x',
    creatorHandle: '@glowwithtara',
    whitelistedFormat: 'Macro Texture Demonstration & Routine Hook',
    summary: 'A disciplined UGC testing framework combining creator routine videos with custom Shopify 2-step bundle funnels.',
    challenge: 'Lumis was selling single SKUs through cold Meta traffic. High ad costs prevented profitable customer acquisition at scale.',
    whitelistingStrategy: 'We produced 24 UGC variations structured around 3 distinct consumer objections: skin barrier repair, texture compatibility, and routine simplicity. Top clips were whitelisted through trusted esthetician and beauty creator handles.',
    scalingData: 'Traffic was directed to a custom Shopify landing page with instant 2-step bundle selectors. Daily spend was scaled 5x over 90 days while maintaining profitability.',
    results: [
      { metric: '3.2x', label: 'Average ROAS lift' },
      { metric: '48%', label: 'Increase in Average Order Value (AOV)' },
      { metric: '24', label: 'Creative hooks tested monthly' }
    ]
  },
  {
    slug: 'functional-beverage-subscription-funnel',
    title: 'Launching a Functional Beverage With Direct Creator Ads',
    client: 'Sip Nourish',
    category: 'Food',
    adSpendManaged: '₹2.1Cr+',
    roasLift: '3.8x',
    creatorHandle: '@healthycurations',
    whitelistedFormat: 'Blind Taste Test & Afternoon Energy Hook',
    summary: 'Using honest taste-test creator videos to overcome canned soda skepticism and scale monthly recurring subscriptions.',
    challenge: 'Healthy soda alternatives face immense consumer taste skepticism online. Standard static product shots failed to generate trial.',
    whitelistingStrategy: 'We sent unlabeled sample cans to wellness creators, filming genuine first reactions and afternoon energy comparisons. Top unscripted reactions were deployed as whitelisted ads.',
    scalingData: 'Campaigns scaled spend dynamically into subscription offers, pairing Meta creator ads with Google Brand Search capture.',
    results: [
      { metric: '3.8x', label: 'ROAS on whitelisted spend' },
      { metric: '62%', label: 'Subscription opt-in rate' },
      { metric: '< 1s', label: 'Landing page load time' }
    ]
  }
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((c) => c.slug);
}
