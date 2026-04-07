/**
 * Feed Utilities - Functions for feed operations and filtering
 */

/**
 * Calculate engagement score for trending algorithm
 * @param {Object} post - Feed post object
 * @returns {number} Engagement score
 */
export const calculateEngagementScore = (post) => {
  const likes = post.likes || 0;
  const views = post.views || 0;
  const comments = post.comments || 0;
  
  // Weighted score: likes are more valuable than views
  return (likes * 2) + (views * 0.5) + (comments * 1.5);
};

/**
 * Get trending posts from feed
 * @param {Array} posts - Array of feed posts
 * @param {number} limit - Number of trending posts to return
 * @returns {Array} Top trending posts
 */
export const getTrendingPosts = (posts, limit = 3) => {
  return [...posts]
    .sort((a, b) => calculateEngagementScore(b) - calculateEngagementScore(a))
    .slice(0, limit);
};

/**
 * Filter feed by search query
 * @param {Array} posts - Array of feed posts
 * @param {string} query - Search query
 * @returns {Array} Filtered posts
 */
export const searchFeed = (posts, query) => {
  if (!query.trim()) return posts;
  
  const lowerQuery = query.toLowerCase();
  return posts.filter(post => 
    post.projectTitle.toLowerCase().includes(lowerQuery) ||
    post.problemSolved.toLowerCase().includes(lowerQuery) ||
    post.userName.toLowerCase().includes(lowerQuery) ||
    post.userTitle?.toLowerCase().includes(lowerQuery) ||
    post.techStack?.some(tech => tech.toLowerCase().includes(lowerQuery))
  );
};

/**
 * Get all unique technologies from posts
 * @param {Array} posts - Array of feed posts
 * @returns {Array} Sorted array of unique technologies
 */
export const getAllTechnologies = (posts) => {
  const techs = new Set();
  posts.forEach(post => {
    post.techStack?.forEach(tech => techs.add(tech));
  });
  return Array.from(techs).sort();
};

/**
 * Get all unique categories from posts
 * @param {Array} posts - Array of feed posts
 * @returns {Array} Sorted array of unique categories
 */
export const getAllCategories = (posts) => {
  const categories = new Set(['All']);
  posts.forEach(post => {
    if (post.category) categories.add(post.category);
  });
  return Array.from(categories);
};

/**
 * Filter posts by multiple criteria
 * @param {Array} posts - Array of feed posts
 * @param {Object} filters - Filter criteria
 * @returns {Array} Filtered posts
 */
export const filterFeed = (posts, filters = {}) => {
  let filtered = [...posts];

  // Category filter
  if (filters.category && filters.category !== 'All') {
    filtered = filtered.filter(post => post.category === filters.category);
  }

  // Search filter
  if (filters.searchQuery?.trim()) {
    filtered = searchFeed(filtered, filters.searchQuery);
  }

  // Technology filter
  if (filters.technology) {
    filtered = filtered.filter(post =>
      post.techStack?.includes(filters.technology)
    );
  }

  // Sort
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'trending':
        filtered.sort((a, b) => calculateEngagementScore(b) - calculateEngagementScore(a));
        break;
      case 'newest':
        filtered.reverse();
        break;
      case 'mostViewed':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }
  }

  return filtered;
};

/**
 * Get related posts based on technology stack
 * @param {Object} post - Reference post
 * @param {Array} posts - All available posts
 * @param {number} limit - Number of related posts to return
 * @returns {Array} Related posts
 */
export const getRelatedPosts = (post, posts, limit = 3) => {
  const postTechs = new Set(post.techStack || []);
  
  return posts
    .filter(p => p.id !== post.id)
    .map(p => ({
      post: p,
      relevance: (p.techStack || []).filter(tech => postTechs.has(tech)).length
    }))
    .filter(item => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(item => item.post);
};

/**
 * Get engagement badge for a post
 * @param {Object} post - Feed post
 * @returns {string|null} Badge text or null
 */
export const getEngagementBadge = (post) => {
  const score = calculateEngagementScore(post);
  
  if (score > 500) return 'Viral 🚀';
  if (score > 300) return 'Trending 🔥';
  if (score > 100) return 'Popular ⭐';
  return null;
};

/**
 * Format large numbers for display
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};
