jest.mock('axios', () => {
  const post = jest.fn();
  const isAxiosError = jest.fn();

  const instance = {
    post,
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

import axios from 'axios';
import { signUpUser } from '../api';

const mockApiInstance = (axios.create as unknown as jest.Mock)();
const mockPost = mockApiInstance.post as jest.Mock;
const asJestMock = (fn: unknown) => fn as jest.Mock;

const mockUserData = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password1',
};

describe('signUpUser', () => {
  beforeEach(() => {
    mockPost.mockReset();
    asJestMock(axios.isAxiosError).mockReset();
  });

  it('sends POST to /signup and returns success on valid response', async () => {
    const responseData = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      recentTransactions: ['transaction1'],
    };
    mockPost.mockResolvedValueOnce({ data: responseData, status: 200 });

    const result = await signUpUser(mockUserData, 0);

    expect(mockPost).toHaveBeenCalledWith('/signup', mockUserData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(responseData);
    expect(result.message).toBe('Account created successfully!');
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
    expect(result.message).toBe('Network error. Please check your internet connection.');
  });

  it('retries on network error before giving up', async () => {
    mockPost.mockRejectedValue({ request: {}, message: 'Network Error' });
    asJestMock(axios.isAxiosError).mockReturnValue(true);

    const result = await signUpUser(mockUserData, 1);

    expect(mockPost).toHaveBeenCalledTimes(2);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Network error. Please check your internet connection.');
  }, 10000);

  it('retries on 500 server error and succeeds on retry', async () => {
    const responseData = { id: '123', name: 'Test User' };
    mockPost
      .mockRejectedValueOnce({ response: { status: 500, data: {} } })
      .mockResolvedValueOnce({ data: responseData, status: 200 });
    asJestMock(axios.isAxiosError)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const result = await signUpUser(mockUserData, 1);

    expect(mockPost).toHaveBeenCalledTimes(2);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(responseData);
  }, 10000);

  it('handles unexpected errors', async () => {
    mockPost.mockRejectedValueOnce(new Error('Something broke'));
    asJestMock(axios.isAxiosError).mockReturnValue(false);

    const result = await signUpUser(mockUserData, 0);

    expect(result.success).toBe(false);
    expect(result.message).toBe('An unexpected error occurred. Please try again.');
  });
});
