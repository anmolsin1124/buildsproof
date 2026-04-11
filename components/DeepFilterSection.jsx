"use client";

import React, { useState } from 'react';

const DeepFilterSection = ({ onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    level: 'all',
    category: 'all',
    language: [],
    rating: 'all',
    timeRange: 'all',
  });

  const handleFilterChange = (filterName, value) => {
    let updatedFilters;
    
    if (filterName === 'language') {
      // Toggle language selection
      updatedFilters = {
        ...filters,
        language: filters.language.includes(value)
          ? filters.language.filter(l => l !== value)
          : [...filters.language, value],
      };
    } else {
      updatedFilters = { ...filters, [filterName]: value };
    }
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      level: 'all',
      category: 'all',
      language: [],
      rating: 'all',
      timeRange: 'all',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const isFiltered = 
    filters.level !== 'all' ||
    filters.category !== 'all' ||
    filters.language.length > 0 ||
    filters.rating !== 'all' ||
    filters.timeRange !== 'all';

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition flex items-center gap-2"
        title="Advanced Filters"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {isFiltered && (
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-purple-500 rounded-full">
            {Object.values(filters).flat().filter(Boolean).length}
          </span>
        )}
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-96 overflow-y-auto">
          <div className="sticky top-0 p-4 border-b border-gray-200 bg-white flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Advanced Filters</h3>
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                Reset
              </button>
            )}
          </div>

          <div className="p-4 space-y-4">
            {/* Difficulty Level */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Difficulty Level</label>
              <select
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Category</label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="data-structures">Data Structures</option>
                <option value="algorithms">Algorithms</option>
                <option value="system-design">System Design</option>
                <option value="web-dev">Web Development</option>
                <option value="databases">Databases</option>
              </select>
            </div>

            {/* Programming Languages */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Languages</label>
              <div className="space-y-2">
                {['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust'].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.language.includes(lang)}
                      onChange={() => handleFilterChange('language', lang)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Minimum Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="all">Any Rating</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4">4.0+ ⭐</option>
                <option value="3.5">3.5+ ⭐</option>
                <option value="3">3.0+ ⭐</option>
              </select>
            </div>

            {/* Time Range */}
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-2">Posted</label>
              <select
                value={filters.timeRange}
                onChange={(e) => handleFilterChange('timeRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="all">Any Time</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="quarter">Past Quarter</option>
                <option value="year">Past Year</option>
              </select>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFilters(false)}
              className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeepFilterSection;
