import React, { useState } from 'react';

const DeveloperAchievements = () => {
  const [achievements, setAchievements] = useState({
    masterArchitect: { unlocked: true, progress: 100, earned: true },
    firstBlood: { unlocked: true, progress: 100, earned: true },
    starCoder: { unlocked: true, progress: 100, earned: true },
    onFire: { unlocked: false, progress: 80, earned: false },
    elite: { unlocked: false, progress: 80, earned: false },
    rocket: { unlocked: false, progress: 80, earned: false },
    master: { unlocked: false, progress: 80, earned: false },
    bullseye: { unlocked: false, progress: 0, earned: false },
    legend: { unlocked: false, progress: 0, earned: false },
    innovator: { unlocked: false, progress: 80, earned: false },
    optimiser: { unlocked: false, progress: 80, earned: false },
    guardian: { unlocked: false, progress: 80, earned: false },
    collaborator: { unlocked: false, progress: 70, earned: false },
  });

  const achievementsList = [
    { emoji: '🏆', title: 'First Blood', desc: 'Completed 10 projects in 3 months', locked: 0, condition: '0/1' },
    { emoji: '⭐', title: 'Star Coder', desc: 'Completed 10 projects in 3 months', locked: 0, condition: '0/1' },
    { emoji: '🔥', title: 'On Fire', desc: 'Completed 10 projects in 3 months', locked: 80, condition: '0/1' },
    { emoji: '💎', title: 'Elite', desc: 'Completed 10 projects in 3 months', locked: 80, condition: '0/1' },
    { emoji: '🚀', title: 'Rocket', desc: 'Completed 10 projects in 3 months', locked: 80, condition: '4/5' },
    { emoji: '👑', title: 'Master', desc: 'Completed 10 projects in 3 months', locked: 80, condition: '4/5' },
    { emoji: '🎯', title: 'Bullseye', desc: 'Completed 10 projects in 3 months', locked: 0, condition: '0/1' },
    { emoji: '🌟', title: 'Legend', desc: 'Completed / projects in 3 months', locked: 0, condition: '0/1' },
    { emoji: '💡', title: 'Innovator', desc: 'Completed 10 projects in 3 months', locked: 80, condition: '4/5' },
    { emoji: '⚙️', title: 'Optimiser', desc: 'Completed 10 projects in 3 months', locked: 80, condition: '4/5' },
    { emoji: '🛡️', title: 'Guardian', desc: 'Completed 7 projects in 3 months', locked: 80, condition: '4/5' },
    { emoji: '🤝', title: 'Collaborator', desc: 'Completed 10 projects in 3 months', locked: 70, condition: '4/5' },
  ];

  const communityUsers = [
    'https://i.pravatar.cc/40?img=1',
    'https://i.pravatar.cc/40?img=2',
    'https://i.pravatar.cc/40?img=3',
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-3">🏅 Achievements</h1>
        <p className="text-gray-600 text-lg max-w-3xl">
          Celebrate your milestones and track your progress through our comprehensive achievement system.
        </p>
      </div>

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
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
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
                    ✓ Unlocked - 0/1
                  </span>
                ) : (
                  <span className="inline-block px-4 py-2 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg">
                    🔒 Locked - {achievement.locked}% ({achievement.condition})
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
            <p className="text-3xl font-black text-green-600">3</p>
            <p className="text-sm text-gray-600 mt-1">Achievements Unlocked</p>
          </div>
          <div>
            <p className="text-3xl font-black text-green-600">10</p>
            <p className="text-sm text-gray-600 mt-1">Available Achievements</p>
          </div>
          <div>
            <p className="text-3xl font-black text-green-600">30%</p>
            <p className="text-sm text-gray-600 mt-1">Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperAchievements;
