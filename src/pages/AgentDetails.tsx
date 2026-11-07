import React, { useState, useEffect } from 'react';
import { Phone, Mail, Award, CheckCircle2, Star, ArrowLeft, Send } from 'lucide-react';
import { Agent, Property, api } from '../api/client';
import { PropertyCard } from '../components/PropertyCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface AgentDetailsProps {
  agentId?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const AgentDetails: React.FC<AgentDetailsProps> = ({
  agentId = 'clarke-mica',
  onNavigate,
  onOpenCallModal
}) => {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentProperties, setAgentProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    async function loadAgent() {
      setLoading(true);
      try {
        const res = await api.getAgent(agentId);
        setAgent(res.agent);
        setAgentProperties(res.properties);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAgent();
  }, [agentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;
    try {
      await api.requestLead({
        name: clientName,
        phone: clientPhone,
        email: clientEmail,
        type: 'agent_direct_message',
        notes: `Agent: ${agent?.name} | Message: ${clientMessage}`
      });
      setMessageSent(true);
    } catch {
      setMessageSent(true);
    }
  };

  if (loading || !agent) {
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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('agents')}
            className="flex items-center gap-2 text-slate-300 hover:text-[#E5A93C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Agents</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#E5A93C] uppercase font-bold">{agent.role}</span>
            <span>/</span>
            <span className="text-white font-bold">{agent.name}</span>
          </div>
        </div>
      </div>

      {/* Agent Profile Banner */}
      <section className="bg-white text-slate-900 py-16 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-[#C99742]/40 shadow-2xl bg-slate-100">
              <img
                src={agent.image}
                alt={agent.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio & Details */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
                {agent.role}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {agent.name}
              </h1>
              <p className="text-sm font-semibold text-slate-500 mt-1">{agent.title}</p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
              {agent.bio}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 max-w-lg">
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">{agent.salesCount}</div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Trophy Deals Closed</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">{agent.experienceYears} Years</div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Prime Market Exp</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#C99742] font-mono">⭐ {agent.rating}</div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Client Satisfaction</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                className="px-6 py-3 rounded bg-[#0B1315] hover:bg-[#1B2A2E] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow"
              >
                <Phone className="w-4 h-4 text-[#E5A93C]" />
                <span>Call {agent.phone}</span>
              </a>
              <button
                onClick={onOpenCallModal}
                className="px-6 py-3 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                Request Call Back
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Represented by Agent & Contact Form */}
      <section className="bg-[#F8FAFB] text-slate-900 py-16 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Active Listings */}
          <div className="lg:col-span-8 space-y-8">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
                CURATED PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Exclusive Listings Represented by {agent.name}
              </h2>
            </div>

            {agentProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {agentProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={(id) => onNavigate('properties-details', { id })}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
                No active public listings currently shown for this broker. Please contact directly for private off-market options.
              </div>
            )}
          </div>

          {/* Direct Consultation Request */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-slate-900">
              Book Consultation with {agent.name}
            </h3>
            <p className="text-xs text-slate-500">
              Submit your property inquiry or private purchase requirements directly to this broker's calendar.
            </p>

            {messageSent ? (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Inquiry Delivered</h4>
                <p className="text-xs text-emerald-700">
                  {agent.name} will review your note and respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Marcus Miller"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs focus:border-[#C99742] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs font-mono focus:border-[#C99742] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="marcus@example.com"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs focus:border-[#C99742] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                    Requirements / Inquiries
                  </label>
                  <textarea
                    rows={4}
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    placeholder="Tell us what size, budget, or neighborhood you are looking for..."
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs focus:border-[#C99742] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#0B1315] hover:bg-[#1E3035] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Send Consultation Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
