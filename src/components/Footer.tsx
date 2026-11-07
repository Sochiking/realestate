import React from 'react';
import { Building2, MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const instagramPhotos = [
    '/assets/images/luxury_interior_living_1794079005230.jpg',
    '/assets/images/luxury_quote_bedroom_1794079004333.jpg',
    '/assets/images/luxury_modern_villa_1794079004096.jpg',
    '/assets/images/modern_apartment_exterior_1794079005395.jpg',
    '/assets/images/hero_hand_holding_house_1794079002895.jpg',
    '/assets/images/luxury_interior_living_1794079005230.jpg'
  ];

  return (
    <footer className="bg-[#080E10] border-t border-white/10 text-slate-400 pt-16 pb-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E5A93C] to-[#C99742] flex items-center justify-center text-black font-bold shadow-lg shadow-[#E5A93C]/20">
                <Building2 className="w-5 h-5 text-black" />
              </div>
              <div className="flex items-center gap-1.5 font-extrabold text-xl tracking-wider text-white">
                <span>NEXT</span>
                <span className="text-[#E5A93C]">HM</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Commercial or industrial purposes and typically includes any resources on the land such as architectural residences, luxury penthouses, and bespoke developer portfolios.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => onNavigate('about')}
                className="text-xs font-semibold text-[#E5A93C] hover:underline flex items-center gap-1"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Working Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              WORKING HOURS
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Sunday to Friday</div>
                  <div className="text-slate-400 font-mono">08:00 - 20:00</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Week Days</div>
                  <div className="text-slate-400 font-mono">08:00 - 20:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              LOCATION
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
                <span className="text-slate-300">W67 Center Park Land Road, New York</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href="tel:+11234562228" className="text-slate-200 hover:text-[#E5A93C] font-mono font-semibold transition-colors">
                  +1 123 456 2228
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <a href="mailto:info@example.com" className="text-slate-200 hover:text-[#E5A93C] transition-colors">
                  info@example.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Instagram Grid */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2">
              INSTAGRAM
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {instagramPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate('properties-list')}
                  className="aspect-square rounded overflow-hidden cursor-pointer group bg-slate-800"
                >
                  <img
                    src={photo}
                    alt={`Instagram real estate ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar: Copyright & Payment icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Copyright © 2024 </span>
            <span className="text-slate-300 font-semibold">NextHM</span>
            <span>. All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#132024] border border-white/5 text-[10px] font-mono text-slate-300">
              PayPal
            </span>
            <span className="px-2.5 py-1 rounded bg-[#132024] border border-white/5 text-[10px] font-mono text-slate-300">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded bg-[#132024] border border-white/5 text-[10px] font-mono text-slate-300">
              MasterCard
            </span>
            <span className="px-2.5 py-1 rounded bg-[#132024] border border-white/5 text-[10px] font-mono text-slate-300">
              Maestro
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
