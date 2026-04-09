import React, { useState } from 'react';

const HRCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'Easy':
        return '🟢';
      case 'Medium':
        return '🟡';
      case 'Hard':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-2xl hover:border-green-300 transition-all duration-300 overflow-hidden max-w-2xl w-full">
      {/* Header with Company Info */}
      <div className="bg-linear-to-r from-green-50 to-emerald-50 p-6 border-b-2 border-gray-200">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            {/* Company Logo */}
            <div className="relative">
              <img
                src={job.companyLogo}
                alt={job.companyName}
                className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
              />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                💼
              </div>
            </div>

            {/* Company & Job Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-black text-gray-900">{job.jobTitle}</h2>
              <p className="text-sm font-bold text-green-600 mt-1">{job.companyName}</p>
              
              {/* Location & Type */}
              <div className="flex flex-wrap gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs font-semibold text-gray-700 bg-white px-2.5 py-1 rounded-full border border-gray-200">
                  📍 {job.location}
                </span>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  job.jobType === 'Remote' ? 'bg-green-100 text-green-700 border-green-300' :
                  job.jobType === 'Hybrid' ? 'bg-purple-100 text-purple-700 border-purple-300' :
                  'bg-orange-100 text-orange-700 border-orange-300'
                }`}>
                  {job.jobType === 'Remote' ? '🌍' : job.jobType === 'Hybrid' ? '🏢' : '🏭'} {job.jobType}
                </span>
                <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${getDifficultyColor(job.difficulty)}`}>
                  {getDifficultyIcon(job.difficulty)} {job.difficulty}
                </span>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-lg transition text-xl ${
              isSaved ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {isSaved ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      {/* HR Profile Section */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <img
            src={job.hrAvatar}
            alt={job.hrName}
            className="w-12 h-12 rounded-full object-cover border-3 border-blue-300"
          />
          <div className="flex-1">
            <p className="font-bold text-gray-900">
              {job.hrName}
            </p>
            <p className="text-xs text-gray-600">{job.companyName} • HR Manager</p>
          </div>
          <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-blue-700 transition">
            Follow
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-4">
        {/* Salary & Experience */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Salary Range</p>
            <p className="text-lg font-black text-green-700">{job.salary}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">Experience</p>
            <p className="text-lg font-black text-purple-700">{job.experience}</p>
          </div>
        </div>

        {/* Job & Project Titles */}
        <div>
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Project Title</p>
          <h3 className="text-xl font-black text-gray-900 mb-2">{job.projectTitle}</h3>
        </div>

        {/* Problem Statement */}
        <div>
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Problem Statement</p>
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
            {job.problemStatement}
          </p>
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-blue-600 hover:text-blue-700 font-bold text-sm mt-2"
            >
              ▶ Read More
            </button>
          )}
        </div>

        {/* Full Problem Statement (Expanded) */}
        {isExpanded && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              {job.problemStatement}
            </p>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-blue-600 hover:text-blue-700 font-bold text-sm"
            >
              ▼ Show Less
            </button>
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Tech Stack Required</p>
          <div className="flex flex-wrap gap-2">
            {job.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-xs font-bold rounded-full border border-blue-300 hover:shadow-md transition cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Project Image */}
      {job.projectImage && (
        <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden group h-48 border-t-2 border-gray-200">
          <img
            src={job.projectImage}
            alt="Project preview"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-50 transition shadow-lg flex items-center gap-2">
              <span>🎬</span> View Project
            </button>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="px-6 py-4 bg-gray-50 border-t-2 border-gray-200 flex justify-between text-sm font-semibold text-gray-600">
        <span className="flex items-center gap-1">
          <span className="text-red-500">❤️</span> {job.likes} interested
        </span>
        <span className="flex items-center gap-1">
          <span>👁️</span> {job.views} views
        </span>
        <span className="flex items-center gap-1">
          <span>⏰</span> {job.postedTime}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 flex gap-3 border-t-2 border-gray-200 bg-white">
        <button
          onClick={() => setIsApplied(!isApplied)}
          className={`flex-1 py-3 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 ${
            isApplied
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span>{isApplied ? '✓' : '📝'}</span>
          {isApplied ? 'Applied' : 'Apply Now'}
        </button>
        <button className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:border-gray-400 hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <span>📤</span> Share
        </button>
        <button className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold text-sm hover:border-gray-400 hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <span>💬</span> Message
        </button>
      </div>

      {/* Status Badge */}
      <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center font-bold text-sm">
        🟢 Actively Hiring - Apply Today!
      </div>
    </div>
  );
};

export default HRCard;
