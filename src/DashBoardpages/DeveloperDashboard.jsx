import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotificationBar from '../components/NotificationBar';
import ConnectionSection from '../components/ConnectionSection';
import DeepFilterSection from '../components/DeepFilterSection';
import DeveloperDashboardHome from './DeveloperDashboardHome';
import DeveloperProjects from './DeveloperProjects';
import DeveloperProblems from './DeveloperProblems';
import DeveloperBookmarks from './DeveloperBookmarks';
import DeveloperAnalytics from './DeveloperAnalytics';
import DeveloperAchievements from './DeveloperAchievements';
import DeveloperProfile from './DeveloperProfile';
import DeveloperSettings from './DeveloperSettings';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
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
      navigate('/developer-profile');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('developerProfile');
    localStorage.removeItem('userRole');
    navigate('/');
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
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'bookmarks'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">🔖</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Bookmarks</span>
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
              onClick={() => setActiveTab('achievements')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                activeTab === 'achievements'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl flex-shrink-0">🏆</span>
              <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>Achievements</span>
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
        <div className="flex-1 p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Mobile Tab Bar */}
            <div className="mb-4 sm:hidden">
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-2 px-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                  { id: 'projects', label: 'Projects', icon: '📁' },
                  { id: 'problems', label: 'Problems', icon: '🧩' },
                  { id: 'bookmarks', label: 'Bookmarks', icon: '🔖' },
                  { id: 'analytics', label: 'Analytics', icon: '📈' },
                  { id: 'achievements', label: 'Trophies', icon: '🏆' },
                  { id: 'profile', label: 'Profile', icon: '👤' },
                  { id: 'settings', label: 'Settings', icon: '⚙️' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${
                      activeTab === tab.id
                        ? 'bg-green-600 text-white border-green-600 shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Search Bar with Notifications, Connections & Filters - Only on Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="mb-6 sm:mb-8 space-y-4">
                {/* Top Action Bar */}
                <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3">
                  <NotificationBar />
                  <ConnectionSection />
                  <DeepFilterSection onFilterChange={handleFilterChange} />
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Find problems, projects, developers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 sm:px-6 py-3 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition shadow-sm text-sm sm:text-base"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'dashboard' && <DeveloperDashboardHome profileData={profileData} />}
            {activeTab === 'projects' && <DeveloperProjects />}
            {activeTab === 'problems' && <DeveloperProblems />}
            {activeTab === 'bookmarks' && <DeveloperBookmarks />}
            {activeTab === 'analytics' && <DeveloperAnalytics />}
            {activeTab === 'achievements' && <DeveloperAchievements />}
            {activeTab === 'profile' && <DeveloperProfile profileData={profileData} onProfileUpdate={handleProfileUpdate} />}
            {activeTab === 'settings' && <DeveloperSettings onLogout={handleLogout} />}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DeveloperDashboard;
