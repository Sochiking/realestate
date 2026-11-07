import React, { useState } from 'react';
import { Clock, MapPin, Twitter, Facebook, Linkedin, Instagram, Globe, ChevronDown } from 'lucide-react';

interface TopBarProps {
  currentLang: string;
  onSelectLang: (lang: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentLang, onSelectLang }) => {
  const [langOpen, setLangOpen] = useState(false);
  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'AR', name: 'العربية' }
  ];

  return (
    <div className="bg-[#080E10] border-b border-white/5 text-xs text-slate-300 py-2.5 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Schedule & Address */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Sun To Fri 09:00 AM To 05:00 PM</span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>W7 Sosal Central Park, New York</span>
          </div>
        </div>

        {/* Right: Social icons & Language dropdown */}
        <div className="flex items-center gap-5 ml-auto">
          <div className="flex items-center gap-3">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#E5A93C] transition-colors" aria-label="Twitter">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#E5A93C] transition-colors" aria-label="Facebook">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#E5A93C] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-[#E5A93C] transition-colors" aria-label="Instagram">
              <Instagram className="w-3.5 h-3.5" />
            </a>
          </div>

          <span className="text-white/20">|</span>

          {/* Language selector dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>{currentLang}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#0F1B1E] border border-white/10 rounded-md shadow-xl py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onSelectLang(l.code);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      currentLang === l.code ? 'text-[#E5A93C] bg-white/5 font-semibold' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{l.name}</span>
                    <span className="text-[10px] text-slate-500">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
