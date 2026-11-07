import React, { useState } from 'react';
import { ArrowLeft, Building2, CheckCircle2, ChevronDown, ChevronUp, FileText, Send, Phone } from 'lucide-react';
import { api } from '../api/client';
import { NewsletterSection } from '../components/NewsletterSection';

interface ServiceDetailsProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({ onNavigate, onOpenCallModal }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [quoteName, setQuoteName] = useState('');
  const [quotePhone, setQuotePhone] = useState('');
  const [quoteProject, setQuoteProject] = useState('Ground-up Multi-family Condominiums');
  const [quoteSuccess, setQuoteSuccess] = useState(false);

  const workflowSteps = [
    {
      phase: '01',
      title: 'Site Feasibility & Architectural Concept',
      desc: 'Topographic scanning, zoning yield analysis, carbon-neutral envelope planning, and initial pro-forma budget projections.'
    },
    {
      phase: '02',
      title: 'Capital Syndication & Pre-Sale Marketing',
      desc: 'Crafting luxury architectural collateral, 3D interactive virtual models, and conducting private pre-sale drops to institutional family offices.'
    },
    {
      phase: '03',
      title: 'High-Spec Construction & Material Sourcing',
      desc: 'Bespoke procurement of Italian marble, structural mass timber, and triple-glazed curtain walls with strict milestone-based escrow drawdowns.'
    },
    {
      phase: '04',
      title: 'Handover & Property Asset Optimization',
      desc: 'Final architectural commissioning, title transfers, tenant onboarding, and automated building management systems activation.'
    }
  ];

  const faqs = [
    {
      q: 'What is the minimum capital threshold for residential development syndication?',
      a: 'We structure projects ranging from boutique $15M multi-unit townhouse conversions up to $250M master-planned urban developments. Qualified investors may participate with equity allocations starting at $250,000.'
    },
    {
      q: 'How does NEXT HM guarantee title and escrow security across international jurisdictions?',
      a: 'All transaction funds are deposited into segregated institutional escrow accounts held at Tier-1 depository banks. Capital releases require dual-key verification from licensed legal counsels upon completed third-party architectural inspections.'
    },
    {
      q: 'What are typical completion timeframes for turnkey residential developments?',
      a: 'Historic townhome rehabilitations typically complete within 12 to 16 months, while ground-up mid-rise luxury residences span 20 to 28 months from permit approvals to certificate of occupancy.'
    }
  ];

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteName || !quotePhone) return;
    try {
      await api.requestLead({
        name: quoteName,
        phone: quotePhone,
        type: 'service_quote_request',
        notes: `Service: Residential Development Advisory | Project Type: ${quoteProject}`
      });
      setQuoteSuccess(true);
    } catch {
      setQuoteSuccess(true);
    }
  };

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Breadcrumb */}
      <div className="bg-[#080E10] border-b border-white/10 py-3.5 px-4 sm:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => onNavigate('service')}
            className="flex items-center gap-2 text-slate-300 hover:text-[#E5A93C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Services</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[#E5A93C] uppercase font-bold">SERVICE DETAILS</span>
            <span>/</span>
            <span className="text-white font-bold">Residential Development Advisory</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white text-slate-900 py-16 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block">
              FLAGSHIP SERVICE
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Residential Development & Turnkey Project Management
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
              We empower sovereign investors, institutional landowners, and visionary developers to transform raw urban land and heritage structures into award-winning residential communities.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">$850M+</div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Under Development</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 font-mono">100%</div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">On-Time Completion</div>
              </div>
              <div>
                <div className="text-2xl font-black text-[#C99742] font-mono">18.4%</div>
                <div className="text-[11px] text-slate-500 uppercase font-semibold">Average IRR</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 aspect-[4/3]">
            <img
              src="/assets/images/luxury_modern_villa_1794079004096.jpg"
              alt="Development"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="bg-[#F8FAFB] text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
              PROVEN EXECUTION FRAMEWORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our 4-Stage Development Lifecycle
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <span className="text-3xl font-black font-mono text-[#C99742] block">
                  {step.phase}
                </span>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs & Proposal Form */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ Accordion */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
                TRANSPARENCY & ASSURANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Frequently Answered Inquiries
              </h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-4 text-left font-bold text-sm text-slate-900 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-4 h-4 text-[#C99742] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm h-fit">
            <h3 className="text-xl font-bold text-slate-900">Request Development Prospectus</h3>
            <p className="text-xs text-slate-500">
              Speak with our senior project directors regarding joint ventures or custom acquisition mandates.
            </p>

            {quoteSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900">Mandate Received</h4>
                <p className="text-xs text-emerald-700">
                  Our development desk will send the audited financial model and schedule an introductory briefing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteName}
                    onChange={(e) => setQuoteName(e.target.value)}
                    placeholder="e.g. Richard Hendricks"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#C99742]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={quotePhone}
                    onChange={(e) => setQuotePhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white font-mono focus:outline-none focus:border-[#C99742]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-600 mb-1">
                    Project Type
                  </label>
                  <select
                    value={quoteProject}
                    onChange={(e) => setQuoteProject(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#C99742]"
                  >
                    <option value="Ground-up Multi-family Condominiums">Ground-up Multi-family Condominiums</option>
                    <option value="Trophy Penthouse Architecture">Trophy Penthouse Architecture</option>
                    <option value="Historic Brownstone Restoration">Historic Brownstone Restoration</option>
                    <option value="Bespoke Residential Villa Community">Bespoke Residential Villa Community</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-[#0B1315] hover:bg-[#1A2A2E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#E5A93C]" />
                  <span>Request Full Prospectus</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
