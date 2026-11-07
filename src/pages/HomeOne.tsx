import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, Users, Building, ShieldCheck, Phone, Calendar, Sparkles } from 'lucide-react';
import { Property, Agent, BlogPost, api } from '../api/client';
import { PropertyCard } from '../components/PropertyCard';
import { FloorPlanSection } from '../components/FloorPlanSection';
import { NewsletterSection } from '../components/NewsletterSection';

interface HomeOneProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const HomeOne: React.FC<HomeOneProps> = ({ onNavigate, onOpenCallModal }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState<'best-sale' | 'apartment' | 'rent-house' | 'paint-house'>('best-sale');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [propsRes, agentsRes, blogsRes] = await Promise.all([
          api.getProperties({ category: activeCategory }),
          api.getAgents(),
          api.getBlogs()
        ]);
        setProperties(propsRes.properties);
        setAgents(agentsRes.agents);
        setBlogs(blogsRes.blogs);
      } catch (err) {
        console.error('Failed to fetch home page data', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeCategory]);

  return (
    <div className="w-full bg-[#0B1315] text-slate-100 overflow-hidden">
      {/* 1. HERO SECTION matching exact video: "FIND [capsule] DREAM APARTMENT" + Hand holding 3D House */}
      <section className="relative pt-12 pb-24 px-4 sm:px-8 border-b border-white/5 bg-radial from-[#122327] via-[#0B1315] to-[#080E10]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-[11px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUR PROPERTIES FOR SALE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              FIND{' '}
              {/* Pill capsule with luxury furniture photo inside headline as seen in video! */}
              <span className="inline-flex items-center align-middle mx-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 border border-white/20 shadow-inner overflow-hidden max-h-14 sm:max-h-16">
                <img
                  src="/src/assets/images/luxury_interior_living_1794079005230.jpg"
                  alt="Interior"
                  referrerPolicy="no-referrer"
                  className="w-14 sm:w-20 h-7 sm:h-9 object-cover rounded-full"
                />
              </span>{' '}
              DREAM <br />
              APARTMENT
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed font-light">
              Experience next-generation living with master-planned architectural residences, panoramic penthouses, and bespoke developments tailored for discerning global investors.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="px-8 py-4 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black font-extrabold text-xs uppercase tracking-widest transition-all duration-200 shadow-xl shadow-[#E5A93C]/20 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>CONTACT US</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('properties-list')}
                className="px-8 py-4 rounded bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
              >
                <span>EXPLORE PROPERTIES</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hand Holding Architectural House Model visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Soft ambient back glow */}
              <div className="absolute inset-0 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none" />

              <img
                src="/src/assets/images/hero_hand_holding_house_1794079002895.jpg"
                alt="Architectural House in Palm"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:scale-102 transition-transform duration-700"
              />

              {/* Floating Architectural Badge */}
              <div className="absolute -bottom-4 right-4 bg-[#0F1B1E]/95 border border-[#E5A93C]/40 backdrop-blur-md rounded-lg p-3.5 z-20 shadow-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-[#E5A93C] flex items-center justify-center text-black font-black">
                  ✓
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white uppercase tracking-wider">Certified Architectural Assets</div>
                  <div className="text-[10px] text-slate-400">100% Escrow Verified & Inspected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Your Next Home Apartments" Section (Clean White Background as in video) */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Brand Partner Logos (Sephora, etc. as shown in the video) */}
          <div className="flex flex-wrap items-center justify-between gap-8 pb-14 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-widest text-sm">
            <span className="text-xl sm:text-2xl text-slate-800 font-black tracking-tighter">S E P H O R A</span>
            <span className="text-lg sm:text-xl text-slate-700 font-semibold tracking-wider">CHANEL</span>
            <span className="text-lg sm:text-xl text-slate-700 font-semibold tracking-wider">PRADA</span>
            <span className="text-lg sm:text-xl text-slate-700 font-semibold tracking-wider">GUCCI</span>
            <span className="text-lg sm:text-xl text-slate-700 font-semibold tracking-wider">BALENCIAGA</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-14">
            {/* Left Collage & Images */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
                <img
                  src="/src/assets/images/modern_apartment_exterior_1794079005395.jpg"
                  alt="Modern Apartment Exterior"
                  referrerPolicy="no-referrer"
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Overlapping Gold Accent Circle Badge */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-[#E5A93C] to-[#C99742] text-black p-4 flex flex-col items-center justify-center text-center shadow-xl font-bold">
                <span className="text-xs uppercase tracking-wider font-extrabold">EXPERIENCE</span>
                <span className="text-2xl font-black font-mono">18+</span>
                <span className="text-[10px] uppercase">Years Quality</span>
              </div>
            </div>

            {/* Middle Content: Your Next Home Apartments */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
                  OUR PROPERTIES
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  Your Next Home Apartments
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Survived not only five centuries, but also the leap into electronic typesetting, remaining essential unchanged in the 1950s with the release of modern architectural masterworks.
              </p>

              {/* Checklist from video */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Space Dummy printing & structural layouts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Living Space Dummy printing and industry</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Deving Space printing and industry</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('properties-list')}
                  className="px-6 py-3 rounded bg-[#0B1315] hover:bg-[#1E3035] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                >
                  <span>MORE PROPERTIES</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5A93C]" />
                </button>
              </div>
            </div>

            {/* Right Column: Statistics Grid Card in Yellow/Gold as in video */}
            <div className="lg:col-span-3 bg-gradient-to-br from-[#FFF8E7] to-[#FFF1D0] border border-[#E5A93C]/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E5A93C] text-black flex items-center justify-center font-bold shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">15000</div>
                  <div className="text-xs font-semibold text-slate-600">Total House Sale</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E5A93C] text-black flex items-center justify-center font-bold shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">350</div>
                  <div className="text-xs font-semibold text-slate-600">Car Parking</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E5A93C] text-black flex items-center justify-center font-bold shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">245</div>
                  <div className="text-xs font-semibold text-slate-600">Real Estate</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#E5A93C] text-black flex items-center justify-center font-bold shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">100K+</div>
                  <div className="text-xs font-semibold text-slate-600">Happy Customer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLOOR PLANS & INTERACTIVE BLUEPRINT MAP (Video 00:08) */}
      <FloorPlanSection />

      {/* 4. "EXPLORE GOOD PLACES" Section with category filter tabs */}
      <section className="bg-[#F8FAFB] text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
              OUR PROPERTIES FOR SALE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              EXPLORE GOOD PLACES
            </h2>
          </div>

          {/* Filter Tabs matching the video: [BEST SALE] [APARTMENT] [RENT HOUSE] [PAINT HOUSE] */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            {[
              { id: 'best-sale', label: 'BEST SALE' },
              { id: 'apartment', label: 'APARTMENT' },
              { id: 'rent-house', label: 'RENT HOUSE' },
              { id: 'paint-house', label: 'PAINT HOUSE' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded text-xs uppercase font-bold tracking-wider transition-all duration-200 ${
                  activeCategory === tab.id
                    ? 'bg-[#E5A93C] text-black shadow-md scale-105'
                    : 'bg-white text-slate-700 hover:text-black border border-slate-200 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-lg bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onSelect={(id) => onNavigate('properties-details', { id })}
                  onAgentClick={(agentId) => onNavigate('agent-details', { id: agentId })}
                />
              ))}
            </div>
          )}

          {/* Button: MORE PROPERTIES */}
          <div className="text-center pt-12">
            <button
              onClick={() => onNavigate('properties-list')}
              className="px-8 py-3.5 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:scale-105"
            >
              MORE PROPERTIES
            </button>
          </div>
        </div>
      </section>

      {/* 5. "OUR PROPERTIES AGENT" Section (Dark background, 4 oval cards from video) */}
      <section className="bg-[#0B1315] py-20 px-4 sm:px-8 border-b border-white/10 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block mb-1">
              OUR PROPERTIES DEALER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              OUR PROPERTIES AGENT
            </h2>
          </div>

          {/* 4 Agent Cards matching the video: Clarke mica, Sobuj Khan, Natasa Clarke, Emilia Clarke */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => onNavigate('agent-details', { id: agent.id })}
                className="group bg-[#0F1B1E] border border-white/10 hover:border-[#E5A93C]/50 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-between"
              >
                {/* Oval/Arch portrait as shown in video */}
                <div className="w-36 h-48 rounded-full overflow-hidden border-2 border-[#E5A93C]/40 mb-6 bg-slate-800 p-1 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={agent.image}
                    alt={agent.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="space-y-1 mb-6">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E5A93C] block">
                    {agent.role}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E5A93C] transition-colors">
                    {agent.name}
                  </h3>
                </div>

                {/* Arrow Action Button */}
                <div className="w-10 h-10 rounded-full bg-[#18272A] group-hover:bg-[#E5A93C] text-slate-300 group-hover:text-black flex items-center justify-center transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. "OUR PROPERTY TYPE" Section (3 Cards with icons matching video) */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
              OUR PROPERTIES DEALER
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              OUR PROPERTY TYPE
            </h2>
          </div>

          {/* 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Meet Your Agent */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-[#C99742] hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between group">
              <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center mb-6 transition-colors">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#C99742] transition-colors">
                MEET YOUR AGENT
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                People work for us in more than 70 countries plan over the this breadth of global people work.
              </p>
              <button
                onClick={() => onNavigate('agents')}
                className="w-10 h-10 rounded bg-[#0B1315] group-hover:bg-[#E5A93C] text-white group-hover:text-black flex items-center justify-center transition-colors"
                aria-label="Meet your agent"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: Residential Developer */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-[#C99742] hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between group">
              <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center mb-6 transition-colors">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#C99742] transition-colors">
                RESIDENTIAL DEVELOPER
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                People work for us in more than 70 countries plan over the this breadth of global people work.
              </p>
              <button
                onClick={() => onNavigate('service-details')}
                className="w-10 h-10 rounded bg-[#0B1315] group-hover:bg-[#E5A93C] text-white group-hover:text-black flex items-center justify-center transition-colors"
                aria-label="Residential developer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3: Estate Companies */}
            <div className="p-8 rounded-xl border border-slate-200 hover:border-[#C99742] hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between group">
              <div className="w-16 h-16 rounded-full bg-slate-100 group-hover:bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center mb-6 transition-colors">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#C99742] transition-colors">
                ESTATE COMPANIES
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                People work for us in more than 70 countries plan over the this breadth of global people work.
              </p>
              <button
                onClick={() => onNavigate('service')}
                className="w-10 h-10 rounded bg-[#0B1315] group-hover:bg-[#E5A93C] text-white group-hover:text-black flex items-center justify-center transition-colors"
                aria-label="Estate companies"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. "GET A FREE QUOTE" Full-width Banner matching video */}
      <section className="relative py-28 px-4 sm:px-8 text-center text-white overflow-hidden">
        {/* Background Image with Dark Contrast Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/luxury_quote_bedroom_1794079004333.jpg"
            alt="Luxury Interior Quote"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0B1315]/85 backdrop-blur-[2px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="w-12 h-12 rounded-lg bg-[#E5A93C] text-black flex items-center justify-center mx-auto mb-4 font-black shadow-lg">
            <Building className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            GET A FREE QUOTE
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
            Schedule an executive valuation session or request a custom prospectus for prime urban developments.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('contact')}
              className="flex items-center gap-2 px-8 py-3.5 rounded bg-[#18272A] hover:bg-[#203438] text-white border border-white/20 text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Calendar className="w-4 h-4 text-[#E5A93C]" />
              <span>APPOINTMENT</span>
            </button>

            <button
              onClick={onOpenCallModal}
              className="flex items-center gap-2 px-8 py-3.5 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              <span>MAKE A CALL</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. "OUR LATEST NEWS" Section matching video */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
              OUR NEWS FEEDS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              OUR LEATEST NEWS
            </h2>
          </div>

          {/* News Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogs.map((post) => (
              <div
                key={post.id}
                onClick={() => onNavigate('blog-details', { id: post.id })}
                className="group bg-white rounded-lg overflow-hidden border border-slate-200/80 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Date Badge */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Date badge on top left */}
                    <div className="absolute top-3 left-3 bg-[#E5A93C] text-black px-2.5 py-1 rounded text-center shadow-md">
                      <div className="text-xs font-black leading-none">{post.day}</div>
                      <div className="text-[9px] uppercase font-bold leading-tight">{post.month}</div>
                    </div>
                  </div>

                  <div className="p-5">
                    {/* Author & Category metadata */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold mb-2">
                      <span>{post.author}</span>
                      <span>—</span>
                      <span className="text-[#C99742] uppercase">{post.category}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C99742] transition-colors mb-2 line-clamp-1">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Arrow Button */}
                <div className="px-5 pb-5 pt-0">
                  <div className="w-8 h-8 rounded bg-[#0B1315] group-hover:bg-[#E5A93C] text-white group-hover:text-black flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. "SUBSCRIBE TO NEWSLETTER." */}
      <NewsletterSection />
    </div>
  );
};
