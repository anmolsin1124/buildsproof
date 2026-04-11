"use client";

import React, { useState } from 'react';

const DeveloperAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: 'Two Sum Problem',
      desc: 'Classic LeetCode problem - Find two numbers that add up to target',
      tags: ['Array', 'Easy', 'Coding'],
      type: 'problem',
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      desc: 'Full-stack MERN project with payment integration and admin dashboard',
      tags: ['React', 'Node.js', 'MongoDB', 'Project'],
      type: 'project',
    },
    {
      id: 3,
      title: 'Binary Tree Traversal',
      desc: 'Learn all traversal methods for binary trees - DFS, BFS',
      tags: ['Trees', 'Medium', 'Coding'],
      type: 'problem',
    },
  ]);

  const achievementsList = [
    { emoji: '🏆', title: 'Master Architect', desc: 'Completed 10 projects in 3 months', locked: 0, condition: '1/1' },
    { emoji: '⭐', title: 'Star Coder', desc: 'Completed 100+ problems', locked: 0, condition: '1/1' },
    { emoji: '🔥', title: 'On Fire', desc: '14-day coding streak', locked: 0, condition: '1/1' },
    { emoji: '💎', title: 'Elite', desc: 'Reached top 5% rankings', locked: 80, condition: '4/5' },
    { emoji: '🚀', title: 'Rising Star', desc: 'Helped 50+ community members', locked: 80, condition: '4/5' },
    { emoji: '👑', title: 'Legend', desc: '1000+ likes on projects', locked: 80, condition: '4/5' },
    { emoji: '🎯', title: 'Accuracy Master', desc: '95%+ accuracy rate', locked: 0, condition: '1/1' },
    { emoji: '🌟', title: 'Innovator', desc: 'Created trending project', locked: 60, condition: '3/5' },
    { emoji: '💡', title: 'Problem Solver', desc: 'Solved 200+ algorithm problems', locked: 80, condition: '4/5' },
    { emoji: '⚙️', title: 'Optimization Expert', desc: 'Optimized code performance', locked: 70, condition: '4/5' },
    { emoji: '🛡️', title: 'Security Guardian', desc: 'Reported security issues', locked: 60, condition: '3/5' },
    { emoji: '🤝', title: 'Collaborator', desc: 'Worked on 10+ team projects', locked: 75, condition: '4/5' },
  ];

  const communityUsers = [
    'https://i.pravatar.cc/40?img=1',
    'https://i.pravatar.cc/40?img=2',
    'https://i.pravatar.cc/40?img=3',
  ];

  return (
    <div>
      {/* Header with Tabs */}
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-8">📊 Your Analytics</h1>
        
        {/* Tab Navigation */}
        <div className="flex gap-4 border-b-2 border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-bold text-lg transition-all border-b-4 ${
              activeTab === 'overview'
                ? 'text-blue-600 border-blue-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            📈 Overview
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 font-bold text-lg transition-all border-b-4 ${
              activeTab === 'achievements'
                ? 'text-green-600 border-green-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            🏆 Achievements
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-6 py-3 font-bold text-lg transition-all border-b-4 ${
              activeTab === 'bookmarks'
                ? 'text-purple-600 border-purple-600'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            🔖 Bookmarks
          </button>
        </div>
        <p className="text-gray-600 text-lg">Track your progress, achievements, and performance metrics across the platform.</p>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
      <>
      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Projects Published */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <span className="text-xs text-green-600 font-bold">↑ 12%</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Projects Published</p>
          <p className="text-3xl font-black text-gray-900">24</p>
          <p className="text-xs text-gray-600 mt-2">2 new projects this week</p>
        </div>

        {/* Total Likes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">❤️</span>
            </div>
            <span className="text-xs text-red-600 font-bold">↑ 48</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Likes</p>
          <p className="text-3xl font-black text-gray-900">1,482</p>
          <p className="text-xs text-gray-600 mt-2">Trending up this week</p>
        </div>

        {/* Problems Solved */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🧩</span>
            </div>
            <span className="text-xs text-purple-600 font-bold">↑ 5</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Problems Solved</p>
          <p className="text-3xl font-black text-gray-900">156</p>
          <p className="text-xs text-gray-600 mt-2">Top 5% of community</p>
        </div>

        {/* Current Streak */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded">HOT</span>
          </div>
          <p className="text-gray-600 text-sm mb-1">Current Streak</p>
          <p className="text-3xl font-black text-gray-900">14 Days</p>
          <p className="text-xs text-gray-600 mt-2">Keep the fire alive!</p>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* Performance Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Performance Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-900">Accuracy Rate</span>
                <span className="text-sm font-bold text-green-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{width: '92%'}}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-900">Completion Rate</span>
                <span className="text-sm font-bold text-blue-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '78%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-900">Time Management</span>
                <span className="text-sm font-bold text-purple-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-900">Community Rating</span>
                <span className="text-sm font-bold text-orange-600">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-600 h-2.5 rounded-full" style={{width: '96%'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Achievements Summary</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Master Architect</p>
                <p className="text-xs text-gray-600">Completed 10 projects in 3 months</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Problem Solver</p>
                <p className="text-xs text-gray-600">Solved 100+ algorithm problems</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🚀</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Rising Star</p>
                <p className="text-xs text-gray-600">Reached top 5% in rankings</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🔥</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">On Fire</p>
                <p className="text-xs text-gray-600">14-day coding streak maintained</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Weekly Activity</h3>
        <div className="flex items-end justify-between gap-2 h-48">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
            const heights = [45, 60, 75, 55, 80, 70, 65];
            return (
              <div key={idx} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-green-200 rounded-t-lg" style={{height: `${heights[idx]}%`, minHeight: '30px'}}></div>
                <p className="text-xs text-gray-600 font-semibold mt-2">{day}</p>
              </div>
            );
          })}
        </div>
      </div>
      </>
      )}

      {/* Achievements Tab */}
      {activeTab === 'achievements' && (
      <>
      <div className="mb-8">
        <p className="text-gray-600 text-lg max-w-3xl mb-8">
          Celebrate your milestones and track your progress through our comprehensive achievement system.
        </p>

        {/* Latest Achievement & Community Proof Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Latest Achievement Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 border-b-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">🎯 Latest Achievement</h3>
            </div>
            
            <div className="p-8">
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0 border-3 border-yellow-200 shadow-md">
                    <span className="text-5xl">🏗️</span>
                  </div>
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg">
                    ✓
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-2xl font-black text-gray-900 mb-1">Master Architect</h2>
                  <p className="text-gray-600 font-medium mb-4">Completed 10 projects in 3 months</p>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      ✓ Unlocked
                    </span>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      ⭐ Recently earned
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-gray-600">Progress</span>
                      <span className="text-xs font-bold text-green-600">100%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Community Proof Card */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 border-b-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">👥 Community Proof</h3>
            </div>
            
            <div className="p-8">
              {/* User Avatars */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex -space-x-3">
                  {communityUsers.map((avatar, idx) => (
                    <img 
                      key={idx}
                      src={avatar} 
                      alt="User" 
                      className="w-12 h-12 rounded-full border-3 border-white object-cover shadow-md"
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-gray-900">+2 more</span>
              </div>

              {/* Recognition Section */}
              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <p className="text-gray-700 font-medium">
                  👏 <span className="font-bold">Community Recognition</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  People bookmarked your latest code snippet
                </p>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-gray-600">Community Engagement</span>
                  <span className="text-xs font-bold text-purple-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unlockable Achievements Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-8">🔓 Unlockable Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievementsList.map((achievement, idx) => (
              <div 
                key={idx} 
                className={`rounded-2xl border-2 p-6 transition-all ${
                  achievement.locked === 0
                    ? 'bg-white border-green-300 hover:shadow-lg'
                    : 'bg-gray-50 border-gray-300 hover:border-gray-400'
                }`}
              >
                {/* Icon */}
                <div className="text-6xl mb-4 text-center">{achievement.emoji}</div>

                {/* Title & Description */}
                <h3 className={`text-lg font-black mb-2 text-center ${
                  achievement.locked === 0 ? 'text-gray-900' : 'text-gray-700'
                }`}>
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 text-center mb-6">
                  {achievement.desc}
                </p>

                {/* Progress Bar */}
                {achievement.locked > 0 && (
                  <div className="mb-3">
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all" 
                        style={{ width: `${achievement.locked}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                <div className="text-center">
                  {achievement.locked === 0 ? (
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-xs font-bold rounded-lg">
                      ✓ Unlocked - {achievement.condition}
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg">
                      🔒 Locked - {achievement.locked}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Stats Footer */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-8 text-center">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="text-3xl font-black text-green-600">7</p>
              <p className="text-sm text-gray-600 mt-1">Achievements Unlocked</p>
            </div>
            <div>
              <p className="text-3xl font-black text-green-600">12</p>
              <p className="text-sm text-gray-600 mt-1">Available Achievements</p>
            </div>
            <div>
              <p className="text-3xl font-black text-green-600">58%</p>
              <p className="text-sm text-gray-600 mt-1">Overall Progress</p>
            </div>
          </div>
        </div>
      </div>
      </>
      )}

      {/* Bookmarks Tab */}
      {activeTab === 'bookmarks' && (
      <div>
        <p className="text-gray-600 text-lg mb-8">
          📌 {bookmarks.length} saved items - Your curated collection of problems and projects
        </p>

        <div className="space-y-4">
          {bookmarks.map((bookmark, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{bookmark.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded font-semibold ${
                      bookmark.type === 'problem' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {bookmark.type === 'problem' ? '📝 Problem' : '🛠️ Project'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{bookmark.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {bookmark.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="text-2xl hover:scale-110 transition">🔖</button>
              </div>
            </div>
          ))}
        </div>

        {bookmarks.length === 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">🔖</div>
            <p className="text-gray-600 font-semibold mb-2">No bookmarks yet</p>
            <p className="text-gray-500">Start bookmarking problems and projects to save them for later</p>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default DeveloperAnalytics;
