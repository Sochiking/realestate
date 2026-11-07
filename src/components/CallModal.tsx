import React, { useState } from 'react';
import { X, Phone, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '../api/client';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyInterest, setPropertyInterest] = useState('LuxuryApartment Nice View');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please provide both your name and phone number.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await api.requestLead({
        name,
        phone,
        type: 'vip_call_request',
        notes: `Interested in: ${propertyInterest}`
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(res.message || 'Something went wrong, please try again.');
      }
    } catch {
      setErrorMessage('Unable to reach concierge backend right now. Please call directly at +1 123 456 2228.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0F1B1E] border border-white/10 rounded-xl shadow-2xl p-6 sm:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C] flex items-center justify-center mx-auto text-[#E5A93C]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Call Request Confirmed</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Thank you, <span className="text-[#E5A93C] font-semibold">{name}</span>. An executive broker from NEXT HM will reach you at <span className="text-[#E5A93C] font-semibold">{phone}</span> within 15 minutes.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-md bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#d89c31] transition-colors"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">VIP Direct Call & Inquiry</h3>
                <p className="text-xs text-slate-400">Speak directly with an Executive Seller</p>
              </div>
            </div>

            {/* Direct hotline banner */}
            <div className="bg-[#142327] border border-white/5 rounded-lg p-4 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Direct Hotline</span>
                <a href="tel:+11234562228" className="text-xl font-extrabold text-[#E5A93C] hover:underline font-mono">
                  +1 123 456 2228
                </a>
              </div>
              <div className="text-right text-xs text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Available Now</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded bg-rose-950/50 border border-rose-500/50 text-rose-200 text-xs">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Johnathan Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md bg-[#080E10] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#E5A93C] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 234-5678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md bg-[#080E10] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#E5A93C] transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Property Portfolio Interest
                </label>
                <select
                  value={propertyInterest}
                  onChange={(e) => setPropertyInterest(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-md bg-[#080E10] border border-white/10 text-white text-sm focus:outline-none focus:border-[#E5A93C] transition-colors"
                >
                  <option value="LuxuryApartment Nice View">LuxuryApartment Nice View ($250,000)</option>
                  <option value="VistaVibe Residences">VistaVibe Residences ($326,000)</option>
                  <option value="EliteView Residences">EliteView Residences ($358,000)</option>
                  <option value="GrandView Estate">GrandView Estate ($298,000)</option>
                  <option value="Pinnacle View Estates">Pinnacle View Estates ($410,000)</option>
                  <option value="General Private Portfolio Consultation">General Private Portfolio Consultation</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-md bg-gradient-to-r from-[#E5A93C] to-[#d89c31] text-black font-extrabold text-xs uppercase tracking-widest hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 shadow-lg shadow-[#E5A93C]/20"
                >
                  {submitting ? 'Connecting Broker...' : 'Request Instant Callback'}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict privacy guaranteed. No marketing spam.</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
