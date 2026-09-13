export type ProjectCategory = 'Fashion' | 'Beauty' | 'Food' | 'Tech';

export interface ProjectGalleryItem {
  url: string;
  caption?: string;
  type?: 'image' | 'video';
}

export interface ProjectResult {
  metric?: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  description: string;
  services: string[];
  thumbnail: string;
  heroMedia: string;
  gallery: ProjectGalleryItem[];
  overview: string;
  challenge: string;
  approach: string;
  execution: string;
  results: ProjectResult[];
  tags: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  adSpendManaged: string;
  roasLift: string;
  creatorHandle: string;
  whitelistedFormat: string;
  summary: string;
  challenge: string;
  whitelistingStrategy: string;
  scalingData: string;
  results: ProjectResult[];
  featuredClipUrl?: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  capabilities: string[];
  deliverables?: string[];
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube';
  category: ProjectCategory;
  followers: string;
  averageEngagement: string;
  specialty: string;
  whitelistingReady: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bioPlaceholder: string;
}

export interface Job {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  status: 'open' | 'closed';
}

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
  createdAt?: string;
}

export interface CareerApplication {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  message?: string;
  createdAt?: string;
}

export interface NavPromptItem {
  prompt: string;
  path: string;
  description: string;
  keywords: string[];
}
