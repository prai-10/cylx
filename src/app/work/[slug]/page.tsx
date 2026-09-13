import { redirect } from 'next/navigation';
import { getAllProjectSlugs } from '@/lib/data/projects';

interface WorkSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function WorkSlugRedirectPage({ params }: WorkSlugProps) {
  const { slug } = await params;
  redirect(`/portfolio/${slug}`);
}
