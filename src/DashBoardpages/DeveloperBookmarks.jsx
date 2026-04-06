import React from 'react';

const DeveloperBookmarks = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookmarks</h2>
      <p className="text-gray-600 text-center py-12">
        No bookmarks yet. 
        <br />
        Start bookmarking your favorite problems and projects to access them quickly!
      </p>
      
      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
          🔖 Explore & Bookmark
        </button>
      </div>
    </div>
  );
};

export default DeveloperBookmarks;
