import React, { useState } from 'react';
import { EmptyState } from '../components/EmptyStates';

/**
 * Developer Freelance Section
 * Displays freelance opportunities and active gigs
 */

const DeveloperFreelance = () => {
  const [activeTab, setActiveTab] = useState('opportunities');

  const freelanceOpportunities = [
    {
      id: 1,
      title: 'E-Commerce Website Development',
      company: 'Tech Startup XYZ',
      budget: '$500 - $2000',
      duration: '2-3 months',
      level: 'Intermediate',
      skills: ['React', 'Node.js', 'MongoDB'],
      proposals: 12,
      postedDays: 2,
      description: 'Build a full-stack e-commerce platform with payment integration',
      image: '🛒',
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      company: 'Design Agency ABC',
      budget: '$1000 - $3000',
      duration: '1-2 months',
      level: 'Advanced',
      skills: ['React Native', 'Figma', 'UI Design'],
      proposals: 8,
      postedDays: 5,
      description: 'Design and develop mobile app UI with modern design patterns',
      image: '📱',
    },
    {
      id: 3,
      title: 'WordPress Site Customization',
      company: 'Digital Marketing Inc',
      budget: '$200 - $800',
      duration: '1-2 weeks',
      level: 'Beginner',
      skills: ['WordPress', 'PHP', 'CSS'],
      proposals: 25,
      postedDays: 3,
      description: 'Customize WordPress site with custom plugins and themes',
      image: '📝',
    },
    {
      id: 4,
      title: 'API Integration & Backend Setup',
      company: 'FinTech Solutions',
      budget: '$800 - $2500',
      duration: '3-4 weeks',
      level: 'Intermediate',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'REST API'],
      proposals: 15,
      postedDays: 1,
      description: 'Integrate third-party APIs and setup scalable backend infrastructure',
      image: '⚙️',
    },
  ];

  const activeGigs = [
    {
      id: 201,
      title: 'AI Chat Application',
      client: 'Global Tech Corp',
      status: 'In Progress',
      progress: 65,
      budget: '$1500',
      milestone: 'Phase 2: Core Features',
      deadline: '2026-05-15',
      earnings: '$900 earned',
      tasksCompleted: '8 of 12',
      image: '🤖',
    },
    {
      id: 202,
      title: 'Dashboard redesign',
      client: 'StartUp Beta',
      status: 'In Progress',
      progress: 40,
      budget: '$800',
      milestone: 'UI Components',
      deadline: '2026-05-01',
      earnings: '$300 earned',
      tasksCompleted: '5 of 12',
      image: '📊',
    },
    {
      id: 203,
      title: 'Bug Fixes & Performance',
      client: 'Web Agency Plus',
      status: 'Completed',
      progress: 100,
      budget: '$600',
      milestone: 'All tasks done',
      deadline: '2026-04-05',
      earnings: '$600 earned',
      tasksCompleted: '10 of 10',
      image: '🐛',
    },
  ];

  const stats = [
    {
      label: 'Active Gigs',
      value: '2',
      icon: '⚡',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      label: 'Total Earnings',
      value: '$1800',
      icon: '💰',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      label: 'Completed Projects',
      value: '5',
      icon: '✅',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      label: 'Avg Rating',
      value: '4.8★',
      icon: '⭐',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">💼 Freelance Hub</h1>
        <p className="text-gray-600">Find, bid, and manage freelance projects</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border ${stat.color}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-xs font-semibold text-gray-600 uppercase">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          {[
            { id: 'opportunities', label: 'Available Opportunities (4)' },
            { id: 'active', label: 'My Active Gigs (2)' },
            { id: 'completed', label: 'Completed (5)' },
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

      {/* Tab Content */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Browse Opportunities</h2>
            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200 transition">
              🔄 Refresh
            </button>
          </div>

          {freelanceOpportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{opp.image}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{opp.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{opp.company}</p>
                    <p className="text-sm text-gray-600">{opp.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  opp.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                  opp.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {opp.level}
                </span>
              </div>

              {/* Job Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Budget</p>
                  <p className="font-bold text-green-600">{opp.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Duration</p>
                  <p className="font-bold text-gray-900">{opp.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Posted</p>
                  <p className="font-bold text-gray-900">{opp.postedDays}d ago</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Proposals</p>
                  <p className="font-bold text-gray-900">{opp.proposals}</p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 font-semibold uppercase mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-2">
                  {opp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full py-2 px-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">
                📤 Submit Proposal
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'active' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Projects</h2>

          {activeGigs.map((gig) => (
            <div
              key={gig.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-5xl">{gig.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900">{gig.title}</h3>
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        gig.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {gig.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">👤 {gig.client}</p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-semibold text-gray-700">Progress</span>
                        <span className="text-xs font-bold text-green-600">{gig.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${gig.progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-xs text-gray-600">
                      <span className="font-semibold">Current Milestone:</span> {gig.milestone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg text-sm">
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Contract Value</p>
                  <p className="font-bold text-gray-900">{gig.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Earnings</p>
                  <p className="font-bold text-green-600">{gig.earnings}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Deadline</p>
                  <p className="font-bold text-gray-900">{gig.deadline}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Tasks</p>
                  <p className="font-bold text-gray-900">{gig.tasksCompleted}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 py-2 px-4 bg-blue-100 text-blue-600 font-bold rounded-lg hover:bg-blue-200 transition">
                  📝 View Details
                </button>
                <button className="flex-1 py-2 px-4 bg-green-100 text-green-600 font-bold rounded-lg hover:bg-green-200 transition">
                  💬 Message Client
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="py-12">
          <EmptyState
            icon="🎉"
            title="Past Projects"
            description="Your 5 completed projects showcase your expertise"
            cta="View All Completed Work"
          />
        </div>
      )}
    </div>
  );
};

export default DeveloperFreelance;
