import { signUpSchema } from '../validation';

describe('signUpSchema', () => {
  describe('name', () => {
    it('returns error when name is empty', () => {
      const result = signUpSchema.safeParse({ name: '', email: 'a@b.co', password: 'pass12', confirmPassword: 'pass12' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Name is required')).toBe(true);
      }
    });

    it('returns error when name is only whitespace', () => {
      const result = signUpSchema.safeParse({ name: '   ', email: 'a@b.co', password: 'pass12', confirmPassword: 'pass12' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Name is required')).toBe(true);
      }
    });

    it('returns error when name is too short', () => {
      const result = signUpSchema.safeParse({ name: 'A', email: 'a@b.co', password: 'pass12', confirmPassword: 'pass12' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Name must be at least 2 characters long')).toBe(true);
      }
    });

    it('returns error when name is too long', () => {
      const result = signUpSchema.safeParse({
        name: 'a'.repeat(51),
        email: 'a@b.co',
        password: 'pass12',
        confirmPassword: 'pass12',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Name must be less than 50 characters')).toBe(true);
      }
    });

    it('parses valid name', () => {
      const result = signUpSchema.safeParse({ name: 'John', email: 'a@b.co', password: 'pass12', confirmPassword: 'pass12' });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.name).toBe('John');
    });

    it('trims name', () => {
      const result = signUpSchema.safeParse({ name: '  Jane  ', email: 'a@b.co', password: 'pass12', confirmPassword: 'pass12' });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.name).toBe('Jane');
    });
  });

  describe('email', () => {
    it('returns error when email is empty', () => {
      const result = signUpSchema.safeParse({ name: 'John', email: '', password: 'pass12', confirmPassword: 'pass12' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Email is required')).toBe(true);
      }
    });

    it('returns error when email is only whitespace', () => {
      const result = signUpSchema.safeParse({ name: 'John', email: '   ', password: 'pass12', confirmPassword: 'pass12' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Email is required')).toBe(true);
      }
    });

    it('returns error for invalid email format', () => {
      const invalidEmails = ['invalid', 'invalid@', '@domain.com', 'user@domain'];
      invalidEmails.forEach((email) => {
        const result = signUpSchema.safeParse({ name: 'John', email, password: 'pass12', confirmPassword: 'pass12' });
        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.some((i) => i.message === 'Please enter a valid email address')).toBe(true);
        }
      });
    });

    it('parses valid email', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'user@example.com',
        password: 'pass12',
        confirmPassword: 'pass12',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.email).toBe('user@example.com');
    });

    it('trims email', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: '  user@mail.org  ',
        password: 'pass12',
        confirmPassword: 'pass12',
      });
      expect(result.success).toBe(true);
      if (result.success) expect(result.data.email).toBe('user@mail.org');
    });
  });

  describe('password', () => {
    it('returns error when password is empty', () => {
      const result = signUpSchema.safeParse({ name: 'John', email: 'a@b.co', password: '', confirmPassword: '' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Password is required')).toBe(true);
      }
    });

    it('returns error when password is too short', () => {
      const result = signUpSchema.safeParse({ name: 'John', email: 'a@b.co', password: '12345', confirmPassword: '12345' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Password must be at least 6 characters long')).toBe(
          true
        );
      }
    });

    it('returns error when password is too long', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'a@b.co',
        password: 'a'.repeat(129),
        confirmPassword: 'a'.repeat(129),
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Password must be less than 128 characters')).toBe(
          true
        );
      }
    });

    it('returns error when password has no letter', () => {
      const result = signUpSchema.safeParse({ name: 'John', email: 'a@b.co', password: '123456', confirmPassword: '123456' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((i) => i.message === 'Password must contain at least one letter and one number')
        ).toBe(true);
      }
    });

    it('returns error when password has no number', () => {
      const result = signUpSchema.safeParse({ name: 'John', email: 'a@b.co', password: 'abcdef', confirmPassword: 'abcdef' });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((i) => i.message === 'Password must contain at least one letter and one number')
        ).toBe(true);
      }
    });

    it('parses valid password', () => {
      const validPasswords = ['pass12', 'Password123', 'abc123'];
      validPasswords.forEach((password) => {
        const result = signUpSchema.safeParse({ name: 'John', email: 'a@b.co', password, confirmPassword: password });
        expect(result.success).toBe(true);
        if (result.success) expect(result.data.password).toBe(password);
      });
    });
  });

  it('parses full valid form', () => {
    const result = signUpSchema.safeParse({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecurePass1',
      confirmPassword: 'SecurePass1',
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass1',
        confirmPassword: 'SecurePass1',
      });
    }
  });

  describe('confirmPassword', () => {
    it('returns error when confirmPassword is empty', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'a@b.co',
        password: 'pass12',
        confirmPassword: '',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Please confirm your password')).toBe(true);
      }
    });

    it('returns error when passwords do not match', () => {
      const result = signUpSchema.safeParse({
        name: 'John',
        email: 'a@b.co',
        password: 'pass12',
        confirmPassword: 'pass123',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((i) => i.message === 'Passwords do not match')).toBe(true);
      }
    });
  });
});
