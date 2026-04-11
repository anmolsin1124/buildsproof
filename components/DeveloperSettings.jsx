"use client";

import React, { useState } from 'react';

const DeveloperSettings = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account Settings
    emailNotifications: true,
    problemRecommendations: true,
    weeklyDigest: false,
    
    // Privacy Settings
    makeProfilePublic: true,
    showAchievements: true,
    hideEmail: false,
    
    // Preferences
    darkMode: false,
    language: 'English',
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleLanguageChange = (e) => {
    setSettings(prev => ({
      ...prev,
      language: e.target.value
    }));
  };

  const menuItems = [
    { id: 'account', label: '📊 Account', icon: '📊' },
    { id: 'privacy', label: '🔒 Privacy', icon: '🔒' },
    { id: 'security', label: '🔐 Security', icon: '🔐' },
    { id: 'billing', label: '💳 Billing', icon: '💳' },
    { id: 'integrations', label: '🔗 Integrations', icon: '🔗' },
    { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
  ];

  const renderToggleSetting = (label, settingKey) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <span className="text-gray-700 font-medium">{label}</span>
      <button
        onClick={() => handleToggle(settingKey)}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition ${
          settings[settingKey]
            ? 'bg-green-500'
            : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
            settings[settingKey] ? 'translate-x-9' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-6">
      {/* Left Sidebar Navigation */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-6 sticky top-20">
          <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-4">Settings</h3>
          <div className="space-y-2">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition ${
                  activeTab === item.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-6">
        {/* Account Settings Tab */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">📊</span>
              <h2 className="text-3xl font-black text-gray-900">Account Settings</h2>
            </div>
            
            <div className="space-y-1">
              {renderToggleSetting('📧 Email notifications', 'emailNotifications')}
              {renderToggleSetting('💡 Problem recommendations', 'problemRecommendations')}
              {renderToggleSetting('📬 Weekly digest', 'weeklyDigest')}
            </div>
          </div>
        )}

        {/* Privacy Settings Tab */}
        {activeTab === 'privacy' && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🔒</span>
              <h2 className="text-3xl font-black text-gray-900">Privacy</h2>
            </div>
            
            <div className="space-y-1">
              {renderToggleSetting('🌐 Make profile public', 'makeProfilePublic')}
              {renderToggleSetting('🏆 Show my achievements', 'showAchievements')}
              {renderToggleSetting('👁️ Hide my email', 'hideEmail')}
            </div>
          </div>
        )}

        {/* Preferences Section */}
        {activeTab === 'account' && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">⚙️</span>
              <h2 className="text-3xl font-black text-gray-900">Preferences</h2>
            </div>
            
            <div className="space-y-6">
              {renderToggleSetting('🌙 Dark Mode', 'darkMode')}
              
              <div className="py-4 border-b border-gray-100">
                <label className="block text-gray-700 font-medium mb-3">🌍 Language</label>
                <select
                  value={settings.language}
                  onChange={handleLanguageChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:border-green-400 focus:outline-none focus:border-green-500 transition"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Hindi</option>
                  <option>Chinese</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab - Danger Zone */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🔐</span>
              <h2 className="text-3xl font-black text-gray-900">Security</h2>
            </div>
            
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-red-600 mb-6">⚠️ Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-6">These actions are permanent and cannot be undone. Please proceed with caution.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg">
                  🗑️ Delete Account
                </button>
                <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg">
                  🔄 Reset Progress
                </button>
                <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg">
                  🚪 Deactivate Profile
                </button>
                <button className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg">
                  🔓 Logout All Devices
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">💳</span>
              <h2 className="text-3xl font-black text-gray-900">Billing</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <p className="text-sm text-gray-600 mb-2">Current Plan</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">BuildProof Free</h3>
                <p className="text-gray-600">$0/month • Unlimited access to all features</p>
              </div>
              
              <button className="w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-md hover:shadow-lg">
                ⭐ Upgrade to Pro
              </button>
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🔗</span>
              <h2 className="text-3xl font-black text-gray-900">Integrations</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['GitHub', 'LinkedIn', 'Google', 'GitLab', 'Figma', 'Slack'].map(integration => (
                <div key={integration} className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-400 transition cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{integration}</span>
                    <button className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition">
                      Connect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🔔</span>
              <h2 className="text-3xl font-black text-gray-900">Notifications</h2>
            </div>
            
            <div className="space-y-1">
              {renderToggleSetting('🎯 Project updates', 'projectUpdates')}
              {renderToggleSetting('💬 Comments & replies', 'commentsReplies')}
              {renderToggleSetting('🤝 Connection requests', 'connectionRequests')}
              {renderToggleSetting('🎉 Achievements', 'achievements')}
              {renderToggleSetting('📢 Community announcements', 'announcements')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperSettings;
