"use client";

import React, { useState } from 'react';

const DeveloperProjects = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  const projects = [
    {
      id: 1,
      title: 'E-commerce Analytics',
      description: 'Advanced real-time tracking of consumer behavior and inventory management with predictive AI modeling.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      status: 'In Progress',
      badges: ['React', 'TypeScript', 'D3.js'],
      team: 3,
      timestamp: 'Updated 2h ago',
      progress: 75,
    },
    {
      id: 2,
      title: 'FinTech Secure Gateway',
      description: 'High-security payment processing bridge with multi-layer encryption and fraud detection systems.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f5ae4e8b08e?w=500&h=300&fit=crop',
      status: 'Completed',
      badges: ['Node.js', 'PostgreSQL', 'Redis'],
      team: 5,
      timestamp: 'Completed Jul 12',
      verified: true,
    },
    {
      id: 3,
      title: 'IoT Smart Factory',
      description: 'Automation dashboard for monitoring industrial hardware performance and predictive maintenance alerts.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop',
      status: 'In Progress',
      badges: ['Python', 'MQTT', 'Next.js'],
      team: 4,
      timestamp: '65% Sync',
      progress: 65,
    },
  ];

  return (
    <div>
      {/* Hero Header Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 sm:mb-12">
        <div>
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
            <span>Workspace</span>
            <span>›</span>
            <span className="text-green-600">My Projects</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 mb-2">My Projects</h1>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base lg:text-lg">Manage your architectural code structures and track development milestones across your digital ecosystem.</p>
        </div>
        <button className="w-full md:w-auto bg-green-600 text-white px-5 py-3 md:px-8 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-green-600/30 hover:bg-green-700 transition-all">
          <span>➕</span> <span>Create Project</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-6 mb-10 bg-gray-100 p-4 rounded-2xl">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Filter by:</span>
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {['All Projects', 'In Progress', 'Completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="h-6 w-px bg-gray-300"></div>

          <select className="bg-transparent border-none text-sm font-bold text-gray-700 focus:ring-0 cursor-pointer">
            <option>All Technologies</option>
            <option>React</option>
            <option>Node.js</option>
            <option>Python</option>
            <option>TypeScript</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'grid'
                ? 'bg-white shadow-md text-green-600'
                : 'text-gray-400 hover:text-green-600'
            }`}
          >
            ⊞
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white shadow-md text-green-600'
                : 'text-gray-400 hover:text-green-600'
            }`}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Project Grid */}
      <div className={`grid gap-8 mb-12 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-widest backdrop-blur ${
                    project.status === 'In Progress'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  {project.title}
                </h3>
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                  ⋮
                </button>
              </div>

              <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mt-auto pt-6 flex flex-wrap gap-2">
                {project.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <div className="px-8 py-4 bg-gray-50 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {project.verified ? (
                  <span className="flex items-center gap-1 text-green-600 font-bold text-xs">
                    ✓ Verified Build
                  </span>
                ) : (
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(project.team, 3))].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-green-400 to-green-600" />
                    ))}
                    {project.team > 3 && (
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-green-600 text-white text-xs flex items-center justify-center font-bold">
                        +{project.team - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <span className="text-xs text-gray-500">{project.timestamp}</span>
            </div>

            {/* Progress Bar */}
            {project.progress && (
              <div className="px-8 py-3 bg-white flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 transition-all"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 font-semibold">{project.progress}%</span>
              </div>
            )}
          </div>
        ))}

        {/* Create New Project Card */}
        <div className="md:col-span-2 xl:col-span-3 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-dashed border-green-300 rounded-2xl p-12 flex flex-col items-center justify-center text-center group hover:from-green-100 hover:to-emerald-100 transition-all cursor-pointer">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
            <span className="text-3xl">➕</span>
          </div>
          <h3 className="text-2xl font-bold text-green-700 mb-2">Initiate a New Digital Structure</h3>
          <p className="text-green-600 max-w-md">Start from a template or a blank canvas. BuildProof provides the foundational scaffolding for your next architectural masterpiece.</p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProjects;
