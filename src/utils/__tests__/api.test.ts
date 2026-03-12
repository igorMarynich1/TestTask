jest.mock('axios', () => {
  const post = jest.fn();
  const get = jest.fn();
  const isAxiosError = jest.fn();

  const instance = {
    post,
    get,
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  };

  return {
    __esModule: true,
    default: {
      create: jest.fn().mockReturnValue(instance),
      isAxiosError,
    },
  };
});

jest.mock('base-64', () => ({
  encode: (str: string) => Buffer.from(str).toString('base64'),
}));

import axios from 'axios';
import { signUpUser, fetchAccountData } from '../api';

const mockApiInstance = (axios.create as unknown as jest.Mock)();
const mockPost = mockApiInstance.post as jest.Mock;
const mockGet = mockApiInstance.get as jest.Mock;
const asJestMock = (fn: unknown) => fn as jest.Mock;

const mockUserData = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password1',
};

const mockSignUpResponse = {
  message: 'User signup successful!',
  nextStep: 'Get account details from /interview/account endpoint.',
  basicAuthCredentials: {
    username: 'user',
    password: 'civitta',
  },
};

const mockAccountData = {
  accountType: 'Savings',
  accountNumber: '1234567890',
  availableBalance: 12000,
  currency: 'NGN',
  dateAdded: '15/05/20, 10:03 AM',
  transactions: [
    { name: 'John Ogaga', bank: 'Zenith Bank', time: '12:03 AM', amount: 20983 },
    { name: 'The Place Restaurant', bank: 'GT-Bank', time: '12:03 AM', amount: -983 },
  ],
};

describe('fetchAccountData', () => {
  beforeEach(() => {
    mockGet.mockReset();
    asJestMock(axios.isAxiosError).mockReset();
  });

  it('fetches account data with Basic Auth', async () => {
    mockGet.mockResolvedValueOnce({ data: mockAccountData });

    const result = await fetchAccountData('user', 'civitta', 0);

    expect(mockGet).toHaveBeenCalledWith('/interview/account', {
      headers: {
        Authorization: expect.stringContaining('Basic '),
      },
    });
    expect(result).toEqual(mockAccountData);
  });

  it('retries on 500 error', async () => {
    mockGet
      .mockRejectedValueOnce({ response: { status: 500, data: {} } })
      .mockResolvedValueOnce({ data: mockAccountData });
    asJestMock(axios.isAxiosError)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const result = await fetchAccountData('user', 'civitta', 1);

    expect(mockGet).toHaveBeenCalledTimes(2);
    expect(result).toEqual(mockAccountData);
  }, 10000);
});

describe('signUpUser', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockGet.mockReset();
    asJestMock(axios.isAxiosError).mockReset();
  });

  it('performs two-step signup flow and returns combined data', async () => {
    mockPost.mockResolvedValueOnce({ data: mockSignUpResponse, status: 200 });
    mockGet.mockResolvedValueOnce({ data: mockAccountData });

    const result = await signUpUser(mockUserData, 0);

    expect(mockPost).toHaveBeenCalledWith('/signup', mockUserData);
    expect(mockGet).toHaveBeenCalledWith('/interview/account', {
      headers: {
        Authorization: expect.stringContaining('Basic '),
      },
    });
    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      name: mockUserData.name,
      email: mockUserData.email,
      account: mockAccountData,
      credentials: mockSignUpResponse.basicAuthCredentials,
    });
    expect(result.message).toBe('User signup successful!');
  });

  it('returns error on 400 bad request', async () => {
    mockPost.mockRejectedValueOnce({
      response: { status: 400, data: { message: 'Invalid email' } },
    });
    asJestMock(axios.isAxiosError).mockReturnValue(true);

    const result = await signUpUser(mockUserData, 0);

    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid email');
  });

  it('returns error on 409 conflict', async () => {
    mockPost.mockRejectedValueOnce({
      response: { status: 409, data: {} },
    });
    asJestMock(axios.isAxiosError).mockReturnValue(true);

    const result = await signUpUser(mockUserData, 0);

    expect(result.success).toBe(false);
    expect(result.message).toBe('An account with this email already exists.');
  });

  it('returns network error when no response received', async () => {
    mockPost.mockRejectedValueOnce({ request: {}, message: 'Network Error' });
    asJestMock(axios.isAxiosError).mockReturnValue(true);

    const result = await signUpUser(mockUserData, 0);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'Network error. Please check your internet connection.',
    );
  });

  it('retries on network error before giving up', async () => {
    mockPost.mockRejectedValue({ request: {}, message: 'Network Error' });
    asJestMock(axios.isAxiosError).mockReturnValue(true);

    const result = await signUpUser(mockUserData, 1);

    expect(mockPost).toHaveBeenCalledTimes(2);
    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'Network error. Please check your internet connection.',
    );
  }, 10000);

  it('retries on 500 server error and succeeds on retry', async () => {
    mockPost
      .mockRejectedValueOnce({ response: { status: 500, data: {} } })
      .mockResolvedValueOnce({ data: mockSignUpResponse, status: 200 });
    mockGet.mockResolvedValueOnce({ data: mockAccountData });

    asJestMock(axios.isAxiosError)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const result = await signUpUser(mockUserData, 1);

    expect(mockPost).toHaveBeenCalledTimes(2);
    expect(result.success).toBe(true);
    expect(result.data?.account).toEqual(mockAccountData);
  }, 10000);

  it('handles unexpected errors', async () => {
    mockPost.mockRejectedValueOnce(new Error('Something broke'));
    asJestMock(axios.isAxiosError).mockReturnValue(false);

    const result = await signUpUser(mockUserData, 0);

    expect(result.success).toBe(false);
    expect(result.message).toBe(
      'An unexpected error occurred. Please try again.',
    );
  });
});
