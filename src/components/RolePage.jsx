import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Navbar from './Navbar';
import Footer from './Footer';
import { setUserRole } from '../utils/roleUtils';
import { HelpCard } from './OnboardingHints';

const RolePage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      alert('Please select a role to continue');
      return;
    }

    setLoading(true);
    try {
      // Save role to storage
      setUserRole(selectedRole);
      
      // Navigate based on role
      if (selectedRole === 'developer') {
        navigate('/developer-profile');
      } else if (selectedRole === 'recruiter') {
        navigate('/recruiter-profile');
      }
    } catch (error) {
      console.error('Error setting role:', error);
      alert('Failed to set role. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
            <p className="text-gray-600 text-lg">Select how you'd like to use BuildProof</p>
          </div>

          {/* Role Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Developer Card */}
            <div
              onClick={() => handleRoleSelect('developer')}
              className={`p-8 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRole === 'developer'
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">💻</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Developer</h3>
                <p className="text-gray-600 text-base mb-4">
                  Showcase your projects, build your portfolio, find exciting opportunities and connect with other developers.
                </p>
                
                {/* Check mark for selected */}
                {selectedRole === 'developer' && (
                  <div className="mt-4 inline-block">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      ✓
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Recruiter Card */}
            <div
              onClick={() => handleRoleSelect('recruiter')}
              className={`p-8 rounded-lg border-2 cursor-pointer transition-all ${
                selectedRole === 'recruiter'
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Recruiter</h3>
                <p className="text-gray-600 text-base mb-4">
                  Post job openings, discover top talent, manage applications and build your ideal team efficiently.
                </p>
                
                {/* Check mark for selected */}
                {selectedRole === 'recruiter' && (
                  <div className="mt-4 inline-block">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      ✓
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRole || loading}
              className={`w-full sm:w-64 py-3 px-6 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2 ${
                selectedRole && !loading
                  ? 'bg-green-500 hover:bg-green-600 cursor-pointer shadow-md'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{loading ? 'Setting up...' : 'Continue'}</span>
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8">
            <HelpCard
              type="info"
              title="Can I change my role later?"
              content="Yes! You can switch between Developer and Recruiter roles anytime in your settings. No data is lost permanently."
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RolePage;
