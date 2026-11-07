import React, { useState, useEffect } from 'react';
import { Building2, Users, ShieldCheck, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Agent, api } from '../api/client';
import { NewsletterSection } from '../components/NewsletterSection';

interface AboutUsProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onNavigate, onOpenCallModal }) => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    async function fetchAgents() {
      try {
        const res = await api.getAgents();
        setAgents(res.agents);
      } catch (e) {
        console.error(e);
      }
    }
    fetchAgents();
  }, []);

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Page Header */}
      <section className="relative py-20 px-4 sm:px-8 border-b border-white/10 text-center bg-radial from-[#122327] to-[#080E10]">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block">
            ABOUT NEXT HM
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Pioneering Prime Architectural Living
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Headquartered on Central Park South, New York, NEXT HM curates high-end residential real estate developments, landmark penthouses, and bespoke developer investments across the globe.
          </p>
        </div>
      </section>

      {/* Brand Partners Bar (Sephora, Chanel, Gucci, Prada) */}
      <section className="bg-white py-12 px-4 sm:px-8 border-b border-slate-200 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-8 text-center">
          <span className="text-2xl text-slate-900 font-black tracking-tighter">S E P H O R A</span>
          <span className="text-xl text-slate-800 font-semibold tracking-wider">CHANEL</span>
          <span className="text-xl text-slate-800 font-semibold tracking-wider">PRADA</span>
          <span className="text-xl text-slate-800 font-semibold tracking-wider">GUCCI</span>
          <span className="text-xl text-slate-800 font-semibold tracking-wider">BALENCIAGA</span>
        </div>
      </section>

      {/* Main Story & Statistics */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
              <img
                src="/src/assets/images/luxury_modern_villa_1794079004096.jpg"
                alt="Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-[#E5A93C] text-black p-6 rounded-2xl shadow-xl font-bold max-w-xs">
              <div className="text-2xl font-black font-mono">15,000+</div>
              <div className="text-xs uppercase tracking-wider font-extrabold">Successful House Sales</div>
              <div className="text-[11px] font-normal text-black/80 mt-1">Transacted with 100% legal escrow security.</div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block">
              OUR FOUNDING PRINCIPLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Crafting Sanctuaries of Distinction & Enduring Value
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Survived not only five centuries, but also the leap into electronic typesetting, remaining essential unchanged in the 1950s with the release of modern architectural masterworks. At NEXT HM, we combine classical architectural precision with modern technological underwriting.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C99742] shrink-0" />
                <span>Space Dummy printing & structural verification</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C99742] shrink-0" />
                <span>Living Space Dummy printing and bespoke residential developments</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C99742] shrink-0" />
                <span>Global network across 70+ sovereign jurisdictions</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded bg-[#0B1315] hover:bg-[#1A2A2E] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                Schedule Private Consultation
              </button>
              <button
                onClick={onOpenCallModal}
                className="px-6 py-3 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                Direct Hotline
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Corporate Stats Strip */}
      <section className="bg-[#0B1315] py-16 px-4 sm:px-8 border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl bg-[#0F1B1E] border border-white/5">
            <div className="text-3xl sm:text-4xl font-black text-[#E5A93C] font-mono mb-1">15000</div>
            <div className="text-xs uppercase font-bold text-slate-300">Total House Sale</div>
          </div>
          <div className="p-6 rounded-xl bg-[#0F1B1E] border border-white/5">
            <div className="text-3xl sm:text-4xl font-black text-[#E5A93C] font-mono mb-1">350</div>
            <div className="text-xs uppercase font-bold text-slate-300">Car Parking Spaces</div>
          </div>
          <div className="p-6 rounded-xl bg-[#0F1B1E] border border-white/5">
            <div className="text-3xl sm:text-4xl font-black text-[#E5A93C] font-mono mb-1">245</div>
            <div className="text-xs uppercase font-bold text-slate-300">Real Estate Developments</div>
          </div>
          <div className="p-6 rounded-xl bg-[#0F1B1E] border border-white/5">
            <div className="text-3xl sm:text-4xl font-black text-[#E5A93C] font-mono mb-1">100K+</div>
            <div className="text-xs uppercase font-bold text-slate-300">Happy Customers</div>
          </div>
        </div>
      </section>

      {/* Executive Agents Team */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
              OUR LEADERSHIP & BROKERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Meet Our Executive Sellers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => onNavigate('agent-details', { id: agent.id })}
                className="group bg-slate-50 border border-slate-200 hover:border-[#C99742] rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center justify-between"
              >
                <div className="w-32 h-44 rounded-full overflow-hidden border-2 border-[#C99742]/40 mb-4 bg-slate-200">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C99742] block">
                    {agent.role}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C99742] transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">{agent.title}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 w-full flex items-center justify-between text-xs text-slate-600">
                  <span>{agent.salesCount} Deals Closed</span>
                  <ArrowRight className="w-4 h-4 text-[#C99742]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
