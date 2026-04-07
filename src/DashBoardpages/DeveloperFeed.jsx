import React, { useState } from 'react';
import { feedData } from '../data/feedData';
import { NoFeed } from '../components/EmptyStates';

const DeveloperFeed = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likes, setLikes] = useState({});

  const categories = ['All', 'AI', 'Frontend', 'Backend', 'Full Stack', 'Mobile'];
  
  const filteredFeed = selectedCategory === 'All' 
    ? feedData 
    : feedData.filter(item => item.category === selectedCategory);

  const toggleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredFeed.length === 0 ? (
        <NoFeed />
      ) : (
        /* Feed Items */
        <div className="space-y-6">
          {filteredFeed.map((post) => (
          <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={post.userAvatar} 
                  alt={post.userName} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{post.userName}</h3>
                  <p className="text-xs text-gray-600">{post.timeAgo}</p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{post.projectTitle}</h4>
              <p className="text-gray-700 mb-4">{post.problemSolved}</p>
              
              {/* Tech Stack */}
              <div className="flex gap-2 flex-wrap mb-4">
                {post.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex gap-4 text-gray-600 text-sm">
                <span>❤️ {post.likes + (likes[post.id] ? 1 : 0)} Likes</span>
                <span>👁️ {post.views} Views</span>
                <span>💬 {post.comments} Comments</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    likes[post.id]
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {likes[post.id] ? '❤️ Liked' : '🤍 Like'}
                </button>
                <a
                  href={post.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  View Live
                </a>
                <a
                  href={post.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default DeveloperFeed;
