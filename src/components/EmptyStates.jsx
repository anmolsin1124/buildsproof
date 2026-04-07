import React from 'react';

/**
 * Empty State Components
 * Show helpful messages when there's no content
 */

export const EmptyState = ({ 
  icon = '📭',
  title = 'Nothing here yet',
  description = 'Check back soon!',
  action,
  actionLabel = 'Take Action'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-center max-w-sm mb-6">{description}</p>
      {action && (
        <button
          onClick={action}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export const NoFeed = () => (
  <EmptyState
    icon="📪"
    title="No posts yet"
    description="Follow some people or projects to see posts in your feed!"
    actionLabel="Browse Projects"
  />
);

export const NoProjects = () => (
  <EmptyState
    icon="🚀"
    title="No projects yet"
    description="Start by creating your first project to showcase your work!"
    actionLabel="Create Project"
  />
);

export const NoProblems = () => (
  <EmptyState
    icon="💻"
    title="No problems solved yet"
    description="Start solving coding challenges and build your problem-solving skills!"
    actionLabel="Browse Problems"
  />
);

export const NoBookmarks = () => (
  <EmptyState
    icon="🔖"
    title="No saved items"
    description="Save projects and posts you find interesting to view later!"
    actionLabel="Browse Feed"
  />
);

export const NoAchievements = () => (
  <EmptyState
    icon="🏆"
    title="No achievements yet"
    description="Complete challenges and milestones to earn achievements!"
    actionLabel="Start Challenges"
  />
);

export const NoConnections = () => (
  <EmptyState
    icon="👥"
    title="No connections yet"
    description="Connect with other developers and recruiters to grow your network!"
    actionLabel="Find People"
  />
);

export const NoSearchResults = ({ query }) => (
  <EmptyState
    icon="🔍"
    title="No results found"
    description={`We couldn't find anything matching "${query}". Try different keywords.`}
  />
);

export const LoadingState = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-12 h-12 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mb-4"></div>
    <p className="text-gray-600 font-medium">{message}</p>
  </div>
);

export const ErrorState = ({ 
  title = 'Something went wrong',
  description = 'Please try again later',
  action,
  actionLabel = 'Try Again'
}) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 bg-red-50 rounded-lg border border-red-200">
    <div className="text-4xl mb-4">⚠️</div>
    <h3 className="text-2xl font-bold text-red-900 mb-2 text-center">{title}</h3>
    <p className="text-red-700 text-center max-w-sm mb-6">{description}</p>
    {action && (
      <button
        onClick={action}
        className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition"
      >
        {actionLabel}
      </button>
    )}
  </div>
);
