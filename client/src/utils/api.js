const API_BASE_URL = 'https://backend-paw0.onrender.com/api';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Generic API call function
export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: getAuthHeaders(),
        ...options
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
};

// Specific API functions
export const authAPI = {
    login: (credentials) => apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
    }),

    register: (userData) => apiCall('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
    }),

    getCurrentUser: () => apiCall('/auth/me')
}; 