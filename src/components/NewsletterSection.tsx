import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../api/client';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      const res = await api.subscribeNewsletter(email);
      if (res.success) {
        setStatus('success');
        setMessage(res.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(res.message);
      }
    } catch {
      setStatus('error');
      setMessage('Unable to subscribe at the moment. Please try again.');
    }
  };

  return (
    <section className="bg-gradient-to-r from-[#D49B35] via-[#E5A93C] to-[#C78D24] py-14 px-4 sm:px-8 text-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        {/* Left: Titles */}
        <div>
          <span className="text-xs uppercase tracking-widest font-extrabold text-black/70 block mb-1">
            OUR PROPERTIES FOR SALE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-black">
            SUBSCRIBE TO NEWSLETTER.
          </h2>
        </div>

        {/* Right: Email Input & Submit */}
        <div className="w-full md:w-auto min-w-[320px] sm:min-w-[420px]">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Enter Your Email Address..."
                className="w-full px-5 py-3.5 rounded bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-black/30 shadow-md"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3.5 rounded bg-[#0B1315] hover:bg-[#142327] text-white text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 shrink-0 shadow-lg active:scale-95"
            >
              {status === 'loading' ? 'Subscribing...' : 'SUBSCRIBE'}
            </button>
          </form>

          {status === 'success' && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-black bg-black/10 px-3 py-1.5 rounded">
              <CheckCircle2 className="w-4 h-4 text-emerald-800" />
              <span>{message}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold text-rose-950 bg-rose-200/50 px-3 py-1.5 rounded">
              <AlertCircle className="w-4 h-4 text-rose-800" />
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
