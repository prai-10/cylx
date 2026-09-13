import { NavPromptItem } from '@/types';

export const PROMPT_ITEMS: NavPromptItem[] = [
  {
    prompt: 'go home',
    path: '/',
    description: 'Return to CLYX homepage — Performance marketing · Creator ads · Web',
    keywords: ['home', 'start', 'main', 'landing', 'clyx', 'beginning']
  },
  {
    prompt: 'who are you?',
    path: '/about',
    description: 'Learn about CLYX, our performance approach, and direct team access',
    keywords: ['about', 'who', 'clyx', 'agency', 'story', 'team', 'direct access', 'mission']
  },
  {
    prompt: 'what do you do?',
    path: '/services',
    description: 'Explore our six growth disciplines: Influencer, Performance, SMM, UGC, Web & Shopify',
    keywords: ['services', 'disciplines', 'influencer', 'performance', 'ugc', 'shopify', 'web', 'smm', 'capabilities', 'ads']
  },
  {
    prompt: 'show me your portfolio',
    path: '/portfolio',
    description: 'Browse campaigns across Fashion, Beauty, Food, and Tech',
    keywords: ['portfolio', 'work', 'campaigns', 'projects', 'fashion', 'beauty', 'food', 'tech']
  },
  {
    prompt: 'show case studies',
    path: '/case-studies',
    description: 'Creator whitelisting data, ad spend managed, and ROAS lift breakdowns',
    keywords: ['case studies', 'results', 'roas', 'data', 'whitelisting', 'metrics', 'spend', 'growth']
  },
  {
    prompt: 'creator network',
    path: '/creators',
    description: 'Join or discover our 200+ whitelisting-ready creator network',
    keywords: ['creators', 'influencer bench', 'ugc creators', 'whitelisting handle', 'join network']
  },
  {
    prompt: 'read your blog',
    path: '/blog',
    description: 'Notes on running paid + creator together & monthly newsletter',
    keywords: ['blog', 'articles', 'notes', 'newsletter', 'read', 'insights', 'playbook']
  },
  {
    prompt: 'i want to join',
    path: '/careers',
    description: 'Explore open roles in performance, creative strategy, and tech',
    keywords: ['careers', 'jobs', 'hiring', 'open roles', 'apply', 'work here']
  },
  {
    prompt: 'start a project',
    path: '/contact',
    description: 'Book a growth call or discuss scaling your brand with creator ads',
    keywords: ['start a project', 'contact', 'book a growth call', 'hire', 'quote', 'whatsapp', 'call']
  }
];

export interface MatchResult {
  item: NavPromptItem;
  score: number;
  isExact: boolean;
}

export function matchPrompt(input: string): MatchResult[] {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return [];

  const results: MatchResult[] = [];

  for (const item of PROMPT_ITEMS) {
    let score = 0;
    const normalizedPrompt = item.prompt.toLowerCase();

    if (normalizedPrompt === normalized) {
      results.push({ item, score: 100, isExact: true });
      continue;
    }

    if (normalizedPrompt.includes(normalized) || normalized.includes(normalizedPrompt)) {
      score += 50;
    }

    const inputWords = normalized.split(/\s+/);
    for (const word of inputWords) {
      if (word.length < 2) continue;

      for (const kw of item.keywords) {
        if (kw === word) {
          score += 25;
        } else if (kw.includes(word) || word.includes(kw)) {
          score += 15;
        }
      }
    }

    if (score > 0) {
      results.push({ item, score, isExact: false });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
