import React, { useState, useEffect } from 'react';
import {
  MapPin, Bed, Bath, Maximize2, Car, Calendar, Check,
  Share2, Heart, Phone, Mail, ShieldCheck, Play, ArrowLeft,
  Download, Sparkles
} from 'lucide-react';
import { Property, Agent, api } from '../api/client';
import { PropertyCard } from '../components/PropertyCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface PropertyDetailsProps {
  propertyId?: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  propertyId = 'prop-1',
  onNavigate,
  onOpenCallModal
}) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePlanTab, setActivePlanTab] = useState<'ground' | 'first' | '3d'>('ground');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('I am interested in scheduling a private VIP walkthrough for this residence.');
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);

  useEffect(() => {
    async function loadDetails() {
      setLoading(true);
      try {
        const res = await api.getProperty(propertyId);
        setProperty(res.property);
        setAgent(res.agent || null);
        setSimilar(res.similar || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [propertyId]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    try {
      await api.requestLead({
        name: inquiryName,
        phone: inquiryPhone,
        email: inquiryEmail,
        type: 'property_detail_inquiry',
        notes: `Property: ${property?.title} (ID: ${property?.id}) | Message: ${inquiryMessage}`
      });
      setInquirySuccess(true);
    } catch {
      setInquirySuccess(true);
    }
  };

  if (loading || !property) {
    return (
      <div className="w-full min-h-[60vh] bg-[#0B1315] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#E5A93C] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#E5A93C]">Loading Property Blueprint...</span>
        </div>
      </div>
    );
  }

  const galleryImages = [
    property.image,
    '/src/assets/images/luxury_quote_bedroom_1794079004333.jpg',
    '/src/assets/images/luxury_interior_living_1794079005230.jpg',
    '/src/assets/images/luxury_modern_villa_1794079004096.jpg'
  ];

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Navigation Breadcrumb Bar */}
      <div className="bg-[#080E10] border-b border-white/10 py-3.5 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('properties-list')}
            className="flex items-center gap-2 text-slate-300 hover:text-[#E5A93C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#E5A93C] uppercase font-bold">{property.categoryLabel}</span>
            <span>/</span>
            <span className="truncate max-w-[200px] text-white">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Property Hero & Gallery */}
      <section className="py-8 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Title, Address, Price, Actions Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded bg-[#E5A93C] text-black text-[10px] font-extrabold uppercase tracking-widest">
                {property.categoryLabel}
              </span>
              <span className="text-xs text-slate-400">Year Built: {property.yearBuilt}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {property.title}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-[#E5A93C]" />
              <span>{property.address}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="text-left sm:text-right">
              <span className="text-xs uppercase font-bold text-slate-400 block">Offer Price</span>
              <span className="text-3xl sm:text-4xl font-black text-[#E5A93C] font-mono">
                ${property.price.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-3 rounded-lg border transition-colors ${
                  isFavorite
                    ? 'bg-rose-500 border-rose-500 text-white'
                    : 'bg-[#0F1B1E] border-white/10 hover:border-white/30 text-white'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert('Property link copied to clipboard!');
                }}
                className="p-3 rounded-lg bg-[#0F1B1E] border border-white/10 hover:border-white/30 text-white transition-colors"
                aria-label="Share property link"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenCallModal}
                className="px-6 py-3 rounded-lg bg-[#E5A93C] hover:bg-[#d89c31] text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg"
              >
                Book Inspection
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9 aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-white/10 relative">
            <img
              src={galleryImages[selectedGalleryIdx]}
              alt={property.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded text-xs text-white">
              Photo {selectedGalleryIdx + 1} of {galleryImages.length}
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-3 lg:grid-cols-1 gap-4">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedGalleryIdx(idx)}
                className={`aspect-[16/10] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  selectedGalleryIdx === idx ? 'border-[#E5A93C] scale-[1.02]' : 'border-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="bg-white text-slate-900 py-16 px-4 sm:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Details Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
              <div>
                <Maximize2 className="w-5 h-5 text-[#C99742] mx-auto mb-1.5" />
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Area</span>
                <span className="text-base font-bold font-mono text-slate-900">{property.squareFt.toLocaleString()} Sq Ft</span>
              </div>
              <div>
                <Bed className="w-5 h-5 text-[#C99742] mx-auto mb-1.5" />
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Bedrooms</span>
                <span className="text-base font-bold font-mono text-slate-900">{property.beds} Suites</span>
              </div>
              <div>
                <Bath className="w-5 h-5 text-[#C99742] mx-auto mb-1.5" />
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Bathrooms</span>
                <span className="text-base font-bold font-mono text-slate-900">{property.baths} Bath</span>
              </div>
              <div>
                <Car className="w-5 h-5 text-[#C99742] mx-auto mb-1.5" />
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Car Parking</span>
                <span className="text-base font-bold font-mono text-slate-900">{property.parking} Bays</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Property Overview & Architectural Highlights
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {property.description}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Engineered with high acoustic dampening, custom Italian millwork, and seamless indoor-outdoor transition decks, this property reflects NEXT HM's dedication to uncompromising residential luxury.
              </p>
            </div>

            {/* Amenities Checklist */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                Residence Amenities & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-[#E5A93C]/20 text-[#C99742] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Tour Walkthrough */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Virtual Cinematic Walkthrough</h3>
                  <p className="text-xs text-slate-500">Full 4K architectural drone and interior exploration</p>
                </div>
                <span className="px-3 py-1 rounded bg-black text-[#E5A93C] text-[10px] font-mono font-bold">
                  4K UHD
                </span>
              </div>
              <div className="rounded-xl overflow-hidden bg-black aspect-video relative">
                <video
                  controls
                  className="w-full h-full object-cover"
                  src="/assets/videos/luxury_walkthrough.mp4"
                />
              </div>
            </div>

            {/* Interactive Floor Plan Selector */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Architectural Floor Plans</h3>
                <div className="flex gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-bold">
                  <button
                    onClick={() => setActivePlanTab('ground')}
                    className={`px-3 py-1.5 rounded ${activePlanTab === 'ground' ? 'bg-[#0B1315] text-[#E5A93C]' : 'text-slate-600'}`}
                  >
                    Level 1
                  </button>
                  <button
                    onClick={() => setActivePlanTab('first')}
                    className={`px-3 py-1.5 rounded ${activePlanTab === 'first' ? 'bg-[#0B1315] text-[#E5A93C]' : 'text-slate-600'}`}
                  >
                    Level 2
                  </button>
                  <button
                    onClick={() => setActivePlanTab('3d')}
                    className={`px-3 py-1.5 rounded ${activePlanTab === '3d' ? 'bg-[#0B1315] text-[#E5A93C]' : 'text-slate-600'}`}
                  >
                    3D Terrace
                  </button>
                </div>
              </div>

              <div className="bg-[#0B1518] text-white p-6 rounded-xl border border-white/10 flex items-center justify-center min-h-[260px]">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#E5A93C]/20 text-[#E5A93C] flex items-center justify-center mx-auto">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">
                    {activePlanTab === 'ground' ? 'Ground Level Architectural Layout' : activePlanTab === 'first' ? 'Upper Master Suite Floor Plan' : '3D Rooftop Terrace Blueprint'}
                  </h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Dimensions: 64ft x 48ft · Ceiling Height: 11ft · Structural glass envelope with direct elevator foyer.
                  </p>
                  <button
                    onClick={() => alert('CAD Blueprint downloaded.')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#E5A93C] text-black font-bold text-xs uppercase rounded hover:bg-[#d89c31] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CAD Blueprints</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Agent Contact & Direct Booking Form */}
          <div className="lg:col-span-4 space-y-8">
            {/* Broker Card */}
            {agent && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded-full overflow-hidden bg-slate-200 border-2 border-[#C99742]">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C99742] block">
                      LISTING BROKER
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                    <p className="text-xs text-slate-500">{agent.title}</p>
                    <div className="text-xs font-semibold text-slate-700 mt-1">
                      ⭐ {agent.rating} Rating · {agent.salesCount} Deals
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C99742]" />
                    <span className="font-mono">{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#C99742]" />
                    <span>{agent.email}</span>
                  </div>
                </div>

                {/* Direct Schedule Inquiry */}
                {inquirySuccess ? (
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-2">
                    <Check className="w-6 h-6 text-emerald-600 mx-auto" />
                    <h4 className="text-sm font-bold text-emerald-900">Inspection Scheduled</h4>
                    <p className="text-xs text-emerald-700">
                      {agent.name} has received your inquiry and will call you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#C99742]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white font-mono focus:outline-none focus:border-[#C99742]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#C99742]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={3}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#C99742]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded bg-[#0B1315] hover:bg-[#1A2A2E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
                    >
                      Send Inquiry To {agent.name}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Escrow & Security Trust Card */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#FFF8E7] to-[#FFF1D0] border border-[#E5A93C]/40 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#C99742]" />
                <span>Escrow & Title Guarantee</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All NEXT HM properties undergo stringent title audits, environmental zoning approvals, and institutional escrow closing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      {similar.length > 0 && (
        <section className="bg-[#F8FAFB] text-slate-900 py-16 px-4 sm:px-8 border-b border-slate-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
                  PORTFOLIO RECOMMENDATIONS
                </span>
                <h3 className="text-2xl font-bold text-slate-900">Similar Properties You May Like</h3>
              </div>
              <button
                onClick={() => onNavigate('properties-list')}
                className="text-xs font-bold text-[#C99742] hover:underline"
              >
                View Catalog
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similar.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onSelect={(id) => onNavigate('properties-details', { id })}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterSection />
    </div>
  );
};
