/**
 * Developer Profile Data Initialization
 * Default values and data structures for developer profiles
 */

export const defaultDeveloperProfile = {
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    role: 'developer',

    // Professional Info
    skill: '', // e.g., "Full Stack Developer"
    domain: '', // e.g., "Web Development", "Mobile Development"
    experienceLevel: '', // e.g., "beginner", "intermediate", "expert"
    bio: '',

    // Profile Image
    profileImage: null,
    profileImagePreview: null,

    // Statistics
    projectsCount: 0,
    likesReceived: 0,
    problemsSolved: 0,
    streakDays: 0,

    // Social Links
    github: '',
    linkedin: '',
    portfolio: '',

    // Preferences
    isPublic: true,
    allowMessages: true,
    allowConnections: true,

    // Metadata
    createdAt: null,
    updatedAt: null,
};

export const defaultRecruiterProfile = {
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    role: 'recruiter',

    // Company Info
    companyName: '',
    companyLogo: null,
    companyLogoPreview: null,
    industry: '',
    companySize: '',

    // Recruiter Info
    position: '', // e.g., "HR Manager", "Hiring Manager"
    bio: '',

    // Contact
    phone: '',
    companyWebsite: '',

    // Preferences
    isPublic: true,
    allowMessages: true,

    // Metadata
    createdAt: null,
    updatedAt: null,
};

export const profileFormFields = {
    developer: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'skill', label: 'Primary Skill', type: 'text', required: true, placeholder: 'e.g., Full Stack Developer' },
        { name: 'domain', label: 'Domain', type: 'select', required: true, options: ['Web Development', 'Mobile Development', 'Data Science', 'DevOps', 'AI/ML', 'Other'] },
        { name: 'experienceLevel', label: 'Experience Level', type: 'select', required: true, options: ['Beginner', 'Intermediate', 'Expert'] },
        { name: 'bio', label: 'Bio', type: 'textarea', required: false, placeholder: 'Tell us about yourself' },
        { name: 'github', label: 'GitHub URL', type: 'url', required: false },
        { name: 'linkedin', label: 'LinkedIn URL', type: 'url', required: false },
        { name: 'portfolio', label: 'Portfolio URL', type: 'url', required: false },
    ],
    recruiter: [
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'companyName', label: 'Company Name', type: 'text', required: true },
        { name: 'position', label: 'Your Position', type: 'text', required: true },
        { name: 'industry', label: 'Industry', type: 'text', required: false },
        { name: 'companySize', label: 'Company Size', type: 'select', required: false, options: ['1-50', '51-200', '201-1000', '1000+'] },
        { name: 'companyWebsite', label: 'Company Website', type: 'url', required: false },
        { name: 'phone', label: 'Contact Phone', type: 'tel', required: false },
        { name: 'bio', label: 'About You', type: 'textarea', required: false, placeholder: 'Tell candidates about your company' },
    ],
};

export const domainOptions = ['Web Development', 'Mobile Development', 'Data Science', 'DevOps', 'AI/ML', 'Other'];
export const experienceLevelOptions = ['Beginner', 'Intermediate', 'Expert'];
export const companySizeOptions = ['1-50', '51-200', '201-1000', '1000+'];
