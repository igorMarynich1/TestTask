import { z } from 'zod';

const passwordRefine = (val: string) => {
  const hasLetter = /[a-zA-Z]/.test(val);
  const hasNumber = /\d/.test(val);
  return hasLetter && hasNumber;
};

export const signUpSchema = z
  .object({
    name: z
      .string()
      .refine((s) => s.trim().length > 0, 'Name is required')
      .transform((s) => s.trim())
      .pipe(
        z
          .string()
          .min(2, 'Name must be at least 2 characters long')
          .max(50, 'Name must be less than 50 characters')
      ),
    email: z
      .string()
      .refine((s) => s.trim().length > 0, 'Email is required')
      .transform((s) => s.trim())
      .pipe(z.string().email('Please enter a valid email address')),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .max(128, 'Password must be less than 128 characters')
      .refine(passwordRefine, 'Password must contain at least one letter and one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((data) => data.acceptTerms === true, {
    message: 'You must accept the Terms of Service and Privacy Policy',
    path: ['acceptTerms'],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
