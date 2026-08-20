import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Smartphone, Layers, Laptop, Copy } from 'lucide-react';
import { blogs } from '@/data/blogs';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

const gradientThemes: Record<string, string> = {
  flutter: 'from-accent-fill via-accent-fill-strong to-[#10267A]',
  state: 'from-accent-fill-strong via-accent-fill to-[#10267A]',
  frontend: 'from-accent-fill via-accent-fill-strong to-[#10267A]',
};

// Next.js static generation params helper
export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.id,
  }));
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogs.find((b) => b.id === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <article className="min-h-screen pt-28 pb-20 relative">
        {/* Glow effect */}
        <div className="absolute top-[10%] left-[20%] h-[30vw] w-[30vw] rounded-full bg-accent-strong/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back button */}
          <Link 
            href="/#blog" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-deep transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Post Header */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold border border-accent/20 bg-accent/5 text-accent">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed italic border-l-2 border-accent/50 pl-4 py-1">
              {post.excerpt}
            </p>
          </div>

          {/* Banner Image */}
          <div className={`relative h-64 sm:h-80 md:h-[350px] bg-gradient-to-tr ${gradientThemes[post.imageClass] || gradientThemes.flutter} rounded-3xl overflow-hidden flex flex-col items-center justify-center p-8 mb-16 shadow-lg`}>
            <div className="text-white/20 scale-[2.5] mb-4">
              {post.iconType === 'flutter' && <Smartphone size={48} />}
              {post.iconType === 'sitemap' && <Layers size={48} />}
              {post.iconType === 'laptop-code' && <Laptop size={48} />}
            </div>
            
            {/* Tech grid overlays */}
            <div className="absolute inset-0 bg-transparent opacity-[0.08]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
          </div>

          {/* Blog Content Parser */}
          <div className="space-y-8 text-slate-700 leading-relaxed text-base sm:text-lg">
            {post.content.map((section, idx) => {
              switch (section.type) {
                case 'paragraph':
                  return (
                    <p key={idx} className="text-slate-700 leading-relaxed mb-6">
                      {section.text}
                    </p>
                  );
                case 'heading':
                  if (section.level === 2) {
                    return (
                      <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-slate-900 mt-12 mb-4 tracking-tight border-b border-slate-200 pb-2">
                        {section.text}
                      </h2>
                    );
                  } else {
                    return (
                      <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-800 mt-8 mb-3 tracking-tight">
                        {section.text}
                      </h3>
                    );
                  }
                case 'code':
                  return (
                    <div key={idx} className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-code shadow-inner group/code relative">
                      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-code-header">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{section.language || 'code'}</span>
                        <button 
                          className="text-slate-500 hover:text-accent transition-colors"
                          title="Copy Code"
                          // Since it's a server component we can implement standard copying or ignore interactive client details
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                      <pre className="p-6 overflow-x-auto text-sm font-mono text-[#A9C0FF] leading-relaxed">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  );
                case 'quote':
                  return (
                    <blockquote key={idx} className="my-8 pl-6 border-l-4 border-accent py-3 bg-accent/5 rounded-r-xl italic text-slate-800">
                      &ldquo;{section.text}&rdquo;
                    </blockquote>
                  );
                case 'list':
                  return (
                    <ul key={idx} className="my-6 space-y-3 pl-6 list-none">
                      {section.items?.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case 'table':
                  return (
                    <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-slate-200 bg-code">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-200 bg-code-header">
                            {section.headers?.map((header, headIdx) => (
                              <th key={headIdx} className="px-6 py-4 text-sm font-bold text-slate-800 uppercase tracking-wider">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-sm">
                          {section.rows?.map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-slate-50 transition-colors">
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} className="px-6 py-4 text-slate-700 font-medium">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
