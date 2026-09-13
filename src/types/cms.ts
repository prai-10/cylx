import { ProjectCategory } from './index';

export type ContentStatus = 'draft' | 'published';
export type ApplicationStatus = 'New' | 'Reviewing' | 'Shortlisted' | 'Rejected' | 'Hired';
export type ContactStatus = 'New' | 'Contacted' | 'Closed';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'editor';
  fullName?: string;
  createdAt?: string;
}

export interface CmsProject {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  description: string;
  services: string[];
  thumbnail: string;
  heroMedia: string;
  gallery: { url: string; caption?: string; type?: 'image' | 'video' }[];
  overview: string;
  challenge: string;
  approach: string;
  execution: string;
  results: { metric?: string; label: string }[];
  tags: string[];
  status: ContentStatus;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CmsCaseStudy {
  id: string;
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
  results: { metric?: string; label: string }[];
  status: ContentStatus;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CmsCreator {
  id: string;
  name: string;
  handle: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube';
  category: ProjectCategory;
  followers: string;
  averageEngagement: string;
  specialty: string;
  whitelistingReady: boolean;
  status: ContentStatus;
  sortOrder: number;
  createdAt: string;
}

export interface CmsBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  coverImage?: string;
  status: ContentStatus;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CmsService {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  capabilities: string[];
  sortOrder: number;
  isActive: boolean;
}

export interface CmsJob {
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
  sortOrder: number;
  createdAt: string;
}

export interface CmsApplication {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  message?: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface CmsContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
}

export interface DashboardStats {
  publishedProjects: number;
  publishedCaseStudies: number;
  publishedCreators: number;
  publishedBlogPosts: number;
  activeJobs: number;
  newContactSubmissions: number;
  newApplications: number;
}
