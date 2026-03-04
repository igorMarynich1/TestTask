import axios from 'axios';
import { SignUpFormData, ApiResponse, UserAccountData } from '../types';

const API_BASE_URL = 'https://artjoms-spole.fly.dev';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Use demo mode in development when API may be unavailable
const useDemoMode = __DEV__;

export const signUpUser = async (userData: SignUpFormData): Promise<ApiResponse<UserAccountData>> => {
  if (useDemoMode) {
    console.log('Demo Mode: Simulating successful signup');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const demoData: UserAccountData = {
      id: '12345',
      name: userData.name,
      email: userData.email,
      message: 'Welcome to our platform!',
      instructions: 'Your account has been successfully created. You can now access all features of the application.',
      features: [
        'Access to premium content',
        'Personalized recommendations',
        'Priority customer support',
        'Advanced analytics dashboard',
        'Mobile app synchronization'
      ],
      links: {
        'Help Center': 'https://example.com/help',
        'Contact Support': 'https://example.com/support',
        'Privacy Policy': 'https://example.com/privacy',
        'Terms of Service': 'https://example.com/terms'
      },
      profile: {
        'Account Type': 'Premium',
        'Member Since': new Date().toLocaleDateString(),
        'Status': 'Active',
        'Verification': 'Verified'
      },
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    return {
      success: true,
      data: demoData,
      message: 'Account created successfully!',
    };
  }

  try {
    const response = await apiClient.post<UserAccountData>('/signup', userData);

    return {
      success: true,
      data: response.data,
      message: 'Account created successfully!',
    };
  } catch (error: unknown) {
    if (__DEV__) {
      console.error('Sign up error:', error);
    }

    const axiosError = error as { response?: { status: number; data?: { message?: string } }; request?: unknown };
    if (axiosError.response) {
      const status = axiosError.response.status;
      const data = axiosError.response.data;
      
      if (status === 400) {
        return {
          success: false,
          message: data?.message || 'Invalid input. Please check your information.',
        };
      } else if (status === 404) {
        return {
          success: false,
          message: 'API endpoint not found. Please contact support.',
        };
      } else if (status === 409) {
        return {
          success: false,
          message: 'An account with this email already exists.',
        };
      } else if (status >= 500) {
        return {
          success: false,
          message: 'Server error. Please try again later.',
        };
      } else {
        return {
          success: false,
          message: data?.message || 'Sign up failed. Please try again.',
        };
      }
    } else if (axiosError.request) {
      // Network error
      return {
        success: false,
        message: 'Network error. Please check your internet connection.',
      };
    } else {
      // Other error
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      };
    }
  }
};