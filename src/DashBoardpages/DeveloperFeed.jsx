import React, { useState, useMemo } from 'react';
import { feedData } from '../data/feedData';
import { NoFeed } from '../components/EmptyStates';
import { useNavigate } from 'react-router-dom';

const DeveloperFeed = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedTech, setSelectedTech] = useState('');
  const [likes, setLikes] = useState({});
  const [showOnlyJobs, setShowOnlyJobs] = useState(false);

  const categories = ['All', 'AI', 'Frontend', 'Backend', 'Full Stack', 'Mobile'];
  
  // Get all unique technologies
  const allTechs = useMemo(() => {
    const techs = new Set();
    feedData.forEach(post => {
      post.techStack?.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, []);

  // Filter and sort feed
  const processedFeed = useMemo(() => {
    let filtered = feedData;

    // Jobs filter
    if (showOnlyJobs) {
      // Show only job postings (posts from recruiters/companies)
      filtered = filtered.filter(item => item.category === 'Jobs' || item.type === 'job');
    }

    // Category filter
    if (selectedCategory !== 'All' && !showOnlyJobs) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.projectTitle.toLowerCase().includes(query) ||
        item.problemSolved.toLowerCase().includes(query) ||
        item.userName.toLowerCase().includes(query) ||
        item.techStack.some(tech => tech.toLowerCase().includes(query))
      );
    }

    // Tech stack filter
    if (selectedTech) {
      filtered = filtered.filter(item => 
        item.techStack.includes(selectedTech)
      );
    }

    // Sorting
    const sorted = [...filtered];
    if (sortBy === 'trending') {
      sorted.sort((a, b) => {
        const scoreA = (a.likes || 0) + (a.views || 0) * 0.5;
        const scoreB = (b.likes || 0) + (b.views || 0) * 0.5;
        return scoreB - scoreA;
      });
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => feedData.indexOf(a) - feedData.indexOf(b));
    } else if (sortBy === 'mostViewed') {
      sorted.sort((a, b) => (b.views || 0) - (a.views || 0));
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy, selectedTech, showOnlyJobs]);

  // Get trending posts (top 3)
  const trendingPosts = useMemo(() => {
    const sorted = [...feedData].sort((a, b) => {
      const scoreA = (a.likes || 0) + (a.views || 0) * 0.5;
      const scoreB = (b.likes || 0) + (b.views || 0) * 0.5;
      return scoreB - scoreA;
    });
    return sorted.slice(0, 3);
  }, []);

  const toggleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleUserClick = (postId) => {
    navigate(`/user/${postId}`);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Feed</h1>
        <p className="text-gray-600">Discover amazing projects from talented developers</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects, developers, or technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
        </div>
        <button
          onClick={() => setShowOnlyJobs(!showOnlyJobs)}
          className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
            showOnlyJobs
              ? 'bg-linear-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
          }`}
        >
          <span>💼</span>
          Jobs
        </button>
      </div>

      {/* Filters Section - Hide when showing jobs */}
      {!showOnlyJobs && (
      <div className="mb-6 space-y-4">
        {/* Category Filter */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Category</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Stack Filter */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">Technologies</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedTech('')}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                selectedTech === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Tech
            </button>
            {allTechs.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                  selectedTech === tech
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Sort and Display Options */}
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-green-500 outline-none"
            >
              <option value="trending">📈 Trending</option>
              <option value="newest">✨ Newest</option>
              <option value="mostViewed">👁️ Most Viewed</option>
            </select>
          </div>
          <p className="text-sm text-gray-600">
            {processedFeed.length} {processedFeed.length === 1 ? 'project' : 'projects'} found
          </p>
        </div>
      </div>
      )}

      {/* Jobs Section - Show when Jobs button is active */}
      {showOnlyJobs && (
        <div className="mb-6 bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">💼</span>
            <h2 className="text-2xl font-bold text-green-900">Job Opportunities</h2>
          </div>
          <p className="text-green-700 mb-4">Find exciting career opportunities and growth with top companies</p>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search jobs by title, company, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-blue-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="trending">📈 Most Relevant</option>
              <option value="newest">✨ Newest</option>
              <option value="mostViewed">👁️ Most Viewed</option>
            </select>
          </div>
        </div>
      )}

      {/* Trending Section */}
      {selectedCategory === 'All' && !searchQuery && !selectedTech && sortBy === 'trending' && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🔥</span>
            <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {trendingPosts.map((post, idx) => (
              <div 
                key={post.id} 
                className="relative bg-linear-to-br from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-5 hover:shadow-xl transition cursor-pointer transform hover:scale-105 group"
                onClick={() => handleUserClick(post.id)}
              >
                {/* Trending Badge */}
                <div className="absolute -top-3 -right-3 bg-linear-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  #{idx + 1}
                </div>

                {/* User Avatar and Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={post.userAvatar} 
                    alt={post.userName} 
                    className="w-10 h-10 rounded-full border-2 border-green-400"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm group-hover:text-green-600 transition">
                      {post.userName}
                    </h3>
                    <p className="text-xs text-gray-600">{post.userTitle}</p>
                  </div>
                </div>

                {/* Title */}
                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition">
                  {post.projectTitle}
                </h4>

                {/* Tech Stack */}
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {post.techStack.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-green-200 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {post.techStack.length > 3 && (
                    <span className="text-xs text-gray-600 font-semibold">+{post.techStack.length - 3}</span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex gap-3 text-xs font-semibold text-gray-700">
                  <span>❤️ {post.likes}</span>
                  <span>👁️ {post.views}</span>
                </div>
              </div>
            ))}
          </div>
          <hr className="border-gray-200 mb-8" />
        </div>
      )}

      {/* Empty State */}
      {processedFeed.length === 0 ? (
        showOnlyJobs ? (
          <div className="bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">💼</div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">No Jobs Available Yet</h3>
            <p className="text-green-700 mb-6">
              Check back soon for exciting job opportunities from top companies. In the meantime, explore amazing projects in the feed!
            </p>
            <button
              onClick={() => setShowOnlyJobs(false)}
              className="px-6 py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:shadow-lg transition"
            >
              ← Back to Projects
            </button>
          </div>
        ) : (
          <NoFeed />
        )
      ) : (
        /* Feed Items */
        <div className="space-y-5">
          {processedFeed.map((post) => {
            const isTrending = trendingPosts.some(tp => tp.id === post.id);
            
            return (
              <div 
                key={post.id} 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden hover:shadow-xl ${
                  isTrending 
                    ? 'bg-linear-to-r from-green-50 to-emerald-50 border-green-300 shadow-md' 
                    : 'bg-white border-gray-200 shadow-sm hover:border-green-200'
                }`}
              >
                {/* Card Content */}
                <div className="p-6">
                  {/* Header with user info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1 cursor-pointer" onClick={() => handleUserClick(post.id)}>
                      <img 
                        src={post.userAvatar} 
                        alt={post.userName} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-green-200 hover:border-green-400 transition"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 hover:text-green-600 transition">
                          {post.userName}
                        </h3>
                        <p className="text-xs text-gray-600">{post.userTitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isTrending && (
                        <span className="inline-flex items-center gap-1 bg-linear-to-r from-yellow-100 to-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full border border-orange-300">
                          🔥 Trending
                        </span>
                      )}
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        post.category === 'AI' ? 'bg-purple-100 text-purple-700' :
                        post.category === 'Frontend' ? 'bg-blue-100 text-blue-700' :
                        post.category === 'Backend' ? 'bg-orange-100 text-orange-700' :
                        post.category === 'Full Stack' ? 'bg-pink-100 text-pink-700' :
                        post.category === 'Jobs' ? 'bg-green-100 text-green-700 font-bold' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {post.type === 'job' ? '💼 Job' : post.category}
                      </span>
                    </div>
                  </div>

                  {/* Time */}
                  <p className="text-xs text-gray-500 mb-3">{post.timeAgo}</p>

                  {/* Project Title */}
                  <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.projectTitle}</h4>

                  {/* Problem Solved / Job Description */}
                  <p className="text-gray-700 mb-4 line-clamp-2">{post.problemSolved}</p>

                  {post.type === 'job' && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <p className="text-xs font-semibold text-gray-600">Salary</p>
                          <p className="font-bold text-green-700">{post.salary}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600">Location</p>
                          <p className="font-bold text-green-700">{post.location}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600">Type</p>
                          <p className="font-bold text-green-700">{post.jobType}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack - Improved */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {post.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-linear-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-200 hover:border-blue-400 hover:shadow-md transition cursor-pointer"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Stats Bar with Progress */}
                  <div className="grid grid-cols-3 gap-4 py-4 px-4 bg-gray-50 rounded-xl mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-500">{post.likes}</p>
                      <p className="text-xs text-gray-600 font-semibold">Likes</p>
                    </div>
                    <div className="text-center border-l border-r border-gray-300">
                      <p className="text-2xl font-bold text-blue-500">{post.views}</p>
                      <p className="text-xs text-gray-600 font-semibold">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">{post.comments}</p>
                      <p className="text-xs text-gray-600 font-semibold">Comments</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-3">
                  {post.type === 'job' ? (
                    <>
                      <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-blue-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-600">Location</p>
                          <p className="font-bold text-gray-900">{post.location}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-600">Type</p>
                          <p className="font-bold text-gray-900">{post.jobType}</p>
                        </div>
                      </div>
                      <a
                        href={post.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition whitespace-nowrap"
                      >
                        ✅ Apply Now
                      </a>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition ${
                          likes[post.id]
                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-red-300 hover:text-red-600'
                        }`}
                      >
                        {likes[post.id] ? '❤️ Liked' : '🤍 Like'}
                      </button>
                      <a
                        href={post.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-green-600 text-white rounded-lg font-bold text-sm hover:bg-green-700 transition"
                      >
                        🌐 Live
                      </a>
                      <a
                        href={post.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-800 text-white rounded-lg font-bold text-sm hover:bg-gray-900 transition"
                      >
                        💻 Code
                      </a>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeveloperFeed;
