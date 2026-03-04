import { signUpUser } from '../api';

describe('signUpUser', () => {
  const mockUserData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password1',
  };

  it('in demo mode returns success with user data shape', async () => {
    jest.useFakeTimers();

    const promise = signUpUser(mockUserData);
    await jest.runAllTimersAsync();
    const result = await promise;

    jest.useRealTimers();

    expect(result.success).toBe(true);
    expect(result.message).toBe('Account created successfully!');
    expect(result.data).toBeDefined();
    expect(result.data?.name).toBe(mockUserData.name);
    expect(result.data?.email).toBe(mockUserData.email);
    expect(result.data?.id).toBe('12345');
    expect(Array.isArray(result.data?.features)).toBe(true);
    expect(typeof result.data?.links).toBe('object');
    expect(typeof result.data?.profile).toBe('object');
  });
});
