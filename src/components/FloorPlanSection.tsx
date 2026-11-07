import React, { useState } from 'react';
import { MapPin, Maximize2, Layers, CheckCircle2, Download } from 'lucide-react';

export const FloorPlanSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ground' | 'first' | 'top'>('ground');
  const [selectedRegion, setSelectedRegion] = useState('north-america');
  const [activePin, setActivePin] = useState(1);

  const plans = {
    ground: {
      title: 'Ground Floor Blueprint',
      totalArea: '4,250 Sq Ft',
      livingArea: '2,800 Sq Ft',
      garage: '2 Cars (450 Sq Ft)',
      terrace: '320 Sq Ft',
      dimensions: '64ft x 48ft',
      rooms: [
        'Grand Foyer & Gallery',
        'Open Concept Chef Kitchen',
        'Double-Height Living Great Room',
        'Formal Dining Room',
        'Guest Bedroom Suite',
        'Dual Car Garage & EV Bay'
      ]
    },
    first: {
      title: 'First Floor Blueprint',
      totalArea: '3,800 Sq Ft',
      livingArea: '3,100 Sq Ft',
      garage: 'N/A',
      terrace: '2 Private Balconies (280 Sq Ft)',
      dimensions: '60ft x 46ft',
      rooms: [
        'Primary Master Bedroom Suite',
        'En-Suite Spa Bath & Dressing Room',
        'Bedroom 2 (En-suite)',
        'Bedroom 3 with Skyline Balcony',
        'Private Study & Library Room',
        'Laundry & Utility Suite'
      ]
    },
    top: {
      title: 'Rooftop Sky Lounge & 3D Top View',
      totalArea: '1,400 Sq Ft',
      livingArea: 'Open Terrace & Deck',
      garage: 'N/A',
      terrace: '1,400 Sq Ft Panoramic Deck',
      dimensions: '42ft x 34ft',
      rooms: [
        '360° Skyline Viewing Deck',
        'Heated Plunge Pool / Jacuzzi',
        'Outdoor BBQ Kitchen & Bar',
        'Solar Pergola Shaded Pavilion'
      ]
    }
  };

  const currentPlan = plans[activeTab];

  const mapPins = [
    { id: 1, label: 'Central Park Residences', city: 'New York, NY', top: '35%', left: '42%' },
    { id: 2, label: 'Palm Bay Villa', city: 'Miami, FL', top: '70%', left: '48%' },
    { id: 3, label: 'Sunset Boulevard Condos', city: 'Los Angeles, CA', top: '48%', left: '18%' },
    { id: 4, label: 'Yorkville Penthouse', city: 'Toronto, ON', top: '22%', left: '46%' }
  ];

  return (
    <section className="bg-[#0A1618] border-y border-white/10 py-20 px-4 sm:px-8 text-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Stylized Region Map with Interactive Pins */}
          <div className="lg:col-span-5 bg-[#071012] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5A93C] block mb-1">
                GLOBAL PORTFOLIO LOCATIONS
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Explore Regional Developments
              </h3>

              {/* Region selection tabs */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setSelectedRegion('north-america')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                    selectedRegion === 'north-america'
                      ? 'bg-[#E5A93C] text-black'
                      : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  NORTH AMERICA
                </button>
                <button
                  onClick={() => setSelectedRegion('europe')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                    selectedRegion === 'europe'
                      ? 'bg-[#E5A93C] text-black'
                      : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  EUROPE
                </button>
                <button
                  onClick={() => setSelectedRegion('asia')}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-colors ${
                    selectedRegion === 'asia'
                      ? 'bg-[#E5A93C] text-black'
                      : 'bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  ASIA
                </button>
              </div>
            </div>

            {/* Stylized Outline Map Area matching the video's architectural drawing */}
            <div className="relative h-72 sm:h-80 w-full my-4 flex items-center justify-center bg-[#050C0D] rounded-lg border border-white/5 p-4">
              {/* Architectural SVG Map Contour */}
              <svg
                viewBox="0 0 300 200"
                className="w-full h-full stroke-[#E5A93C]/40 fill-none stroke-[1.5] opacity-80"
              >
                {/* Stylized continent outline */}
                <path d="M 40,30 Q 80,20 120,40 T 170,25 T 220,50 T 260,90 Q 240,140 190,160 T 140,180 T 80,150 T 30,110 Z" />
                <path d="M 60,60 L 120,70 L 150,110 L 110,140 Z" strokeDasharray="3 3" className="stroke-white/20" />
                <path d="M 160,50 L 220,80 L 190,130 Z" strokeDasharray="3 3" className="stroke-white/20" />
                {/* Coordinate grid lines */}
                <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
                <line x1="150" y1="0" x2="150" y2="200" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
              </svg>

              {/* Interactive Pins */}
              {mapPins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setActivePin(pin.id)}
                  style={{ top: pin.top, left: pin.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all ${
                    activePin === pin.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
                  }`}
                  title={`${pin.label} - ${pin.city}`}
                >
                  <div className={`p-1.5 rounded-full shadow-lg ${
                    activePin === pin.id ? 'bg-[#E5A93C] text-black ring-4 ring-[#E5A93C]/30' : 'bg-[#18272A] text-[#E5A93C] border border-[#E5A93C]/50'
                  }`}>
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}

              {/* Active Pin Tooltip Banner */}
              <div className="absolute bottom-3 left-3 right-3 bg-[#0B1518]/90 backdrop-blur-md border border-[#E5A93C]/30 rounded p-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white text-[11px]">
                    {mapPins.find((p) => p.id === activePin)?.label}
                  </div>
                  <div className="text-[#E5A93C] text-[10px]">
                    {mapPins.find((p) => p.id === activePin)?.city}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  Active Project
                </span>
              </div>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>Selected Territory: <strong className="text-white">North America</strong></span>
              <span className="text-[#E5A93C] font-mono font-bold">148 Units Handled</span>
            </div>
          </div>

          {/* Right Column: Architectural Floor Plan Blueprints matching the video */}
          <div className="lg:col-span-7 bg-[#071012] border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header with Title & Level Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5A93C] block mb-1">
                    ENGINEERING & SPATIAL DESIGN
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    FLOOR PLANS
                  </h3>
                </div>

                {/* Level Tabs */}
                <div className="flex items-center gap-1.5 bg-[#0C1619] border border-white/10 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('ground')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                      activeTab === 'ground' ? 'bg-[#E5A93C] text-black shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Ground Floor
                  </button>
                  <button
                    onClick={() => setActiveTab('first')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                      activeTab === 'first' ? 'bg-[#E5A93C] text-black shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    First Floor
                  </button>
                  <button
                    onClick={() => setActiveTab('top')}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                      activeTab === 'top' ? 'bg-[#E5A93C] text-black shadow' : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    3D Top View
                  </button>
                </div>
              </div>

              {/* Architectural Technical Blueprint Display */}
              <div className="my-6 bg-[#0B1518] border border-white/10 rounded-lg p-6 relative overflow-hidden">
                {/* Architectural Blueprint Drawing in SVG */}
                <div className="h-64 sm:h-72 w-full flex items-center justify-center relative">
                  <svg
                    viewBox="0 0 600 340"
                    className="w-full h-full stroke-[#E5A93C]/80 fill-none"
                    style={{ strokeWidth: 1.5 }}
                  >
                    {/* Blueprint grid background */}
                    <defs>
                      <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="600" height="340" fill="url(#blueprint-grid)" />

                    {/* Exterior Walls */}
                    <rect x="40" y="30" width="520" height="280" className="stroke-[#E5A93C] stroke-2" fill="rgba(229, 169, 60, 0.02)" />

                    {/* Room partitions */}
                    {activeTab === 'ground' && (
                      <>
                        <line x1="240" y1="30" x2="240" y2="310" className="stroke-white/60 stroke-2" />
                        <line x1="40" y1="180" x2="240" y2="180" className="stroke-white/60 stroke-2" />
                        <line x1="240" y1="160" x2="420" y2="160" className="stroke-white/60 stroke-2" />
                        <line x1="420" y1="30" x2="420" y2="310" className="stroke-white/60 stroke-2" />
                        {/* Room labels */}
                        <text x="140" y="110" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">CHEF KITCHEN</text>
                        <text x="140" y="130" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">18' x 16'</text>

                        <text x="140" y="240" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">DOUBLE GARAGE</text>
                        <text x="140" y="260" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">22' x 20'</text>

                        <text x="330" y="100" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">GREAT LIVING ROOM</text>
                        <text x="330" y="120" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">24' x 22'</text>

                        <text x="330" y="240" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">ENTRY FOYER</text>
                        <text x="330" y="260" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">14' x 12'</text>

                        <text x="490" y="170" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">GUEST SUITE</text>
                        <text x="490" y="190" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">16' x 14'</text>
                      </>
                    )}

                    {activeTab === 'first' && (
                      <>
                        <line x1="280" y1="30" x2="280" y2="310" className="stroke-white/60 stroke-2" />
                        <line x1="40" y1="160" x2="280" y2="160" className="stroke-white/60 stroke-2" />
                        <line x1="280" y1="180" x2="560" y2="180" className="stroke-white/60 stroke-2" />
                        {/* Room labels */}
                        <text x="160" y="100" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">PRIMARY MASTER SUITE</text>
                        <text x="160" y="120" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">26' x 20'</text>

                        <text x="160" y="240" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">EN-SUITE SPA BATH</text>
                        <text x="160" y="260" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">18' x 14'</text>

                        <text x="420" y="100" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">BEDROOM 2 (BALCONY)</text>
                        <text x="420" y="120" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">16' x 15'</text>

                        <text x="420" y="240" fill="#E5A93C" fontSize="13" textAnchor="middle" fontWeight="bold">BEDROOM 3 & LIBRARY</text>
                        <text x="420" y="260" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="middle">16' x 15'</text>
                      </>
                    )}

                    {activeTab === 'top' && (
                      <>
                        <circle cx="300" cy="170" r="70" className="stroke-[#E5A93C] stroke-2" fill="rgba(229,169,60,0.05)" />
                        <rect x="80" y="60" width="120" height="220" className="stroke-white/50" strokeDasharray="4 4" />
                        <rect x="400" y="60" width="120" height="220" className="stroke-white/50" strokeDasharray="4 4" />
                        <text x="300" y="165" fill="#E5A93C" fontSize="14" textAnchor="middle" fontWeight="bold">SKYLINE PLUNGE POOL</text>
                        <text x="300" y="185" fill="rgba(255,255,255,0.6)" fontSize="11" textAnchor="middle">Heated Infinity Jet</text>
                        <text x="140" y="170" fill="white" fontSize="12" textAnchor="middle">BBQ & BAR LOUNGE</text>
                        <text x="460" y="170" fill="white" fontSize="12" textAnchor="middle">SOLAR SUN DECK</text>
                      </>
                    )}

                    {/* Architectural dimension markers */}
                    <line x1="40" y1="325" x2="560" y2="325" stroke="#E5A93C" strokeWidth="1" />
                    <line x1="40" y1="320" x2="40" y2="330" stroke="#E5A93C" strokeWidth="1" />
                    <line x1="560" y1="320" x2="560" y2="330" stroke="#E5A93C" strokeWidth="1" />
                    <text x="300" y="337" fill="#E5A93C" fontSize="10" textAnchor="middle" fontFamily="monospace">OVERALL SPAN: {currentPlan.dimensions}</text>
                  </svg>

                  <div className="absolute top-3 right-3 bg-[#071012]/90 border border-white/10 px-3 py-1.5 rounded text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#E5A93C]" />
                    <span>Scale 1:100 Metric</span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
                <div className="bg-[#0B1518] border border-white/5 p-3 rounded">
                  <span className="text-slate-400 block text-[10px] uppercase">Total Footprint</span>
                  <span className="font-bold text-white text-sm font-mono">{currentPlan.totalArea}</span>
                </div>
                <div className="bg-[#0B1518] border border-white/5 p-3 rounded">
                  <span className="text-slate-400 block text-[10px] uppercase">Dimensions</span>
                  <span className="font-bold text-white text-sm font-mono">{currentPlan.dimensions}</span>
                </div>
                <div className="bg-[#0B1518] border border-white/5 p-3 rounded">
                  <span className="text-slate-400 block text-[10px] uppercase">Living Area</span>
                  <span className="font-bold text-white text-sm font-mono">{currentPlan.livingArea || 'N/A'}</span>
                </div>
                <div className="bg-[#0B1518] border border-white/5 p-3 rounded">
                  <span className="text-slate-400 block text-[10px] uppercase">Garage / Parking</span>
                  <span className="font-bold text-white text-sm font-mono">{currentPlan.garage}</span>
                </div>
              </div>

              {/* Room Inclusions List */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Key Spatial Inclusions:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {currentPlan.rooms.map((room, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                      <span>{room}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Blueprint Action Button */}
            <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Architectural CAD & BIM files ready for inspection
              </span>
              <button
                onClick={() => {
                  alert('Architectural BIM/CAD technical drawing package prepared for download.');
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#E5A93C] hover:bg-[#d89c31] text-black font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Spec Sheet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
