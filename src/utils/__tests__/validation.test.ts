import {
  validateName,
  validateEmail,
  validatePassword,
} from '../validation';

describe('validateName', () => {
  it('returns error when name is empty', () => {
    expect(validateName('')).toBe('Name is required');
    expect(validateName('   ')).toBe('Name is required');
  });

  it('returns error when name is too short', () => {
    expect(validateName('A')).toBe('Name must be at least 2 characters long');
  });

  it('returns error when name is too long', () => {
    const longName = 'a'.repeat(51);
    expect(validateName(longName)).toBe('Name must be less than 50 characters');
  });

  it('returns null for valid name', () => {
    expect(validateName('John')).toBeNull();
    expect(validateName('John Doe')).toBeNull();
    expect(validateName('  Jane  ')).toBeNull();
  });
});

describe('validateEmail', () => {
  it('returns error when email is empty', () => {
    expect(validateEmail('')).toBe('Email is required');
    expect(validateEmail('   ')).toBe('Email is required');
  });

  it('returns error for invalid email format', () => {
    expect(validateEmail('invalid')).toBe('Please enter a valid email address');
    expect(validateEmail('invalid@')).toBe('Please enter a valid email address');
    expect(validateEmail('@domain.com')).toBe('Please enter a valid email address');
    expect(validateEmail('user@domain')).toBe('Please enter a valid email address');
  });

  it('returns null for valid email', () => {
    expect(validateEmail('user@example.com')).toBeNull();
    expect(validateEmail('test.user@domain.co')).toBeNull();
    expect(validateEmail('  user@mail.org  ')).toBeNull();
  });
});

describe('validatePassword', () => {
  it('returns error when password is empty', () => {
    expect(validatePassword('')).toBe('Password is required');
  });

  it('returns error when password is too short', () => {
    expect(validatePassword('12345')).toBe('Password must be at least 6 characters long');
  });

  it('returns error when password is too long', () => {
    expect(validatePassword('a'.repeat(129))).toBe('Password must be less than 128 characters');
  });

  it('returns error when password has no letter', () => {
    expect(validatePassword('123456')).toBe('Password must contain at least one letter and one number');
  });

  it('returns error when password has no number', () => {
    expect(validatePassword('abcdef')).toBe('Password must contain at least one letter and one number');
  });

  it('returns null for valid password', () => {
    expect(validatePassword('pass12')).toBeNull();
    expect(validatePassword('Password123')).toBeNull();
    expect(validatePassword('abc123')).toBeNull();
  });
});
