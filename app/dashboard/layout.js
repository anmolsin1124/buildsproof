'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [profileData, setProfileData] = useState(null);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const developerProfile = localStorage.getItem('developerProfile');
    if (developerProfile) {
      setProfileData(JSON.parse(developerProfile));
      setLoading(false);
    } else {
      // For now, let's just use dummy data if not found, 
      // in real app we would redirect to login or profile setup
      const dummyProfile = {
        name: 'Developer',
        projectsCount: 5,
        likesReceived: 120,
        problemsSolved: 8,
        streakDays: 4
      };
      setProfileData(dummyProfile);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('developerProfile');
    localStorage.removeItem('userRole');
    router.push('/');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/dashboard' },
    { id: 'projects', label: 'My Projects', icon: '📁', href: '/dashboard/projects' },
    { id: 'problems', label: 'Solve Problems', icon: '🧩', href: '/dashboard/problems' },
    { id: 'analytics', label: 'Analytics', icon: '📈', href: '/dashboard/analytics' },
    { id: 'profile', label: 'Profile', icon: '👤', href: '/dashboard/profile' },
    { id: 'jobs', label: 'Jobs', icon: '💼', href: '/dashboard/jobs' },
    { id: 'freelance', label: 'Freelance', icon: '💻', href: '/dashboard/freelance' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: '/dashboard/settings' },
  ];

  if (loading) {
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
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer font-semibold transition whitespace-nowrap ${
                  pathname === item.href
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className={`${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                  {item.label}
                </span>
              </Link>
            ))}

            {/* Stats Section */}
            <div className="mt-8 pt-8 border-t border-gray-200 transition-all duration-300">
              <div className={`flex items-center justify-between mb-4 ${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <h3 className="text-sm font-semibold text-gray-700">Your Stats</h3>
              </div>
              <div className={`space-y-2 ${sidebarHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg flex-shrink-0">
                    <span className="text-white text-lg">📁</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{profileData?.projectsCount || 0}</p>
                    <p className="text-xs text-gray-600">Projects</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition cursor-pointer">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-lg flex-shrink-0">
                    <span className="text-white text-lg">❤️</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">{profileData?.likesReceived || 0}</p>
                    <p className="text-xs text-gray-600">Likes</p>
                  </div>
                </div>
              </div>
            </div>

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
              {/* Mobile Tab Bar */}
              <div className="sticky top-0 z-30 -mx-4 px-4 bg-zinc-900/20 backdrop-blur-xl sm:hidden mb-6 border-b border-white/10">
                <div className="flex gap-1 overflow-x-auto no-scrollbar py-3 items-center">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[10px] font-bold whitespace-nowrap transition-all duration-300 ${
                        pathname === item.href
                          ? 'bg-green-500 text-white shadow-lg shadow-green-500/40 scale-105'
                          : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
                      }`}
                    >
                      <span className="text-lg leading-none">{item.icon}</span>
                      <span>{item.label.split(' ')[0]}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
