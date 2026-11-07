import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { api } from '../api/client';
import { NewsletterSection } from '../components/NewsletterSection';

interface ContactUsProps {
  onOpenCallModal: () => void;
}

export const ContactUs: React.FC<ContactUsProps> = ({ onOpenCallModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Property Acquisition Inquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus('submitting');
    try {
      const res = await api.submitContact({
        name,
        email,
        phone,
        subject,
        message
      });

      if (res.success) {
        setStatus('success');
        setStatusMessage(res.message);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setStatus('error');
        setStatusMessage(res.message);
      }
    } catch {
      setStatus('error');
      setStatusMessage('Unable to connect to messaging server. Please call +1 123 456 2228.');
    }
  };

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Header */}
      <section className="py-20 px-4 sm:px-8 border-b border-white/10 text-center bg-radial from-[#122327] to-[#080E10]">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block">
            GET IN TOUCH WITH OUR BROKERS
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            CONTACT US
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            We welcome private viewings, institutional syndication queries, and media inquiries at our Central Park headquarters.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="bg-white text-slate-900 py-12 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Headquarters</h3>
            <p className="text-xs text-slate-600">W67 Center Park Land Road, New York, NY</p>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center mx-auto">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Direct Hotline</h3>
            <a href="tel:+11234562228" className="text-xs font-mono font-bold text-[#C99742] block hover:underline">
              +1 123 456 2228
            </a>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">VIP Concierge</h3>
            <a href="mailto:info@example.com" className="text-xs text-slate-600 block hover:underline">
              info@example.com
            </a>
          </div>

          <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Office Hours</h3>
            <p className="text-xs text-slate-600">Sun to Fri 09:00 AM - 05:00 PM</p>
          </div>
        </div>
      </section>

      {/* Interactive Contact Form & Location Map Area */}
      <section className="bg-[#F8FAFB] text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
                MESSAGE OUR TEAM
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Send a Confidential Inquiry
              </h2>
            </div>

            {status === 'success' ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Message Delivered</h3>
                <p className="text-xs text-emerald-700">{statusMessage}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 rounded bg-slate-900 text-white text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status === 'error' && (
                  <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                    {statusMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Katherine Gray"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:border-[#C99742] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="katherine@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:border-[#C99742] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-mono bg-slate-50 focus:bg-white focus:border-[#C99742] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:border-[#C99742] focus:outline-none"
                    >
                      <option value="Property Acquisition Inquiry">Property Acquisition Inquiry</option>
                      <option value="Residential Development Mandate">Residential Development Mandate</option>
                      <option value="Private Portfolio Valuation">Private Portfolio Valuation</option>
                      <option value="Escrow & Legal Counseling">Escrow & Legal Counseling</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about your desired residence, budget, or timeframe..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:border-[#C99742] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="px-8 py-3.5 rounded bg-[#0B1315] hover:bg-[#1E3035] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>{status === 'submitting' ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Map & Direct Call Card */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Map Simulation */}
            <div className="bg-[#0B1315] border border-white/10 rounded-2xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5A93C]">
                  CENTRAL PARK FLAGSHIP
                </span>
                <span className="text-xs text-slate-400 font-mono">40.7644° N, 73.9740° W</span>
              </div>

              {/* Stylized Architectural Map Graphic */}
              <div className="h-60 rounded-xl overflow-hidden bg-[#070F11] border border-white/10 relative flex items-center justify-center p-4">
                <svg viewBox="0 0 300 180" className="w-full h-full stroke-white/15 fill-none">
                  <path d="M 20,40 L 280,40" strokeWidth="2" stroke="rgba(229,169,60,0.4)" />
                  <path d="M 20,90 L 280,90" strokeWidth="2" stroke="rgba(229,169,60,0.4)" />
                  <path d="M 20,140 L 280,140" strokeWidth="2" stroke="rgba(229,169,60,0.4)" />
                  <path d="M 80,10 L 80,170" strokeWidth="2" stroke="rgba(255,255,255,0.15)" />
                  <path d="M 160,10 L 160,170" strokeWidth="2" stroke="rgba(255,255,255,0.15)" />
                  <path d="M 240,10 L 240,170" strokeWidth="2" stroke="rgba(255,255,255,0.15)" />
                  {/* Central Park block */}
                  <rect x="90" y="45" width="60" height="40" fill="rgba(34, 197, 94, 0.15)" stroke="rgba(34,197,94,0.4)" />
                  <text x="120" y="68" fill="#4ade80" fontSize="8" textAnchor="middle" fontWeight="bold">CENTRAL PARK</text>
                </svg>

                {/* Pin marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                  <div className="p-2 rounded-full bg-[#E5A93C] text-black shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="bg-black/90 text-[10px] text-white px-2 py-0.5 rounded mt-1 font-bold whitespace-nowrap border border-white/10">
                    NEXT HM Tower
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 flex items-center justify-between">
                <span>W67 Center Park Land Road, New York</span>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#E5A93C] hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Open Directions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Call Banner */}
            <div className="p-6 rounded-2xl bg-[#E5A93C] text-black flex items-center justify-between shadow-lg">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest block text-black/70">
                  NEED IMMEDIATE GUIDANCE?
                </span>
                <h4 className="text-lg font-black">Speak With A Senior Partner</h4>
              </div>
              <button
                onClick={onOpenCallModal}
                className="px-5 py-2.5 rounded bg-black text-[#E5A93C] font-bold text-xs uppercase tracking-wider hover:bg-slate-900 transition-colors"
              >
                Call Concierge
              </button>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
