"use client";

import React, { useState } from 'react';
import { getUserRole, setUserRole } from '../utils/roleUtils';
import { Alert, LoadingButton } from './FormFeedback';

/**
 * Role Switcher Component
 * Shows current role and allows changing it
 * Fixes the "role selection trap" confusing UX
 */
export const RoleSwitcher = ({ onRoleChange }) => {
  const currentRole = getUserRole();
  const [isChanging, setIsChanging] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleChange = async (newRole) => {
    if (newRole === currentRole) return;
    
    setSelectedRole(newRole);
    setShowWarning(true);
  };

  const confirmRoleChange = async () => {
    setIsChanging(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUserRole(selectedRole);
      setShowWarning(false);
      setIsChanging(false);
      
      // Refresh page to update UI
      onRoleChange?.(selectedRole);
      window.location.reload();
    } catch (error) {
      console.error('Failed to change role:', error);
      setIsChanging(false);
    }
  };

  if (!currentRole) return null;

  const roleLabel = currentRole === 'developer' ? 'Developer' : 'Recruiter';
  const alternateRole = currentRole === 'developer' ? 'recruiter' : 'developer';
  const alternateLabel = alternateRole === 'developer' ? 'Developer' : 'Recruiter';

  return (
    <div className="space-y-4">
      {/* Current Role Display */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Current Role</p>
            <p className="text-lg font-bold text-gray-900">
              {roleLabel} {currentRole === 'developer' ? '👨‍💻' : '💼'}
            </p>
          </div>
          <button
            onClick={() => handleRoleChange(alternateRole)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition text-sm"
          >
            Switch to {alternateLabel}
          </button>
        </div>
      </div>

      {/* Warning Dialog */}
      {showWarning && (
        <Alert
          type="warning"
          title={`Switch to ${alternateLabel}?`}
          message={`You'll lose all ${roleLabel.toLowerCase()} dashboard data and view the ${alternateLabel.toLowerCase()} interface. You can switch back anytime.`}
          onClose={() => setShowWarning(false)}
          actions={[
            {
              label: 'Cancel',
              onClick: () => setShowWarning(false),
              variant: 'secondary'
            },
            {
              label: `Switch to ${alternateLabel}`,
              onClick: confirmRoleChange,
              variant: 'primary'
            }
          ]}
        />
      )}
    </div>
  );
};

export default RoleSwitcher;
