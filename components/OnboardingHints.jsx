import React from 'react';

/**
 * Onboarding Hints Component
 * Helps users understand what to do at each stage
 * Improves overall UX clarity
 */

const OnboardingCard = ({ 
  step, 
  icon, 
  title, 
  description, 
  action,
  actionLabel = 'Get Started'
}) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="text-3xl flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-block bg-green-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
              Step {step}
            </span>
          </div>
          <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-700 mb-3">{description}</p>
          {action && (
            <button
              onClick={action}
              className="text-green-600 hover:text-green-700 text-sm font-bold underline"
            >
              {actionLabel} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const DeveloperOnboarding = () => {
  return (
    <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-bold text-gray-900 mb-4">Getting Started as a Developer</h3>
      <OnboardingCard
        step={1}
        icon="👤"
        title="Complete Your Profile"
        description="Add your skills, experience level, and profile picture to attract recruiters"
        actionLabel="Edit Profile"
      />
      <OnboardingCard
        step={2}
        icon="🚀"
        title="Showcase Your Projects"
        description="Upload your best projects with descriptions and live links"
        actionLabel="Add Projects"
      />
      <OnboardingCard
        step={3}
        icon="💻"
        title="Solve Coding Problems"
        description="Complete challenges to build your skills and earn achievements"
        actionLabel="Browse Problems"
      />
      <OnboardingCard
        step={4}
        icon="👥"
        title="Connect with Others"
        description="Find and connect with recruiters and other developers"
        actionLabel="Find People"
      />
    </div>
  );
};

export const RecruiterOnboarding = () => {
  return (
    <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="font-bold text-gray-900 mb-4">Getting Started as a Recruiter</h3>
      <OnboardingCard
        step={1}
        icon="🏢"
        title="Setup Company Info"
        description="Tell candidates about your company and what you're hiring for"
        actionLabel="Edit Profile"
      />
      <OnboardingCard
        step={2}
        icon="📋"
        title="Post Job Openings"
        description="Create job posts with skill requirements and challenges"
        actionLabel="Post Job"
      />
      <OnboardingCard
        step={3}
        icon="🔍"
        title="Browse Developers"
        description="Search and filter developers by skills and experience"
        actionLabel="Browse Developers"
      />
      <OnboardingCard
        step={4}
        icon="💬"
        title="Send Messages"
        description="Connect with interesting candidates directly"
        actionLabel="Find Candidates"
      />
    </div>
  );
};

export const HelpCard = ({ type = 'info', title, content, icon = '💡' }) => {
  const bgColors = {
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200'
  };

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✓',
    error: '⚠️'
  };

  return (
    <div className={`border rounded-lg p-3 flex gap-3 ${bgColors[type]}`}>
      <span className="text-xl flex-shrink-0">{icons[type]}</span>
      <div>
        <h4 className="font-bold text-sm text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-700">{content}</p>
      </div>
    </div>
  );
};
