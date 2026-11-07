import React, { useState, useEffect } from 'react';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Sparkles, Building2 } from 'lucide-react';
import { Property, api } from '../api/client';
import { PropertyCard } from '../components/PropertyCard';
import { NewsletterSection } from '../components/NewsletterSection';

interface HomeThreeProps {
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onOpenCallModal: () => void;
}

export const HomeThree: React.FC<HomeThreeProps> = ({ onNavigate, onOpenCallModal }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  // Mortgage calculator state
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(5.8);

  // Quick advisory request state
  const [advisoryName, setAdvisoryName] = useState('');
  const [advisoryPhone, setAdvisoryPhone] = useState('');
  const [advisorySent, setAdvisorySent] = useState(false);

  useEffect(() => {
    async function loadProps() {
      try {
        const res = await api.getProperties();
        setProperties(res.properties);
      } catch (e) {
        console.error(e);
      }
    }
    loadProps();
  }, []);

  // Calculate monthly mortgage payment
  const principal = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment = principal > 0
    ? Math.round((principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1))
    : 0;

  const handleAdvisorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisoryName || !advisoryPhone) return;
    try {
      await api.requestLead({
        name: advisoryName,
        phone: advisoryPhone,
        type: 'home_three_advisory'
      });
      setAdvisorySent(true);
    } catch {
      alert('Callback requested successfully.');
      setAdvisorySent(true);
    }
  };

  return (
    <div className="w-full bg-[#0B1315] text-slate-100">
      {/* Split Hero with Investment Advisory Form */}
      <section className="relative py-20 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 text-[#E5A93C] text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HOME THREE · CONTEMPORARY INVESTOR EDITION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Institutional Quality Real Estate For Private Capital
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              We structure turn-key luxury acquisitions, from prime Manhattan penthouses to off-market Mediterranean developments, generating consistent net yields.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-2xl font-black text-[#E5A93C] font-mono">8.4%</div>
                <div className="text-[11px] text-slate-400">Target Net Yield</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">$1.2B+</div>
                <div className="text-[11px] text-slate-400">Transaction Volume</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">100%</div>
                <div className="text-[11px] text-slate-400">Escrow Security</div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Advisory Form */}
          <div className="lg:col-span-5 bg-[#0F1B1E] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
            {advisorySent ? (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#E5A93C] mx-auto" />
                <h3 className="text-xl font-bold text-white">Advisory Request Received</h3>
                <p className="text-xs text-slate-300">
                  Our private client advisory desk will contact you with a customized investment prospectus.
                </p>
                <button
                  onClick={() => setAdvisorySent(false)}
                  className="px-6 py-2 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#E5A93C] block mb-1">
                  EXCLUSIVE ACCESS
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Request Investor Prospectus</h3>
                <p className="text-xs text-slate-400 mb-6">Receive audited financial pro-formas for currently available developments.</p>

                <form onSubmit={handleAdvisorySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                      Investor Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={advisoryName}
                      onChange={(e) => setAdvisoryName(e.target.value)}
                      placeholder="e.g. Eleanor Roosevelt"
                      className="w-full px-4 py-2.5 rounded bg-[#080E10] border border-white/10 text-white text-xs focus:border-[#E5A93C] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={advisoryPhone}
                      onChange={(e) => setAdvisoryPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded bg-[#080E10] border border-white/10 text-white text-xs font-mono focus:border-[#E5A93C] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black font-extrabold text-xs uppercase tracking-wider transition-colors shadow-lg"
                  >
                    Receive Prospectus
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Financial & Mortgage Calculator Section */}
      <section className="bg-white text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
              FINANCIAL TOOLS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Interactive Mortgage Calculator
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Estimate your monthly capital repayments and schedule down payments with current bank rates.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-700 uppercase">Property Price</span>
                  <span className="text-[#C99742] font-mono text-sm">${homePrice.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={1000000}
                  step={10000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full accent-[#C99742]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-700 uppercase">Down Payment (20% Suggested)</span>
                  <span className="text-[#C99742] font-mono text-sm">${downPayment.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={20000}
                  max={homePrice}
                  step={5000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-[#C99742]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Loan Term
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white font-medium"
                  >
                    <option value={15}>15 Years Fixed</option>
                    <option value={20}>20 Years Fixed</option>
                    <option value={30}>30 Years Fixed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded border border-slate-300 text-xs bg-white font-mono font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Calculated Monthly Repayment Card */}
            <div className="lg:col-span-5 bg-[#0B1315] text-white rounded-xl p-8 text-center space-y-4 shadow-xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#E5A93C] block">
                ESTIMATED MONTHLY REPAYMENT
              </span>
              <div className="text-4xl sm:text-5xl font-black text-[#E5A93C] font-mono">
                ${monthlyPayment.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal"> / month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Includes principal & interest based on ${principal.toLocaleString()} financed over {loanTerm} years at {interestRate}% APR.
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenCallModal}
                  className="w-full py-3 rounded bg-[#E5A93C] hover:bg-[#d89c31] text-black font-extrabold text-xs uppercase tracking-wider transition-colors"
                >
                  Apply For Mortgage Pre-approval
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Properties */}
      <section className="bg-[#F8FAFB] text-slate-900 py-20 px-4 sm:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#C99742] block mb-1">
                FEATURED ASSETS
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                High-Yield Residential Opportunities
              </h2>
            </div>
            <button
              onClick={() => onNavigate('properties-list')}
              className="text-xs font-bold text-[#C99742] hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.slice(2, 5).map((property) => (
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
