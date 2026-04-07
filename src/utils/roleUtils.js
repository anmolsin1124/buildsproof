/**
 * Role Management Utilities
 * Handle switching between Developer and Recruiter roles
 */

const ROLE_KEY = 'buildproof_user_role';

export const setUserRole = (role) => {
  try {
    if (!['developer', 'recruiter'].includes(role)) {
      console.error('Invalid role:', role);
      return false;
    }
    localStorage.setItem(ROLE_KEY, role);
    return true;
  } catch (error) {
    console.error('Failed to set role:', error);
    return false;
  }
};

export const getUserRole = () => {
  try {
    const role = localStorage.getItem(ROLE_KEY);
    return role || null;
  } catch (error) {
    console.error('Failed to get role:', error);
    return null;
  }
};

export const clearUserRole = () => {
  try {
    localStorage.removeItem(ROLE_KEY);
  } catch (error) {
    console.error('Failed to clear role:', error);
  }
};

export const hasUserSelectedRole = () => {
  return getUserRole() !== null;
};

export const isDeveloper = () => {
  return getUserRole() === 'developer';
};

export const isRecruiter = () => {
  return getUserRole() === 'recruiter';
};
