'use server';

import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';
import { z } from 'zod';

// Define the login schema using Zod for validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

export async function loginUser(userData: { email: string; password: string }) {
  try {
    const validatedData = loginSchema.parse(userData);

    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });
    if (!user) {
      return { errors: { email: 'User not found' } };
    }

    const passwordValid = await argon2.verify(user.password, validatedData.password);

    if (!passwordValid) {
      return { errors: { password: 'Incorrect password' } };
    }
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const { password, ...userWithoutPassword } = user;

     console.log(userWithoutPassword)
     // Return the user object without the password
     return { user: userWithoutPassword };

  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc: Record<string, string>, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});

      return { errors };
    }

    console.error('Error logging in user:', error);
    return { errors: { general: 'Something went wrong. Try again.' } };
  }
}
