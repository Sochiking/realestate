/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CallModal } from './components/CallModal';

// Pages
import { HomeOne } from './pages/HomeOne';
import { HomeTwo } from './pages/HomeTwo';
import { HomeThree } from './pages/HomeThree';
import { AboutUs } from './pages/AboutUs';
import { PropertiesList } from './pages/PropertiesList';
import { PropertyDetails } from './pages/PropertyDetails';
import { AgentsList } from './pages/AgentsList';
import { AgentDetails } from './pages/AgentDetails';
import { BlogList } from './pages/BlogList';
import { BlogDetails } from './pages/BlogDetails';
import { ServicesList } from './pages/ServicesList';
import { ServiceDetails } from './pages/ServiceDetails';
import { ContactUs } from './pages/ContactUs';
import { Error404 } from './pages/Error404';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home-1');
  const [navParams, setNavParams] = useState<Record<string, string>>({});
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  // Sync with browser location hash / state if desired
  const handleNavigate = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page);
    setNavParams(params || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B1315] text-slate-100 flex flex-col font-sans selection:bg-[#E5A93C] selection:text-black">
      {/* Top Header Bar */}
      <TopBar
        currentLang={currentLang}
        onSelectLang={(lang) => setCurrentLang(lang)}
      />

      {/* Main Navigation Bar with Mega-Dropdowns */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenCallModal={() => setIsCallModalOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1">
        {currentPage === 'home-1' && (
          <HomeOne
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'home-2' && (
          <HomeTwo
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'home-3' && (
          <HomeThree
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutUs
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'properties-list' && (
          <PropertiesList
            onNavigate={handleNavigate}
            initialCategory={navParams.category || 'all'}
            initialCity={navParams.city || ''}
          />
        )}

        {currentPage === 'properties-details' && (
          <PropertyDetails
            propertyId={navParams.id || 'prop-1'}
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'agents' && (
          <AgentsList
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'agent-details' && (
          <AgentDetails
            agentId={navParams.id || 'clarke-mica'}
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'blog' && (
          <BlogList onNavigate={handleNavigate} />
        )}

        {currentPage === 'blog-details' && (
          <BlogDetails
            blogId={navParams.id || 'blog-1'}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'service' && (
          <ServicesList
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'service-details' && (
          <ServiceDetails
            onNavigate={handleNavigate}
            onOpenCallModal={() => setIsCallModalOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactUs onOpenCallModal={() => setIsCallModalOpen(true)} />
        )}

        {currentPage === 'error-404' && (
          <Error404 onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global "MAKE A CALL" Modal */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />
    </div>
  );
}
