import React, { useState } from 'react';
import { feedData } from '../data/feedData';
import FeedCard from '../feedcard/FeedCard';
import HRCard from '../feedcard/HRCard';
import HrData from '../data/HrData';
import FeedCarousel from '../components/FeedCarousel';
import { DeveloperOnboarding, HelpCard } from '../components/OnboardingHints';

const DeveloperDashboardHome = ({ profileData }) => {
  const [feedFilter, setFeedFilter] = useState('all'); // all, developer, hiring
  const [dismissedOnboarding, setDismissedOnboarding] = useState(false);
  
  const projectImages = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1516321336424-f06b0073ecde?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-aae19106c6c3?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=300&fit=crop',
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Welcome Section with CTA */}
        <div className="bg-linear-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-black mb-2">Welcome back, {profileData?.firstName || 'Developer'} 👋</h1>
          <p className="text-green-50 text-lg mb-6">Ready to build and showcase your skills?</p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition flex items-center gap-2">
            <span>+ Share Your Project</span>
          </button>
        </div>

        {/* Getting Started Section - dismissible */}
        {!dismissedOnboarding && (
          <div className="relative bg-blue-50 border border-blue-200 rounded-lg p-4">
            <button
              onClick={() => setDismissedOnboarding(true)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <DeveloperOnboarding />
          </div>
        )}

        {/* Feed Section - Mixed Developer & HR Posts */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
          {/* Header - Sticky */}
          <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-black text-gray-900">📝 Latest Feed</h2>
              <span className="text-green-600 font-bold text-xs bg-green-100 px-3 py-1.5 rounded-full flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> New Posts
              </span>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setFeedFilter('all')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                  feedFilter === 'all'
                    ? 'bg-linear-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📌 All Posts
              </button>
              <button
                onClick={() => setFeedFilter('developer')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                  feedFilter === 'developer'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                👨‍💻 Developer Posts
              </button>
              <button
                onClick={() => setFeedFilter('hiring')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                  feedFilter === 'hiring'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                💼 Hiring Posts
              </button>
            </div>
          </div>

          {/* Scrollable Feed Content */}
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-600">
            <div className="space-y-6 p-6">
              {/* All Posts Filter */}
              {feedFilter === 'all' && (
                <>
                  {/* Developer Feed Card */}
                  {feedData.slice(0, 1).map((post) => (
                    <div key={`dev-${post.id}`} className="scroll-mt-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-600 bg-green-100 px-3 py-1 rounded-full">👨‍💻 Developer Post</span>
                      </div>
                      <FeedCard post={{...post, imageUrl: projectImages[Math.floor(Math.random() * projectImages.length)]}} />
                    </div>
                  ))}

                  {/* HR Job Card */}
                  {HrData.slice(0, 1).map((job) => (
                    <div key={`hr-${job.id}`} className="scroll-mt-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-600 bg-blue-100 px-3 py-1 rounded-full">💼 Hiring Post</span>
                      </div>
                      <HRCard job={job} />
                    </div>
                  ))}

                  {/* Developer Feed Card */}
                  {feedData.slice(1, 2).map((post) => (
                    <div key={`dev-${post.id}`} className="scroll-mt-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-600 bg-green-100 px-3 py-1 rounded-full">👨‍💻 Developer Post</span>
                      </div>
                      <FeedCard post={{...post, imageUrl: projectImages[Math.floor(Math.random() * projectImages.length)]}} />
                    </div>
                  ))}

                  {/* HR Job Card */}
                  {HrData.slice(1, 2).map((job) => (
                    <div key={`hr-${job.id}`} className="scroll-mt-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-600 bg-blue-100 px-3 py-1 rounded-full">💼 Hiring Post</span>
                      </div>
                      <HRCard job={job} />
                    </div>
                  ))}

                  {/* Developer Feed Card */}
                  {feedData.slice(2, 3).map((post) => (
                    <div key={`dev-${post.id}`} className="scroll-mt-4">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-600 bg-green-100 px-3 py-1 rounded-full">👨‍💻 Developer Post</span>
                      </div>
                      <FeedCard post={{...post, imageUrl: projectImages[Math.floor(Math.random() * projectImages.length)]}} />
                    </div>
                  ))}

                  {/* Load More Indicator */}
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                      <div className="animate-spin">⟳</div>
                      <span>Scroll for more posts...</span>
                    </div>
                  </div>
                </>
              )}

              {/* Developer Posts Only Filter */}
              {feedFilter === 'developer' && (
                <>
                  {feedData.slice(0, 5).map((post) => (
                    <div key={post.id} className="scroll-mt-4">
                      <FeedCard post={{...post, imageUrl: projectImages[Math.floor(Math.random() * projectImages.length)]}} />
                    </div>
                  ))}

                  {/* Load More Indicator */}
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                      <div className="animate-spin">⟳</div>
                      <span>Scroll for more developer posts...</span>
                    </div>
                  </div>
                </>
              )}

              {/* Hiring Posts Only Filter */}
              {feedFilter === 'hiring' && (
                <>
                  {HrData.slice(0, 5).map((job) => (
                    <div key={job.id} className="scroll-mt-4">
                      <HRCard job={job} />
                    </div>
                  ))}

                  {/* Load More Indicator */}
                  <div className="text-center py-8">
                    <div className="inline-flex items-center gap-2 text-gray-600">
                      <div className="animate-spin">⟳</div>
                      <span>Scroll for more job postings...</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Trending Projects Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-900">🔥 Trending Projects</h2>
            <a href="#" className="text-green-600 hover:text-green-700 font-bold text-sm flex items-center gap-1">
              View All <span>→</span>
            </a>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {feedData.slice(0, 4).map((post, idx) => (
              <div key={post.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-300 cursor-pointer">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden">
                  <img
                    src={projectImages[idx % projectImages.length]}
                    alt={post.projectTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-50 flex items-center gap-2">
                      <span>▶</span> View
                    </button>
                  </div>
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ Trending
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  {/* User Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <img src={post.userAvatar} alt={post.userName} className="w-8 h-8 rounded-full border-2 border-green-200" />
                      <span className="text-sm font-bold text-gray-900">{post.userName}</span>
                    </div>
                    <button className="text-gray-400 hover:bg-gray-100 p-1 rounded-full transition">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{post.projectTitle}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{post.problemSolved}</p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.techStack?.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 hover:bg-green-100 transition cursor-pointer">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex gap-4 text-sm font-semibold">
                      <span className="flex items-center gap-1 text-red-500 hover:text-red-600 cursor-pointer transition">❤ {post.likes}</span>
                      <span className="flex items-center gap-1 text-blue-500 hover:text-blue-600 cursor-pointer transition">👁 {post.views}</span>
                      <span className="flex items-center gap-1 text-gray-600 hover:text-gray-700 cursor-pointer transition">💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* Live Activity Feed */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">⚡ Live Activity</h2>
            <span className="flex items-center gap-1 text-green-600 font-bold text-xs bg-green-100 px-2.5 py-1 rounded-full">
              <span className="inline-block w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> LIVE
            </span>
          </div>

          <div className="space-y-4">
            {[
              { 
                name: 'Jordan V.', 
                action: '📤 published a new project',
                highlight: 'Neo-Banking UI',
                time: '2 mins ago',
                avatar: 'https://i.pravatar.cc/150?img=22',
                color: 'bg-blue-100'
              },
              { 
                name: 'Sarah Miller', 
                action: '✅ solved the',
                highlight: 'Recursive Tree Problem',
                time: '15 mins ago',
                avatar: 'https://i.pravatar.cc/150?img=29',
                color: 'bg-green-100'
              },
              { 
                name: 'Marcus Chen', 
                action: '🎯 achieved',
                highlight: '100 Problems Solved!',
                time: '45 mins ago',
                avatar: 'https://i.pravatar.cc/150?img=15',
                color: 'bg-purple-100',
                milestone: true
              },
              { 
                name: 'Emily Davis',
                action: '📚 started a new course',
                highlight: 'Advanced React',
                time: '1 hr ago',
                avatar: 'https://i.pravatar.cc/150?img=47',
                color: 'bg-orange-100'
              },
            ].map((item, idx) => (
              <div key={idx} className={`p-3 rounded-xl border-l-4 border-l-gray-200 ${item.color} hover:shadow-md transition cursor-pointer`}>
                <div className="flex gap-3">
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-white shadow-sm" />
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      {item.action} <span className="font-bold">{item.highlight}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1.5">{item.time}</p>
                  </div>
                  {item.milestone && <span className="text-lg flex-shrink-0">🎉</span>}
                </div>
              </div>
            ))}
          </div>

          <a href="#" className="text-green-600 hover:text-green-700 font-bold text-sm mt-6 inline-flex items-center gap-1">
            View All Activity <span>→</span>
          </a>
        </div>

        {/* Connect with Mentors Card */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl p-6 shadow-lg text-white border border-gray-700 hover:shadow-xl transition">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-bold text-lg">Meet an Expert</p>
              <p className="text-xs text-gray-400 mt-1">Find mentors in your field</p>
            </div>
            <span className="text-2xl">🎓</span>
          </div>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg transition text-sm mt-4">
            Find Mentor
          </button>
        </div>

        {/* BuildProof Pro Card */}
        <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 rounded-2xl p-6 shadow-lg text-white hover:shadow-xl transition">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold">BuildProof Pro</h3>
              <p className="text-green-50 text-xs mt-1">Upgrade for premium features</p>
            </div>
            <span className="text-3xl">✨</span>
          </div>
          <ul className="text-xs text-green-50 space-y-1.5 my-4 pl-4">
            <li>✓ Advanced Analytics</li>
            <li>✓ Private Repositories</li>
            <li>✓ AI Code Reviews</li>
          </ul>
          <button className="w-full bg-white text-green-600 font-bold py-2.5 rounded-lg hover:bg-green-50 transition text-sm">
            Upgrade Now
          </button>
        </div>

        {/* Tips Card */}
        <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
          <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
            <span>💡</span> Pro Tips
          </h3>
          <div className="space-y-3 text-xs text-gray-700">
            <p>✨ Keep your profile updated to attract opportunities</p>
            <p>🎯 Contribute to open source projects regularly</p>
            <p>📊 Track your achievements and milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboardHome;
