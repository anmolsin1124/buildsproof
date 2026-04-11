"use client";

import React, { useState, useEffect } from 'react';
import { getUserPreferences, setUserPreferences } from '../utils/authUtils';
import { FormError, SuccessMessage } from './FormFeedback';

/**
 * Settings Section Component
 * Manages user preferences, privacy, notifications, and account settings
 */

export const SettingsSection = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    privateProfile: false,
    digestFrequency: 'weekly',
    theme: 'light',
    language: 'en',
    datasharing: false,
  });

  const [savedStatus, setSavedStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const savedPrefs = getUserPreferences();
    if (savedPrefs) {
      setPreferences(savedPrefs);
    }
  }, []);

  const handleToggle = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    setSavedStatus(false);
  };

  const handleChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
    setSavedStatus(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUserPreferences(preferences);
      setSavedStatus(true);
      setTimeout(() => setSavedStatus(false), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetDefault = () => {
    const defaults = {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      privateProfile: false,
      digestFrequency: 'weekly',
      theme: 'light',
      language: 'en',
      datasharing: false,
    };
    setPreferences(defaults);
    setSavedStatus(false);
  };

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {savedStatus && (
        <SuccessMessage message="✓ Settings saved successfully!" />
      )}

      {/* Notification Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🔔 Notification Settings
        </h3>
        <div className="space-y-4">
          <SettingToggle
            label="Email Notifications"
            description="Receive email updates about your activity"
            value={preferences.emailNotifications}
            onChange={() => handleToggle('emailNotifications')}
          />
          <SettingToggle
            label="Push Notifications"
            description="Get push notifications on your device"
            value={preferences.pushNotifications}
            onChange={() => handleToggle('pushNotifications')}
          />
          <SettingToggle
            label="Marketing Emails"
            description="Receive promotional content and updates"
            value={preferences.marketingEmails}
            onChange={() => handleToggle('marketingEmails')}
          />

          {/* Digest Frequency */}
          <div className="border-t border-gray-100 pt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📧 Digest Frequency
            </label>
            <select
              value={preferences.digestFrequency}
              onChange={(e) => handleChange('digestFrequency', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
            >
              <option value="immediate">Immediate</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          🔒 Privacy Settings
        </h3>
        <div className="space-y-4">
          <SettingToggle
            label="Private Profile"
            description="Make your profile visible only to recruiters you follow"
            value={preferences.privateProfile}
            onChange={() => handleToggle('privateProfile')}
          />
          <SettingToggle
            label="Allow Data Sharing"
            description="Allow BuildProof to share anonymized data for platform improvements"
            value={preferences.datasharing}
            onChange={() => handleToggle('datasharing')}
          />
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          ⚙️ Preferences
        </h3>
        <div className="space-y-4">
          {/* Theme */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🌓 Theme
            </label>
            <div className="flex gap-3">
              {['light', 'dark', 'auto'].map(option => (
                <button
                  key={option}
                  onClick={() => handleChange('theme', option)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition ${
                    preferences.theme === option
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="border-t border-gray-100 pt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🌍 Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="hi">Hindi</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          👤 Account Actions
        </h3>
        <div className="space-y-3 flex flex-col">
          <button className="px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-semibold hover:bg-blue-100 transition">
            📥 Download Your Data
          </button>
          <button className="px-4 py-2 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg font-semibold hover:bg-orange-100 transition">
            🔄 Reset Password
          </button>
          <button className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg font-semibold hover:bg-red-100 transition">
            🗑️ Delete Account
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 cursor-pointer'
          }`}
        >
          {loading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          <span>{loading ? 'Saving...' : '💾 Save Settings'}</span>
        </button>
        <button
          onClick={handleResetDefault}
          className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
        >
          ↺ Reset to Default
        </button>
      </div>
    </div>
  );
};

/**
 * Reusable Setting Toggle Component
 */
const SettingToggle = ({ label, description, value, onChange }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      <div>
        <p className="font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-7 rounded-full transition focus:outline-none focus:ring-2 focus:ring-green-500 ${
          value ? 'bg-green-500' : 'bg-gray-300'
        }`}
      >
        <div
          className={`absolute top-1 w-5 h-5 bg-white rounded-full transition transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default SettingsSection;
