import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal, MapPin, Building, RotateCcw } from 'lucide-react';
import { Property, api } from '../api/client';
import { PropertyCard } from '../components/PropertyCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface PropertiesListProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  initialCategory?: string;
  initialCity?: string;
}

export const PropertiesList: React.FC<PropertiesListProps> = ({
  onNavigate,
  initialCategory = 'all',
  initialCity = ''
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [city, setCity] = useState(initialCity);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [beds, setBeds] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'sqft'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await api.getProperties({
        category: category !== 'all' ? category : undefined,
        search: search.trim() || undefined,
        city: city.trim() || undefined,
        maxPrice: maxPrice < 500000 ? maxPrice : undefined,
        beds: beds !== 'all' ? Number(beds) : undefined
      });

      let sorted = [...res.properties];
      if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
      if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
      if (sortBy === 'sqft') sorted.sort((a, b) => b.squareFt - a.squareFt);

      setProperties(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [category, city, maxPrice, beds, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('all');
    setCity('');
    setMaxPrice(500000);
    setBeds('all');
    setSortBy('featured');
  };

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Header Banner */}
      <section className="py-16 px-4 sm:px-8 border-b border-white/10 text-center bg-radial from-[#122327] to-[#080E10]">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block">
            EXCLUSIVE DIRECTORY
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            PROPERTIES LIST
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            Browse our full catalog of luxury apartments, penthouses, and turnkey estates across premier urban destinations.
          </p>
        </div>
      </section>

      {/* Filter and Directory Workspace */}
      <section className="bg-white text-slate-900 py-12 px-4 sm:px-8 min-h-[70vh]">
        <div className="max-w-7xl mx-auto">
          {/* Top Search and Filter Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-6 mb-8 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Keyword Search */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by building name, address, or amenity..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchProperties()}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:border-[#C99742]"
                />
              </div>

              {/* Category Segmented Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-200/70 rounded-lg">
                {[
                  { id: 'all', label: 'ALL' },
                  { id: 'best-sale', label: 'BEST SALE' },
                  { id: 'apartment', label: 'APARTMENT' },
                  { id: 'rent-house', label: 'RENT HOUSE' },
                  { id: 'paint-house', label: 'PAINT HOUSE' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                      category === item.id
                        ? 'bg-[#0B1315] text-[#E5A93C] shadow'
                        : 'text-slate-700 hover:text-black'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={handleResetFilters}
                className="p-2.5 rounded-lg border border-slate-200 text-slate-600 hover:text-black hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 shrink-0"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Secondary Filter Row: Bedrooms, Price slider, Sort, View mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-200 text-xs">
              <div>
                <label className="block text-slate-500 font-bold uppercase mb-1 text-[10px]">
                  Bedrooms
                </label>
                <select
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full p-2 rounded border border-slate-200 bg-white font-medium"
                >
                  <option value="all">Any Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                  <option value="5">5+ Bedrooms</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
                  <span>Max Price Budget</span>
                  <span className="text-[#C99742] font-mono">${maxPrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={500000}
                  step={25000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C99742]"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold uppercase mb-1 text-[10px]">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2 rounded border border-slate-200 bg-white font-medium"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="sqft">Largest Square Footage</option>
                </select>
              </div>

              <div className="flex items-end justify-between">
                <span className="text-slate-500 font-medium">
                  Showing <strong className="text-slate-900">{properties.length}</strong> Results
                </span>
                <div className="flex items-center gap-1 p-1 bg-slate-200/60 rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                    aria-label="Grid view"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Display */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 rounded-lg bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
              <Building className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No properties match your filter criteria</h3>
              <p className="text-xs text-slate-500">Try broadening your budget or clearing category restrictions.</p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2 rounded bg-[#0B1315] text-[#E5A93C] text-xs font-bold uppercase"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
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
          ) : (
            /* List View */
            <div className="space-y-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => onNavigate('properties-details', { id: property.id })}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-[#C99742] p-4 sm:p-6 flex flex-col md:flex-row gap-6 cursor-pointer hover:shadow-xl transition-all"
                >
                  <div className="w-full md:w-72 h-52 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={property.image}
                      alt={property.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] uppercase font-bold text-[#C99742] bg-[#E5A93C]/10 px-2 py-0.5 rounded">
                          {property.categoryLabel}
                        </span>
                        <span className="text-xl font-bold font-mono text-slate-900">
                          ${property.price.toLocaleString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#C99742] transition-colors mb-2">
                        {property.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {property.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
                      <div className="flex items-center gap-4">
                        <span>{property.squareFt.toLocaleString()} Sq Ft</span>
                        <span>·</span>
                        <span>{property.beds} Beds</span>
                        <span>·</span>
                        <span>{property.baths} Baths</span>
                        <span>·</span>
                        <span>{property.city}</span>
                      </div>
                      <button className="px-4 py-2 rounded bg-[#0B1315] group-hover:bg-[#E5A93C] text-white group-hover:text-black font-bold text-xs uppercase tracking-wider transition-colors">
                        View Details
                      </button>
                    </div>
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
