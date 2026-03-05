import axios from 'axios';
import { SignUpFormData, ApiResponse, UserAccountData } from '../types';

const API_BASE_URL = 'https://artjoms-spole.fly.dev';
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (__DEV__) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    if (__DEV__) {
      console.error('API Request Error:', error);
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('API Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      console.error('API Response Error:', error.response?.status, error.message);
    }
    return Promise.reject(error);
  }
);

const DEMO_MODE_ENABLED = true;
const useDemoMode = __DEV__ && DEMO_MODE_ENABLED;

export const signUpUser = async (
  userData: SignUpFormData,
  retries = MAX_RETRIES,
): Promise<ApiResponse<UserAccountData>> => {
  if (useDemoMode) {
    console.log('Demo Mode: Simulating successful signup');

    await delay(1500);

    const demoData: UserAccountData = {
      id: '12345',
      name: userData.name,
      email: userData.email,
      profile: {
        'Type of account': 'Savings',
        'Account No': '1234567890',
        'Available Balance': 'N12,000.00',
        'Date added': '15/05/20, 10:03 AM'
      },
      recentTransactions: [
        'John Ogaga · Zenith Bank 12:03 AM · +N20,983',
        'The Place Restaurant · GT-Bank 12:03 AM · -N983',
        'Transfer to Philip · GT-Bank 12:03 AM · -N298',
        'Habib Yogurt · GT-Bank 12:03 AM · -N4,115',
        'Sandra Williams · Access Bank 11:45 AM · +N8,500',
        'Netflix Subscription · UBA 11:30 AM · -N4,900',
        'Uber Ride · Wema Bank 10:58 AM · -N2,350',
        'Michael Adeyemi · First Bank 10:20 AM · +N15,000',
        'Shoprite · Stanbic IBTC 9:47 AM · -N12,680',
        'Grace Okafor · Kuda Bank 9:15 AM · +N3,200',
        'MTN Airtime · GTBank 8:50 AM · -N1,000',
        'David Obi · Zenith Bank 8:30 AM · -N6,750',
      ],
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

    if (axios.isAxiosError(error) && error.response) {
      const { status, data } = error.response;
      const serverMessage = (data as { message?: string })?.message;

      if (status === 400) {
        return {
          success: false,
          message: serverMessage || 'Invalid input. Please check your information.',
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
        if (retries > 0) {
          await delay(RETRY_DELAY_MS);
          return signUpUser(userData, retries - 1);
        }
        return {
          success: false,
          message: 'Server error. Please try again later.',
        };
      } else {
        return {
          success: false,
          message: serverMessage || 'Sign up failed. Please try again.',
        };
      }
    } else if (axios.isAxiosError(error) && error.request) {
      if (retries > 0) {
        await delay(RETRY_DELAY_MS);
        return signUpUser(userData, retries - 1);
      }
      return {
        success: false,
        message: 'Network error. Please check your internet connection.',
      };
    } else {
      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.',
      };
    }
  }
};