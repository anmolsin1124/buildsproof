import React, { useState } from 'react';

const FeedCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const MAX_DESCRIPTION_LENGTH = 150;
  const isDescriptionLong = post.problemSolved && post.problemSolved.length > MAX_DESCRIPTION_LENGTH;
  const displayedDescription = isExpanded 
    ? post.problemSolved 
    : post.problemSolved?.substring(0, MAX_DESCRIPTION_LENGTH);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-2xl">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <img 
                src={post.userAvatar} 
                alt={post.userName} 
                className="w-14 h-14 rounded-full object-cover border-2 border-green-200"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-4 h-4 border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-sm">{post.userName}</h3>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Following</span>
              </div>
              <p className="text-xs text-gray-600 font-medium">{post.userTitle || 'Developer'}</p>
              <p className="text-xs text-gray-400">{post.timeAgo || '2 hours ago'}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.projectTitle}</h2>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-3 leading-relaxed">
          {displayedDescription}
          {isDescriptionLong && !isExpanded && <span className="text-gray-600">...</span>}
        </p>

        {/* Show More/Less Link */}
        {isDescriptionLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-green-600 hover:text-green-700 text-sm font-bold mb-4 inline-block"
          >
            {isExpanded ? '▼ Show less' : '▶ Show more'}
          </button>
        )}

        {/* Tech Stack Tags */}
        {post.techStack && post.techStack.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-4">
            {post.techStack.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200 hover:border-green-400 transition cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview */}
      {post.imageUrl && (
        <div className="relative bg-gray-100 w-full overflow-hidden group aspect-video">
          <img 
            src={post.imageUrl} 
            alt="Project preview" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
            <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-bold text-sm hover:bg-green-50 transition shadow-lg flex items-center gap-2">
              <span>▶</span> View Project
            </button>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      {(likes > 0 || post.comments > 0 || post.views > 0) && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex justify-between text-sm font-semibold text-gray-600">
          <span className="flex items-center gap-1">
            <span className="text-red-500">❤️</span> {likes} likes
          </span>
          <span className="flex items-center gap-1">
            <span>👁️</span> {post.views || 0} views
          </span>
          <span className="flex items-center gap-1">
            <span>💬</span> {post.comments} comments
          </span>
        </div>
      )}

      {/* Engagement Buttons */}
      <div className="px-5 py-3 flex items-center justify-between gap-2 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition ${
            liked 
              ? 'text-red-500 bg-red-50' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-lg">{liked ? '❤️' : '🤍'}</span>
          <span>Like</span>
        </button>
        <button 
          onClick={() => setCommented(!commented)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm transition ${
            commented
              ? 'text-blue-600 bg-blue-50'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span>💬</span>
          <span>Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm text-gray-600 hover:bg-gray-100 transition">
          <span>🔄</span>
          <span>Repost</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-bold text-sm text-gray-600 hover:bg-gray-100 transition">
          <span>✉️</span>
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};

export default FeedCard;
