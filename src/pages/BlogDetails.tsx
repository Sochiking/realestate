import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, User, Tag, Share2, MessageSquare, Send, Check } from 'lucide-react';
import { BlogPost, api } from '../api/client';
import { NewsletterSection } from '../components/NewsletterSection';

interface BlogDetailsProps {
  blogId?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({ blogId = 'blog-1', onNavigate }) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Array<{ name: string; text: string; date: string }>>([
    {
      name: 'Alexander Sterling',
      text: 'The acoustic isolation engineering mentioned in this piece is remarkable. Truly sets modern urban residential architecture apart.',
      date: '2 days ago'
    }
  ]);
  const [commentSent, setCommentSent] = useState(false);

  useEffect(() => {
    async function fetchBlog() {
      setLoading(true);
      try {
        const res = await api.getBlog(blogId);
        setBlog(res.blog);
        setRelated(res.related);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [blogId]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText) return;
    setComments([
      ...comments,
      {
        name: commentName,
        text: commentText,
        date: 'Just now'
      }
    ]);
    setCommentName('');
    setCommentText('');
    setCommentSent(true);
    setTimeout(() => setCommentSent(false), 3000);
  };

  if (loading || !blog) {
    return (
      <div className="w-full min-h-[60vh] bg-[#0B1315] flex items-center justify-center text-white">
        <div className="w-8 h-8 border-2 border-[#E5A93C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Breadcrumb */}
      <div className="bg-[#080E10] border-b border-white/10 py-3.5 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center gap-2 text-slate-300 hover:text-[#E5A93C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>
          <span className="text-[#E5A93C] uppercase font-bold">{blog.category}</span>
        </div>
      </div>

      {/* Main Editorial Article */}
      <article className="bg-white text-slate-900 py-16 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
              <span className="px-3 py-1 rounded bg-[#E5A93C]/20 text-[#C99742] uppercase font-bold">
                {blog.category}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{blog.readTime}</span>
              </span>
              <span>·</span>
              <span>Published {blog.date}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                    alt={blog.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-slate-900">{blog.author}</div>
                  <div className="text-slate-400">Senior Architectural Editor</div>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Article link copied!');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Featured Hero Photo */}
          <div className="rounded-2xl overflow-hidden aspect-[16/9] shadow-xl bg-slate-100">
            <img
              src={blog.image}
              alt={blog.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Body Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base font-light">
            <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
              {blog.excerpt}
            </p>

            <div className="whitespace-pre-line text-slate-700 leading-loose">
              {blog.content}
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border-l-4 border-[#C99742] my-8">
              <p className="italic text-slate-800 text-sm font-serif">
                "Modern luxury isn't defined by excess, but by spatial harmony, natural illumination, and an unwavering commitment to enduring architectural craftsmanship."
              </p>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mt-2">
                — NEXT HM Editorial Bureau
              </span>
            </div>

            <p>
              As prime metropolitan housing markets continue their evolutionary trajectory, investors who prioritize structural integrity, energetic independence, and human-centric layouts will remain positioned at the forefront of generational value retention.
            </p>
          </div>

          {/* Comments Section */}
          <div className="pt-12 border-t border-slate-200 space-y-8">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#C99742]" />
              <h3 className="text-xl font-bold text-slate-900">
                Discussion ({comments.length})
              </h3>
            </div>

            {/* List of comments */}
            <div className="space-y-4">
              {comments.map((c, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className="text-slate-400">{c.date}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900">Leave a Thoughtful Reply</h4>

              {commentSent && (
                <div className="p-2 rounded bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Your comment has been published.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="px-4 py-2.5 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#C99742]"
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder="Share your perspective on this development..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-4 py-2.5 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#C99742]"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded bg-[#0B1315] hover:bg-[#1E3035] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow"
              >
                <Send className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Post Comment</span>
              </button>
            </form>
          </div>
        </div>
      </article>

      {/* Related News Feeds */}
      {related.length > 0 && (
        <section className="bg-[#F8FAFB] text-slate-900 py-16 px-4 sm:px-8 border-b border-slate-200">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Related News Feeds</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((post) => (
                <div
                  key={post.id}
                  onClick={() => onNavigate('blog-details', { id: post.id })}
                  className="bg-white rounded-lg overflow-hidden border border-slate-200 cursor-pointer group hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#C99742] block">
                      {post.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#C99742] transition-colors line-clamp-1">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </div>
  );
};
