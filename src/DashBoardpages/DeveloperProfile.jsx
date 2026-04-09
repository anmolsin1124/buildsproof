import React, { useState } from 'react';
import { SettingsSection } from '../components/SettingsSection';

const DeveloperProfile = ({ profileData, onProfileUpdate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Sample data for projects, bookmarks, and activity
  const recentProjects = [
    {
      id: 1,
      title: 'AI Chat Assistant',
      description: 'Built an AI powered chatbot that answers user queries using OpenAI API with conversation history.',
      author: 'Anmol Singh',
      daysAgo: 2,
      status: 'In Progress',
      likes: 24,
      views: 156,
      comments: 12,
      tags: ['React', 'Node.js', 'OpenAI'],
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Created a weather dashboard to search city weather. Features real-time data using OpenWeather API.',
      author: 'Anmol Singh',
      daysAgo: 5,
      likes: 18,
      views: 89,
      comments: 5,
      tags: ['API', 'Tailwind CSS'],
    },
    {
      id: 3,
      title: 'CodeSnippet Saver',
      description: 'A tool to save and organize code snippets with tags and local storage functionality.',
      author: 'Anmol Singh',
      daysAgo: 7,
      likes: 32,
      views: 230,
      comments: 8,
      tags: ['React', 'Tailwind CSS'],
    },
  ];

  const achievements = [
    {
      icon: '🔥',
      title: '5 Day Streak',
      description: 'Solved problems for 5 consecutive days',
      date: 'Jan 2024',
    },
    {
      icon: '🏆',
      title: 'Problem Solver',
      description: 'Solved 30+ DSA problems',
      date: 'Apr 2024',
    },
  ];

  const techStack = [
    { name: 'Frontend', percentage: 45, color: '#10B981' },
    { name: 'Backend', percentage: 30, color: '#3B82F6' },
    { name: 'Database', percentage: 15, color: '#8B5CF6' },
    { name: 'Tools & Others', percentage: 10, color: '#F59E0B' },
  ];

  const recentActivity = [
    {
      type: 'like',
      user: 'Priya Sharma',
      project: 'AI Chat Assistant',
      timeAgo: '3 hours ago',
      icon: '❤️',
    },
    {
      type: 'solved',
      problem: 'Two Sum',
      points: '+30 XP',
      timeAgo: '1 day ago',
      icon: '🎯',
    },
    {
      type: 'comment',
      user: 'Rohit Verma',
      project: 'Weather Dashboard',
      timeAgo: '3 days ago',
      icon: '💬',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-r from-green-700 to-green-800 rounded-2xl overflow-hidden mb-8 shadow-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Picture with Badge */}
            <div className="relative flex-shrink-0">
              <img
                src={profileData?.profileImagePreview || 'https://i.pravatar.cc/150?img=63'}
                alt="Profile"
                className="w-40 h-40 rounded-3xl object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-400 text-white rounded-full p-3 text-2xl border-4 border-white">
                ✓
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-black">
                  {profileData?.firstName || 'Anmol'} {profileData?.lastName || 'Singh'}
                </h1>
              </div>
              <p className="text-lg font-semibold text-green-100 mb-4">
                {profileData?.skill || 'Full Stack'} Developer • React & Node.js Enthusiast
              </p>
              <div className="flex flex-wrap gap-6 text-sm font-semibold text-green-100 mb-6">
                <div className="flex items-center gap-1">
                  <span>📍</span>
                  <span>Jaipur, India</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>🔗</span>
                  <span>anmolsingh.dev</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>Joined Jan 2024</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  ✏️ Edit Profile
                </button>
                <button className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition">
                  📤 Share Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-green-600">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <span className="text-3xl">📁</span>
              </div>
              <p className="text-3xl font-black text-white">{profileData?.projectsCount || 3}</p>
              <p className="text-sm text-green-100 font-semibold">Projects</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <span className="text-3xl">❤️</span>
              </div>
              <p className="text-3xl font-black text-white">{profileData?.likesReceived || 145}</p>
              <p className="text-sm text-green-100 font-semibold">Total Likes</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <span className="text-3xl">💻</span>
              </div>
              <p className="text-3xl font-black text-white">{profileData?.problemsSolved || 12}</p>
              <p className="text-sm text-green-100 font-semibold">Problems Solved</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <span className="text-3xl">🔥</span>
              </div>
              <p className="text-3xl font-black text-white">{profileData?.streakDays || 5}</p>
              <p className="text-sm text-green-100 font-semibold">Current Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'projects', label: 'Projects (3)' },
            { id: 'bookmarks', label: 'Bookmarks (8)' },
            { id: 'activity', label: 'Activity' },
            { id: 'settings', label: 'Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 font-semibold transition border-b-2 ${
                activeTab === tab.id
                  ? 'text-green-600 border-green-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={`grid gap-8 ${activeTab === 'settings' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {/* Left Sidebar */}
        {activeTab !== 'settings' && (
        <div className="space-y-6">
          {/* About Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>ℹ️</span> About
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Passionate developer who loves building real-world projects. Focused on creating clean, scalable and user-friendly applications.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-lg">📧</span>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Email</p>
                  <p className="text-sm text-gray-900 font-semibold">anmolsingh@example.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">🔗</span>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">GitHub</p>
                  <a href="#" className="text-sm text-green-600 font-semibold hover:underline">
                    github.com/anmolsingh
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">💻</span>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">LeetCode</p>
                  <a href="#" className="text-sm text-green-600 font-semibold hover:underline">
                    leetcode.com/anmolsingh
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg">𝕏</span>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">Twitter</p>
                  <a href="#" className="text-sm text-green-600 font-semibold hover:underline">
                    @anmolcodes
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🛠️</span> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Express.js', 'REST API', 'Firebase'].map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🏆</span> Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Center Content */}
        <div className={`${activeTab === 'settings' ? 'col-span-full' : 'lg:col-span-1'}`}>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Feed / Projects</h2>
              {recentProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://i.pravatar.cc/40?img=63"
                        alt="Author"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{project.author}</p>
                        <p className="text-xs text-gray-500">{project.daysAgo} days ago</p>
                      </div>
                    </div>
                    {project.status && (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <span>❤️</span> {project.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>👁️</span> {project.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>💬</span> {project.comments}
                      </span>
                    </div>
                    <button className="text-green-600 font-bold text-sm hover:text-green-700">
                      View Project →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg font-semibold">View all {profileData?.projectsCount || 3} projects</p>
              <p className="text-gray-500 text-sm">Projects list will be displayed here</p>
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg font-semibold">8 Bookmarked Items</p>
              <p className="text-gray-500 text-sm">Your bookmarked projects and resources</p>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg font-semibold">Recent Activity</p>
              <p className="text-gray-500 text-sm">Your recent activities will appear here</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="lg:col-span-2">
              <SettingsSection />
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        {activeTab !== 'settings' && (
        <div className="space-y-6">
          {/* Tech Stack */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>⚙️</span> Tech Stack
            </h3>
            <div className="space-y-4">
              {techStack.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-semibold text-gray-700">{item.name}</p>
                    <span className="text-xs font-bold text-gray-600">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>🐙</span> GitHub Stats
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-gray-900">21</p>
                <p className="text-xs text-gray-600 font-semibold mt-1">Repositories</p>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">37</p>
                <p className="text-xs text-gray-600 font-semibold mt-1">Commits</p>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900">12</p>
                <p className="text-xs text-gray-600 font-semibold mt-1">Contributions</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>📊</span> Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {activity.type === 'like' && `${activity.user} liked your project`}
                        {activity.type === 'solved' && `You solved "${activity.problem}"`}
                        {activity.type === 'comment' && `${activity.user} commented on your project`}
                      </p>
                      {activity.project && (
                        <p className="text-xs text-gray-600 mt-1">{activity.project}</p>
                      )}
                      {activity.points && (
                        <p className="text-xs text-green-600 font-bold mt-1">{activity.points}</p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">{activity.timeAgo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperProfile;
