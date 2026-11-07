import React from 'react';
import { Users, Building, ShieldCheck, Scale, ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { NewsletterSection } from '../components/NewsletterSection';

interface ServicesListProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const ServicesList: React.FC<ServicesListProps> = ({ onNavigate, onOpenCallModal }) => {
  const services = [
    {
      id: 'residential-developer',
      number: '01',
      title: 'Residential Developer Advisory',
      icon: Building,
      description: 'Full-spectrum developer services from land acquisition and zoning approvals to turnkey architectural execution and international off-plan syndication.',
      features: ['Feasibility Modeling', 'Architectural BIM Coordination', 'Global Pre-sale Marketing', 'Zoning & Permits Audits']
    },
    {
      id: 'meet-your-agent',
      number: '02',
      title: 'Private Client Brokerage & Acquisitions',
      icon: Users,
      description: 'Bespoke representation for ultra-high-net-worth buyers and sellers. We source unlisted trophy assets and negotiate off-market residential transactions.',
      features: ['Off-Market Portfolio Access', 'Discreet Confidential Negotiations', 'Comprehensive Structural Due Diligence', 'Post-Closing Concierge']
    },
    {
      id: 'estate-companies',
      number: '03',
      title: 'Estate Management & Asset Optimization',
      icon: ShieldCheck,
      description: 'End-to-end luxury asset stewardship for institutional portfolios and private family offices across high-demand urban centers.',
      features: ['VIP Tenant Placement', 'Circadian & Smart Home Maintenance', 'Quarterly Yield Reporting', 'Zero-Vacancy Guarantee Programs']
    },
    {
      id: 'valuation-escrow',
      number: '04',
      title: 'Valuation & Legal Escrow Services',
      icon: Scale,
      description: 'Certified appraisal methodologies recognized by global private banks, ensuring smooth capital structuring and transparent title transfers.',
      features: ['Institutional Property Appraisals', 'Cross-Border Capital Structuring', 'Sovereign Escrow Protection', 'Tax Efficiency Consultations']
    }
  ];

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Header */}
      <section className="py-20 px-4 sm:px-8 border-b border-white/10 text-center bg-radial from-[#122327] to-[#080E10]">
        <div className="max-w-4xl mx-auto space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block">
            OUR COMPREHENSIVE EXPERTISE
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            SERVICE DIRECTORY
          </h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto font-light">
            People work for us in more than 70 countries plan over this breadth of global architectural real estate solutions.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-[#C99742] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 text-[#C99742] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-2xl font-black font-mono text-slate-300 group-hover:text-[#C99742] transition-colors">
                        {srv.number}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#C99742] transition-colors">
                        {srv.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {srv.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs text-slate-700 font-medium">
                      {srv.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C99742] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 flex items-center justify-between">
                    <button
                      onClick={() => onNavigate('service-details')}
                      className="px-5 py-2.5 rounded bg-[#0B1315] group-hover:bg-[#E5A93C] text-white group-hover:text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
                    >
                      <span>Explore Service Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={onOpenCallModal}
                      className="text-xs font-bold text-slate-600 hover:text-black"
                    >
                      Inquire Directly
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
};
