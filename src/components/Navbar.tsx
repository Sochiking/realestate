import React, { useState } from 'react';
import { Phone, ChevronDown, Menu, X, Building2 } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenCallModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleLinkClick = (page: string, params?: Record<string, string>) => {
    onNavigate(page, params);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B1315]/95 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => handleLinkClick('home-1')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E5A93C] to-[#C99742] flex items-center justify-center text-black font-bold shadow-lg shadow-[#E5A93C]/20 group-hover:scale-105 transition-transform">
            <Building2 className="w-5 h-5 text-black" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-extrabold text-xl tracking-wider text-white">
              <span>NEXT</span>
              <span className="text-[#E5A93C]">HM</span>
            </div>
            <span className="text-[9px] tracking-widest text-slate-400 uppercase font-medium">Real Estate Agency</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {/* 1. HOME Dropdown */}
          <div
            className="relative py-6"
            onMouseEnter={() => setActiveDropdown('home')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleLinkClick('home-1')}
              className={`flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider transition-colors ${
                ['home-1', 'home-2', 'home-3', 'about'].includes(currentPage)
                  ? 'text-[#E5A93C]'
                  : 'text-slate-200 hover:text-[#E5A93C]'
              }`}
            >
              <span>HOME</span>
              <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>

            {activeDropdown === 'home' && (
              <div className="absolute top-16 left-0 w-48 bg-[#0F1B1E] border border-white/10 rounded-md shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleLinkClick('home-1')}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'home-1' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  HOME ONE
                </button>
                <button
                  onClick={() => handleLinkClick('home-2')}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'home-2' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  HOME TWO
                </button>
                <button
                  onClick={() => handleLinkClick('home-3')}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'home-3' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  HOME THREE
                </button>
                <button
                  onClick={() => handleLinkClick('about')}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'about' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  ABOUT US
                </button>
              </div>
            )}
          </div>

          {/* 2. PROPERTIES Dropdown */}
          <div
            className="relative py-6"
            onMouseEnter={() => setActiveDropdown('properties')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleLinkClick('properties-list')}
              className={`flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider transition-colors ${
                ['properties-list', 'properties-details'].includes(currentPage)
                  ? 'text-[#E5A93C]'
                  : 'text-slate-200 hover:text-[#E5A93C]'
              }`}
            >
              <span>PROPERTIES</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'properties' && (
              <div className="absolute top-16 left-0 w-52 bg-[#0F1B1E] border border-white/10 rounded-md shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleLinkClick('properties-list')}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'properties-list' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  PROPERTIES LIST
                </button>
                <button
                  onClick={() => handleLinkClick('properties-details', { id: 'prop-1' })}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'properties-details' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  PROPERTIES DETAILS
                </button>
              </div>
            )}
          </div>

          {/* 3. AGENTS Dropdown */}
          <div
            className="relative py-6"
            onMouseEnter={() => setActiveDropdown('agents')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleLinkClick('agents')}
              className={`flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider transition-colors ${
                ['agents', 'agent-details'].includes(currentPage)
                  ? 'text-[#E5A93C]'
                  : 'text-slate-200 hover:text-[#E5A93C]'
              }`}
            >
              <span>AGENTS</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'agents' && (
              <div className="absolute top-16 left-0 w-52 bg-[#0F1B1E] border border-white/10 rounded-md shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleLinkClick('agents')}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'agents' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  AGENTS STYLE 1
                </button>
                <button
                  onClick={() => handleLinkClick('agent-details', { id: 'clarke-mica' })}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'agent-details' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  AGENT DETAILS
                </button>
              </div>
            )}
          </div>

          {/* 4. BLOG Dropdown */}
          <div
            className="relative py-6"
            onMouseEnter={() => setActiveDropdown('blog')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleLinkClick('blog')}
              className={`flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider transition-colors ${
                ['blog', 'blog-details'].includes(currentPage)
                  ? 'text-[#E5A93C]'
                  : 'text-slate-200 hover:text-[#E5A93C]'
              }`}
            >
              <span>BLOG</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'blog' && (
              <div className="absolute top-16 left-0 w-48 bg-[#0F1B1E] border border-white/10 rounded-md shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleLinkClick('blog')}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'blog' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  BLOG
                </button>
                <button
                  onClick={() => handleLinkClick('blog-details', { id: 'blog-1' })}
                  className={`w-full text-left px-4 py-2 text-xs uppercase font-semibold transition-colors ${
                    currentPage === 'blog-details' ? 'text-[#E5A93C] bg-white/5' : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  BLOG DETAILS
                </button>
              </div>
            )}
          </div>

          {/* 5. PAGES MEGA-MENU (Exact Pagelist 1, 2, 3, 4 from the video!) */}
          <div
            className="relative py-6"
            onMouseEnter={() => setActiveDropdown('pages')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => handleLinkClick('service')}
              className={`flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider transition-colors ${
                ['service', 'service-details', 'contact', 'error-404'].includes(currentPage)
                  ? 'text-[#E5A93C]'
                  : 'text-slate-200 hover:text-[#E5A93C]'
              }`}
            >
              <span>PAGES</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {activeDropdown === 'pages' && (
              <div className="absolute top-16 -left-36 w-[680px] bg-[#0F1B1E] border border-white/10 rounded-lg shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="grid grid-cols-4 gap-6">
                  {/* PAGELIST 1 */}
                  <div>
                    <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5A93C] mb-3 pb-1 border-b border-white/10">
                      PAGELIST 1
                    </h4>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleLinkClick('home-1')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        HOME ONE
                      </button>
                      <button
                        onClick={() => handleLinkClick('home-2')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        HOME TWO
                      </button>
                      <button
                        onClick={() => handleLinkClick('home-3')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        HOME THREE
                      </button>
                      <button
                        onClick={() => handleLinkClick('about')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        ABOUT US
                      </button>
                    </div>
                  </div>

                  {/* PAGELIST 2 */}
                  <div>
                    <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5A93C] mb-3 pb-1 border-b border-white/10">
                      PAGELIST 2
                    </h4>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleLinkClick('agents')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        AGENTS STYLE 1
                      </button>
                      <button
                        onClick={() => handleLinkClick('agent-details', { id: 'clarke-mica' })}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        AGENT DETAILS
                      </button>
                      <button
                        onClick={() => handleLinkClick('properties-list')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        PROPERTIES LIST
                      </button>
                      <button
                        onClick={() => handleLinkClick('properties-details', { id: 'prop-1' })}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        PROPERTIES DETAILS
                      </button>
                    </div>
                  </div>

                  {/* PAGELIST 3 */}
                  <div>
                    <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5A93C] mb-3 pb-1 border-b border-white/10">
                      PAGELIST 3
                    </h4>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleLinkClick('service')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        SERVICE
                      </button>
                      <button
                        onClick={() => handleLinkClick('service-details')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        SERVICE DETAILS
                      </button>
                      <button
                        onClick={() => handleLinkClick('contact')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        CONTACT US
                      </button>
                    </div>
                  </div>

                  {/* PAGELIST 4 */}
                  <div>
                    <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#E5A93C] mb-3 pb-1 border-b border-white/10">
                      PAGELIST 4
                    </h4>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleLinkClick('blog')}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        BLOG
                      </button>
                      <button
                        onClick={() => handleLinkClick('blog-details', { id: 'blog-1' })}
                        className="text-left text-xs font-medium text-slate-300 hover:text-[#E5A93C] transition-colors"
                      >
                        BLOG DETAILS
                      </button>
                      <button
                        onClick={() => handleLinkClick('error-404')}
                        className="text-left text-xs font-medium text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        ERROR PAGE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6. CONTACT Link */}
          <button
            onClick={() => handleLinkClick('contact')}
            className={`text-xs uppercase font-bold tracking-wider transition-colors ${
              currentPage === 'contact' ? 'text-[#E5A93C]' : 'text-slate-200 hover:text-[#E5A93C]'
            }`}
          >
            CONTACT
          </button>
        </nav>

        {/* Right CTA Button: MAKE A CALL */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenCallModal}
            className="flex items-center gap-2.5 px-6 py-3 rounded-md bg-[#16272B] border border-[#E5A93C]/40 hover:border-[#E5A93C] text-[#E5A93C] text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#E5A93C] hover:text-black shadow-md hover:shadow-[#E5A93C]/20"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>MAKE A CALL</span>
          </button>
        </div>

        {/* Mobile menu trigger button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCallModal}
            className="p-2 rounded-md bg-[#16272B] text-[#E5A93C] border border-[#E5A93C]/30"
            aria-label="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-[#E5A93C] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1113] border-b border-white/10 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="space-y-3">
            <div className="font-bold text-[#E5A93C] text-xs uppercase tracking-wider">Home Options</div>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <button onClick={() => handleLinkClick('home-1')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Home One</button>
              <button onClick={() => handleLinkClick('home-2')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Home Two</button>
              <button onClick={() => handleLinkClick('home-3')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Home Three</button>
              <button onClick={() => handleLinkClick('about')} className="text-left text-xs py-1 text-slate-300 hover:text-white">About Us</button>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 space-y-3">
            <div className="font-bold text-[#E5A93C] text-xs uppercase tracking-wider">Properties</div>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <button onClick={() => handleLinkClick('properties-list')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Properties List</button>
              <button onClick={() => handleLinkClick('properties-details', { id: 'prop-1' })} className="text-left text-xs py-1 text-slate-300 hover:text-white">Properties Details</button>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 space-y-3">
            <div className="font-bold text-[#E5A93C] text-xs uppercase tracking-wider">Agents</div>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <button onClick={() => handleLinkClick('agents')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Agents Style 1</button>
              <button onClick={() => handleLinkClick('agent-details', { id: 'clarke-mica' })} className="text-left text-xs py-1 text-slate-300 hover:text-white">Agent Details</button>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 space-y-3">
            <div className="font-bold text-[#E5A93C] text-xs uppercase tracking-wider">Pages & Services</div>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <button onClick={() => handleLinkClick('service')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Service</button>
              <button onClick={() => handleLinkClick('service-details')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Service Details</button>
              <button onClick={() => handleLinkClick('contact')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Contact Us</button>
              <button onClick={() => handleLinkClick('error-404')} className="text-left text-xs py-1 text-rose-400 hover:text-rose-300">404 Error Page</button>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 space-y-3">
            <div className="font-bold text-[#E5A93C] text-xs uppercase tracking-wider">Blog & Editorial</div>
            <div className="grid grid-cols-2 gap-2 pl-2">
              <button onClick={() => handleLinkClick('blog')} className="text-left text-xs py-1 text-slate-300 hover:text-white">Blog List</button>
              <button onClick={() => handleLinkClick('blog-details', { id: 'blog-1' })} className="text-left text-xs py-1 text-slate-300 hover:text-white">Blog Details</button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCallModal();
              }}
              className="w-full py-3 rounded-md bg-[#E5A93C] text-black font-bold text-xs uppercase tracking-wider"
            >
              Make A Call (+1 123 456 2228)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
