import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required.')
    .email('Please provide a valid email address.'),
  password: z
    .string()
    .min(1, 'Password is required.'),
  rememberMe: z.boolean().optional().default(false),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  displayName: z
    .string()
    .min(2, 'Full name must be at least 2 characters long.'),
  email: z
    .string()
    .min(1, 'Email address is required.')
    .email('Please provide a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9!@#$%^&*]/, 'Password must contain at least one number or symbol.'),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Terms of Service and Privacy Policy to create an account.' }),
  }),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
