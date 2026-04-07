/**
 * Authentication & Local Storage Utilities
 * Handles user session management and data persistence
 */

const AUTH_KEY = 'buildproof_auth';
const PROFILE_KEY = 'buildproof_profile';
const PREFERENCES_KEY = 'buildproof_preferences';

// ============= AUTH STATE MANAGEMENT =============

export const setAuthUser = (userData) => {
    try {
        localStorage.setItem(AUTH_KEY, JSON.stringify({
            ...userData,
            loggedInAt: new Date().toISOString(),
        }));
    } catch (error) {
        console.error('Failed to save auth data:', error);
    }
};

export const getAuthUser = () => {
    try {
        const data = localStorage.getItem(AUTH_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to retrieve auth data:', error);
        return null;
    }
};

export const clearAuthUser = () => {
    try {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(PROFILE_KEY);
    } catch (error) {
        console.error('Failed to clear auth data:', error);
    }
};

export const isUserLoggedIn = () => {
    return getAuthUser() !== null;
};

// ============= PROFILE MANAGEMENT =============

export const setProfileData = (profileData) => {
    try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify({
            ...profileData,
            updatedAt: new Date().toISOString(),
        }));
    } catch (error) {
        console.error('Failed to save profile data:', error);
    }
};

export const getProfileData = () => {
    try {
        const data = localStorage.getItem(PROFILE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to retrieve profile data:', error);
        return null;
    }
};

// ============= PREFERENCES & SETTINGS =============

export const setUserPreferences = (preferences) => {
    try {
        localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
    } catch (error) {
        console.error('Failed to save preferences:', error);
    }
};

export const getUserPreferences = () => {
    try {
        const data = localStorage.getItem(PREFERENCES_KEY);
        return data ? JSON.parse(data) : {
            theme: 'light',
            notifications: true,
            language: 'en',
        };
    } catch (error) {
        console.error('Failed to retrieve preferences:', error);
        return {};
    }
};

// ============= VALIDATION UTILITIES =============

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/;
    return regex.test(password);
};

export const getPasswordStrength = (password) => {
    if (!password) return 'weak';
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    if (/[!@#$%^&*]/.test(password)) return 'strong';
    return 'medium';
};

// ============= DATA CLEARING =============

export const clearAllData = () => {
    try {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(PROFILE_KEY);
        localStorage.removeItem(PREFERENCES_KEY);
    } catch (error) {
        console.error('Failed to clear all data:', error);
    }
};
