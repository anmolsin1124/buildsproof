"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiCode, HiBriefcase, HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { setUserRole } from '../utils/roleUtils';
import { HelpCard } from '@/components/OnboardingHints';

const RolePage = () => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;
    setLoading(true);
    try {
      setUserRole(selectedRole);
      if (selectedRole === 'developer') {
        router.push('/dashboard');
      } else if (selectedRole === 'recruiter') {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error setting role:', error);
      setLoading(false);
    }
  };

  const handleSkipToDashboard = async () => {
    if (!selectedRole) return;
    setLoading(true);
    try {
      setUserRole(selectedRole);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error setting role:', error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="w-full max-w-3xl animate-fade-in">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Choose Your Role</h2>
            <p className="text-gray-500 text-lg sm:text-xl font-medium max-w-xl mx-auto">Select how you'd like to use BuildProof. You can switch roles later anytime.</p>
          </div>

          {/* Role Options */}
          <div className="grid sm:grid-cols-2 gap-8 mb-12">
            {/* Developer Card */}
            <div
              onClick={() => handleRoleSelect('developer')}
              className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                selectedRole === 'developer'
                  ? 'border-green-500 bg-white shadow-xl shadow-green-500/10 scale-[1.02]'
                  : 'border-white bg-white/60 hover:border-green-200 hover:bg-white hover:shadow-lg'
              }`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  selectedRole === 'developer' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-500 group-hover:bg-green-100'
                }`}>
                  <HiCode size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Developer</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                  Showcase projects, solve complex problems, build your portfolio, and connect with other builders.
                </p>
                
                <div className={`mt-auto flex items-center gap-2 font-bold text-sm transition-opacity duration-300 ${selectedRole === 'developer' ? 'opacity-100 text-green-600' : 'opacity-0'}`}>
                  <HiCheckCircle size={20} /> SELECTED
                </div>
              </div>
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full transition-transform duration-500 ${selectedRole === 'developer' ? 'scale-150' : 'scale-0'}`}></div>
            </div>

            {/* Recruiter Card */}
            <div
              onClick={() => handleRoleSelect('recruiter')}
              className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden ${
                selectedRole === 'recruiter'
                  ? 'border-green-500 bg-white shadow-xl shadow-green-500/10 scale-[1.02]'
                  : 'border-white bg-white/60 hover:border-green-200 hover:bg-white hover:shadow-lg'
              }`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
                  selectedRole === 'recruiter' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-500 group-hover:bg-green-100'
                }`}>
                  <HiBriefcase size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Recruiter</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                  Post job openings, discover top-tier talent, manage applications, and build your dream team.
                </p>
                
                <div className={`mt-auto flex items-center gap-2 font-bold text-sm transition-opacity duration-300 ${selectedRole === 'recruiter' ? 'opacity-100 text-green-600' : 'opacity-0'}`}>
                  <HiCheckCircle size={20} /> SELECTED
                </div>
              </div>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full transition-transform duration-500 ${selectedRole === 'recruiter' ? 'scale-150' : 'scale-0'}`}></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <button
              onClick={handleContinue}
              disabled={!selectedRole || loading}
              className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                selectedRole && !loading
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/20 active:scale-[0.98]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>Next Step <HiArrowRight /></>
              )}
            </button>
            
            <button
              onClick={handleSkipToDashboard}
              disabled={!selectedRole || loading}
              className={`flex-1 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 ${
                selectedRole && !loading
                  ? 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 active:scale-[0.98]'
                  : 'bg-transparent text-gray-300 border border-gray-100 cursor-not-allowed'
              }`}
            >
              Skip to Dashboard
            </button>
          </div>

          {/* Info Hint */}
          <div className="mt-12 max-w-xl mx-auto opacity-80">
            <HelpCard
              type="info"
              title="Switch roles anytime"
              content="You can toggle between Developer and Recruiter interfaces in your settings menu without losing any progress."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RolePage;
