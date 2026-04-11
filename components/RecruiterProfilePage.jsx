"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../index.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const RecruiterProfilePage = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    profileImage: null,
    profileImagePreview: null,
    companyName: '',
    jobTitle: '',
    industry: '',
    hiringFocus: '',
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
    if (!profileData.companyName.trim()) {
      alert('Company name is required');
      return;
    }
    if (!profileData.jobTitle.trim()) {
      alert('Job title is required');
      return;
    }
    if (!profileData.industry.trim()) {
      alert('Industry is required');
      return;
    }
    if (!profileData.hiringFocus.trim()) {
      alert('Hiring focus is required');
      return;
    }
    if (!profileData.profileImage) {
      alert('Profile image is required');
      return;
    }

    // Store profile data
    localStorage.setItem('recruiterProfile', JSON.stringify({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      profileImagePreview: profileData.profileImagePreview,
      companyName: profileData.companyName,
      jobTitle: profileData.jobTitle,
      industry: profileData.industry,
      hiringFocus: profileData.hiringFocus,
    }));

    // Navigate to dashboard
    router.push('/');
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Complete Your Profile</h2>
            <p className="text-gray-600 text-base">Add your information to get started as a Recruiter</p>
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
                      className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                      <span className="text-4xl"></span>
                    </div>
                  )}
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition shadow-lg"
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
                required
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
                placeholder="Sarah"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                placeholder="Smith"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Industry Input */}
            <div>
              <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Industry
              </label>
              <input
                id="industry"
                type="text"
                name="industry"
                value={profileData.industry}
                onChange={handleInputChange}
                placeholder="Technology, Finance, Healthcare"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Company Name Input */}
            <div>
              <label htmlFor="company-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Company Name
              </label>
              <input
                id="company-name"
                type="text"
                name="companyName"
                value={profileData.companyName}
                onChange={handleInputChange}
                placeholder="Tech Corp Inc."
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Job Title Input */}
            <div>
              <label htmlFor="job-title" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Job Title
              </label>
              <input
                id="job-title"
                type="text"
                name="jobTitle"
                value={profileData.jobTitle}
                onChange={handleInputChange}
                placeholder="HR Manager"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Hiring Focus Input */}
            <div>
              <label htmlFor="hiring-focus" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Hiring Focus
              </label>
              <input
                id="hiring-focus"
                type="text"
                name="hiringFocus"
                value={profileData.hiringFocus}
                onChange={handleInputChange}
                placeholder="Developers, Sales, Operations"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Industry Input */}
            <div>
              <label htmlFor="industry" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Industry
              </label>
              <input
                id="industry"
                type="text"
                name="industry"
                value={profileData.industry}
                onChange={handleInputChange}
                placeholder="Technology, Finance, Healthcare"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Hiring Focus Input */}
            <div>
              <label htmlFor="hiring-focus" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Hiring Focus
              </label>
              <input
                id="hiring-focus"
                type="text"
                name="hiringFocus"
                value={profileData.hiringFocus}
                onChange={handleInputChange}
                placeholder="Developers, Sales, Operations"
                className="w-full px-4 py-2.5 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-md mt-8"
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

export default RecruiterProfilePage;
