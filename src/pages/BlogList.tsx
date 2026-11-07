import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Calendar, User, Tag, Clock } from 'lucide-react';
import { BlogPost, api } from '../api/client';
import { NewsletterSection } from '../components/NewsletterSection';

interface BlogListProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const BlogList: React.FC<BlogListProps> = ({ onNavigate }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await api.getBlogs();
        setBlogs(res.blogs);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const filtered = blogs.filter((b) => {
    const matchesCat = categoryFilter === 'ALL' || b.category.toUpperCase() === categoryFilter;
    const matchesSearch = !search.trim() ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Header */}
      <section className="py-20 px-4 sm:px-8 border-b border-white/10 text-center bg-radial from-[#122327] to-[#080E10]">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block">
            OUR NEWS FEEDS
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            OUR LATEST NEWS & EDITORIAL
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            Insights on architectural trends, prime residential transactions, and sovereign wealth property syndications.
          </p>
        </div>
      </section>

      {/* Blog Workspace */}
      <section className="bg-white text-slate-900 py-16 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Search & Categories Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'REAL ESTATE', 'ARCHITECTURE', 'INVESTMENT', 'LIFESTYLE'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${
                    categoryFilter === cat
                      ? 'bg-[#0B1315] text-[#E5A93C]'
                      : 'bg-slate-100 text-slate-600 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:border-[#C99742]"
              />
            </div>
          </div>

          {/* Grid of Posts */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onNavigate('blog-details', { id: post.id })}
                  className="group bg-white rounded-lg overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image with date badge */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-[#E5A93C] text-black px-2.5 py-1 rounded text-center shadow-md">
                        <div className="text-xs font-black leading-none">{post.day}</div>
                        <div className="text-[9px] uppercase font-bold leading-tight">{post.month}</div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold mb-2">
                        <span>{post.author}</span>
                        <span>—</span>
                        <span className="text-[#C99742] uppercase">{post.category}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C99742] transition-colors mb-2 line-clamp-1">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">{post.readTime}</span>
                    <div className="w-8 h-8 rounded bg-[#0B1315] group-hover:bg-[#E5A93C] text-white group-hover:text-black flex items-center justify-center transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
