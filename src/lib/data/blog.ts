import { BlogPost } from '@/types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'creator-whitelisting-vs-brand-ads',
    title: 'Why Whitelisted Creator Ads Outperform Brand Handles by 3x',
    excerpt: 'When an ad looks like a brand commercial, the user scrolls past. When it comes directly from a creator they trust, retention spikes immediately.',
    content: `
## The Death of the Polished Brand Ad

Most consumers have developed automatic ad blindness. When a post has a corporate logo in the top left and a sponsored tag, the user's subconscious treats it as friction.

### Why Handle Whitelisting Changes Everything

Creator whitelisting (dark posting through a creator's authorized Meta or TikTok profile) bypasses ad cynicism:

1. **Native Social Proof**: The post appears in the feed with the creator's real name, profile photo, and verified comments.
2. **First 1.5-Second Hook**: Creators know how to speak to their audience without sounding like a corporate script.
3. **Algorithm Optimization**: Meta's auction rewards creative that holds watch time and generates authentic engagement with lower CPMs.

### The Scaling Playbook

Instead of paying for a static 24-hour influencer story, we secure 90-day whitelisting rights. From there, performance analytics decide which specific cuts receive scaled ad budget.
    `,
    date: 'March 2025',
    readTime: '4 min read',
    category: 'Creator Ads',
    author: 'CLYX Growth Team'
  },
  {
    slug: 'scaling-meta-ads-on-data-not-opinions',
    title: 'How to Scale Meta Ad Spend Behind Creative Hooks That Actually Convert',
    excerpt: 'Stop debating subjective aesthetics in boardroom meetings. Let the first-hour CPA decide which creative receives 80% of daily spend.',
    content: `
## The Creative Is The New Targeting

With Meta's Advantage+ and automated broad targeting, your creative hook is your audience filter. The copy, voiceover, and first 3 seconds determine who stops and who converts.

### The 3-Tier Creative Testing Framework

We structure client ad accounts around a continuous creative conveyor belt:

- **Tier 1 (Hook Testing)**: 12-24 variations of the first 3 seconds tested with equal initial spend.
- **Tier 2 (Validation)**: Winning hooks paired with optimized call-to-actions and 2-step bundle offers.
- **Tier 3 (Scale)**: The top 5% of creative receiving aggressive daily budget increases until marginal CPA hits threshold.

### Killing Fatigue Before It Starts

By cycling new whitelisted clips every two weeks, ad accounts avoid frequency burnout and maintain steady 3x+ ROAS month over month.
    `,
    date: 'February 2025',
    readTime: '5 min read',
    category: 'Performance Marketing',
    author: 'CLYX Growth Team'
  },
  {
    slug: 'conversion-rate-optimization-for-creator-traffic',
    title: 'Why Sending Creator Ad Traffic to a Generic Homepage Kills Your ROAS',
    excerpt: 'Creator ads create emotional context. Dropping that user onto an impersonal generic catalog page breaks the narrative instantly.',
    content: `
## The Continuity Problem

When a customer clicks an organic-feeling creator video about a specific skincare routine, they expect to land on a page that continues that exact conversation.

### The Conversion-Engineered Architecture

Every whitelisted campaign must route to a purpose-built destination:

1. **Creator-Co-Branded Headers**: Reassuring the buyer that this is the exact bundle recommended by the creator.
2. **Sub-Second Speed**: Every 100ms of latency drops mobile checkout completion by 7%.
3. **Frictionless Bundle Selectors**: Pre-selected quantities and one-click payment flows (Apple Pay, Google Pay, UPI).

When landing page experience matches the creator's ad promise, conversion rates routinely jump 30% to 50%.
    `,
    date: 'January 2025',
    readTime: '4 min read',
    category: 'E-commerce & Web',
    author: 'CLYX Growth Team'
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogPostSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
