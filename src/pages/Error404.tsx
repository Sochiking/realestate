import React, { useState } from 'react';
import { Home, Search, ArrowRight, Building, Compass } from 'lucide-react';

interface Error404Props {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Error404: React.FC<Error404Props> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigate('properties-list', { search: query.trim() });
    } else {
      onNavigate('properties-list');
    }
  };

  return (
    <div className="w-full min-h-[75vh] bg-[#0B1315] text-slate-100 flex items-center justify-center py-20 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="relative inline-block">
          <span className="text-8xl sm:text-9xl font-black text-white/5 font-mono select-none block">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-[#E5A93C]/10 border border-[#E5A93C] flex items-center justify-center text-[#E5A93C] shadow-2xl">
              <Compass className="w-10 h-10 animate-spin-slow" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block">
            PAGE ERROR 404
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            RESIDENCE NOT FOUND
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            The architectural blueprint or page coordinates you requested do not exist in our active registry.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Search properties, agents, or articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-[#0F1B1E] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-[#E5A93C]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-[#E5A93C] hover:bg-[#d89c31] text-black font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow"
          >
            Search
          </button>
        </form>

        {/* Quick Links */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs">
          <button
            onClick={() => onNavigate('home-1')}
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
          >
            <Home className="w-4 h-4 text-[#E5A93C]" />
            <span>Return to Home One</span>
          </button>
          <button
            onClick={() => onNavigate('properties-list')}
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
          >
            <Building className="w-4 h-4 text-[#E5A93C]" />
            <span>Browse Properties List</span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
          >
            <span>Contact Desk</span>
            <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
          </button>
        </div>
      </div>
    </div>
  );
};
