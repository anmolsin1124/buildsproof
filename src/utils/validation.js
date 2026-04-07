/**
 * Form Validation Rules & Error Messages
 */

export const validationRules = {
    email: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        error: 'Please enter a valid email address',
    },
    password: {
        validate: (value) => value.length >= 8,
        error: 'Password must be at least 8 characters',
    },
    confirmPassword: (password) => ({
        validate: (value) => value === password,
        error: 'Passwords do not match',
    }),
    firstName: {
        validate: (value) => value.trim().length >= 2,
        error: 'First name must be at least 2 characters',
    },
    lastName: {
        validate: (value) => value.trim().length >= 2,
        error: 'Last name must be at least 2 characters',
    },
    skill: {
        validate: (value) => value.trim().length >= 3,
        error: 'Please enter your primary skill',
    },
    domain: {
        validate: (value) => value.trim().length > 0,
        error: 'Please select a domain',
    },
    experienceLevel: {
        validate: (value) => value.trim().length > 0,
        error: 'Please select your experience level',
    },
    phone: {
        validate: (value) => !value || /^\+?[1-9]\d{1,14}$/.test(value),
        error: 'Please enter a valid phone number',
    },
    url: {
        validate: (value) => !value || /^https?:\/\/.+\..+/.test(value),
        error: 'Please enter a valid URL (start with http:// or https://)',
    },
};

export const validateField = (fieldName, value, additionalData = {}) => {
    const rule = validationRules[fieldName];

    if (!rule) return { isValid: true, error: null };

    let validateFn;
    if (typeof rule === 'function') {
        validateFn = rule(additionalData.password)?.validate || (() => true);
    } else {
        validateFn = rule.validate;
    }

    const isValid = validateFn(value);
    const errorMsg = typeof rule === 'function'
        ? rule(additionalData.password)?.error
        : rule.error;

    return {
        isValid,
        error: isValid ? null : errorMsg,
    };
};

export const validateForm = (formData, fieldNames) => {
    const errors = {};
    let isFormValid = true;

    fieldNames.forEach((fieldName) => {
        const validation = validateField(fieldName, formData[fieldName], formData);
        if (!validation.isValid) {
            errors[fieldName] = validation.error;
            isFormValid = false;
        }
    });

    return { isFormValid, errors };
};
