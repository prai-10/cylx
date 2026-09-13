import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllBlogPostSlugs } from '@/lib/data/blog';
import { getCmsBlogPostBySlug } from '@/lib/cms/data';
import { Button } from '@/components/ui/Button';

interface BlogSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCmsBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Article Not Found — CLYX' };
  }

  return {
    title: `${post.title} — CLYX Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogSlugProps) {
  const { slug } = await params;
  const post = await getCmsBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="w-full min-h-screen py-16 md:py-24 px-6 md:px-12 max-w-4xl mx-auto">
      <div className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9aaecf] hover:text-[#F5C400] transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>

      {/* Header */}
      <div className="border-b border-[rgba(255,253,240,0.12)] pb-10 mb-12">
        <div className="flex items-center gap-3 text-xs text-[#9aaecf] mb-6">
          <span className="font-mono text-[#F5C400] px-3 py-1 rounded-full bg-[#001840] border border-[rgba(255,253,240,0.12)]">
            {post.category}
          </span>
          <span>•</span>
          <span className="font-mono">{post.readTime}</span>
          <span>•</span>
          <span className="font-mono">{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#FFFDF0] tracking-tight leading-[1.08] mb-6">
          {post.title}
        </h1>

        <p className="text-base sm:text-xl text-[#9aaecf] leading-relaxed font-normal">
          {post.excerpt}
        </p>
      </div>

      {/* Article Content */}
      <article className="prose prose-invert max-w-none text-[#FFFDF0] leading-relaxed flex flex-col gap-6 text-base sm:text-lg">
        {post.content.split('\n\n').map((block, i) => {
          if (block.startsWith('## ')) {
            return (
              <h2 key={i} className="text-2xl sm:text-3xl font-black text-[#FFFDF0] mt-8 mb-2 tracking-tight">
                {block.replace('## ', '')}
              </h2>
            );
          }
          if (block.startsWith('### ')) {
            return (
              <h3 key={i} className="text-lg sm:text-xl font-bold text-[#F5C400] mt-6 mb-2 tracking-tight">
                {block.replace('### ', '')}
              </h3>
            );
          }
          if (block.startsWith('- ')) {
            return (
              <ul key={i} className="list-disc pl-6 text-[#9aaecf] flex flex-col gap-2.5 my-2">
                {block.split('\n').map((li, j) => (
                  <li key={j} className="leading-relaxed">{li.replace(/^- /, '')}</li>
                ))}
              </ul>
            );
          }
          if (block.match(/^\d+\. /)) {
            return (
              <ol key={i} className="list-decimal pl-6 text-[#9aaecf] flex flex-col gap-2.5 my-2">
                {block.split('\n').map((li, j) => (
                  <li key={j} className="leading-relaxed">{li.replace(/^\d+\. /, '')}</li>
                ))}
              </ol>
            );
          }
          return (
            <p key={i} className="text-[#9aaecf] leading-relaxed">
              {block}
            </p>
          );
        })}
      </article>

      {/* Bottom CTA Box */}
      <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-[#001840]/60 border border-[rgba(255,253,240,0.12)] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#F5C400] block mb-1">
            Execution Call
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#FFFDF0] tracking-tight">
            Ready to scale creator whitelisted ads?
          </h3>
          <p className="text-xs sm:text-sm text-[#9aaecf] mt-1">
            Book a 30-minute growth strategy session with our media buyers.
          </p>
        </div>
        <Button href="/contact" variant="primary" size="lg" className="shrink-0">
          Book a growth call →
        </Button>
      </div>
    </main>
  );
}
