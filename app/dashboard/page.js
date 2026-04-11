'use client';

import React, { useState, useEffect } from 'react';
import NotificationBar from '@/components/NotificationBar';
import ConnectionSection from '@/components/ConnectionSection';
import DeepFilterSection from '@/components/DeepFilterSection';
import DeveloperDashboardHome from '@/components/DeveloperDashboardHome';

export default function DashboardPage() {
  const [profileData, setProfileData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const developerProfile = localStorage.getItem('developerProfile');
    if (developerProfile) {
      setProfileData(JSON.parse(developerProfile));
    } else {
      setProfileData({ name: 'Developer' });
    }
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            <NotificationBar />
            <ConnectionSection />
          </div>
          <DeepFilterSection onFilterChange={handleFilterChange} />
        </div>

        <div className="group relative">
          <input
            type="text"
            placeholder="Search for projects, problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all duration-300 shadow-sm text-sm sm:text-base group-hover:shadow-md"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="animate-fade-in">
        <DeveloperDashboardHome profileData={profileData} />
      </div>
    </>
  );
}
