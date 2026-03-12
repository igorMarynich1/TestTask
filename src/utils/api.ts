import axios from 'axios';
import { encode as btoa } from 'base-64';
import {
  SignUpFormData,
  SignUpResponse,
  AccountData,
  ApiResponse,
  UserAccountData,
} from '../types';

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

if (__DEV__) {
  apiClient.interceptors.request.use(
    (config) => {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    },
  );

  apiClient.interceptors.response.use(
    (response) => {
      console.log('API Response:', response.status, response.config.url);
      return response;
    },
    (error) => {
      console.error(
        'API Response Error:',
        error.response?.status,
        error.message,
      );
      return Promise.reject(error);
    },
  );
}

/**
 * Fetches account details using Basic Auth credentials
 * returned by the signup endpoint.
 */
export const fetchAccountData = async (
  username: string,
  password: string,
  retries = MAX_RETRIES,
): Promise<AccountData> => {
  try {
    const response = await apiClient.get<AccountData>('/interview/account', {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      if (status && status >= 500 && retries > 0) {
        await delay(RETRY_DELAY_MS);
        return fetchAccountData(username, password, retries - 1);
      }
      if (!error.response && retries > 0) {
        await delay(RETRY_DELAY_MS);
        return fetchAccountData(username, password, retries - 1);
      }
    }
    throw error;
  }
};

/**
 * Two-step signup flow:
 * 1. POST /signup — registers user, returns Basic Auth credentials
 * 2. GET /interview/account — fetches account data with those credentials
 */
export const signUpUser = async (
  userData: SignUpFormData,
  retries = MAX_RETRIES,
): Promise<ApiResponse<UserAccountData>> => {
  try {
    const signUpResponse = await apiClient.post<SignUpResponse>(
      '/signup',
      userData,
    );
    const responseData = signUpResponse.data;
    const creds = responseData?.basicAuthCredentials;

    if (!creds?.username || !creds?.password) {
      return {
        success: false,
        message: 'Invalid response from server. Please try again.',
      };
    }

    const accountData = await fetchAccountData(creds.username, creds.password);

    return {
      success: true,
      data: {
        name: userData.name,
        email: userData.email,
        account: accountData,
        credentials: creds,
      },
      message: responseData?.message,
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
          message:
            serverMessage || 'Invalid input. Please check your information.',
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
