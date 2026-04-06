import React from 'react';

const DeveloperAnalytics = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-4">Your Analytics</h1>
        <p className="text-gray-600 max-w-2xl text-lg">Track your progress, achievements, and performance metrics across the platform.</p>
      </div>

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
      <div className="bg-white rounded-xl border border-gray-200 p-6">
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
    </div>
  );
};

export default DeveloperAnalytics;
