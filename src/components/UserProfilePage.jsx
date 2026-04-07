import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../index.css';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * User Profile Page
 * Shows complete developer profile with projects, skills, achievements
 * Similar to LinkedIn profile view
 */
const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data - in real app, fetch from API or localStorage
  const userData = {
    id: userId || '1',
    name: 'Rahul Verma',
    title: 'Full Stack Developer & Problem Solver',
    location: 'Bangalore, India',
    joinDate: 'Joined Mar 2024',
    bio: 'Passionate developer who loves building real-world projects and solving DSA problems. Focused on clean code and scalable systems.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    email: 'rahul@example.com',
    github: 'github.com/rahulverma',
    linkedin: 'linkedin.com/in/rahulverma',
    website: 'rahulverma.dev',
    
    stats: {
      projects: 8,
      likes: 420,
      problems: 36,
      followers: 1200,
    },
    
    skills: [
      'React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 
      'Express.js', 'Tailwind CSS', 'Git & GitHub', 'REST API', 'Firebase'
    ],
    
    achievements: [
      { icon: '🔥', label: '7 Day Streak', desc: 'Solved problems for 7 days continuously' },
      { icon: '🏆', label: 'Problem Solver', desc: 'Solved 50+ DSA problems - Apr 2024' }
    ],
    
    projects: [
      {
        id: 1,
        title: 'AI Chat Assistant',
        desc: 'Built an AI-powered chatbot using OpenAI API with conversation history and modern UI.',
        tech: ['Node.js', 'React', 'OpenAI'],
        likes: 68,
        views: 1200,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=250&fit=crop'
      },
      {
        id: 2,
        title: 'E-Commerce Website',
        desc: 'Full stack e-commerce app with product filtering, cart, and secure payments.',
        tech: ['MongoDB', 'Express.js', 'Tailwind CSS'],
        likes: 52,
        views: 980,
        image: 'https://images.unsplash.com/photo-1516321336424-f06b0073ecde?w=400&h=250&fit=crop'
      },
      {
        id: 3,
        title: 'CodeSnippet Manager',
        desc: 'Save, organize and search code snippets with tags and local storage.',
        tech: ['React', 'LocalStorage', 'CSS'],
        likes: 34,
        views: 560,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop'
      }
    ],

    recentActivity: [
      { icon: '❤️', action: 'Liked a project', item: '"Weather Dashboard"', time: '2 hours ago' },
      { icon: '✓', action: 'Solved Problem', item: 'Two Sum - Easy', time: '1 day ago' },
      { icon: '🚀', action: 'Added new project', item: 'AI Chat Assistant', time: '3 days ago' },
      { icon: '💬', action: 'Got comment', item: '"Code. Solve. Build. Repeat."', time: '5 days ago' }
    ]
  };

  const handleMessage = () => {
    alert('Messaging feature coming soon!');
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 font-bold mb-6"
        >
          ← Back
        </button>

        {/* Profile Header */}
        <div className="bg-linear-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex items-start justify-between gap-6">
            {/* Left - Avatar & Basic Info */}
            <div className="flex gap-6 flex-1">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-black">{userData.name}</h1>
                  <span className="bg-green-400 text-green-900 px-3 py-1 rounded-full text-sm font-bold">✓ Developer</span>
                </div>
                <p className="text-lg text-green-50 mb-2">{userData.title}</p>
                <p className="text-green-100 flex items-center gap-2">📍 {userData.location}</p>
                <p className="text-green-100 text-sm">{userData.joinDate}</p>
              </div>
            </div>

            {/* Right - Action Buttons */}
            <div className="flex gap-3 flex-col">
              <button
                onClick={handleFollow}
                className={`px-6 py-2 rounded-lg font-bold transition ${
                  isFollowing
                    ? 'bg-white text-green-600 hover:bg-gray-100'
                    : 'bg-white text-green-600 hover:bg-gray-100'
                }`}
              >
                {isFollowing ? '✓ Following' : '+ Follow'}
              </button>
              <button
                onClick={handleMessage}
                className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-green-600 transition"
              >
                Message
              </button>
              <button className="px-6 py-2 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-green-600 transition">
                View Portfolio
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-bold">Projects</p>
            <p className="text-3xl font-black text-gray-900">{userData.stats.projects}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow border-l-4 border-red-500">
            <p className="text-gray-600 text-sm font-bold">Total Likes</p>
            <p className="text-3xl font-black text-gray-900">{userData.stats.likes}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-bold">Problems Solved</p>
            <p className="text-3xl font-black text-gray-900">{userData.stats.problems}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-bold">Followers</p>
            <p className="text-3xl font-black text-gray-900">
              {userData.stats.followers > 1000 ? (userData.stats.followers / 1000).toFixed(1) + 'K' : userData.stats.followers}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About & Skills */}
          <div className="space-y-6">
            {/* About Card */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
              <p className="text-gray-700 mb-4">{userData.bio}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📧</span>
                  <span className="text-gray-600">{userData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">🐙</span>
                  <a href="#" className="text-green-600 hover:underline">{userData.github}</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">💼</span>
                  <a href="#" className="text-green-600 hover:underline">{userData.linkedin}</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">🌐</span>
                  <a href="#" className="text-green-600 hover:underline">{userData.website}</a>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-green-200 transition cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements Card */}
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {userData.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900">{achievement.label}</p>
                      <p className="text-xs text-gray-600">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Projects & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex gap-1 border-b-2 border-gray-200">
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-3 font-bold border-b-2 transition ${
                  activeTab === 'projects'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Projects & Feed
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-3 font-bold border-b-2 transition ${
                  activeTab === 'activity'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Recent Activity
              </button>
            </div>

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Projects ({userData.projects.length})</h3>
                {userData.projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition flex">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{project.desc}</p>
                        <div className="flex gap-2 flex-wrap">
                          {project.tech.map((tech, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600 mt-3">
                        <span>❤️ {project.likes}</span>
                        <span>👁️ {project.views}</span>
                      </div>
                    </div>
                    <div className="px-4 py-6 flex flex-col gap-2 justify-center">
                      <button className="px-3 py-1.5 bg-green-600 text-white rounded font-bold hover:bg-green-700 transition text-sm">
                        View Project →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                {userData.recentActivity.map((activity, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center gap-4 hover:shadow transition">
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        <span className="font-bold">{activity.action}</span>
                        <span className="text-gray-600 mx-1">{activity.item}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfilePage;
