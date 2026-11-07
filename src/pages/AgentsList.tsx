import React, { useState, useEffect } from 'react';
import { Phone, Mail, Award, ArrowRight, Twitter, Facebook, Linkedin, Instagram, Star } from 'lucide-react';
import { Agent, api } from '../api/client';
import { NewsletterSection } from '../components/NewsletterSection';

interface AgentsListProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const AgentsList: React.FC<AgentsListProps> = ({ onNavigate, onOpenCallModal }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAgents() {
      try {
        const res = await api.getAgents();
        setAgents(res.agents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadAgents();
  }, []);

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Header */}
      <section className="py-20 px-4 sm:px-8 border-b border-white/10 text-center bg-radial from-[#122327] to-[#080E10]">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block">
            OUR PROPERTIES DEALER
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            AGENTS STYLE 1
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            Our licensed Executive Sellers and international property directors provide discreet, high-caliber advisory across luxury residential assets.
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="group bg-slate-50 border border-slate-200 hover:border-[#C99742] rounded-2xl p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between"
                >
                  <div>
                    {/* Arch/Oval portrait as seen in video */}
                    <div
                      onClick={() => onNavigate('agent-details', { id: agent.id })}
                      className="w-36 h-48 mx-auto rounded-full overflow-hidden border-2 border-[#C99742]/40 mb-6 bg-slate-200 p-1 cursor-pointer group-hover:scale-105 transition-transform"
                    >
                      <img
                        src={agent.image}
                        alt={agent.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C99742] block mb-1">
                      {agent.role}
                    </span>

                    <h3
                      onClick={() => onNavigate('agent-details', { id: agent.id })}
                      className="text-xl font-bold text-slate-900 hover:text-[#C99742] cursor-pointer transition-colors mb-1"
                    >
                      {agent.name}
                    </h3>

                    <p className="text-xs text-slate-500 mb-4 line-clamp-1">{agent.title}</p>

                    <div className="flex items-center justify-center gap-1 text-xs text-amber-500 font-bold mb-4">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{agent.rating} Rating</span>
                      <span className="text-slate-400 font-normal">({agent.salesCount} Deals)</span>
                    </div>

                    {/* Socials */}
                    <div className="flex items-center justify-center gap-3 text-slate-400 mb-6">
                      <a href="#" className="hover:text-[#C99742] transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
                      <a href="#" className="hover:text-[#C99742] transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
                      <a href="#" className="hover:text-[#C99742] transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
                      <a href="#" className="hover:text-[#C99742] transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    <button
                      onClick={() => onNavigate('agent-details', { id: agent.id })}
                      className="w-full py-2.5 rounded bg-[#0B1315] hover:bg-[#1E3035] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View Profile & Listings</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C]" />
                    </button>
                    <button
                      onClick={onOpenCallModal}
                      className="w-full py-2 rounded bg-[#E5A93C]/20 hover:bg-[#E5A93C] text-black hover:text-black text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Quick Direct Call
                    </button>
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
