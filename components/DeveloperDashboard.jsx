"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationBar from '@/components/NotificationBar';
import ConnectionSection from '@/components/ConnectionSection';
import DeepFilterSection from '@/components/DeepFilterSection';
import DeveloperDashboardHome from '@/components/DeveloperDashboardHome';
import DeveloperProjects from '@/components/DeveloperProjects';
import DeveloperProblems from '@/components/DeveloperProblems';
import DeveloperAnalytics from '@/components/DeveloperAnalytics';
import DeveloperProfile from '@/components/DeveloperProfile';
import DeveloperSettings from '@/components/DeveloperSettings';
import DeveloperFeed from '@/components/DeveloperFeed';
import DeveloperFreelance from '@/components/DeveloperFreelance';

const DeveloperDashboard = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Applied filters:', newFilters);
  };

  useEffect(() => {
    const developerProfile = localStorage.getItem('developerProfile');
    if (developerProfile) {
      setProfileData(JSON.parse(developerProfile));
    } else {
      router.push('/developer-profile');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('developerProfile');
    localStorage.removeItem('userRole');
    router.push('/');
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfileData(updatedProfile);
    localStorage.setItem('developerProfile', JSON.stringify(updatedProfile));
  };

  if (!profileData) {
    return <div className="w-full flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1 pt-13">
        {/* Sidebar */}
        <div 
          onMouseEnter={() => setSidebarHovered(true)}
          onMouseLeave={() => setSidebarHovered(false)}
          className={`${
            sidebarHovered ? 'w-56' : 'w-20'
          } bg-white border-r border-gray-200 p-3 sm:p-6 hidden sm:block transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="space-y-4">
            <div
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">📊</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Dashboard</span>
            </div>
            <div
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">📁</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>My Projects</span>
            </div>
            <div
              onClick={() => setActiveTab('problems')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'problems'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">🧩</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Solve Problems</span>
            </div>
            <div
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">📈</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Analytics</span>
            </div>
            <div
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">👤</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Profile</span>
            </div>
            <div
              onClick={() => setActiveTab('jobs')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'jobs'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">💼</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Jobs</span>
            </div>
            <div
              onClick={() => setActiveTab('freelance')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'freelance'
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">💻</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Freelance</span>
            </div>
            <div
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">⚙️</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Settings</span>
            </div>

            {/* Stats Section */}
            <div className="mt-8 pt-8 border-t border-gray-200 transition-all duration-300">
              <div className={`flex items-center justify-between mb-4 ${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <h3 className="text-sm font-semibold text-gray-700">Your Stats</h3>
                <button className="text-gray-400 hover:text-green-500 transition">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </button>
              </div>
              <div className={`space-y-2 ${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                {/* Projects Stat */}
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg flex-shrink-0">
                    <span className="text-white text-lg">📁</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{profileData?.projectsCount || 0}</p>
                    <p className="text-xs text-gray-600">Projects</p>
                  </div>
                </div>

                {/* Likes Stat */}
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-lg flex-shrink-0">
                    <span className="text-white text-lg">❤️</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{profileData?.likesReceived || 0}</p>
                    <p className="text-xs text-gray-600">Likes Received</p>
                  </div>
                </div>

                {/* Problems Solved Stat */}
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-lg flex-shrink-0">
                    <span className="text-white text-lg">💻</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{profileData?.problemsSolved || 0}</p>
                    <p className="text-xs text-gray-600">Problems Solved</p>
                  </div>
                </div>

                {/* Streak Stat */}
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-lg flex-shrink-0">
                    <span className="text-white text-lg">🔥</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{profileData?.streakDays || 0}</p>
                    <p className="text-xs text-gray-600">Streak Days</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full mt-8 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Mobile Tab Bar - Redesigned */}
              <div className="sticky top-0 z-30 -mx-4 px-4 bg-zinc-900/20 backdrop-blur-xl sm:hidden mb-6 border-b border-white/10">
                <div className="flex gap-1 overflow-x-auto no-scrollbar py-3 items-center">
                  {[
                    { id: 'dashboard', label: 'Home', icon: '📊' },
                    { id: 'projects', label: 'Projects', icon: '📁' },
                    { id: 'problems', label: 'Solve', icon: '🧩' },
                    { id: 'analytics', label: 'Stats', icon: '📈' },
                    { id: 'jobs', label: 'Jobs', icon: '💼' },
                    { id: 'freelance', label: 'Freelance', icon: '💻' },
                    { id: 'profile', label: 'Profile', icon: '👤' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/40 scale-105'
                          : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                      }`}
                    >
                      <span className="text-lg leading-none">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Bar - Improved for mobile */}
              {activeTab === 'dashboard' && (
                <div className="mb-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                      <NotificationBar />
                      <ConnectionSection />
                    </div>
                    <DeepFilterSection onFilterChange={handleFilterChange} />
                  </div>

                  {/* Search Bar - More polished */}
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
              )}

              <div className="animate-fade-in">
                {activeTab === 'dashboard' && <DeveloperDashboardHome profileData={profileData} />}
                {activeTab === 'projects' && <DeveloperProjects />}
                {activeTab === 'problems' && <DeveloperProblems />}
                {activeTab === 'analytics' && <DeveloperAnalytics />}
                {activeTab === 'jobs' && <DeveloperFeed />}
                {activeTab === 'freelance' && <DeveloperFreelance />}
                {activeTab === 'profile' && <DeveloperProfile profileData={profileData} onProfileUpdate={handleProfileUpdate} />}
                {activeTab === 'settings' && <DeveloperSettings onLogout={handleLogout} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DeveloperDashboard;
