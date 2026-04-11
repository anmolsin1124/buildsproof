"use client";

import React, { useState, useMemo } from 'react';
import { EmptyState } from '@/components/EmptyStates';

/**
 * Developer Freelance Section - Enhanced
 * Displays freelance opportunities, active gigs, proposals, and completed work
 */

const DeveloperFreelance = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const freelanceOpportunities = [
    {
      id: 1,
      title: 'E-Commerce Website Development',
      company: 'Tech Startup XYZ',
      budget: '$500 - $2000',
      budgetMin: 500,
      budgetMax: 2000,
      duration: '2-3 months',
      level: 'Intermediate',
      skills: ['React', 'Node.js', 'MongoDB'],
      proposals: 12,
      postedDays: 2,
      description: 'Build a full-stack e-commerce platform with payment integration',
      image: '🛒',
      category: 'Web Development',
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      company: 'Design Agency ABC',
      budget: '$1000 - $3000',
      budgetMin: 1000,
      budgetMax: 3000,
      duration: '1-2 months',
      level: 'Advanced',
      skills: ['React Native', 'Figma', 'UI Design'],
      proposals: 8,
      postedDays: 5,
      description: 'Design and develop mobile app UI with modern design patterns',
      image: '📱',
      category: 'Mobile Development',
    },
    {
      id: 3,
      title: 'WordPress Site Customization',
      company: 'Digital Marketing Inc',
      budget: '$200 - $800',
      budgetMin: 200,
      budgetMax: 800,
      duration: '1-2 weeks',
      level: 'Beginner',
      skills: ['WordPress', 'PHP', 'CSS'],
      proposals: 25,
      postedDays: 3,
      description: 'Customize WordPress site with custom plugins and themes',
      image: '📝',
      category: 'Web Design',
    },
    {
      id: 4,
      title: 'API Integration & Backend Setup',
      company: 'FinTech Solutions',
      budget: '$800 - $2500',
      budgetMin: 800,
      budgetMax: 2500,
      duration: '3-4 weeks',
      level: 'Intermediate',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'REST API'],
      proposals: 15,
      postedDays: 1,
      description: 'Integrate third-party APIs and setup scalable backend infrastructure',
      image: '⚙️',
      category: 'Backend Development',
    },
    {
      id: 5,
      title: 'Python Data Analysis Dashboard',
      company: 'Analytics Startup',
      budget: '$1200 - $3500',
      budgetMin: 1200,
      budgetMax: 3500,
      duration: '4-6 weeks',
      level: 'Advanced',
      skills: ['Python', 'Django', 'Data Visualization', 'PostgreSQL'],
      proposals: 9,
      postedDays: 1,
      description: 'Create interactive dashboard with real-time data analytics',
      image: '📈',
      category: 'Data Science',
    },
    {
      id: 6,
      title: 'React Native Mobile App',
      company: 'EdTech Company',
      budget: '$1500 - $4000',
      budgetMin: 1500,
      budgetMax: 4000,
      duration: '2-3 months',
      level: 'Intermediate',
      skills: ['React Native', 'Firebase', 'Redux'],
      proposals: 11,
      postedDays: 2,
      description: 'Develop cross-platform mobile learning application',
      image: '🎓',
      category: 'Mobile Development',
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
      clientRating: 4.9,
      completionDate: null,
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
      clientRating: 4.7,
      completionDate: null,
    },
  ];

  const completedProjects = [
    {
      id: 203,
      title: 'Bug Fixes & Performance Optimization',
      client: 'Web Agency Plus',
      budget: '$600',
      earnings: '$600 earned',
      completionDate: '2026-04-05',
      clientRating: 5.0,
      reviews: 'Outstanding work! Delivered ahead of schedule.',
      image: '🐛',
    },
    {
      id: 204,
      title: 'Landing Page Design',
      client: 'SaaS Startup',
      budget: '$400',
      earnings: '$400 earned',
      completionDate: '2026-03-28',
      clientRating: 4.8,
      reviews: 'Great design skills and communication!',
      image: '🎨',
    },
    {
      id: 205,
      title: 'Database Schema Design',
      client: 'Tech Consultancy',
      budget: '$550',
      earnings: '$550 earned',
      completionDate: '2026-03-15',
      clientRating: 4.9,
      reviews: 'Very scalable and well-optimized.',
      image: '🗄️',
    },
    {
      id: 206,
      title: 'Logo Design',
      client: 'Creative Agency',
      budget: '$300',
      earnings: '$300 earned',
      completionDate: '2026-03-02',
      clientRating: 5.0,
      reviews: 'Perfect! Exactly what we needed.',
      image: '🎭',
    },
    {
      id: 207,
      title: 'SEO Optimization',
      client: 'E-commerce Store',
      budget: '$450',
      earnings: '$450 earned',
      completionDate: '2026-02-18',
      clientRating: 4.7,
      reviews: 'Good results, traffic increased by 40%.',
      image: '🔍',
    },
  ];

  const myProposals = [
    {
      id: 301,
      title: 'E-Commerce Website Development',
      company: 'Tech Startup XYZ',
      status: 'Pending',
      proposedBudget: '$1800',
      submittedDate: '2026-04-08',
      coverLetter: 'I have extensive experience with full-stack MERN development...',
      image: '🛒',
    },
    {
      id: 302,
      title: 'API Integration & Backend Setup',
      company: 'FinTech Solutions',
      status: 'Rejected',
      proposedBudget: '$2200',
      submittedDate: '2026-04-07',
      feedback: 'We chose a contractor with more banking experience.',
      image: '⚙️',
    },
    {
      id: 303,
      title: 'Mobile App UI/UX Design',
      company: 'Design Agency ABC',
      status: 'Accepted',
      proposedBudget: '$2500',
      submittedDate: '2026-04-06',
      feedback: 'Congratulations! Your proposal has been accepted.',
      image: '📱',
    },
  ];

  const stats = [
    {
      label: 'Active Gigs',
      value: '2',
      icon: '⚡',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      label: 'Total Earnings',
      value: '$4500',
      icon: '💰',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
    {
      label: 'Completed Projects',
      value: '12',
      icon: '✅',
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      label: 'Avg Rating',
      value: '4.85★',
      icon: '⭐',
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    },
  ];

  const allSkills = [...new Set(freelanceOpportunities.flatMap(opp => opp.skills))];

  // Filtered opportunities
  const filteredOpportunities = useMemo(() => {
    let filtered = freelanceOpportunities.filter(opp => {
      // Search filter
      if (searchTerm && !opp.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !opp.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Skills filter
      if (selectedSkills.length > 0 && !selectedSkills.some(skill => opp.skills.includes(skill))) {
        return false;
      }

      // Budget filter
      if (budgetFilter === 'under500' && opp.budgetMax < 500) return true;
      if (budgetFilter === '500-1000' && opp.budgetMin <= 500 && opp.budgetMax >= 500) return true;
      if (budgetFilter === '1000-3000' && opp.budgetMin <= 3000 && opp.budgetMax >= 1000) return true;
      if (budgetFilter === 'above3000' && opp.budgetMin > 3000) return true;
      if (budgetFilter === 'all') return true;
      return false;
    });

    // Sorting
    if (sortBy === 'recent') {
      filtered.sort((a, b) => a.postedDays - b.postedDays);
    } else if (sortBy === 'budget-high') {
      filtered.sort((a, b) => b.budgetMax - a.budgetMax);
    } else if (sortBy === 'budget-low') {
      filtered.sort((a, b) => a.budgetMin - b.budgetMin);
    } else if (sortBy === 'proposals-low') {
      filtered.sort((a, b) => a.proposals - b.proposals);
    }

    return filtered;
  }, [searchTerm, selectedSkills, budgetFilter, sortBy]);

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

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
        <div className="flex gap-8 overflow-x-auto">
          {[
            { id: 'opportunities', label: 'Available Opportunities', count: freelanceOpportunities.length },
            { id: 'active', label: 'My Active Gigs', count: activeGigs.length },
            { id: 'proposals', label: 'My Proposals', count: myProposals.length },
            { id: 'completed', label: 'Completed Work', count: completedProjects.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 font-semibold transition border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-green-600 border-green-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Browse Opportunities</h2>
              <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200 transition">
                🔄 Refresh
              </button>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search opportunities by title or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />

            {/* Filters Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Budget Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                <select
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="all">All Budgets</option>
                  <option value="under500">Under $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000-3000">$1000 - $3000</option>
                  <option value="above3000">Above $3000</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="budget-high">Highest Budget</option>
                  <option value="budget-low">Lowest Budget</option>
                  <option value="proposals-low">Least Competition</option>
                </select>
              </div>

              {/* Active Filters Display */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Active Filters</label>
                <div className="text-sm text-gray-600">
                  {selectedSkills.length > 0 && `${selectedSkills.length} skill(s) | `}
                  {budgetFilter !== 'all' && `${budgetFilter} | `}
                  Sort: {sortBy}
                </div>
              </div>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Skills</label>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                      selectedSkills.includes(skill)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 pt-2 border-t border-gray-200">
              Showing {filteredOpportunities.length} of {freelanceOpportunities.length} opportunities
            </div>
          </div>

          {/* Opportunities List */}
          <div className="space-y-4">
            {filteredOpportunities.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-2">No opportunities match your filters</p>
                <button onClick={() => {
                  setSearchTerm('');
                  setSelectedSkills([]);
                  setBudgetFilter('all');
                }} className="text-green-600 font-semibold hover:underline">
                  Reset filters
                </button>
              </div>
            ) : (
              filteredOpportunities.map((opp) => (
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
              ))
            )}
          </div>
        </div>
      )}

      {/* Active Gigs Tab */}
      {activeTab === 'active' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Currently Active Projects</h2>

          {activeGigs.length === 0 ? (
            <EmptyState
              icon="💼"
              title="No Active Gigs"
              description="Once you get hired, your active projects will appear here"
              cta="Browse Opportunities"
            />
          ) : (
            activeGigs.map((gig) => (
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
                        {/* Client Rating */}
                        <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-1 rounded font-semibold">
                          ⭐ {gig.clientRating}
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
                            className="bg-linear-to-r from-green-400 to-green-600 h-2 rounded-full transition-all"
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
                  <button className="flex-1 py-2 px-4 bg-purple-100 text-purple-600 font-bold rounded-lg hover:bg-purple-200 transition">
                    📊 View Progress
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* My Proposals Tab */}
      {activeTab === 'proposals' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">My Proposals & Applications</h2>

          {myProposals.length === 0 ? (
            <EmptyState
              icon="📤"
              title="No Proposals Yet"
              description="Start browsing opportunities and submit proposals to get hired"
              cta="Browse Opportunities"
            />
          ) : (
            <div className="grid md:grid-cols-3 gap-4">
              {myProposals.map((proposal) => (
                <div
                  key={proposal.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
                >
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-4xl">{proposal.image}</div>
                      <span className={`px-2 py-1 text-xs font-bold rounded ${
                        proposal.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                        proposal.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {proposal.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1 text-sm">{proposal.title}</h3>
                    <p className="text-xs text-gray-600 mb-3">{proposal.company}</p>

                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Proposed Budget:</span>
                        <span className="font-bold text-green-600">{proposal.proposedBudget}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Submitted:</span>
                        <span className="font-semibold text-gray-700">{proposal.submittedDate}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {proposal.feedback || proposal.coverLetter}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 text-xs bg-blue-100 text-blue-600 font-bold rounded hover:bg-blue-200 transition">
                        📝 View
                      </button>
                      <button className="flex-1 py-2 text-xs bg-gray-100 text-gray-600 font-bold rounded hover:bg-gray-200 transition">
                        ⋯ More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Completed Projects Tab */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Completed Projects</h2>
            <div className="text-sm text-gray-600">
              Total Earned: <span className="font-bold text-green-600">$2300</span>
            </div>
          </div>

          {completedProjects.length === 0 ? (
            <EmptyState
              icon="🎉"
              title="No Completed Projects Yet"
              description="Your completed projects will appear here with client reviews"
              cta="Browse Opportunities"
            />
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {completedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{project.image}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">👤 {project.client}</p>
                      
                      {/* Star Rating */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">
                          {'⭐'.repeat(Math.floor(project.clientRating))}
                          {project.clientRating % 1 !== 0 && '✨'}
                        </span>
                        <span className="text-sm font-bold text-yellow-600">{project.clientRating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-semibold text-gray-900">{project.completionDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Budget:</span>
                      <span className="font-semibold text-gray-900">{project.budget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Earned:</span>
                      <span className="font-bold text-green-600">{project.earnings}</span>
                    </div>
                  </div>

                  {/* Client Review */}
                  <div className="p-3 bg-blue-50 rounded-lg mb-4 border border-blue-200">
                    <p className="text-xs text-gray-700 italic">"{project.reviews}"</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 text-sm bg-green-100 text-green-600 font-bold rounded hover:bg-green-200 transition">
                      Show on Portfolio
                    </button>
                    <button className="flex-1 py-2 text-sm bg-gray-100 text-gray-600 font-bold rounded hover:bg-gray-200 transition">
                      📋 Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeveloperFreelance;
