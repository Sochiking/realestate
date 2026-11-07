import React, { useState } from 'react';
import { Heart, Maximize2, Bed, Bath, MapPin, Share2, Eye } from 'lucide-react';
import { Property } from '../api/client';

interface PropertyCardProps {
  property: Property;
  onSelect: (id: string) => void;
  onAgentClick?: (agentId: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelect,
  onAgentClick
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onClick={() => onSelect(property.id)}
      className="group bg-white rounded-lg overflow-hidden border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={property.image}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-[#0B1315]/80 backdrop-blur-md text-[#E5A93C] text-[10px] font-bold uppercase tracking-wider rounded">
            {property.categoryLabel}
          </span>
        </div>

        {/* Action icons (Favorite, Share) */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={handleFavorite}
            aria-label="Save to favorites"
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            aria-label="Share property"
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {copied && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-3 py-1 rounded shadow">
            Link Copied!
          </div>
        )}
      </div>

      {/* Property Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#C99742] transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          {/* Price & Square footage */}
          <div className="flex items-center justify-between text-xs text-slate-600 mb-3 pb-3 border-b border-slate-100 font-medium">
            <div>
              <span className="text-slate-400">Price: </span>
              <span className="text-slate-900 font-bold font-mono">
                ${property.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Maximize2 className="w-3.5 h-3.5 text-[#C99742]" />
              <span>Square Ft: {property.squareFt.toLocaleString()}</span>
            </div>
          </div>

          {/* Rooms, Beds, Baths, City specs matching the video */}
          <div className="grid grid-cols-2 gap-y-2 text-xs text-slate-500 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-800">Room:</span>
              <span>{property.rooms}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C99742]" />
              <span>City: {property.city}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.beds} Bed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{property.baths} Bath</span>
            </div>
          </div>
        </div>

        {/* Footer: Agent info snippet + View button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div
            onClick={(e) => {
              if (onAgentClick) {
                e.stopPropagation();
                onAgentClick(property.agentId);
              }
            }}
            className="flex items-center gap-2.5 group/agent hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 border border-slate-300">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Agent"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-900 leading-tight">Dlazzer Max</div>
              <div className="text-[10px] text-slate-500 leading-tight">Estate Agents</div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-[#C99742] group-hover:translate-x-0.5 transition-transform">
            <span>View Details</span>
            <Eye className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
