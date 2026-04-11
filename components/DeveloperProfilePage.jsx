"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const DeveloperProfilePage = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    skill: '',
    domain: '',
    experienceLevel: '',
    profileImage: null,
    profileImagePreview: null,
    projectsCount: 0,
    likesReceived: 0,
    problemsSolved: 0,
    streakDays: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          profileImage: file,
          profileImagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!profileData.firstName.trim()) {
      alert('First name is required');
      return;
    }
    if (!profileData.lastName.trim()) {
      alert('Last name is required');
      return;
    }
    if (!profileData.skill.trim()) {
      alert('Skill is required');
      return;
    }
    if (!profileData.domain.trim()) {
      alert('Domain is required');
      return;
    }
    if (!profileData.experienceLevel.trim()) {
      alert('Experience level is required');
      return;
    }

    // Store profile data
    localStorage.setItem('developerProfile', JSON.stringify({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      skill: profileData.skill,
      domain: profileData.domain,
      experienceLevel: profileData.experienceLevel,
      profileImagePreview: profileData.profileImagePreview,
      projectsCount: profileData.projectsCount,
      likesReceived: profileData.likesReceived,
      problemsSolved: profileData.problemsSolved,
      streakDays: profileData.streakDays,
    }));

    // Navigate to developer dashboard
    router.push('/developer-dashboard');
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Complete Your Profile</h2>
            <p className="text-gray-600 text-base">Add your information to get started as a Developer</p>
          </div>

          {/* Profile Form */}
          <form className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-200" onSubmit={handleSubmit}>
            
            {/* Profile Image Upload */}
            <div className="text-center">
              <label htmlFor="profile-image" className="block text-sm font-semibold text-gray-700 mb-3">
                Profile Picture
              </label>
              <div className="flex justify-center">
                <div className="relative">
                  {profileData.profileImagePreview ? (
                    <img
                      src={profileData.profileImagePreview}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                      <span className="text-4xl">📷</span>
                    </div>
                  )}
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-green-500 text-white rounded-full p-2 cursor-pointer hover:bg-green-600 transition shadow-lg"
                  >
                    <span className="text-xl">+</span>
                  </label>
                </div>
              </div>
              <input
                id="profile-image"
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-gray-500 text-xs mt-2">Click the + button to upload</p>
            </div>

            {/* First Name Input */}
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                name="firstName"
                value={profileData.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Last Name Input */}
            <div>
              <label htmlFor="last-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                name="lastName"
                value={profileData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Skill Input */}
            <div>
              <label htmlFor="skill" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Skill
              </label>
              <input
                id="skill"
                type="text"
                name="skill"
                value={profileData.skill}
                onChange={handleInputChange}
                placeholder="React, Node.js, Python"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Domain Input */}
            <div>
              <label htmlFor="domain" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Domain
              </label>
              <input
                id="domain"
                type="text"
                name="domain"
                value={profileData.domain}
                onChange={handleInputChange}
                placeholder="Web Development, Android, Data Science"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Experience Level Input */}
            <div>
              <label htmlFor="experienceLevel" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Experience Level
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                value={profileData.experienceLevel}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              >
                <option value="">Select experience level</option>
                <option value="Fresher">Fresher</option>
                <option value="Junior">Junior</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition shadow-md mt-8"
            >
              Complete Profile
            </button>

            {/* Skip Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-gray-900 text-sm underline"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DeveloperProfilePage;
