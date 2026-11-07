import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, DollarSign, ArrowRight, Play, Star, ShieldCheck } from 'lucide-react';
import { Property, api } from '../api/client';
import { PropertyCard } from '../components/PropertyCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface HomeTwoProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const HomeTwo: React.FC<HomeTwoProps> = ({ onNavigate, onOpenCallModal }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchCity, setSearchCity] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await api.getProperties();
        setProperties(res.properties);
      } catch (e) {
        console.error(e);
      }
    }
    fetchProperties();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('properties-list', {
      city: searchCity,
      category: searchType
    });
  };

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Home Two Hero: Modern Architectural Showcase with Floating Search Bar */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-8 overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/luxury_modern_villa_1794079004096.jpg"
            alt="Modern Villa Twilight"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1315] via-[#0B1315]/70 to-[#0B1315]/80" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>HOME TWO · MODERN ARCHITECTURAL SHOWCASE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
            Find Your Trophy Residence Across World-Class Cities
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Curated architectural penthouses, beachfront estates, and iconic residences with verified institutional escrow.
          </p>

          {/* Quick Search Bar */}
          <div className="bg-[#0F1B1E]/95 border border-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl max-w-4xl mx-auto text-left">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Location / City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#E5A93C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    placeholder="New York, Miami, LA..."
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-[#080E10] border border-white/10 text-xs text-white focus:outline-none focus:border-[#E5A93C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Property Category
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#E5A93C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-[#080E10] border border-white/10 text-xs text-white focus:outline-none focus:border-[#E5A93C]"
                  >
                    <option value="all">All Categories</option>
                    <option value="best-sale">Best Sale</option>
                    <option value="apartment">Apartment</option>
                    <option value="rent-house">Rent House</option>
                    <option value="paint-house">Paint House (Penthouse)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Price Budget
                </label>
                <div className="relative">
                  <DollarSign className="w-4 h-4 text-[#E5A93C] absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded bg-[#080E10] border border-white/10 text-xs text-white focus:outline-none focus:border-[#E5A93C]"
                  >
                    <option value="all">Any Price</option>
                    <option value="250000">Up to $250,000</option>
                    <option value="350000">Up to $350,000</option>
                    <option value="500000">Up to $500,000+</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Properties</span>
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#E5A93C]" />
              <span>Verified Titles</span>
            </span>
            <span>·</span>
            <span>Zero Brokerage Fees for Pre-orders</span>
            <span>·</span>
            <span>Architectural Guarantee</span>
          </div>
        </div>
      </section>

      {/* Featured Penthouse Spotlight with Video Tour */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-2xl bg-black">
            {isPlayingVideo ? (
              <video
                controls
                autoPlay
                className="w-full h-80 sm:h-96 object-cover"
                src="/assets/videos/luxury_walkthrough.mp4"
              />
            ) : (
              <div className="relative h-80 sm:h-96 w-full group cursor-pointer" onClick={() => setIsPlayingVideo(true)}>
                <img
                  src="/src/assets/images/luxury_interior_living_1794079005230.jpg"
                  alt="Penthouse Living Room"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#E5A93C] text-black flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded p-3 text-white text-xs flex items-center justify-between">
                  <span>Watch 4K Cinematic Walkthrough</span>
                  <span className="text-[#E5A93C] font-mono">0:24</span>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block">
              TROPHY SPOTLIGHT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              The Sky Crown Penthouse Collection
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ascending 68 stories above Manhattan, each duplex sky villa features bespoke Calacatta marble finishes, private cantilevered plunge pools, and dual master suites.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase">Square Footage</span>
                <span className="font-bold text-slate-900 text-sm font-mono">11,200 Sq Ft</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase">Starting Price</span>
                <span className="font-bold text-[#C99742] text-sm font-mono">$410,000</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => onNavigate('properties-details', { id: 'prop-3' })}
                className="px-6 py-3 rounded bg-[#0B1315] hover:bg-[#1C2C30] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
              >
                <span>Explore Penthouse Details</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C]" />
              </button>
              <button
                onClick={onOpenCallModal}
                className="px-6 py-3 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black text-xs font-bold uppercase tracking-wider transition-colors shadow"
              >
                Schedule Private Viewing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Available Properties */}
      <section className="bg-[#F8FAFB] text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
                CURATED SELECTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Prime Listings Ready For Move-in
              </h2>
            </div>
            <button
              onClick={() => onNavigate('properties-list')}
              className="text-xs font-bold text-[#C99742] hover:underline flex items-center gap-1.5"
            >
              <span>View All 245 Listings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={(id) => onNavigate('properties-details', { id })}
              />
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
