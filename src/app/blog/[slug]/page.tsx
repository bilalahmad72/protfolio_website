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
  flutter: 'from-sky-500 via-blue-600 to-indigo-700 shadow-sky-500/10',
  state: 'from-purple-500 via-indigo-600 to-blue-700 shadow-purple-500/10',
  frontend: 'from-cyan-500 via-blue-600 to-purple-700 shadow-cyan-500/10',
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
        <div className="absolute top-[10%] left-[20%] h-[30vw] w-[30vw] rounded-full bg-neon-indigo/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back button */}
          <Link 
            href="/#blog" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:text-neon-purple transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Post Header */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed italic border-l-2 border-neon-cyan/50 pl-4 py-1">
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
          <div className="space-y-8 text-slate-300 leading-relaxed text-base sm:text-lg">
            {post.content.map((section, idx) => {
              switch (section.type) {
                case 'paragraph':
                  return (
                    <p key={idx} className="text-slate-300 leading-relaxed mb-6">
                      {section.text}
                    </p>
                  );
                case 'heading':
                  if (section.level === 2) {
                    return (
                      <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-slate-100 mt-12 mb-4 tracking-tight border-b border-white/5 pb-2">
                        {section.text}
                      </h2>
                    );
                  } else {
                    return (
                      <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-200 mt-8 mb-3 tracking-tight">
                        {section.text}
                      </h3>
                    );
                  }
                case 'code':
                  return (
                    <div key={idx} className="my-8 rounded-2xl overflow-hidden border border-white/5 bg-[#0B0F19]/80 shadow-inner group/code relative">
                      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-slate-900/60">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{section.language || 'code'}</span>
                        <button 
                          className="text-slate-500 hover:text-neon-cyan transition-colors"
                          title="Copy Code"
                          // Since it's a server component we can implement standard copying or ignore interactive client details
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                      <pre className="p-6 overflow-x-auto text-sm font-mono text-cyan-300 leading-relaxed">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  );
                case 'quote':
                  return (
                    <blockquote key={idx} className="my-8 pl-6 border-l-4 border-neon-cyan py-3 bg-neon-cyan/5 rounded-r-xl italic text-slate-200">
                      "{section.text}"
                    </blockquote>
                  );
                case 'list':
                  return (
                    <ul key={idx} className="my-6 space-y-3 pl-6 list-none">
                      {section.items?.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_#00F2FE] mt-2.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case 'table':
                  return (
                    <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-white/5 bg-[#0B0F19]/40 glassmorphism">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 bg-slate-900/60">
                            {section.headers?.map((header, headIdx) => (
                              <th key={headIdx} className="px-6 py-4 text-sm font-bold text-slate-200 uppercase tracking-wider">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                          {section.rows?.map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-white/5 transition-colors">
                              {row.map((cell, cellIdx) => (
                                <td key={cellIdx} className="px-6 py-4 text-slate-300 font-medium">
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
